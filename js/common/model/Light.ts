// Copyright 2015-2025, University of Colorado Boulder

/**
 * Light is the model of a light that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Color } from '../../../../scenery/js/imports.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import { LightMode, LightModeValues } from './LightMode.js';
import Photon from './Photon.js';
import ZoomedInBox from './ZoomedInBox.js';
import photonAbsorptionModel from './PhotonAbsorptionModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// probability that a "white light" photon's wavelength will be one that causes a state transition. 1.0 = 100%
const TRANSITION_WAVELENGTHS_WEIGHT = 0.40;
assert && assert( TRANSITION_WAVELENGTHS_WEIGHT >= 0 && TRANSITION_WAVELENGTHS_WEIGHT <= 1 );

// Maximum number of photons in the zoomed-in box
const MAX_PHOTONS = 20;

export default class Light extends PhetioObject {

  // The light source points up in the model coordinate frame.
  public static readonly DIRECTION = Math.PI / 2;

  private readonly zoomedInBox: ZoomedInBox;

  // is the light on?
  public readonly isOnProperty: BooleanProperty;

  // whether the light is full spectrum (white) or monochromatic
  public readonly lightModeProperty: Property<LightMode>;

  // wavelength for monochromatic mode, in nm
  public readonly monochromaticWavelengthRange: Range;
  public readonly monochromaticWavelengthProperty: NumberProperty;

  // wavelength of the light, where 0 is white light
  public readonly wavelengthProperty: TReadOnlyProperty<number>;

  // color displayed by the view
  public readonly colorProperty: TReadOnlyProperty<Color | string>;

  // notifies that a photon was emitted
  public readonly photonEmittedEmitter: TEmitter<[ Photon ]>;

  // time between creation of photons
  private readonly dtPerPhotonCreated: number;

  // elapsed time since a photon was created
  private readonly dtSincePhotonCreatedProperty: Property<number>;

  // Wavelengths (in nm) that can be absorbed when the electron is in the ground state (n = 1).
  private readonly groundStateAbsorptionWavelengths: number[];

  public constructor( zoomedInBox: ZoomedInBox, tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,
      phetioFeatured: true,
      phetioState: false
    } );

    this.zoomedInBox = zoomedInBox;

    this.isOnProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'isOnProperty' ),
      phetioFeatured: true
    } );

    this.lightModeProperty = new Property<LightMode>( 'white', {
      validValues: LightModeValues,
      tandem: tandem.createTandem( 'lightModeProperty' ),
      phetioFeatured: true,
      phetioValueType: StringIO
    } );

    // Range goes from UV to max visible wavelength
    this.monochromaticWavelengthRange = MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE;
    assert && assert( this.monochromaticWavelengthRange.min < VisibleColor.MIN_WAVELENGTH );

    this.monochromaticWavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      numberType: 'Integer', // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53
      range: this.monochromaticWavelengthRange,
      tandem: tandem.createTandem( 'monochromaticWavelengthProperty' ),
      phetioDocumentation: 'Wavelength used for the light when it is in monochromatic mode.',
      phetioFeatured: true
    } );

    this.wavelengthProperty = new DerivedProperty( [ this.lightModeProperty, this.monochromaticWavelengthProperty ],
      ( lightMode, monochromaticWavelength ) =>
        ( lightMode === 'white' ) ? VisibleColor.WHITE_WAVELENGTH : monochromaticWavelength, {
        phetioValueType: NumberIO
      } );

    this.colorProperty = new DerivedProperty( [ this.wavelengthProperty ],
      wavelength => Light.wavelengthToColor( wavelength ), {
        phetioValueType: Color.ColorIO
      } );

    this.photonEmittedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { valueType: Photon } ]
    } );

    this.dtPerPhotonCreated = ( zoomedInBox.height / MOTHAConstants.PHOTON_SPEED ) / MAX_PHOTONS;

    this.dtSincePhotonCreatedProperty = new NumberProperty( 0, {
      units: 's',
      tandem: tandem.createTandem( 'dtSincePhotonCreatedProperty' ),
      phetioDocumentation: 'Elapsed time since a photon was emitted by the light source.',
      phetioReadOnly: true
    } );

    this.groundStateAbsorptionWavelengths = photonAbsorptionModel.getAbsorptionWavelengths( MOTHAConstants.GROUND_STATE );
  }

  public reset(): void {
    this.isOnProperty.reset();
    this.lightModeProperty.reset();
    this.monochromaticWavelengthProperty.reset();
    this.dtSincePhotonCreatedProperty.reset();
  }

  /**
   * Steps the light, and creates a photon when it's time to do so.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isOnProperty.value ) {
      this.dtSincePhotonCreatedProperty.value += dt;
      if ( this.dtSincePhotonCreatedProperty.value >= this.dtPerPhotonCreated ) {

        // Save the remainder.
        this.dtSincePhotonCreatedProperty.value = this.dtSincePhotonCreatedProperty.value % this.dtPerPhotonCreated;

        // Create a photon.
        this.emitPhoton();
      }
    }
  }

  /**
   * Emits a photon at a random location along the bottom edge of the zoomed-in box.
   */
  private emitPhoton(): void {
    this.emitPhotonAtPosition( this.getNextPhotonWavelength(), this.getNextPhotonPosition() );
  }

  //TODO Delete if not used.
  /**
   * Emits a photon at the bottom-center of the zoomed-in box. This is used when we want to ensure that a
   * photon hits the atom, which is centered in the zoomed-in box.
   */
  public emitPhotonAtBottomCenter( wavelength: number ): void {
    this.emitPhotonAtPosition( wavelength, new Vector2( this.zoomedInBox.centerX, this.zoomedInBox.minY ) );
  }

  /**
   * Emits a photon with the specified wavelength and position.
   */
  private emitPhotonAtPosition( wavelength: number, position: Vector2 ): void {
    this.photonEmittedEmitter.emit( new Photon( {
      wavelength: wavelength,
      position: position,
      direction: Light.DIRECTION
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
   * For monochromatic light, we simply use the value of the light's monochromatic wavelength.
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
        const i = dotRandom.nextIntBetween( 0, this.groundStateAbsorptionWavelengths.length - 1 );
        wavelength = this.groundStateAbsorptionWavelengths[ i ];
      }
      else {

        // choose a random visible wavelength
        wavelength = dotRandom.nextIntBetween( this.monochromaticWavelengthRange.min, this.monochromaticWavelengthRange.max );
      }
    }

    assert && assert( Number.isInteger( wavelength ) );
    return wavelength;
  }

  /**
   * Converts a wavelength (in nm) to a Color.
   */
  public static wavelengthToColor( wavelength: number ): Color {
    return VisibleColor.wavelengthToColor( wavelength, {
      irColor: MOTHAColors.IR_COLOR,
      uvColor: MOTHAColors.UV_COLOR
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'Light', Light );