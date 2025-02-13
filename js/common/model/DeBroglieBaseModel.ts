// Copyright 2024-2025, University of Colorado Boulder

/**
 * DeBroglieBaseModel is the base class for the de Broglie model of the hydrogen atom, a modification of BohrModel.
 * SchrodingerModel will in turn build on this base class, while DeBroglieModel will add features related to the 3D
 * visualization of the de Broglie model.
 *
 * The separation of DeBroglieBaseModel and DeBroglieModel was required mainly for PhET-iO, so that the 3D aspects
 * of de Broglie are not part of the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAUtils from '../MOTHAUtils.js';
import BohrModel, { BohrModelOptions } from './BohrModel.js';
import { DeBroglieModelOptions } from './DeBroglieModel.js';
import Photon from './Photon.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

export type DeBroglieBaseModelOptions = SelfOptions & StrictOmit<BohrModelOptions, 'electron'>;

export default class DeBroglieBaseModel extends BohrModel {

  // Radial width of the ring for the 'brightness' representation.
  public static readonly BRIGHTNESS_RING_THICKNESS = 3;

  // How close the photon's center must be to a point on the electron's orbit in order for a collision to occur.
  // Because the electron is represented as a wave, we add a threshold here so that there is a collision when the
  // photon is "sufficiently close" to the wave.
  protected static readonly CLOSENESS_FOR_COLLISION = Photon.RADIUS + 8;

  protected constructor( position: Vector2, providedOptions: DeBroglieBaseModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, BohrModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.deBroglieStringProperty,
      tandemNamePrefix: 'deBroglie'
    }, providedOptions );

    super( position, options );
  }

  /**
   * Gets the amplitude [-1,1] of a standing wave at some angle, in some specified state of the electron.
   */
  public getAmplitude( n: number, angle: number ): number {
    const amplitude = Math.sin( n * angle ) * Math.sin( this.electron.angleProperty.value );
    assert && assert( amplitude >= -1 && amplitude <= 1, `invalid amplitude: ${amplitude}` );
    return amplitude;
  }

  /**
   * Calculates the new electron angle for some time step. For de Broglie, the direction changes at the same rate for
   * all electron states (n).
   */
  protected override calculateNewElectronDirection( dt: number ): number {
    const deltaAngle = dt * BohrModel.ELECTRON_ANGLE_DELTA;
    return MOTHAUtils.normalizeAngle( this.electron.angleProperty.value - deltaAngle ); // clockwise
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Collision Detection
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Determines whether a photon collides with this atom' electron in one of the 2D views. In all 2D views (including
   * 'Radial Distance'), the photon collides with the atom if it hits the ring used to represent the standing wave.
   */
  protected override collides( photon: Photon ): boolean {

    // position of photon relative to atom's center
    const photonOffset = this.getPhotonOffset( photon );

    // distance of photon and electron from atom's center
    const photonRadius = Math.sqrt( ( photonOffset.x * photonOffset.x ) + ( photonOffset.y * photonOffset.y ) );
    const orbitRadius = BohrModel.getElectronOrbitRadius( this.electron.nProperty.value );

    return ( Math.abs( photonRadius - orbitRadius ) <= DeBroglieBaseModel.CLOSENESS_FOR_COLLISION );
  }

  /**
   * Gets the offset of a photon from the atom's position.
   */
  protected getPhotonOffset( photon: Photon ): Vector2 {
    return photon.positionProperty.value.minus( this.position );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieBaseModel', DeBroglieBaseModel );