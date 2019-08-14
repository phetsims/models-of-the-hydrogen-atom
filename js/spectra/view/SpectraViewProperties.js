// Copyright 2019, University of Colorado Boulder

/**
 * SpectraViewProperties defines Properties that are specific to the view in the 'Spectra' screen.
 * It adds no additional Properties to the base class, but is provided for symmetry in the model-view type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAViewProperties = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/MOTHAViewProperties' );

  class SpectraViewProperties extends MOTHAViewProperties {

    constructor() {
      super();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'SpectraViewProperties', SpectraViewProperties );
} );
