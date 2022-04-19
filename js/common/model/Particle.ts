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
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {

  // position in model coordinate frame
  position?: Vector2;

  // distance per dt
  speed?: number;

  // direction of motion, in radians
  direction?: number;
};

export type ParticleOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Particle {

  public readonly positionProperty: Property<Vector2>;
  public readonly speedProperty: Property<number>;
  public readonly directionProperty: Property<number>;

  constructor( providedOptions: ParticleOptions ) {

    const options = optionize<ParticleOptions, SelfOptions>( {
      position: Vector2.ZERO,
      speed: 0,
      direction: 0
    }, providedOptions );

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