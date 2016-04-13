// Copyright 2016, University of Colorado Boulder

/**
 * BilliardBallModel models the hydrogen atom as a billiard ball.
 *
 * Physical representation:
 * The ball is spherical, with its local origin at its center.
 *
 * Collision behavior:
 * When photons and alpha particles collide with the ball, they bounce off as if the ball were a rigid body.
 *
 * Absorption behavior:
 * Does not absorb photons or alpha particles.
 *
 * Emission behavior:
 * Does not emit photons or alpha particles.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AbstractHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/model/AbstractHydrogenAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var RandomUtils = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/RandomUtils' );
  var Util = require( 'DOT/Util' );

  // constants
  var MIN_DEFLECTION_ANGLE = Util.toRadians( 120 );
  var MAX_DEFLECTION_ANGLE = Util.toRadians( 170 );

  /**
   * @param {Vector2} location
   * @param {Object} [options]
   * @constructor
   */
  function BilliardBallModel( location, options ) {

    options = _.extend( {
      radius: 30
    }, options );

    this.radius = options.radius; // @public (read-only)

    AbstractHydrogenAtom.call( this, location, options );
  }

  modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );

  return inherit( AbstractHydrogenAtom, BilliardBallModel, {

    /**
     * Moves a photon. If the photon collides with the atom, the photon bounces back at
     * a 'steep but random' angle. Otherwise it continues to move in its current direction.
     *
     * @param {Photon} photon
     * @param {number} dt
     * @public
     * @override
     */
    movePhoton: function( photon, dt ) {

      // detect collision and adjust particle direction
      if ( !photon.collided ) {
        if ( photon.location.distance( this.location ) <= this.radius ) {
          var sign = ( photon.location.x > this.location.x ) ? 1 : -1;
          var deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
          photon.direction = photon.direction + deflection;
          photon.collided = true;
        }
      }

      // move particle
      AbstractHydrogenAtom.prototype.movePhoton.call( this, photon, dt );
    },

    /**
     * Moves an alpha particle. If the alpha particle collides with the atom, the alpha particle
     * bounces back at a 'steep but random' angle. Otherwise it continues to move in its current direction.
     *
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @public
     * @override
     */
    moveAlphaParticle: function( alphaParticle, dt ) {

      // detect collision and adjust particle direction
      if ( alphaParticle.location.distance( this.location ) <= this.radius ) {
        var sign = ( alphaParticle.location.x > this.location.x ) ? 1 : -1;
        var deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
        alphaParticle.direction = alphaParticle.direction + deflection;
      }

      // move particle
      AbstractHydrogenAtom.prototype.moveAlphaParticle.call( this, alphaParticle, dt );
    }
  } );
} );