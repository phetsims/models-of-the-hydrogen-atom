// Copyright 2016, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Particle = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/model/Particle' );

  /**
   * @param {Vector2} location - location in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   * @constructor
   */
  function AlphaParticle( location, speed, direction ) {
    Particle.call( this, location, speed, direction );
  }

  modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );

  return inherit( Particle, AlphaParticle );
} );
