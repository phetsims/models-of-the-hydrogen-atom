// Copyright 2016-2020, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const Particle = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Particle' );

  class AlphaParticle extends Particle {

    /**
     * @param {Vector2} position - position in model coordinate frame
     * @param {number} speed - distance per dt
     * @param {number} direction - direction of motion, in radians
     */
    constructor( position, speed, direction ) {
      super( position, speed, direction );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );
} );
