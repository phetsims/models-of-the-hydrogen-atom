// Copyright 2016-2020, University of Colorado Boulder

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

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import billiardBallButton_png from '../../../images/billiardBallButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import RandomUtils from '../RandomUtils.js';
import PredictiveModel from './PredictiveModel.js';

// constants
const MIN_DEFLECTION_ANGLE = Utils.toRadians( 120 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 170 );

class BilliardBallModel extends PredictiveModel {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      radius: 30
    }, options );

    super( modelsOfTheHydrogenAtomStrings.billiardBall, billiardBallButton_png, options );

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
      if ( photon.position.distance( this.position ) <= this.radius ) {
        const sign = ( photon.position.x > this.position.x ) ? 1 : -1;
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
    if ( alphaParticle.position.distance( this.position ) <= this.radius ) {
      const sign = ( alphaParticle.position.x > this.position.x ) ? 1 : -1;
      const deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
      alphaParticle.direction = alphaParticle.direction + deflection;
    }

    // move particle
    super.moveAlphaParticle( alphaParticle, dt );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );
export default BilliardBallModel;