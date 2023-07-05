// Copyright 2022-2023, University of Colorado Boulder

/**
 * Proton is the model of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type ProtonOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'>;

export default class Proton extends Particle {

  public constructor( providedOptions: ProtonOptions ) {

    const options = optionize<ProtonOptions, SelfOptions, ParticleOptions>()( {

      // ParticleOptions
      radius: MOTHAConstants.PROTON_RADIUS,
      isDisposable: false
      //TODO phetioType: Proton.ProtonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'Proton', Proton );