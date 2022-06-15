// Copyright 2022, University of Colorado Boulder

/**
 * Neutron is the model of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptyObjectType;

type NeutronOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'>;

export default class Neutron extends Particle {

  public constructor( providedOptions: NeutronOptions ) {

    const options = optionize<NeutronOptions, SelfOptions, ParticleOptions>()( {

      radius: MOTHAConstants.NEUTRON_RADIUS
      //TODO phetioType: Neutron.NeutronIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'Neutron', Neutron );