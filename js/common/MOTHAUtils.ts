// Copyright 2016-2024, University of Colorado Boulder

/**
 * MOTHAUtils is a collection of static utility functions used in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../dot/js/dotRandom.js';
import Vector2 from '../../../dot/js/Vector2.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';

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
   * Normalizes an angle to the range [0, 2 * PI].
   */
  normalizeAngle( angle: number ): number {
    let normalizedAngle = angle % ( 2 * Math.PI );
    if ( normalizedAngle < 0 ) {
      normalizedAngle += ( 2 * Math.PI );
    }
    assert && assert( normalizedAngle >= 0 && normalizedAngle <= ( 2 * Math.PI ) );
    return normalizedAngle;
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
  },

  /**
   * Two points collide if the distance between them is <= some threshold.
   */
  pointsCollide( position1: Vector2, position2: Vector2, maxDistance: number ): boolean {
    return position1.distance( position2 ) <= maxDistance;
  },

  /**
   * Is the given wavelength in the UV spectrum?
   */
  isUV( wavelength: number ): boolean {
    return wavelength < VisibleColor.MIN_WAVELENGTH;
  },

  /**
   * Is the given wavelength in the IR spectrum?
   */
  isIR( wavelength: number ): boolean {
    return wavelength > VisibleColor.MAX_WAVELENGTH;
  },

  /**
   * Distance between 2 points, given by (x,y) coordinates.
   */
  distance( x1: number, y1: number, x2: number, y2: number ): number {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt( dx * dx + dy * dy );
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;