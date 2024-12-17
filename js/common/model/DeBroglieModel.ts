// Copyright 2019-2024, University of Colorado Boulder

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

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import DeBroglieNode from '../view/DeBroglieNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import BohrModel, { BohrModelOptions } from './BohrModel.js';
import DeBroglieBaseModel from './DeBroglieBaseModel.js';
import { DeBroglieRepresentation, DeBroglieRepresentationValues } from './DeBroglieRepresentation.js';
import Photon from './Photon.js';

type SelfOptions = EmptySelfOptions;

export type DeBroglieModelOptions = SelfOptions & BohrModelOptions;

export default class DeBroglieModel extends DeBroglieBaseModel {

  // How much to scale the y dimension for 3D orbits.
  public static readonly ORBIT_3D_Y_SCALE = 0.35;

  // Which representation to use.
  public readonly deBroglieRepresentationProperty: StringUnionProperty<DeBroglieRepresentation>;

  // Position of the electron adjusted for the '3D height' view.
  public readonly electron3DPositionProperty: TReadOnlyProperty<Vector2>;

  public constructor( providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, BohrModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.deBroglieStringProperty,
      icon: DeBroglieNode.createIcon()
    }, providedOptions );

    super( options );

    this.electron3DPositionProperty = new DerivedProperty( [ this.electron.positionProperty ], position => {
      const x = position.x;
      const yOffsetScaled = ( position.x - this.position.y ) * DeBroglieModel.ORBIT_3D_Y_SCALE;
      return new Vector2( x, this.position.y + yOffsetScaled );
    } );

    this.deBroglieRepresentationProperty = new StringUnionProperty( 'radialDistance', {
      validValues: DeBroglieRepresentationValues,
      tandem: options.tandem.createTandem( 'deBroglieRepresentationProperty' ),
      phetioFeatured: true
    } );
  }

  public override reset(): void {

    //TODO Calling reset when switching between models should not reset this.
    this.deBroglieRepresentationProperty.reset();
    super.reset();
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Collision Detection
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Determines whether a photon collides with this atom.
   * Uses different algorithms depending on whether the view is 2D or 3D.
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
   * Determines whether a photon collides with this atom in the 3D view. In this case, the photon collides with
   * the atom if it hits the ellipse that is the 2D projection of the electron's 3D orbit.
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

    // how close the photon's center must be to a point on the electron's orbit
    //TODO Why is getClosenessForCollision used for '3D Height' when it's a function of BRIGHTNESS_RING_THICKNESS?
    const closeness = this.getClosenessForCollision( photon );

    return ( distance <= closeness );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );