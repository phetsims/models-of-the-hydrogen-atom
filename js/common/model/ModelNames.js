// Copyright 2019, University of Colorado Boulder

/**
 * The various models of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const ModelNames = new Enumeration( [
    'BILLIARD_BALL',
    'PLUM_PUDDING',
    'CLASSICAL_SOLAR_SYSTEM',
    'BOHR',
    'DEBROGLIE',
    'SCHRODINGER'
  ] );

  return modelsOfTheHydrogenAtom.register( 'ModelNames', ModelNames );
} );