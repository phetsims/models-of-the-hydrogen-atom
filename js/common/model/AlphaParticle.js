// Copyright 2016-2020, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle from './Particle.js';

class AlphaParticle extends Particle {

  /**
   * @param {Vector2} position - position in model coordinate frame
   * @param {number} speed - distance per dt
   * @param {number} direction - direction of motion, in radians
   */
  constructor( position, speed, direction ) {
    super( position, speed, direction );
  }
}

modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );
export default AlphaParticle;