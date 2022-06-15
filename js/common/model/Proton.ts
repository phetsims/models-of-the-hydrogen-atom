// Copyright 2022, University of Colorado Boulder

/**
 * Proton is the model of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptyObjectType;

type ProtonOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'>;

export default class Proton extends Particle {

  public constructor( providedOptions: ProtonOptions ) {

    const options = optionize<ProtonOptions, SelfOptions, ParticleOptions>()( {

      radius: MOTHAConstants.PROTON_RADIUS
      //TODO phetioType: Proton.ProtonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'Proton', Proton );