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
    },

    boxFill: {
      default: 'black',
      projector: 'white'
    },

    boxStroke: {
      default: 'white',
      projector: 'black'
    },

    titleFill: {
      default: 'rgb( 235, 235, 0 )', // yellow
      projector: 'black'
    },

    legendTextFill: {
      default: 'white',
      projector: 'black'
    },

    radioButtonSelectedStroke: {
      default: 'rgb( 235, 235, 0 )'
    },

    radioButtonDeselectedStroke: {
      default: 'rgb( 200, 200, 200 )'
    },

    radioButtonFill: {
      default: 'black',
      projector: 'white'
    },

    radioButtonTextFill: {
      default: 'white',
      projector: 'black'
    },

    panelFill: {
      default: 'black',
      projector: 'white'
    },

    panelStroke: {
      default: 'white',
      projector: 'black'
    },

    spectrometerSubtitleFill: {
     default: 'white',
     projector: 'black'
    },

    accordionBoxFill: {
      default: 'rgb( 80, 80, 80 )',
      projector: 'white'
    },

    accordionBoxStroke: {
      default: 'rgb( 140, 140, 140 )',
      projector: 'black'
    },

    uvColor: {
      default: 'rgb( 160, 160, 160 )'
    },

    irColor: {
      default: 'rgb( 160, 160, 160 )'
    }

  } );

  //TODO #7 should these be changeable?
  MOTHAColorProfile.UV_COLOR = 'rgb( 160, 160, 160 )';
  MOTHAColorProfile.IR_COLOR = 'rgb( 160, 160, 160 )';

  return modelsOfTheHydrogenAtom.register( 'MOTHAColorProfile', MOTHAColorProfile );
} );