// Copyright 2016-2022, University of Colorado Boulder

/**
 * MOTHAUtils is a collection of static utility functions used in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../dot/js/dotRandom.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const MOTHAUtils = {

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

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;