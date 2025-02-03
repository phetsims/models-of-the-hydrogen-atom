// Copyright 2019-2025, University of Colorado Boulder

/**
 * DeBroglieModel is a predictive model of the hydrogen atom.
 *
 * DeBroglieModel is identical to BohrModel, but has different visual representations. The different visual
 * representations (see DeBroglieRepresentation) mean that it requires different methods of determining electron
 * position and handling collision detection.
 *
 * The algorithms for determining electron position and handling collision detection differ greatly for 2D and 3D views.
 * Therefore, this model needs to know something about the view in order to make things look right in 3D. So this model
 * cannot be shown in both 2D and 3D views simultaneously. There are undoubtedly ways to do this, but this simulation
 * does not require multiple simultaneous views of the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import DeBroglieNode from '../view/DeBroglieNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import BohrModel, { BohrModelOptions } from './BohrModel.js';
import DeBroglieBaseModel from './DeBroglieBaseModel.js';
import { DeBroglieRepresentation, DeBroglieRepresentationValues } from './DeBroglieRepresentation.js';
import Photon from './Photon.js';
import isResettingAllProperty from '../../../../scenery-phet/js/isResettingAllProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = EmptySelfOptions;

export type DeBroglieModelOptions = SelfOptions & BohrModelOptions;

export default class DeBroglieModel extends DeBroglieBaseModel {

  // How much to scale the y dimension for 3D orbits.
  public static readonly ORBIT_3D_Y_SCALE = 0.35;

  // Which view representation to use.
  public readonly deBroglieRepresentationProperty: StringUnionProperty<DeBroglieRepresentation>;

  public constructor( position: Vector2, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, BohrModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.deBroglieStringProperty,
      debugName: 'de Broglie',
      icon: DeBroglieNode.createIcon()
    }, providedOptions );

    super( position, options );

    this.deBroglieRepresentationProperty = new StringUnionProperty<DeBroglieRepresentation>( 'radialDistance', {
      validValues: DeBroglieRepresentationValues,
      tandem: options.tandem.createTandem( 'deBroglieRepresentationProperty' ),
      phetioDocumentation: 'The representation for the de Broglie model that is displayed in the view.',
      phetioFeatured: true
    } );
  }

  public override reset(): void {

    // Representation should only be reset when doing a 'Reset All', not when switching atomic models.
    if ( isResettingAllProperty.value ) {
      this.deBroglieRepresentationProperty.reset();
    }
    super.reset();
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Collision Detection
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Determines whether a photon collides with this atom. A different algorithm is used for 2D vs 3D.
   */
  protected override collides( photon: Photon ): boolean {
    if ( this.deBroglieRepresentationProperty.value === '3DHeight' ) {
      return this.collides3D( photon );
    }
    else {
      return super.collides( photon );
    }
  }

  /**
   * Determines whether a photon collides with this atom in the '3D Height' view. The photon collides
   * with the atom if it hits the ellipse that is the 2D projection of the electron's 3D orbit.
   */
  private collides3D( photon: Photon ): boolean {

    // position of photon relative to atom's center
    const photonOffset = this.getPhotonOffset( photon );
    const angle = Math.atan( photonOffset.y / photonOffset.x );

    // position on orbit at corresponding angle
    const orbitRadius = BohrModel.getElectronOrbitRadius( this.electron.nProperty.value );
    const orbitX = orbitRadius * Math.cos( angle );
    const orbitY = DeBroglieModel.ORBIT_3D_Y_SCALE * orbitRadius * Math.sin( angle );

    // distance from electron to the closest point on orbit
    const distance = photonOffset.distanceXY( orbitX, orbitY );

    return ( distance <= DeBroglieBaseModel.CLOSENESS_FOR_COLLISION );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );