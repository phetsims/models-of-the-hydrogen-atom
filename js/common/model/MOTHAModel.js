// Copyright 2015-2019, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );
  const Property = require( 'AXON/Property' );

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

  return modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );
} );