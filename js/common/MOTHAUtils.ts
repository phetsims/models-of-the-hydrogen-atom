// Copyright 2016-2024, University of Colorado Boulder

/**
 * MOTHAUtils is a collection of static utility functions used in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds3 from '../../../dot/js/Bounds3.js';
import dotRandom from '../../../dot/js/dotRandom.js';
import Vector2 from '../../../dot/js/Vector2.js';
import Vector3 from '../../../dot/js/Vector3.js';
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

  //TODO Delete computeBounds3 if it is unused.
  /**
   * Computes the 3D bounds that fits a set of 3D vertices.
   */
  computeBounds3( vertices: Vector3[] ): Bounds3 {
    if ( vertices.length === 0 ) {
      return Bounds3.NOTHING;
    }
    else {

      const vertex = vertices[ 0 ];
      let minX = vertex.x;
      let maxX = vertex.x;
      let minY = vertex.y;
      let maxY = vertex.y;
      let minZ = vertex.z;
      let maxZ = vertex.z;

      for ( let i = 1; i < vertices.length; i++ ) {

        const vertex = vertices[ i ];
        if ( vertex.x < minX ) {
          minX = vertex.x;
        }
        else if ( vertex.x > maxX ) {
          maxX = vertex.x;
        }

        if ( vertex.y < minY ) {
          minY = vertex.y;
        }
        else if ( vertex.y > maxY ) {
          maxY = vertex.y;
        }

        if ( vertex.z < minZ ) {
          minZ = vertex.z;
        }
        else if ( vertex.z > maxZ ) {
          maxZ = vertex.z;
        }
      }
      return new Bounds3( minX, minY, maxX, maxY, minZ, maxZ );
    }
  }
};

modelsOfTheHydrogenAtom.register( 'MOTHAUtils', MOTHAUtils );
export default MOTHAUtils;