// Copyright 2019, University of Colorado Boulder

//TODO better name for this?
/**
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const ModelModes = new Enumeration( [
    'EXPERIMENT',
    'PREDICTION'
  ] );

  return modelsOfTheHydrogenAtom.register( 'ModelModes', ModelModes );
} );