// Copyright 2015-2019, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BilliardBallModel from '../../common/model/BilliardBallModel.js';
import BohrModel from '../../common/model/BohrModel.js';
import ClassicalSolarSystemModel from '../../common/model/ClassicalSolarSystemModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import PlumPuddingModel from '../../common/model/PlumPuddingModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class SpectraModel extends MOTHAModel {

  constructor() {

    // Predictive models supported by this screen, in the order that they will appear in the UI
    const predictiveModels = [
      new BilliardBallModel(),
      new PlumPuddingModel(),
      new ClassicalSolarSystemModel(),
      new BohrModel(),
      new DeBroglieModel(),
      new SchrodingerModel()
    ];

    super( predictiveModels, predictiveModels[ 2 ] );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );
export default SpectraModel;