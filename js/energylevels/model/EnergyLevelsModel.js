// Copyright 2015-2019, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BohrModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/BohrModel' );
  const DeBroglieModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/DeBroglieModel' );
  const MOTHAModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/MOTHAModel' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const SchrodingerModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/SchrodingerModel' );

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

  return modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );
} );