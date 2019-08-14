// Copyright 2015-2019, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const MOTHAModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/MOTHAModel' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PredictiveModels = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModels' );

  // predictive models supported by this screen
  const SUPPORTED_PREDICTIVE_MODELS = [
    PredictiveModels.BOHR,
    PredictiveModels.DEBROGLIE,
    PredictiveModels.SCHRODINGER
  ];

  class EnergyLevelsModel extends MOTHAModel {

    constructor() {

      super( SUPPORTED_PREDICTIVE_MODELS[ 0 ] );

      //TODO assert that all predictive models include the concept of transition wavelengths

      // This screen supports a subset of models, so verify that the model is supported by this screen.
      this.predictiveModelProperty.link( predictiveModel => {
        assert && assert( _.includes( SUPPORTED_PREDICTIVE_MODELS, predictiveModel ),
          `unsupported predictiveModel: ${predictiveModel}` );
      } );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );
} );