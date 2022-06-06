// Copyright 2022, University of Colorado Boulder

/**
 * Electron is the model of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';

let electronCounter = 0; //TODO delete this

type SelfOptions = {};

type ElectronOptions = SelfOptions & ParticleOptions;

export default class Electron extends Particle {

  private readonly id: number;

  public constructor( providedOptions?: ElectronOptions ) {

    const options = optionize<ElectronOptions, SelfOptions, ParticleOptions>()( {

      radius: 5
      //TODO phetioType: Photon.PhotonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );

    this.id = electronCounter++;

    phet.log && this.positionProperty.lazyLink( position => phet.log( `electron ${this.id} moved: ${position}` ) );
  }
}

modelsOfTheHydrogenAtom.register( 'Electron', Electron );