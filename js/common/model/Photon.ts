// Copyright 2016-2022, University of Colorado Boulder

/**
 * Photon is the model of a photon.
 * A photon has a wavelength, position and direction of motion.
 * Photons move with constant speed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { IColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import Particle from './Particle.js';

type SelfOptions = {
  emitted?: boolean; // was this photon emitted by the atom?
  collided?: boolean; // did this photon already collide with the atom?
};

type PhotonOptions = SelfOptions;

export default class Photon extends Particle {

  public readonly wavelength: any;
  public readonly emitted: boolean;
  public collided: any;

  /**
   * @param wavelength - the photon's immutable wavelength
   * @param position - position in model coordinate frame
   * @param speed - distance per dt
   * @param direction - direction of motion, in radians
   * @param providedOptions
   */
  constructor( wavelength: number, position: Vector2, speed: number, direction: number, providedOptions?: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions>( {
      emitted: false,
      collided: false
    }, providedOptions );

    super( position, speed, direction );

    this.wavelength = wavelength;
    this.emitted = options.emitted;
    this.collided = options.collided;
  }

  /**
   * Gets the Color associated with the photon's wavelength.
   */
  public getColor(): IColor {
    return VisibleColor.wavelengthToColor( this.wavelength, {
      uvColor: MOTHAColors.UV_COLOR,
      irColor: MOTHAColors.IR_COLOR
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );