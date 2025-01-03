// Copyright 2016-2024, University of Colorado Boulder

/**
 * Photon is the model of a photon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import { TColor } from '../../../../scenery/js/imports.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';

// This should match PHOTON_STATE_SCHEMA, but with JavaScript types.
export type PhotonStateObject = {

  // Serialize x and y coordinates separately, to reduce the number of Vector2 allocations.
  x: number;
  y: number;
  direction: number;
  wavelength: number;
  wasEmitted: boolean;
  hasCollided: boolean;
};

// This should match PhotonStateObject, but with IOTypes.
const PHOTON_STATE_SCHEMA = {
  wavelength: NumberIO,
  x: NumberIO,
  y: NumberIO,
  direction: NumberIO,
  wasEmitted: BooleanIO,
  hasCollided: BooleanIO
};

type SelfOptions = {
  wavelength: number; // the photon's integer wavelength, in nm
  position: Vector2; // initial position
  direction: number; // initial direction
  wasEmitted?: boolean; // Was this photon emitted by the atom?
  hasCollided?: boolean; // Has this photon collided with the atom?
  debugHaloColor?: TColor; // Color of halo around the photon, to make it easier to see for debugging.
};

type PhotonOptions = SelfOptions & PickOptional<PhetioObjectOptions, 'tandem'>;

export default class Photon extends PhetioObject {

  public readonly wavelength: number; // nm
  public readonly positionProperty: Property<Vector2>;
  public readonly directionProperty: Property<number>; // radians
  public readonly radius = MOTHAConstants.PHOTON_RADIUS;

  // Whether the photon was emitted by the hydrogen atom.
  public readonly wasEmitted: boolean;

  // Whether the photon has collided with the hydrogen atom.
  private _hasCollided: boolean;

  // Halo color around the photon, used for debugging to make it easier to see specific photons.
  public readonly debugHaloColor: TColor;

  public constructor( providedOptions: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      wasEmitted: false,
      hasCollided: false,
      debugHaloColor: null,

      // PhetioObjectOptions
      phetioState: false,
      tandem: Tandem.OPT_OUT
    }, providedOptions );

    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53
    assert && assert( Number.isInteger( options.wavelength ), `wavelength must be an integer: ${options.wavelength}` );

    super( options );

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true
    } );

    this.directionProperty = new NumberProperty( options.direction, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Direction of motion, in radians.'
    } );

    this.wavelength = options.wavelength;
    this.wasEmitted = options.wasEmitted;
    this._hasCollided = options.hasCollided;
    this.debugHaloColor = options.debugHaloColor;
  }

  public reset(): void {
    this.positionProperty.reset();
    this.directionProperty.reset();
  }

  public override dispose(): void {
    this.positionProperty.dispose();
    this.directionProperty.dispose();
    super.dispose();
  }

  public get hasCollided(): boolean {
    return this._hasCollided;
  }

  public set hasCollided( value: boolean ) {
    assert && assert( value, 'cannot un-collide a particle' );
    this._hasCollided = value;
  }

  /**
   * Moves the photon based on elapsed time and constant speed.
   * @param dt - elapsed time, in seconds
   */
  public move( dt: number ): void {
    const distance = dt * MOTHAConstants.PHOTON_SPEED;
    const dx = Math.cos( this.directionProperty.value ) * distance;
    const dy = Math.sin( this.directionProperty.value ) * distance;
    const x = this.positionProperty.value.x + dx;
    const y = this.positionProperty.value.y + dy;
    this.positionProperty.value = new Vector2( x, y );
  }

  /**
   * Serializes this Photon.
   */
  private toStateObject(): PhotonStateObject {
    return {
      wavelength: this.wavelength,
      x: this.positionProperty.value.x,
      y: this.positionProperty.value.y,
      direction: this.directionProperty.value,
      wasEmitted: this.wasEmitted,
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
    fromStateObject: x => Photon.fromStateObject( x ),
    documentation: 'PhET-iO Type for photons.<br>' +
                   '<br>' +
                   'Fields include:<br>' +
                   '<ul>' +
                   '<li>wavelength: wavelength of the photon, in nm' +
                   '<li>x: x coordinate of position' +
                   '<li>y: y coordinate of position' +
                   '<li>direction: direction of motion, in radians' +
                   '<li>wasEmitted: whether the photon was emitted by the hydrogen atom' +
                   '<li>hasCollided: whether the photon has collided with the hydrogen atom' +
                   '</ul>'
  } );
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );