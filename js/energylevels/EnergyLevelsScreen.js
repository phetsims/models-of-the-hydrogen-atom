// Copyright 2016-2020, University of Colorado Boulder

/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAScreen from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from './model/EnergyLevelsModel.js';
import EnergyLevelsScreenView from './view/EnergyLevelsScreenView.js';

const screenEnergyLevelsString = modelsOfTheHydrogenAtomStrings.screen.energyLevels;

class EnergyLevelsScreen extends MOTHAScreen {

  constructor() {

    const options = {
      name: screenEnergyLevelsString
      //TODO add homeScreenIcon
    };

    super(
      () => new EnergyLevelsModel(),
      model => new EnergyLevelsScreenView( model ),
      options
    );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );
export default EnergyLevelsScreen;