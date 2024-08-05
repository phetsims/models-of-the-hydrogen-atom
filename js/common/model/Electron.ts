// Copyright 2022-2024, University of Colorado Boulder

/**
 * Electron is the model of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

type ElectronOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'> & PickRequired<ParticleOptions, 'tandem'>;

export default class Electron extends Particle {

  public constructor( providedOptions: ElectronOptions ) {

    const options = optionize<ElectronOptions, SelfOptions, ParticleOptions>()( {

      // ParticleOptions
      isDisposable: false,
      radius: MOTHAConstants.ELECTRON_RADIUS
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'Electron', Electron );