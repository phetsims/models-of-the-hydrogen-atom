// Copyright 2016-2025, University of Colorado Boulder

/**
 * Photon is the model of a photon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';

// Deflection angles when the photon collides with a rigid body, like the Billiard Ball atom.
const MIN_DEFLECTION_ANGLE = Utils.toRadians( 30 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 60 );

// This should match PHOTON_STATE_SCHEMA, but with JavaScript types.
export type PhotonStateObject = {

  // Serialize x and y coordinates separately, to reduce the number of Vector2 allocations.
  wavelength: number;
  x: number;
  y: number;
  direction: number;
  wasEmittedByAtom: boolean;
  hasCollided: boolean;
};

// This should match PhotonStateObject, but with IOTypes.
const PHOTON_STATE_SCHEMA = {
  wavelength: NumberIO,
  x: NumberIO,
  y: NumberIO,
  direction: NumberIO,
  wasEmittedByAtom: BooleanIO,
  hasCollided: BooleanIO
};

type SelfOptions = {
  wavelength: number; // the photon's integer wavelength, in nm
  position: Vector2; // initial position
  direction?: number; // initial direction
  wasEmittedByAtom?: boolean; // Was this photon emitted by the atom?
  hasCollided?: boolean; // Has this photon collided with the atom?
  debugHaloColor?: Color | null; // Color of halo around the photon, to make it easier to see for debugging.
};

type PhotonOptions = SelfOptions;

export default class Photon {

  // Wavelength of the photon, in nm.
  public readonly wavelength: number; // nm

  // Position of the photon, publicly readonly, privately mutable.
  public readonly positionProperty: TReadOnlyProperty<Vector2>;
  private readonly _positionProperty: Property<Vector2>;

  // Direction that the photon is moving, in radians.
  private _direction: number;

  // Whether the photon was emitted by the hydrogen atom.
  public readonly wasEmittedByAtom: boolean;

  // Whether the photon has collided with the hydrogen atom.
  private _hasCollided: boolean;

  // Halo color around the photon, used for debugging to make it easier to see specific photons.
  // For example, running with ?debugEmission puts a red halo around all photons that are emitted by the atom.
  public readonly debugHaloColor: Color | null;

  public readonly radius = MOTHAConstants.PHOTON_RADIUS;

  public constructor( providedOptions: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions>()( {

      // SelfOptions
      direction: 0,
      wasEmittedByAtom: false,
      hasCollided: false,
      debugHaloColor: null
    }, providedOptions );

    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53
    assert && assert( Number.isInteger( options.wavelength ), `wavelength must be an integer: ${options.wavelength}` );

    this._positionProperty = new Vector2Property( options.position );
    this.positionProperty = this._positionProperty;

    this.wavelength = options.wavelength;
    this._direction = options.direction;
    this.wasEmittedByAtom = options.wasEmittedByAtom;
    this._hasCollided = options.hasCollided;
    this.debugHaloColor = options.debugHaloColor;
  }

  public dispose(): void {
    this.positionProperty.dispose();
  }

  public get direction(): number {
    return this._direction;
  }

  public get hasCollided(): boolean {
    return this._hasCollided;
  }

  /**
   * Moves the photon based on elapsed time and constant speed.
   * @param dt - elapsed time, in seconds
   */
  public move( dt: number ): void {
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
    const sign = ( this.positionProperty.value.x > atomPosition.x ) ? 1 : -1;
    const deflectionAngle = sign * dotRandom.nextDoubleBetween( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
    this._direction += ( Math.PI + deflectionAngle );
    this._hasCollided = true;
  }

  /**
   * Serializes this Photon.
   */
  private toStateObject(): PhotonStateObject {
    return {
      wavelength: this.wavelength,
      x: this.positionProperty.value.x,
      y: this.positionProperty.value.y,
      direction: this.direction,
      wasEmittedByAtom: this.wasEmittedByAtom,
      hasCollided: this.hasCollided
    };
  }

  /**
   * Deserializes an instance of Photon.
   */
  private static fromStateObject( stateObject: PhotonStateObject ): Photon {
    return new Photon( {
      wavelength: stateObject.wavelength,
      position: new Vector2( stateObject.x, stateObject.y ),
      direction: stateObject.direction,
      wasEmittedByAtom: stateObject.wasEmittedByAtom,
      hasCollided: stateObject.hasCollided
    } );
  }

  /**
   * PhotonIO handles serialization of a Photon. It implements 'Data Type Serialization' as described in
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.
   */
  public static readonly PhotonIO = new IOType<Photon, PhotonStateObject>( 'PhotonIO', {
    valueType: Photon,
    stateSchema: PHOTON_STATE_SCHEMA,
    toStateObject: photon => photon.toStateObject(),
    fromStateObject: x => Photon.fromStateObject( x ),
    documentation: 'PhET-iO Type for photons.<br>' +
                   '<br>' +
                   'Fields include:<br>' +
                   '<ul>' +
                   '<li>wavelength: wavelength of the photon, in nm' +
                   '<li>x: x coordinate of position' +
                   '<li>y: y coordinate of position' +
                   '<li>direction: direction of motion, in radians' +
                   '<li>wasEmittedByAtom: whether the photon was emitted by the hydrogen atom' +
                   '<li>hasCollided: whether the photon has collided with the hydrogen atom' +
                   '</ul>'
  } );
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );