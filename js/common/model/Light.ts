// Copyright 2015-2022, University of Colorado Boulder

/**
 * Light is the model of a light that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Color } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from './BohrModel.js';
import { LightMode, LightModeValues } from './LightMode.js';
import Photon from './Photon.js';
import ZoomedInBox from './ZoomedInBox.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TEmitter from '../../../../axon/js/TEmitter.js';

// probability that a "white light" photon's wavelength will be one that causes a state transition. 1.0 = 100%
const TRANSITION_WAVELENGTHS_WEIGHT = 0.40;
assert && assert( TRANSITION_WAVELENGTHS_WEIGHT >= 0 && TRANSITION_WAVELENGTHS_WEIGHT <= 1 );

// Maximum number of photons in the zoomed-in box
const MAX_PHOTONS = 20;

type SelfOptions = EmptySelfOptions;

type LightOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Light {

  private readonly zoomedInBox: ZoomedInBox;

  // is the light on?
  public readonly onProperty: BooleanProperty;

  // whether the light is full spectrum (white) or monochromatic
  public readonly lightModeProperty: Property<LightMode>;

  // wavelength for monochromatic mode, in nm
  public readonly monochromaticWavelengthRange: Range;
  public readonly monochromaticWavelengthProperty: NumberProperty;

  // wavelength of the light, where 0 is white light
  public readonly wavelengthProperty: TReadOnlyProperty<number>;

  // color displayed by the view
  public readonly colorProperty: TReadOnlyProperty<Color | string>;

  // emits when a photon is created
  public readonly photonCreatedEmitter: TEmitter<[ Photon ]>;

  // time between creation of photons
  private readonly dtPerPhotonCreated: number;

  // elapsed time since a photon was created
  private readonly dtSincePhotonCreatedProperty: Property<number>;

  // wavelengths that cause a state transition
  private readonly transitionWavelengths: number[];

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: LightOptions ) {

    const options = optionize<LightOptions, SelfOptions>()( {
      //TODO
    }, providedOptions );

    this.zoomedInBox = zoomedInBox;

    this.onProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'onProperty' )
    } );

    this.lightModeProperty = new Property<LightMode>( 'white', {
      validValues: LightModeValues,
      tandem: options.tandem.createTandem( 'lightModeProperty' ),
      phetioValueType: StringIO
    } );

    // Range goes from UV to max visible wavelength
    this.monochromaticWavelengthRange = MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE;
    assert && assert( this.monochromaticWavelengthRange.min < VisibleColor.MIN_WAVELENGTH );

    this.monochromaticWavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      range: this.monochromaticWavelengthRange,
      tandem: options.tandem.createTandem( 'monochromaticWavelengthProperty' )
    } );

    this.wavelengthProperty = new DerivedProperty( [ this.lightModeProperty, this.monochromaticWavelengthProperty ],
      ( lightMode, monochromaticWavelength ) =>
        ( lightMode === 'white' ) ? VisibleColor.WHITE_WAVELENGTH : monochromaticWavelength, {
        tandem: options.tandem.createTandem( 'wavelengthProperty' ),
        phetioValueType: NumberIO
      } );

    this.colorProperty = new DerivedProperty(
      [ this.lightModeProperty, this.wavelengthProperty ],
      ( lightMode, wavelength ) => VisibleColor.wavelengthToColor( wavelength ), {
        tandem: options.tandem.createTandem( 'colorProperty' ),
        phetioValueType: Color.ColorIO
      } );

    this.photonCreatedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { valueType: Photon } ]
    } );

    this.dtPerPhotonCreated = ( zoomedInBox.height / MOTHAConstants.PHOTON_INITIAL_SPEED ) / MAX_PHOTONS;

    this.dtSincePhotonCreatedProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'dtSincePhotonCreatedProperty' ),
      phetioReadOnly: true
    } );

    // Get transition wavelengths for state 1, which are all UV.
    this.transitionWavelengths =
      BohrModel.getTransitionWavelengths( this.monochromaticWavelengthRange.min, VisibleColor.MIN_WAVELENGTH );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {
    this.onProperty.reset();
    this.lightModeProperty.reset();
    this.monochromaticWavelengthProperty.reset();
    this.dtSincePhotonCreatedProperty.reset();
  }

  /**
   * Steps the light, and creates a photon when it's time to do so.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.onProperty.value ) {
      this.dtSincePhotonCreatedProperty.value += dt;
      if ( this.dtSincePhotonCreatedProperty.value >= this.dtPerPhotonCreated ) {

        // Save the remainder.
        this.dtSincePhotonCreatedProperty.value = this.dtSincePhotonCreatedProperty.value % this.dtPerPhotonCreated;

        // Create a photon.
        this.createPhoton();
      }
    }
  }

  /**
   * Creates a photon when it's time to do so, at a random location along the bottom edge of the zoomed-in box.
   */
  private createPhoton(): void {
    this.photonCreatedEmitter.emit( new Photon( {
      wavelength: this.getNextPhotonWavelength(),
      position: this.getNextPhotonPosition(),
      direction: Math.PI / 2, // in the direction of +y
      tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
    } ) );
  }

  /**
   * Creates a photon at the bottom-center of the zoomed-in box. This is used when we want to ensure that a
   * photon hits the atom, which is centered in the zoomed-in box.
   */
  public createPhotonAtCenter( wavelength: number ): void {
    this.photonCreatedEmitter.emit( new Photon( {
      wavelength: wavelength,
      position: new Vector2( this.zoomedInBox.centerX, this.zoomedInBox.minY ),
      direction: Math.PI / 2, // in the direction of +y
      tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
    } ) );
  }

  /**
   * Gets the next random position for a photon, along the bottom edge of the zoomed-in box.
   */
  private getNextPhotonPosition(): Vector2 {
    const x = dotRandom.nextDoubleBetween( this.zoomedInBox.minX, this.zoomedInBox.maxX );
    const y = this.zoomedInBox.minY;
    return new Vector2( x, y );
  }

  /**
   * Gets a wavelength that would be appropriate for a new photon.
   *
   * For monochromatic light, we simply use the value of the gun's monochromatic wavelength.
   *
   * For white light, the wavelength is randomly chosen. Instead of simply picking a wavelength from the light's
   * entire range, we give a higher weight to those wavelengths that would cause a transition from state 1 to some
   * other state. We consider only the wavelengths relevant to state=1 because all other transitions are very
   * improbable in practice. This increases the probability that our photon will interact with the atom.
   */
  private getNextPhotonWavelength(): number {

    let wavelength = this.monochromaticWavelengthProperty.value;

    if ( this.lightModeProperty.value === 'white' ) {
      if ( dotRandom.nextDouble() < TRANSITION_WAVELENGTHS_WEIGHT ) {

        // choose a random transition wavelength
        const i = dotRandom.nextIntBetween( 0, this.transitionWavelengths.length - 1 );
        wavelength = this.transitionWavelengths[ i ];
      }
      else {

        // choose a random visible wavelength
        wavelength = dotRandom.nextDoubleBetween( this.monochromaticWavelengthRange.min, this.monochromaticWavelengthRange.max );
      }
    }
    return wavelength;
  }
}

modelsOfTheHydrogenAtom.register( 'Light', Light );