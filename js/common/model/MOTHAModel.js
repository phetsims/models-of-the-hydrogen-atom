// Copyright 2019, University of Colorado Boulder

/**
 * MOTHAModel is the base class for the model in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const Light = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/Light' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModels = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModels' );

  class MOTHAModel {

    /**
     * @param {*} initialPredictiveModel - a value from PredictiveModels enum
     */
    constructor( initialPredictiveModel ) {

      assert && assert( PredictiveModels.includes( initialPredictiveModel ),
        `invalid initialPredictiveModel ${initialPredictiveModel}` );

      // @public which predictive model is being used
      this.predictiveModelProperty = new EnumerationProperty( PredictiveModels, initialPredictiveModel );

      // @public
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

  // @public models that include the concept of transition wavelengths
  MOTHAModel.PREDICTIVE_MODELS_WITH_TRANSITION_WAVELENGTHS = [
    PredictiveModels.BOHR,
    PredictiveModels.DEBROGLIE,
    PredictiveModels.SCHRODINGER
  ];

  return modelsOfTheHydrogenAtom.register( 'MOTHAModel', MOTHAModel );
} ); 