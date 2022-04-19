// Copyright 2016-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * Particle is the base class for particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class Particle {

  /**
   * @param {Vector2} position - position in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   */
  constructor( position, speed, direction ) {

    // @public
    this.positionProperty = new Property( position );
    this.speedProperty = new NumberProperty( speed );
    this.directionProperty = new NumberProperty( direction );
  }

  // @public
  reset() {
    this.positionProperty.reset();
    this.speedProperty.reset();
    this.directionProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Particle', Particle );
export default Particle;