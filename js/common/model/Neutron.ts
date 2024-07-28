// Copyright 2022-2024, University of Colorado Boulder

/**
 * Neutron is the model of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type NeutronOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'>;

export default class Neutron extends Particle {

  public constructor( providedOptions: NeutronOptions ) {

    const options = optionize<NeutronOptions, SelfOptions, ParticleOptions>()( {

      // ParticleOptions
      isDisposable: false,
      radius: MOTHAConstants.NEUTRON_RADIUS
      //TODO phetioType: Neutron.NeutronIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'Neutron', Neutron );