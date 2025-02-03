// Copyright 2016-2025, University of Colorado Boulder

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

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import BilliardBallNode from '../view/BilliardBallNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Photon from './Photon.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = EmptySelfOptions;

type BilliardBallModelOptions = SelfOptions & PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BilliardBallModel extends HydrogenAtom {

  // Radius of the billiard ball, in unitless model coordinates.
  public static readonly RADIUS = 30;

  public constructor( position: Vector2, providedOptions: BilliardBallModelOptions ) {

    const options = optionize<BilliardBallModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.billiardBallStringProperty,
      debugName: 'Billiard Ball',
      icon: BilliardBallNode.createIcon(),
      tandemNamePrefix: 'billiardBall'
    }, providedOptions );

    super( position, options );
  }

  public override step( dt: number ): void {
    // do nothing for this model
  }

  /**
   * Handle photon collision with the atom.
   */
  public override processPhoton( photon: Photon ): void {
    if ( !photon.hasCollidedWithAtom ) {
      if ( photon.positionProperty.value.distance( this.position ) <= BilliardBallModel.RADIUS ) {
        photon.bounceBack( this.position );
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallModel', BilliardBallModel );