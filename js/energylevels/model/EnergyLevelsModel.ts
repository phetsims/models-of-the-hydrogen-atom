// Copyright 2015-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BohrModel from '../../common/model/BohrModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class EnergyLevelsModel extends MOTHAModel {

  constructor() {

    // Predictive models supported by this screen, in the order that they will appear in the UI
    const predictiveModels = [
      new BohrModel(),
      new DeBroglieModel(),
      new SchrodingerModel()
    ];
    assert && assert( _.every( predictiveModels, model => model.hasTransitionWavelengths ),
      'all models in this screen must include the concept of transition wavelengths' );

    super( predictiveModels, predictiveModels[ 0 ] );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );
export default EnergyLevelsModel;