// Copyright 2016-2024, University of Colorado Boulder

/**
 * Photon is the model of a photon. A photon has a wavelength, position, direction, and moves with constant speed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = {
  wavelength: number; // the photon's integer wavelength, in nm
  wasEmitted?: boolean; // Was this photon emitted by the atom?
  hasCollided?: boolean; // Has this photon collided with the atom?
};

type PhotonOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'>;

// This should match PHOTON_STATE_SCHEMA, but with JavaScript types.
export type PhotonStateObject = {

  // Serialize x and y coordinates separately, to reduce the number of Vector2 allocations.
  x: number;
  y: number;
  speed: number;
  direction: number;
  wavelength: number;
  wasEmitted: boolean;
  hasCollided: boolean;
};

// This should match PhotonStateObject, but with IOTypes.
const PHOTON_STATE_SCHEMA = {
  x: NumberIO,
  y: NumberIO,
  speed: NumberIO,
  direction: NumberIO,
  wavelength: NumberIO,
  wasEmitted: BooleanIO,
  hasCollided: BooleanIO
};

export default class Photon extends Particle {

  public readonly wavelength: number;
  public readonly wasEmitted: boolean;
  private _hasCollided: boolean;

  public constructor( providedOptions: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions, ParticleOptions>()( {

      // SelfOptions
      wasEmitted: false,
      hasCollided: false,

      // ParticleOptions
      radius: MOTHAConstants.PHOTON_RADIUS,
      speed: MOTHAConstants.PHOTON_INITIAL_SPEED
    }, providedOptions );

    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53
    assert && assert( Number.isInteger( options.wavelength ), `wavelength must be an integer: ${options.wavelength}` );

    super( options );

    this.wavelength = options.wavelength;
    this.wasEmitted = options.wasEmitted;
    this._hasCollided = options.hasCollided;
  }

  public get hasCollided(): boolean {
    return this._hasCollided;
  }

  public set hasCollided( value: boolean ) {
    assert && assert( value, 'cannot un-collide a particle' );
    this._hasCollided = value;
  }

  /**
   * For debugging and logging only. Do not rely on the format of this string!
   */
  public override toString(): string {
    return super.toString() + ` wavelength=${this.wavelength}`;
  }

  /**
   * Serializes this Photon.
   */
  private toStateObject(): PhotonStateObject {
    return {
      x: this.positionProperty.value.x,
      y: this.positionProperty.value.y,
      speed: this.speedProperty.value,
      direction: this.directionProperty.value,
      wavelength: this.wavelength,
      wasEmitted: this.wasEmitted,
      hasCollided: this.hasCollided
    };
  }

  /**
   * Deserializes an instance of Photon.
   */
  private static fromStateObject( stateObject: PhotonStateObject ): Photon {
    return new Photon( {
      position: new Vector2( stateObject.x, stateObject.y ),
      speed: stateObject.speed,
      direction: stateObject.direction,
      wavelength: stateObject.wavelength,
      wasEmitted: stateObject.wasEmitted,
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
    fromStateObject: Photon.fromStateObject,
    documentation: 'PhET-iO Type for photons.<br>' +
                   '<br>' +
                   'Fields include:<br>' +
                   '<ul>' +
                   '<li>x: x coordinate of position' +
                   '<li>y: y coordinate of position' +
                   '<li>speed: speed, in distance per second' +
                   '<li>direction: direction of motion, in radians' +
                   '<li>wavelength: wavelength of the photon, in nm' +
                   '<li>wasEmitted: whether the photon was emitted by the hydrogen atom' +
                   '<li>hasCollided: whether the photon has collided with the hydrogen atom' +
                   '</ul>'
  } );
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );