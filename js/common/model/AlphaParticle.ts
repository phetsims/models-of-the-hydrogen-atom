// Copyright 2016-2022, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';

type SelfOptions = {};

type AlphaParticleOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius' | 'speed'>;

export default class AlphaParticle extends Particle {

  public static INITIAL_SPEED = 5;

  constructor( providedOptions: AlphaParticleOptions ) {

    const options = optionize<AlphaParticleOptions, SelfOptions, ParticleOptions>()( {

      // ParticleOptions
      radius: 20,
      speed: AlphaParticle.INITIAL_SPEED

      //TODO phetioType: AlphaParticle.AlphaParticleIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );