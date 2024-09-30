// Copyright 2016-2024, University of Colorado Boulder

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
   * Gets a random angle (in radian) that is inside a slice of a circular pie chart. The slice shape is defined by a
   * startAngle and arcLength, both in radians.
   */
  nextAngleInPieSlice( startAngle: number, arcLength: number ): number {
    assert && assert( arcLength >= 0, `invalid arcLength: ${arcLength}` );
    return startAngle + dotRandom.nextDoubleBetween( 0, arcLength );
  },

  /**
   * Converts from polar to Cartesian coordinates.
   */
  polarToCartesian( radius: number, angle: number ): Vector2 {
    assert && assert( isFinite( radius ) && radius >= 0 );
    const x = radius * Math.cos( angle );
    const y = radius * Math.sin( angle );
    return new Vector2( x, y );
  },

  /**
   * Computes the factorial of a non-negative integer n without using recursion.
   * n! = 1 * 2 * ... * ( n - 1 ) * n
   */
  factorial( n: number ): number {
    assert && assert( Number.isInteger( n ) && n >= 0, `n must be a non-negative integer: ${n}` );
    let f = 1;
    for ( let i = 2; i <= n; i++ ) {
      f *= i;
    }
    return f;
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;