// Copyright 2019, University of Colorado Boulder

/**
 * Speed options for the simulation clock.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const ClockSpeeds = new Enumeration( [ 'FAST', 'NORMAL', 'SLOW' ] );

  return modelsOfTheHydrogenAtom.register( 'ClockSpeeds', ClockSpeeds );
} );