// Copyright 2016-2020, University of Colorado Boulder

/**
 * Photon is the model of a photon.
 * A photon has a wavelength, position and direction of motion.
 * Photons move with constant speed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';
import Particle from './Particle.js';

class Photon extends Particle {

  /**
   * @param {number} wavelength - the photon's immutable wavelength
   * @param {Vector2} position - position in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   * @param {Object} [options]
   */
  constructor( wavelength, position, speed, direction, options ) {

    options = merge( {
      emitted: false, // {boolean} was this photon emitted by the atom?
      collided: false // {boolean} did this photon already collide with the atom?
    }, options );

    super( position, speed, direction );

    this.wavelength = wavelength; // @public (read-only)
    this.emitted = options.emitted; // @public (read-only)
    this.collided = options.collided; // @public
  }

  /**
   * Gets the Color associated with the photon's wavelength.
   * @returns {Color}
   * @public
   */
  getColor() {
    return VisibleColor.wavelengthToColor( this.wavelength, {
      uvColor: MOTHAColorProfile.UV_COLOR,
      irColor: MOTHAColorProfile.IR_COLOR
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );
export default Photon;