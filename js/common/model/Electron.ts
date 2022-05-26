// Copyright 2022, University of Colorado Boulder

/**
 * Electron is the model of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';

type SelfOptions = {};

type ElectronOptions = SelfOptions & ParticleOptions;

export default class Electron extends Particle {

  constructor( providedOptions?: ElectronOptions ) {

    const options = optionize<ElectronOptions, SelfOptions, ParticleOptions>()( {

      radius: 5
      //TODO phetioType: Photon.PhotonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'Electron', Electron );