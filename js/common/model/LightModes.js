// Copyright 2019, University of Colorado Boulder

/**
 * LightModes defines the operational modes for the light that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const LightModes = new Enumeration( [ 'WHITE', 'MONOCHROMATIC' ] );

  return modelsOfTheHydrogenAtom.register( 'LightModes', LightModes );
} );