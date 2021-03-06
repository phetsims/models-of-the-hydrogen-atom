// Copyright 2015-2020, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import MOTHAOptionsNode from './common/view/MOTHAOptionsNode.js';
import EnergyLevelsScreen from './energylevels/EnergyLevelsScreen.js';
import modelsOfTheHydrogenAtomStrings from './modelsOfTheHydrogenAtomStrings.js';
import SpectraScreen from './spectra/SpectraScreen.js';

const simOptions = {

  // Creates content for the Options dialog, accessible via the PhET menu
  createOptionsDialogContent: tandem => new MOTHAOptionsNode( {
    tandem: tandem
  } ),

  credits: {
    //TODO update credits for JS version
    leadDesign: 'Amy Hanson, Sam McKagan',
    softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
    team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Mindy Gratny, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
          'Noah Podolefsky, Carl Weiman',
    qualityAssurance: ''
  }
};

simLauncher.launch( () => {
  const sim = new Sim(
    modelsOfTheHydrogenAtomStrings[ 'models-of-the-hydrogen-atom' ].title,
    [ new SpectraScreen(), new EnergyLevelsScreen() ],
    simOptions
  );
  sim.start();
} );