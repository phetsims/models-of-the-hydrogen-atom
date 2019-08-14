// Copyright 2015-2019, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BilliardBallModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/BilliardBallModel' );
  const BohrModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/BohrModel' );
  const ClassicalSolarSystemModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ClassicalSolarSystemModel' );
  const DeBroglieModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/DeBroglieModel' );
  const MOTHAModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/MOTHAModel' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PlumPuddingModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PlumPuddingModel' );
  const SchrodingerModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/SchrodingerModel' );

  class SpectraModel extends MOTHAModel {

    constructor() {

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

  return modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );
} );