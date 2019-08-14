// Copyright 2019, University of Colorado Boulder

//TODO replace this enum with instances of the models
/**
 * PredictiveModels identifies the predictive models supported by this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const PredictiveModels = new Enumeration( [
    'BILLIARD_BALL',
    'PLUM_PUDDING',
    'CLASSICAL_SOLAR_SYSTEM',
    'BOHR',
    'DEBROGLIE',
    'SCHRODINGER'
  ] );

  return modelsOfTheHydrogenAtom.register( 'PredictiveModels', PredictiveModels );
} );