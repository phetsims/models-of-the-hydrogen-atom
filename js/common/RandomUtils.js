// Copyright 2016-2019, University of Colorado Boulder

/**
 * Utility functions related to random number generation.
 * These functions share one instance of a random number generator.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const RandomUtils = {

    /**
     * Gets a random value >= min and < max.
     *
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    nextDouble: function( min, max ) {
      assert( max > min );
      return min + ( phet.joist.random.nextDouble() * ( max - min ) );
    },

    /**
     * Gets a random boolean.
     * @returns {boolean}
     */
    nextBoolean: function() {
      return phet.joist.random.nextBoolean();
    },

    /**
     * Gets a random sign.
     * @returns {number} +1 or -1
     */
    nextSign: function() {
      return ( phet.joist.random.nextBoolean() ? +1 : -1 );
    },

    /**
     * Gets a random angle >= 0 and < 2 * PI.
     * @returns {number} angle, in radians
     */
    nextAngle: function() {
      return phet.joist.random.nextDouble( 0, 2 * Math.PI );
    }
  };

  modelsOfTheHydrogenAtom.register( 'RandomUtils', RandomUtils );

  return RandomUtils;
} );
