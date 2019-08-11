// Copyright 2019, University of Colorado Boulder

/**
 * GasPropertiesColorProfile defines the color profiles for this simulation.
 * Default colors are required. Colors for other profiles are optional.
 * Profile 'projector' is used for Projector Mode, which can be set via the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  const MOTHAColorProfile = new ColorProfile( [ 'default', 'projector' ], {

    screenBackgroundColor: {
      default: 'black',
      projector: 'white'
    }

  } );

  return modelsOfTheHydrogenAtom.register( 'MOTHAColorProfile', MOTHAColorProfile );
} );