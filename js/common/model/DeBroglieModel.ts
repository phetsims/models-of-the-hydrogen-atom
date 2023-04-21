// Copyright 2019-2023, University of Colorado Boulder

/**
 * DeBroglieModel is a predictive model of the hydrogen atom.
 *
 * DeBroglieModel is identical to BohrModel, but has different visual representations. The different visual
 * representations (see DeBroglieView) mean that it requires different methods of handling collision detection
 * and determining electron position. The algorithms for collision detection and calculation of electron position
 * differ greatly for 2D and 3D views. Therefore, this model needs to know something about the view in order to
 * make things look right in 3D. So this model cannot be shown in both 2D and 3D views simultaneously. There are
 * undoubtedly ways to do this, but this simulation does not require multiple simultaneous views of the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import deBroglieButton_png from '../../../images/deBroglieButton_png.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import BohrModel, { BohrModelOptions } from './BohrModel.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Electron from './Electron.js';
import { DeBroglieView, DeBroglieViewValues } from './DeBroglieView.js';

type SelfOptions = EmptySelfOptions;

export type DeBroglieModelOptions = SelfOptions & BohrModelOptions;

export default class DeBroglieModel extends BohrModel {

  // How much to scale the y dimension for 3D orbits
  public static readonly ORBIT_3D_Y_SCALE = 0.35;

  // radial width of the ring for 'brightness' representation,
  public static readonly BRIGHTNESS_RING_THICKNESS = 3;

  // electron for the '3D' view
  public readonly electron3D: Electron;

  public readonly deBroglieViewProperty: StringUnionProperty<DeBroglieView>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, BohrModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.deBroglieStringProperty,
      iconHTMLImageElement: deBroglieButton_png
    }, providedOptions );

    super( zoomedInBox, options );

    this.electron3D = new Electron( {
      //TODO position is not properly initialized
      tandem: options.tandem.createTandem( 'electron3D' )
    } );

    this.deBroglieViewProperty = new StringUnionProperty( 'radial', {
      validValues: DeBroglieViewValues,
      tandem: options.tandem.createTandem( 'deBroglieViewProperty' )
    } );

    this.electronOffsetProperty.link( electronOffset => {
      const xOffset = electronOffset.x;
      const yOffset = ( ( electronOffset.y - this.position.y ) * DeBroglieModel.ORBIT_3D_Y_SCALE );
      this.electron3D.positionProperty.value = this.position.plusXY( xOffset, yOffset );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override reset(): void {
    this.electron3D.reset();
    this.deBroglieViewProperty.reset();
    super.reset();
  }

  /**
   * Gets the amplitude [-1,1] of a standing wave at some angle, in some specified state of the electron.
   */
  public getAmplitude( angle: number, state: number ): number {
    const amplitude = Math.sin( state * angle ) * Math.sin( this.electronAngleProperty.value );
    assert && assert( amplitude >= -1 && amplitude <= 1 );
    return amplitude;
  }

  //TODO normalize the return value to [0,2*Math.PI]
  /**
   * Calculates the new electron angle for some time step. For de Broglie, the change in angle (and thus
   * the oscillation frequency) is the same for all states of the electron.
   */
  protected override calculateNewElectronAngle( dt: number ): number {
    const deltaAngle = dt * BohrModel.ELECTRON_ANGLE_DELTA;
    return this.electronAngleProperty.value - deltaAngle; //TODO clockwise
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Collision Detection
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Determines whether a photon collides with this atom.
   * Uses different algorithms depending on whether the view is 2D or 3D.
   */
  protected override collides( photon: Photon ): boolean {
    if ( this.deBroglieViewProperty.value === '3D' ) {
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
    const orbitRadius = this.getElectronOrbitRadius( this.getElectronState() );
    const orbitX = orbitRadius * Math.cos( angle );
    const orbitY = DeBroglieModel.ORBIT_3D_Y_SCALE * orbitRadius * Math.sin( angle );

    // distance from electron to the closest point on orbit
    const distance = photonOffset.distanceXY( orbitX, orbitY );

    // how close the photon's center must be to a point on the electron's orbit
    //TODO why is getClosenessForCollision used for '3D' when it's a function of BRIGHTNESS_RING_THICKNESS?
    const closeness = this.getClosenessForCollision( photon );

    return ( distance <= closeness );
  }

  /**
   * Determines whether a photon collides with this atom in one of the 2D views.
   * In all 2D views (including "radial distance"), the photon collides with
   * the atom if it hits the ring used to represent the standing wave in one
   * of the brightness views.
   */
  private collides2D( photon: Photon ): boolean {

    // position of photon relative to atom's center
    const photonOffset = this.getPhotonOffset( photon );

    // distance of photon and electron from atom's center
    const photonRadius = Math.sqrt( ( photonOffset.x * photonOffset.x ) + ( photonOffset.y * photonOffset.y ) );
    const orbitRadius = this.getElectronOrbitRadius( this.getElectronState() );

    //TODO why is getClosenessForCollision used for 'radial' when it's a function of BRIGHTNESS_RING_THICKNESS?
    return ( Math.abs( photonRadius - orbitRadius ) <= this.getClosenessForCollision( photon ) );
  }

  /**
   * Gets the offset of a photon from the atom's position.
   */
  private getPhotonOffset( photon: Photon ): Vector2 {
    return photon.positionProperty.value.minus( this.position );
  }

  //TODO why isn't this adjusted for '3D' view?
  /**
   * How close the photon's center must be to a point on the electron's orbit in order for a collision to occur.
   */
  private getClosenessForCollision( photon: Photon ): number {
    return ( photon.radius + this.electron.radius + DeBroglieModel.BRIGHTNESS_RING_THICKNESS );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );