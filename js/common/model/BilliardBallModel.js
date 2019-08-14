// Copyright 2016-2019, University of Colorado Boulder

/**
 * BilliardBallModel is a predictive model that models the hydrogen atom as a billiard ball.
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
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );
  const RandomUtils = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/RandomUtils' );
  const Util = require( 'DOT/Util' );

  // strings
  const billiardBallString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/billiardBall' );

  // images
  const billiardBallButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/billiardBallButton.png' );

  // constants
  const MIN_DEFLECTION_ANGLE = Util.toRadians( 120 );
  const MAX_DEFLECTION_ANGLE = Util.toRadians( 170 );

  class BilliardBallModel extends PredictiveModel {

    /**
     * @param {Vector2} location
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {
        radius: 30
      }, options );

      super( billiardBallString, billiardBallButtonImage, options );

      // @public (read-only)
      this.radius = options.radius;
    }

    /**
     * Moves a photon. If the photon collides with the atom, the photon bounces back at
     * a 'steep but random' angle. Otherwise it continues to move in its current direction.
     * @param {Photon} photon
     * @param {number} dt
     * @public
     * @override
     */
    movePhoton( photon, dt ) {

      // detect collision and adjust particle direction
      if ( !photon.collided ) {
        if ( photon.location.distance( this.location ) <= this.radius ) {
          const sign = ( photon.location.x > this.location.x ) ? 1 : -1;
          const deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
          photon.direction = photon.direction + deflection;
          photon.collided = true;
        }
      }

      // move particle
      super.movePhoton( photon, dt );
    }

    /**
     * Moves an alpha particle. If the alpha particle collides with the atom, the alpha particle
     * bounces back at a 'steep but random' angle. Otherwise it continues to move in its current direction.
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @public
     * @override
     */
    moveAlphaParticle( alphaParticle, dt ) {

      // detect collision and adjust particle direction
      if ( alphaParticle.location.distance( this.location ) <= this.radius ) {
        const sign = ( alphaParticle.location.x > this.location.x ) ? 1 : -1;
        const deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
        alphaParticle.direction = alphaParticle.direction + deflection;
      }

      // move particle
      super.moveAlphaParticle( alphaParticle, dt );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );
} );