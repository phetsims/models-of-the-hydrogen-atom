// Copyright 2016-2025, University of Colorado Boulder

/**
 * Photon is the model of a photon. Instances are dynamic PhET-iO Elements, created via PhotonGroup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

// Deflection angles when the photon collides with a rigid body, like the Billiard Ball atom.
const MIN_DEFLECTION_ANGLE = Utils.toRadians( 30 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 60 );

// This should match PHOTON_STATE_SCHEMA, but with JavaScript types.
// Other Photon fields are instrumented Properties, and handle their own serialization.
export type PhotonStateObject = {
  wavelength: number;
  wasEmittedByAtom: boolean;
};

// This should match PhotonStateObject, but with IOTypes.
const PHOTON_STATE_SCHEMA = {
  wavelength: NumberIO,
  wasEmittedByAtom: BooleanIO
};

type SelfOptions = {
  wavelength: number; // the photon's integer wavelength, in nm
  position?: Vector2; // initial position
  direction?: number; // initial direction
  wasEmittedByAtom?: boolean; // Was this photon emitted by the atom?
  hasCollidedWithAtom?: boolean; // Has this photon collided with the atom?

  // Color of the halo around the photon, to make it easier to see for debugging.
  // Halos are visible when running with ?showHalos.
  debugHaloColor?: Color | null;
};

export type PhotonOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Photon extends PhetioObject {

  // Radius, in unitless model coordinates.
  public static readonly RADIUS = 15;

  // Photon speed is constant, in distance per second.
  public static readonly SPEED = 300;

  // Wavelength of the photon, in nm.
  public readonly wavelength: number;

  // Whether the photon was emitted by the hydrogen atom.
  public readonly wasEmittedByAtom: boolean;

  // Halo color around the photon, used for debugging to make it easier to see specific photons.
  // Halos are visible when running with ?showHalos.
  public readonly debugHaloColor: Color | null;

  // Position of the photon, publicly readonly, privately mutable.
  public readonly positionProperty: TReadOnlyProperty<Vector2>;
  private readonly _positionProperty: Property<Vector2>;

  // Direction that the photon is moving, in radians.
  private readonly directionProperty: Property<number>;

  // Whether the photon has collided with the hydrogen atom.
  private readonly hasCollidedWithAtomProperty: Property<boolean>;

  public constructor( providedOptions: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: new Vector2( 0, 0 ),
      direction: 0,
      wasEmittedByAtom: false,
      hasCollidedWithAtom: false,
      debugHaloColor: null,

      // PhetioObjectOptions
      phetioDynamicElement: true,
      phetioType: Photon.PhotonIO
    }, providedOptions );

    super( options );

    this.wavelength = options.wavelength;
    this.wasEmittedByAtom = options.wasEmittedByAtom;
    this.debugHaloColor = options.debugHaloColor;

    this._positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
    this.positionProperty = this._positionProperty;

    this.directionProperty = new NumberProperty( options.direction, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );

    this.hasCollidedWithAtomProperty = new BooleanProperty( options.hasCollidedWithAtom, {
      tandem: options.tandem.createTandem( 'hasCollidedWithAtomProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
  }

  /**
   * Gets the photon's direction, in radians.
   */
  public get direction(): number {
    return this.directionProperty.value;
  }

  public get hasCollidedWithAtom(): boolean {
    return this.hasCollidedWithAtomProperty.value;
  }

  public override dispose(): void {

    // Instrumented Properties must be disposed, to remove them from the tandem registry.
    this._positionProperty.dispose();
    this.directionProperty.dispose();
    this.hasCollidedWithAtomProperty.dispose();

    super.dispose();
  }

  /**
   * Moves the photon based on elapsed time and constant speed.
   * @param dt - elapsed time, in seconds
   */
  public move( dt: number ): void {
    const distance = dt * Photon.SPEED;
    const dx = Math.cos( this.direction ) * distance;
    const dy = Math.sin( this.direction ) * distance;
    const x = this.positionProperty.value.x + dx;
    const y = this.positionProperty.value.y + dy;
    this._positionProperty.value = new Vector2( x, y );
  }

  /**
   * If the photon collides with the atom and is not absorbed, make the photon bounce back at a 'steep but random' angle.
   */
  public bounceBack( atomPosition: Vector2 ): void {
    const sign = ( this.positionProperty.value.x > atomPosition.x ) ? 1 : -1;
    const deflectionAngle = sign * dotRandom.nextDoubleBetween( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
    this.directionProperty.value += ( Math.PI + deflectionAngle );
    this.hasCollidedWithAtomProperty.value = true;
  }

  /**
   * PhotonIO implements 'Dynamic element serialization', as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   * Dynamic element serialization is appropriate because Photon instances are created dynamically.
   */
  public static readonly PhotonIO = new IOType<Photon, PhotonStateObject>( 'PhotonIO', {
    valueType: Photon,
    stateSchema: PHOTON_STATE_SCHEMA,
    stateObjectToCreateElementArguments: stateObject => [ {
      wavelength: stateObject.wavelength,
      wasEmittedByAtom: stateObject.wasEmittedByAtom
    } ]
  } );
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );