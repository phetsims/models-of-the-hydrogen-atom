// Copyright 2016-2022, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle from './Particle.js';

export default class AlphaParticle extends Particle {

  constructor( position: Vector2, speed: number, direction: number ) {
    super( position, speed, direction );
  }
}

modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );