// Copyright 2016-2022, University of Colorado Boulder

/**
 * Particle is the base class for particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {

  radius: number;

  // position in model coordinate frame
  position?: Vector2;

  // distance per second
  speed?: number;

  // direction of motion, in radians
  direction?: number;
};

export type ParticleOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Particle extends PhetioObject {

  public readonly radius: number;

  // See SelfOptions for documentation.
  public readonly positionProperty: Property<Vector2>;
  public readonly speedProperty: Property<number>;
  public readonly directionProperty: Property<number>;

  public constructor( providedOptions: ParticleOptions ) {

    const options = optionize<ParticleOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: Vector2.ZERO,
      speed: 0,
      direction: 0,

      // PhetioObjectOptions
      phetioState: false //TODO
    }, providedOptions );

    super( options );

    this.radius = options.radius;

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' ),
      phetioReadOnly: true
    } );

    this.speedProperty = new NumberProperty( options.speed, {
      tandem: options.tandem.createTandem( 'speedProperty' ),
      phetioReadOnly: true
    } );

    this.directionProperty = new NumberProperty( options.direction, {
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.speedProperty.reset();
    this.directionProperty.reset();
  }

  public override dispose(): void {
    this.positionProperty.dispose();
    this.speedProperty.dispose();
    this.directionProperty.dispose();
    super.dispose();
  }

  public move( dt: number ): void {
    const speed = this.speedProperty.value;
    const distance = speed * dt;
    const dx = Math.cos( this.directionProperty.value ) * distance;
    const dy = Math.sin( this.directionProperty.value ) * distance;
    const x = this.positionProperty.value.x + dx;
    const y = this.positionProperty.value.y + dy;
    this.positionProperty.value = new Vector2( x, y );
  }

  /**
   * For debugging and logging only. Do not rely on the format of this string!
   */
  public override toString(): string {
    return `radius=${this.radius} ` +
           ` position=${this.positionProperty.value}` +
           ` speed=${this.speedProperty.value}` +
           ` direction=${this.directionProperty.value}`;
  }
}

modelsOfTheHydrogenAtom.register( 'Particle', Particle );