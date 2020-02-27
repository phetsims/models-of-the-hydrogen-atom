// Copyright 2015-2019, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from './Light.js';
import PredictiveModel from './PredictiveModel.js';

class MOTHAModel {

  /**
   * @param {PredictiveModel[]} predictiveModels
   * @param {PredictiveModel} initialPredictiveModel - an element in predictiveModels
   */
  constructor( predictiveModels, initialPredictiveModel ) {

    // @public (read-only)
    this.predictiveModels = predictiveModels;

    // @public {Property.<PredictiveModel>} which predictive model is selected
    this.predictiveModelProperty = new Property( initialPredictiveModel, {
      valueType: PredictiveModel,
      isValidValue: value => _.includes( predictiveModels, value )
    } );

    // @public (read-only)
    this.light = new Light();
  }

  /**
   * @public
   */
  reset() {
    this.predictiveModelProperty.reset();
    this.light.reset();
  }

  /**
   * @param {number} dt
   * @public
   */
  step( dt ) {
    //TODO
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );
export default MOTHAModel;