// Copyright 2015-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import EnergyLevelsScreen from './energylevels/EnergyLevelsScreen.js';
import ModelsOfTheHydrogenAtomStrings from './ModelsOfTheHydrogenAtomStrings.js';
import SpectraScreen from './spectra/SpectraScreen.js';

simLauncher.launch( () => {

  const titleStringProperty = ModelsOfTheHydrogenAtomStrings[ 'models-of-the-hydrogen-atom' ].titleStringProperty;

  const screens = [
    new SpectraScreen( { tandem: Tandem.ROOT.createTandem( 'spectraScreen' ) } ),
    new EnergyLevelsScreen( { tandem: Tandem.ROOT.createTandem( 'energyLevelsScreen' ) } )
  ];

  const options: SimOptions = {


    preferencesModel: new PreferencesModel( {
      visualOptions: {
        supportsProjectorMode: true
      }
    } ),

    credits: {
      //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/23 update credits
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Mindy Gratny, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
            'Noah Podolefsky, Carl Wieman',
      qualityAssurance: ''
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );