// Copyright 2016-2025, University of Colorado Boulder

/**
 * MOTHAUtils is a collection of utility functions used in this sim.
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
   * Gets a random angle from the range [0, 2 * PI), in radians.
   */
  nextAngle(): number {
    return dotRandom.nextDoubleBetween( 0, 2 * Math.PI );
  },

  /**
   * Normalizes an angle to the range [0, 2 * PI).
   */
  normalizeAngle( angle: number ): number {
    let normalizedAngle = angle % ( 2 * Math.PI );
    if ( normalizedAngle < 0 ) {
      normalizedAngle += ( 2 * Math.PI );
    }
    assert && assert( normalizedAngle >= 0 && normalizedAngle <= ( 2 * Math.PI ), `Invalid normalizedAngle: ${normalizedAngle}` );
    return normalizedAngle;
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;