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
   * Gets a random sign.
   */
  nextSign(): 1 | -1 {
    return ( dotRandom.nextBoolean() ? 1 : -1 );
  },

  /**
   * Gets a random angle >= 0 and < 2 * PI, in radians.
   */
  nextAngle(): number {
    return dotRandom.nextDoubleBetween( 0, 2 * Math.PI );
  },

  /**
   * Determines if the sign of two numbers is different.
   */
  signIsDifferent( n1: number, n2: number ): boolean {
    return Math.sign( n1 ) !== Math.sign( n2 );
  }
};

modelsOfTheHydrogenAtom.register( 'RandomUtils', RandomUtils );
export default RandomUtils;