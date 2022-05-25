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
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {

  radius: number;

  // position in model coordinate frame
  position?: Vector2;

  // distance per dt
  speed?: number;

  // direction of motion, in radians
  direction?: number;
};

export type ParticleOptions = SelfOptions & PickOptional<PhetioObjectOptions, 'tandem'>; //TODO PickRequired tandem

export default class Particle extends PhetioObject {

  public readonly radius: number;

  // See SelfOptions for documentation.
  public readonly positionProperty: Property<Vector2>;
  public readonly speedProperty: Property<number>;
  public readonly directionProperty: Property<number>;

  constructor( providedOptions: ParticleOptions ) {

    const options = optionize<ParticleOptions, SelfOptions, PhetioObjectOptions>()( {
      position: Vector2.ZERO,
      speed: 0,
      direction: 0,
      tandem: Tandem.OPT_OUT //TODO
    }, providedOptions );

    super( options );

    this.radius = options.radius;

    this.positionProperty = new Vector2Property( options.position, {
      tandem: options.tandem.createTandem( 'positionProperty' )
    } );

    this.speedProperty = new NumberProperty( options.speed, {
      tandem: options.tandem.createTandem( 'speedProperty' )
    } );

    this.directionProperty = new NumberProperty( options.direction, {
      tandem: options.tandem.createTandem( 'directionProperty' )
    } );
  }

  public reset(): void {
    this.positionProperty.reset();
    this.speedProperty.reset();
    this.directionProperty.reset();
  }

  public override dispose(): void {
    super.dispose();
    this.positionProperty.dispose();
    this.speedProperty.dispose();
    this.directionProperty.dispose();
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
}

modelsOfTheHydrogenAtom.register( 'Particle', Particle );