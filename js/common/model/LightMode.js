// Copyright 2019, University of Colorado Boulder

/**
 * Modes for the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const LightMode = new Enumeration( [ 'WHITE', 'MONOCHROMATIC' ] );

  return modelsOfTheHydrogenAtom.register( 'LightMode', LightMode );
} );