// Copyright 2015-2025, University of Colorado Boulder

/**
 * LightSource is the model of a light source that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Emitter from '../../../../axon/js/Emitter.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Color from '../../../../scenery/js/util/Color.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import { LightMode, LightModeValues } from './LightMode.js';
import Photon from './Photon.js';
import PhotonAbsorptionModel from './PhotonAbsorptionModel.js';
import QuantumElectron from './QuantumElectron.js';
import ZoomedInBox from './ZoomedInBox.js';

// Maximum number of photons emitted by the light source that appear in the zoomed-in box at once.
const MAX_LIGHT_PHOTONS = 20;

// probability that a "white light" photon's wavelength will be one that causes a state transition. 1.0 = 100%
const TRANSITION_WAVELENGTHS_WEIGHT = 0.40;
assert && assert( TRANSITION_WAVELENGTHS_WEIGHT >= 0 && TRANSITION_WAVELENGTHS_WEIGHT <= 1,
  `invalid TRANSITION_WAVELENGTHS_WEIGHT: ${TRANSITION_WAVELENGTHS_WEIGHT}` );

export default class LightSource extends PhetioObject {

  // The light source points up in the model coordinate frame.
  public static readonly DIRECTION = Math.PI / 2;

  // The zoomed-in part of the box of hydrogen
  private readonly zoomedInBox: ZoomedInBox;

  // Is the light on?
  public readonly isOnProperty: BooleanProperty;

  // Whether the light source is full spectrum (white) or monochromatic.
  public readonly lightModeProperty: Property<LightMode>;

  // Wavelength for monochromatic mode, in nm.
  public readonly monochromaticWavelengthRange: Range;
  public readonly monochromaticWavelengthProperty: NumberProperty;

  // Wavelength of the light, where VisibleColor.WHITE_WAVELENGTH is white light.
  public readonly wavelengthProperty: TReadOnlyProperty<number>;

  // Color displayed by the view.
  public readonly colorProperty: TReadOnlyProperty<Color | string>;

  // Notifies that a photon was emitted. See Emitter instantiation for parameter names.
  public readonly photonEmittedEmitter: TEmitter<[ number, Vector2, number, Color | null ]>;

  // Time interval between photon emission, in seconds. We're using this instead of something like photonEmissionRate
  // because it's a better fit with dtSincePhotonEmittedProperty, and we will constantly be comparing to elapsed dt
  // in the step method.
  private readonly dtBetweenPhotonEmission: number;

  // Elapsed time since a photon was emitted by the light source, in seconds.
  private readonly dtSincePhotonEmittedProperty: Property<number>;

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

    this.lightModeProperty = new StringUnionProperty<LightMode>( 'white', {
      validValues: LightModeValues,
      tandem: tandem.createTandem( 'lightModeProperty' ),
      phetioDocumentation: 'Whether the light source is emitting white light or monochromatic light.',
      phetioFeatured: true
    } );

    // Range goes from UV to max visible wavelength
    this.monochromaticWavelengthRange = MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE;
    assert && assert( this.monochromaticWavelengthRange.min < VisibleColor.MIN_WAVELENGTH,
      `invalid monochromaticWavelengthRange.min: ${this.monochromaticWavelengthRange.min}` );

    this.monochromaticWavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      numberType: 'Integer', // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53
      units: 'nm',
      range: this.monochromaticWavelengthRange,
      tandem: tandem.createTandem( 'monochromaticWavelengthProperty' ),
      phetioDocumentation: 'Wavelength of the light when the light source is in monochromatic mode.',
      phetioFeatured: true
    } );

    this.wavelengthProperty = new DerivedProperty( [ this.lightModeProperty, this.monochromaticWavelengthProperty ],
      ( lightMode, monochromaticWavelength ) =>
        ( lightMode === 'white' ) ? VisibleColor.WHITE_WAVELENGTH : monochromaticWavelength, {
        units: 'nm'
      } );

    this.colorProperty = new DerivedProperty( [ this.wavelengthProperty ],
      wavelength => LightSource.wavelengthToColor( wavelength ), {
        phetioValueType: Color.ColorIO
      } );

    this.photonEmittedEmitter = new Emitter( {
      parameters: [
        // phetioType is not needed for parameters because this Emitter is not instrumented.
        { name: 'wavelength', valueType: 'number' },
        { name: 'position', valueType: Vector2 },
        { name: 'direction', valueType: 'number' },
        { name: 'debugHaloColor', valueType: [ Color, null ] }
      ]
    } );

    this.dtBetweenPhotonEmission = ( zoomedInBox.bounds.height / Photon.SPEED ) / MAX_LIGHT_PHOTONS;

    this.dtSincePhotonEmittedProperty = new NumberProperty( 0, {
      units: 's',
      tandem: tandem.createTandem( 'dtSincePhotonEmittedProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );

    this.groundStateAbsorptionWavelengths = PhotonAbsorptionModel.instance.getAbsorptionWavelengths( QuantumElectron.GROUND_STATE );
  }

  public reset(): void {
    this.isOnProperty.reset();
    this.lightModeProperty.reset();
    this.monochromaticWavelengthProperty.reset();
    this.dtSincePhotonEmittedProperty.reset();
  }

  /**
   * Steps the light source, and emits a photon when it's time to do so.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.isOnProperty.value ) {
      this.dtSincePhotonEmittedProperty.value += dt;
      if ( this.dtSincePhotonEmittedProperty.value >= this.dtBetweenPhotonEmission ) {

        // Save the remainder.
        this.dtSincePhotonEmittedProperty.value = this.dtSincePhotonEmittedProperty.value % this.dtBetweenPhotonEmission;

        // Create a photon.
        this.emitPhoton();
      }
    }
  }

  /**
   * Emits a photon at a random location along the bottom edge of the zoomed-in box.
   */
  private emitPhoton(): void {
    this.emitPhotonAtPosition( this.getNextPhotonWavelength(), this.getNextPhotonPosition(), null );
  }

  /**
   * Emits a photon at the bottom-center of the zoomed-in box. This is used when we want to ensure that a
   * photon hits the atom, which is centered in the zoomed-in box.
   */
  public emitPhotonAtBottomCenter( wavelength: number, debugHaloColor: Color ): void {
    this.emitPhotonAtPosition( wavelength, new Vector2( this.zoomedInBox.bounds.centerX, this.zoomedInBox.bounds.minY ), debugHaloColor );
  }

  /**
   * Emits a photon with the specified wavelength and position.
   */
  private emitPhotonAtPosition( wavelength: number, position: Vector2, debugHaloColor: Color | null ): void {
    this.photonEmittedEmitter.emit( wavelength, position, LightSource.DIRECTION, debugHaloColor );
  }

  /**
   * Gets a position for the next photon to be emitted by the light source.
   * The position is randomly chosen along the bottom edge of the zoomed-in box.
   */
  private getNextPhotonPosition(): Vector2 {
    const x = dotRandom.nextDoubleBetween( this.zoomedInBox.bounds.minX, this.zoomedInBox.bounds.maxX );
    const y = this.zoomedInBox.bounds.minY;
    return new Vector2( x, y );
  }

  /**
   * Gets a wavelength for the next photon to be emitted by the light source.
   *
   * For monochromatic light, we simply use the value of the light's monochromatic wavelength.
   *
   * For white light, the wavelength is randomly chosen. Instead of simply picking a wavelength from the light's
   * entire range, we give a higher weight to those wavelengths that would cause a transition from n=1 to some
   * other state. We consider only the wavelengths relevant to n=1 because all other transitions are very
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

    assert && assert( Number.isInteger( wavelength ), `wavelength must be an integer: ${wavelength}` );
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

modelsOfTheHydrogenAtom.register( 'LightSource', LightSource );