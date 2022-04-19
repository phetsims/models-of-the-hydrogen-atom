// Copyright 2016-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAScreen from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from './model/EnergyLevelsModel.js';
import EnergyLevelsScreenView from './view/EnergyLevelsScreenView.js';

class EnergyLevelsScreen extends MOTHAScreen {

  constructor() {

    const options = {
      name: modelsOfTheHydrogenAtomStrings.screen.energyLevels
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