// Copyright 2016-2022, University of Colorado Boulder

/**
 * BilliardBallModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * The ball is spherical, with its local origin at its center.
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

import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import billiardBallButton_png from '../../../images/billiardBallButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Photon from './Photon.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import MOTHAConstants from '../MOTHAConstants.js';

// constants
const MIN_DEFLECTION_ANGLE = Utils.toRadians( 30 );
const MAX_DEFLECTION_ANGLE = Utils.toRadians( 60 );

type SelfOptions = EmptySelfOptions;

type BilliardBallModelOptions = SelfOptions &
  StrictOmit<HydrogenAtomOptions, 'displayNameProperty' | 'iconHTMLImageElement' | 'hasTransitionWavelengths'>;

export default class BilliardBallModel extends HydrogenAtom {

  //TODO do all HydrogenAtom subclasses have radius?
  public readonly radius = MOTHAConstants.BILLIARD_BALL_RADIUS;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: BilliardBallModelOptions ) {

    const options = optionize<BilliardBallModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.billiardBallStringProperty,
      iconHTMLImageElement: billiardBallButton_png,
      hasTransitionWavelengths: false
    }, providedOptions );

    super( zoomedInBox, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override step( dt: number ): void {
    // do nothing for this model
  }

  //TODO This does not look good in 'Fast' speed, because photos are inside the atom. Especially noticeable when stepping.
  /**
   * Moves a photon. If the photon collides with the atom, the photon bounces back at a 'steep but random' angle.
   * Otherwise, it continues to move in its current direction.
   */
  public override movePhoton( photon: Photon, dt: number ): void {

    // detect collision and adjust particle direction
    if ( !photon.hasCollidedProperty.value ) {
      if ( photon.positionProperty.value.distance( this.position ) <= this.radius ) {
        const sign = ( photon.positionProperty.value.x > this.position.x ) ? 1 : -1;
        const deflectionAngle = sign * dotRandom.nextDoubleBetween( MIN_DEFLECTION_ANGLE, MAX_DEFLECTION_ANGLE );
        photon.directionProperty.value += ( Math.PI + deflectionAngle );
        photon.hasCollidedProperty.value = true;
      }
    }

    // move photon
    photon.move( dt );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );