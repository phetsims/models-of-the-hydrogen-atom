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
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class Particle {

  public readonly positionProperty: Property<Vector2>;
  public readonly speedProperty: Property<number>;
  public readonly directionProperty: Property<number>;

  /**
   * @param position - position in model coordinate frame
   * @param speed - distance per dt
   * @param direction - direction of motion, in radians
   */
  constructor( position: Vector2, speed: number, direction: number ) {
    this.positionProperty = new Vector2Property( position );
    this.speedProperty = new NumberProperty( speed );
    this.directionProperty = new NumberProperty( direction );
  }

  // Convenience getters
  get position() { return this.positionProperty.value; }

  get speed() { return this.speedProperty.value; }

  get direction() { return this.directionProperty.value; }

  public reset(): void {
    this.positionProperty.reset();
    this.speedProperty.reset();
    this.directionProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Particle', Particle );