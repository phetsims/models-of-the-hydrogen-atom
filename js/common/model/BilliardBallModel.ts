// Copyright 2016-2024, University of Colorado Boulder

/**
 * BilliardBallModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * The billiard ball is a sphere, with the atom's local origin at the sphere's center.
 *
 * Collision behavior:
 * When photons collide with the ball, they bounce off as if the ball were a rigid body.
 *
 * Absorption behavior:
 * Does not absorb photons.
 *
 * Emission behavior:
 * Does not emit photons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAConstants from '../MOTHAConstants.js';
import BilliardBallNode from '../view/BilliardBallNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Photon from './Photon.js';

const MIN_DEFLECTION_ANGLE = Utils.toRadians( 30 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 60 );

type SelfOptions = EmptySelfOptions;

type BilliardBallModelOptions = SelfOptions & PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BilliardBallModel extends HydrogenAtom {

  public readonly radius = MOTHAConstants.BILLIARD_BALL_RADIUS;

  public constructor( providedOptions: BilliardBallModelOptions ) {

    const options = optionize<BilliardBallModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.billiardBallStringProperty,
      icon: BilliardBallNode.createIcon(),
      tandemNamePrefix: 'billiardBall'
    }, providedOptions );

    super( options );
  }

  public override step( dt: number ): void {
    // do nothing for this model
  }

  //TODO This does not look good in 'Fast' speed, because photos are inside the atom. Especially noticeable when stepping.
  /**
   * If the photon collides with the atom, the photon bounces back at a 'steep but random' angle.
   */
  public override processPhoton( photon: Photon ): void {
    if ( !photon.hasCollided ) {
      if ( photon.positionProperty.value.distance( this.position ) <= this.radius ) {
        const sign = ( photon.positionProperty.value.x > this.position.x ) ? 1 : -1;
        const deflectionAngle = sign * dotRandom.nextDoubleBetween( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
        photon.directionProperty.value += ( Math.PI + deflectionAngle );
        photon.hasCollided = true;
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );