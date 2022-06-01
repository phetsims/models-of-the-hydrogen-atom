// Copyright 2016-2022, University of Colorado Boulder

/**
 * BilliardBallModel is a predictive model that models the hydrogen atom as a billiard ball.
 * While PhET typically does not name model elements with a 'Model' suffix, we're using the terminology that appears
 * in the literature.
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
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import billiardBallButton_png from '../../../images/billiardBallButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import RandomUtils from '../RandomUtils.js';
import AlphaParticle from './AlphaParticle.js';
import Photon from './Photon.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';

// constants
const MIN_DEFLECTION_ANGLE = Utils.toRadians( 120 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 170 );

type SelfOptions = {
  radius?: number;
};

type BilliardBallModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class BilliardBallModel extends HydrogenAtom {

  public readonly radius: number;

  constructor( zoomedInBox: ZoomedInBox, providedOptions: BilliardBallModelOptions ) {

    const options = optionize<BilliardBallModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // SelfOptions
      radius: 30,

      // PredictiveModelOptions
      hasTransitionWavelengths: false
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.billiardBall, billiardBallButton_png, zoomedInBox, options );

    this.radius = options.radius;
  }

  /**
   * Moves a photon. If the photon collides with the atom, the photon bounces back at
   * a 'steep but random' angle. Otherwise it continues to move in its current direction.
   */
  public override movePhoton( photon: Photon, dt: number ): void {

    // detect collision and adjust particle direction
    if ( !photon.hasCollidedProperty.value ) {
      if ( photon.positionProperty.value.distance( this.position ) <= this.radius ) {
        const sign = ( photon.positionProperty.value.x > this.position.x ) ? 1 : -1;
        const deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
        photon.directionProperty.value = photon.directionProperty.value + deflection;
        photon.hasCollidedProperty.value = true;
      }
    }

    // move particle
    super.movePhoton( photon, dt );
  }

  /**
   * Moves an alpha particle. If the alpha particle collides with the atom, the alpha particle
   * bounces back at a 'steep but random' angle. Otherwise it continues to move in its current direction.
   */
  public override moveAlphaParticle( alphaParticle: AlphaParticle, dt: number ): void {

    // detect collision and adjust particle direction
    if ( alphaParticle.positionProperty.value.distance( this.position ) <= this.radius ) {
      const sign = ( alphaParticle.positionProperty.value.x > this.position.x ) ? 1 : -1;
      const deflection = sign * RandomUtils.nextDouble( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
      alphaParticle.directionProperty.value = alphaParticle.directionProperty.value + deflection;
    }

    // move particle
    super.moveAlphaParticle( alphaParticle, dt );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );