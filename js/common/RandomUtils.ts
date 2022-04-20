// Copyright 2016-2022, University of Colorado Boulder

/**
 * RandomUtils is a collection of static utility functions related to random number generation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../dot/js/dotRandom.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const RandomUtils = {

  /**
   * Gets a random value >= min and < max.
   */
  nextDouble( min: number, max: number ): number {
    assert && assert( max > min );
    return min + ( dotRandom.nextDouble() * ( max - min ) );
  },

  /**
   * Gets a random boolean.
   */
  nextBoolean(): boolean {
    return dotRandom.nextBoolean();
  },

  /**
   * Gets a random sign.
   */
  nextSign(): 1 | -1 {
    return ( dotRandom.nextBoolean() ? +1 : -1 );
  },

  /**
   * Gets a random angle >= 0 and < 2 * PI, in radians.
   */
  nextAngle(): number {
    return dotRandom.nextDouble() * ( 2 * Math.PI );
  }
};

modelsOfTheHydrogenAtom.register( 'RandomUtils', RandomUtils );
export default RandomUtils;