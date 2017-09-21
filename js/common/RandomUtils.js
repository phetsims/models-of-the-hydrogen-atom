// Copyright 2016-2017, University of Colorado Boulder

/**
 * Utility functions related to random number generation.
 * These functions share one instance of a random number generator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Random = require( 'DOT/Random' );

  // constants
  var RANDOM = new Random();

  var RandomUtils = {

    /**
     * Gets a random value >= min and < max.
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    nextDouble: function( min, max ) {
      assert( max > min );
      return min + ( RANDOM.nextDouble() * ( max - min ) );
    },

    /**
     * Gets a random boolean.
     * @returns {boolean}
     */
    nextBoolean: function() {
      return RANDOM.nextBoolean();
    },

    /**
     * Gets a random sign.
     * @return +1 or -1
     */
    nextSign: function() {
      return ( RANDOM.nextBoolean() ? +1 : -1 );
    },

    /**
     * Gets a random angle >= 0 and < 2 * PI.
     * @return angle, in radians
     */
    nextAngle: function() {
      return RANDOM.nextDouble( 0, 2 * Math.PI );
    }
  };

  modelsOfTheHydrogenAtom.register( 'RandomUtils', RandomUtils );

  return RandomUtils;
} );
