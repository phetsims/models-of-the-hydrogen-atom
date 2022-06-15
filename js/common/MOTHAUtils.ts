// Copyright 2016-2022, University of Colorado Boulder

/**
 * MOTHAUtils is a collection of static utility functions used in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../dot/js/dotRandom.js';
import Vector2 from '../../../dot/js/Vector2.js';
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
   * Converts from polar to Cartesian coordinates.
   */
  polarToCartesian( radius: number, angle: number ): Vector2 {
    assert && assert( isFinite( radius ) && radius >= 0 );
    const x = radius * Math.cos( angle );
    const y = radius * Math.sin( angle );
    return new Vector2( x, y );
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;