// Copyright 2016-2022, University of Colorado Boulder

/**
 * AlphaParticle is the model of an alpha particle.
 * An alpha particle has a position and direction of motion.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';

type SelfOptions = {};

type AlphaParticleOptions = SelfOptions & ParticleOptions;

export default class AlphaParticle extends Particle {

  constructor( providedOptions: AlphaParticleOptions ) {

    const options = optionize<AlphaParticleOptions, SelfOptions, ParticleOptions>()( {

      radius: 20 //TODO what is the correct value?
      //TODO phetioType: AlphaParticle.AlphaParticleIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'AlphaParticle', AlphaParticle );