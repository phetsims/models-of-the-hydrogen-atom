// Copyright 2022-2023, University of Colorado Boulder

/**
 * Electron is the model of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type ElectronOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius'>;

export default class Electron extends Particle {

  public constructor( providedOptions: ElectronOptions ) {

    const options = optionize<ElectronOptions, SelfOptions, ParticleOptions>()( {

      // ParticleOptions
      radius: MOTHAConstants.ELECTRON_RADIUS
      //TODO phetioType: Photon.PhotonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }

  public override dispose(): void {
    Disposable.assertNotDisposable();
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'Electron', Electron );