// Copyright 2016-2020, University of Colorado Boulder

/**
 * RandomUtils is a collection of static utility functions related to random number generation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const RandomUtils = {

  /**
   * Gets a random value >= min and < max.
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   * @public
   */
  nextDouble( min, max ) {
    assert( max > min );
    return min + ( phet.joist.random.nextDouble() * ( max - min ) );
  },

  /**
   * Gets a random boolean.
   * @returns {boolean}
   * @public
   */
  nextBoolean() {
    return phet.joist.random.nextBoolean();
  },

  /**
   * Gets a random sign.
   * @returns {number} +1 or -1
   * @public
   */
  nextSign() {
    return ( phet.joist.random.nextBoolean() ? +1 : -1 );
  },

  /**
   * Gets a random angle >= 0 and < 2 * PI.
   * @returns {number} angle, in radians
   * @public
   */
  nextAngle() {
    return phet.joist.random.nextDouble( 0, 2 * Math.PI );
  }
};

modelsOfTheHydrogenAtom.register( 'RandomUtils', RandomUtils );
export default RandomUtils;