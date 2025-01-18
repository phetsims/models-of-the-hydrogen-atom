// Copyright 2016-2025, University of Colorado Boulder

/**
 * Photon is the model of a photon.
 *
 * A static set of Photon instances is allocated at startup, and reused/mutated as the sim runs. This avoids the
 * complexities of PhetioGroup and dynamic elements. See also PhotonSystem.ts and
 * https://github.com/phetsims/models-of-the-hydrogen-atom/issues/47
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

// Deflection angles when the photon collides with a rigid body, like the Billiard Ball atom.
const MIN_DEFLECTION_ANGLE = Utils.toRadians( 30 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 60 );

type SelfOptions = {
  wavelength?: number; // the photon's integer wavelength, in nm
  position?: Vector2; // initial position
  direction?: number; // initial direction
  wasEmittedByAtom?: boolean; // Was this photon emitted by the atom?
  hasCollidedWithAtom?: boolean; // Has this photon collided with the atom?
  debugHaloColor?: Color | null; // Color of halo around the photon, to make it easier to see for debugging.
};

export type PhotonOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Photon extends PhetioObject {

  // Wavelength of the photon, in nm.
  private readonly wavelengthProperty: Property<number>;

  // Position of the photon, publicly readonly, privately mutable.
  public readonly positionProperty: TReadOnlyProperty<Vector2>;
  private readonly _positionProperty: Property<Vector2>;

  // Direction that the photon is moving, in radians.
  private readonly directionProperty: Property<number>;

  // Whether the photon was emitted by the hydrogen atom.
  public readonly wasEmittedByAtomProperty: Property<boolean>;

  // Whether the photon has collided with the hydrogen atom.
  private readonly hasCollidedWithAtomProperty: Property<boolean>;

  // Whether the photon is active. A true value means that the Photon is currently participating in the model,
  // is visible in the zoomed-in box, and will therefore have an associated PhotonNode in the view. A false value
  // means that the Photon is not participating in the model, and is effectively in the free pool, ready to be
  // mutated and reused.
  public readonly isActiveProperty: Property<boolean>;

  // Halo color around the photon, used for debugging to make it easier to see specific photons.
  // For example, running with ?debugEmission puts a red halo around all photons that are emitted by the atom.
  private _debugHaloColor: Color | null;

  public readonly radius = MOTHAConstants.PHOTON_RADIUS;

  public constructor( providedOptions: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      wavelength: MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.min,
      position: new Vector2( 0, 0 ),
      direction: 0,
      wasEmittedByAtom: false,
      hasCollidedWithAtom: false,
      debugHaloColor: null,

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: Photon.PhotonIO
    }, providedOptions );

    super( options );

    this.wavelengthProperty = new NumberProperty( options.wavelength, {
      numberType: 'Integer', // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53
      tandem: options.tandem.createTandem( 'wavelengthProperty' ),
      phetioReadOnly: true
    } );

    this._positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true
    } );
    this.positionProperty = this._positionProperty;

    this.directionProperty = new NumberProperty( options.direction, {
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true
    } );

    this.wasEmittedByAtomProperty = new BooleanProperty( options.wasEmittedByAtom, {
      tandem: options.tandem.createTandem( 'wasEmittedByAtomProperty' ),
      phetioReadOnly: true
    } );

    this.hasCollidedWithAtomProperty = new BooleanProperty( options.hasCollidedWithAtom, {
      tandem: options.tandem.createTandem( 'hasCollidedWithAtomProperty' ),
      phetioReadOnly: true
    } );

    this.isActiveProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isActiveProperty' ),
      phetioReadOnly: true
    } );

    this._debugHaloColor = options.debugHaloColor;
  }

  /**
   * Activates a Photon with new property values.
   */
  public activate( photonOptions: StrictOmit<PhotonOptions, 'tandem'> ): void {
   assert && assert( !this.isActiveProperty.value, 'Attempted to activate a photon that is already active.' );

    if ( photonOptions.wavelength !== undefined ) {
      this.wavelengthProperty.value = photonOptions.wavelength;
    }

    if ( photonOptions.position !== undefined ) {
      this._positionProperty.value = photonOptions.position;
    }

    if ( photonOptions.direction !== undefined ) {
      this.directionProperty.value = photonOptions.direction;
    }

    if ( photonOptions.wasEmittedByAtom !== undefined ) {
      this.wasEmittedByAtomProperty.value = photonOptions.wasEmittedByAtom;
    }

    if ( photonOptions.hasCollidedWithAtom !== undefined ) {
      this.hasCollidedWithAtomProperty.value = photonOptions.hasCollidedWithAtom;
    }

    if ( photonOptions.debugHaloColor !== undefined ) {
      this._debugHaloColor = photonOptions.debugHaloColor;
    }

    this.isActiveProperty.value = true;
  }

  public get wavelength(): number {
    return this.wavelengthProperty.value;
  }

  public get direction(): number {
    return this.directionProperty.value;
  }

  public get wasEmittedByAtom(): boolean {
    return this.wasEmittedByAtomProperty.value;
  }

  public get hasCollidedWithAtom(): boolean {
    return this.hasCollidedWithAtomProperty.value;
  }

  public get debugHaloColor(): Color | null {
    return this._debugHaloColor;
  }

  /**
   * Moves the photon based on elapsed time and constant speed.
   * @param dt - elapsed time, in seconds
   */
  public move( dt: number ): void {
    assert && assert( this.isActiveProperty.value, 'Attempted to move an inactive Photon.' );
    const distance = dt * MOTHAConstants.PHOTON_SPEED;
    const dx = Math.cos( this.direction ) * distance;
    const dy = Math.sin( this.direction ) * distance;
    const x = this.positionProperty.value.x + dx;
    const y = this.positionProperty.value.y + dy;
    this._positionProperty.value = new Vector2( x, y );
  }

  /**
   * If the photon collides with a rigid body (like the Billiard Ball atom), make the photon bounce back at a
   * 'steep but random' angle.
   */
  public bounceBack( atomPosition: Vector2 ): void {
    assert && assert( this.isActiveProperty.value, 'Attempted to bounceBack an inactive Photon.' );
    const sign = ( this.positionProperty.value.x > atomPosition.x ) ? 1 : -1;
    const deflectionAngle = sign * dotRandom.nextDoubleBetween( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
    this.directionProperty.value += ( Math.PI + deflectionAngle );
    this.hasCollidedWithAtomProperty.value = true;
  }

  /**
   * PhotonIO handles PhET-iO serialization of Photon. Since all Photon instances are created at startup, exist for
   * the lifetime of the sim, and are phetioState: false, it implements 'Reference type serialization', as described
   * in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly PhotonIO = new IOType<Photon, ReferenceIOState>( 'PhotonIO', {
    valueType: Photon,
    supertype: ReferenceIO( IOType.ObjectIO )
  } );
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );