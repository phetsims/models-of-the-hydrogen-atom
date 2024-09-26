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

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import DeBroglieNode from '../view/DeBroglieNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import BohrModel, { BohrModelOptions } from './BohrModel.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { DeBroglieRepresentation, DeBroglieRepresentationValues } from './DeBroglieRepresentation.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = EmptySelfOptions;

export type DeBroglieModelOptions = SelfOptions & BohrModelOptions;

export default class DeBroglieModel extends BohrModel {

  // Which representation to use.
  public readonly deBroglieRepresentationProperty: StringUnionProperty<DeBroglieRepresentation>;

  // How much to scale the y dimension for 3D orbits.
  public static readonly ORBIT_3D_Y_SCALE = 0.35;

  // Radial width of the ring for the 'brightness' representation.
  public static readonly BRIGHTNESS_RING_THICKNESS = 3;

  // Position of the electron adjusted for the '3D height' view.
  //TODO Move this to DeBroglie3DHeightNode.
  public readonly electron3DPositionProperty: TReadOnlyProperty<Vector2>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, BohrModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.deBroglieStringProperty,
      icon: DeBroglieNode.createIcon()
    }, providedOptions );

    super( zoomedInBox, options );

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

    //TODO Calling reset when switching between models probably should not reset this.
    this.deBroglieRepresentationProperty.reset();
    super.reset();
  }

  /**
   * Gets the amplitude [-1,1] of a standing wave at some angle, in some specified state of the electron.
   */
  public getAmplitude( n: number, angle: number ): number {
    const amplitude = Math.sin( n * angle ) * Math.sin( this.electron.directionProperty.value );
    assert && assert( amplitude >= -1 && amplitude <= 1 );
    return amplitude;
  }

  //TODO normalize the return value to [0,2*Math.PI]
  /**
   * Calculates the new electron angle for some time step. For de Broglie, the direction changes at the same rate for
   * all electron states (n).
   */
  protected override calculateNewElectronDirection( dt: number ): number {
    const deltaAngle = dt * BohrModel.ELECTRON_ANGLE_DELTA;
    return this.electron.directionProperty.value - deltaAngle; //TODO clockwise
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
      return this.collides2D( photon );
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
    //TODO why is getClosenessForCollision used for '3D Height' when it's a function of BRIGHTNESS_RING_THICKNESS?
    const closeness = this.getClosenessForCollision( photon );

    return ( distance <= closeness );
  }

  /**
   * Determines whether a photon collides with this atom in one of the 2D views. In all 2D views (including
   * 'Radial Distance'), the photon collides with the atom if it hits the ring used to represent the standing wave
   * in one of the brightness views.
   */
  private collides2D( photon: Photon ): boolean {

    // position of photon relative to atom's center
    const photonOffset = this.getPhotonOffset( photon );

    // distance of photon and electron from atom's center
    const photonRadius = Math.sqrt( ( photonOffset.x * photonOffset.x ) + ( photonOffset.y * photonOffset.y ) );
    const orbitRadius = BohrModel.getElectronOrbitRadius( this.electron.nProperty.value );

    //TODO why is getClosenessForCollision used for 'radialDistance' when it's a function of BRIGHTNESS_RING_THICKNESS?
    return ( Math.abs( photonRadius - orbitRadius ) <= this.getClosenessForCollision( photon ) );
  }

  /**
   * Gets the offset of a photon from the atom's position.
   */
  private getPhotonOffset( photon: Photon ): Vector2 {
    return photon.positionProperty.value.minus( this.position );
  }

  //TODO Why isn't this adjusted for '3D Height' view?
  /**
   * How close the photon's center must be to a point on the electron's orbit in order for a collision to occur.
   */
  private getClosenessForCollision( photon: Photon ): number {
    return ( photon.radius + this.electron.radius + DeBroglieModel.BRIGHTNESS_RING_THICKNESS );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );