// Copyright 2016-2022, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';

type SelfOptions = {};

type AlphaParticleOptions = SelfOptions & ParticleOptions;

export default class AlphaParticle extends Particle {

  constructor( providedOptions: AlphaParticleOptions ) {
    super( providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );