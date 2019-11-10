// Copyright 2019, University of Colorado Boulder

/**
 * MOTHAColorProfile defines the color profiles for this simulation.
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

    //------------------------------------------------------------------------------------------------------------------
    // Box
    //------------------------------------------------------------------------------------------------------------------

    boxFill: {
      default: 'black',
      projector: 'white'
    },

    boxStroke: {
      default: 'white',
      projector: 'black'
    },

    //------------------------------------------------------------------------------------------------------------------
    // Legend
    //------------------------------------------------------------------------------------------------------------------

    legendTitleFill: {
      default: 'rgb( 235, 235, 0 )', // yellow
      projector: 'black'
    },

    legendTextFill: {
      default: 'white',
      projector: 'black'
    },

    //------------------------------------------------------------------------------------------------------------------
    // Light
    //------------------------------------------------------------------------------------------------------------------

    lightModeRadioButtonFill: {
      default: 'black',
      projector: 'white'
    },

    lightModeRadioButtonSelectedStroke: {
      default: 'rgb( 235, 235, 0 )'
    },

    lightModeRadioButtonDeselectedStroke: {
      default: 'rgb( 200, 200, 200 )'
    },

    showAbsorptionWavelengthTextFill: {
      default: 'white',
      projector: 'black'
    },

    showAbsorptionWavelengthCheckboxFill: {
      default: 'black',
      projector: 'white'
    },

    showAbsorptionWavelengthCheckboxStroke: {
      default: 'white',
      projector: 'black'
    },

    //------------------------------------------------------------------------------------------------------------------
    // Models panel
    //------------------------------------------------------------------------------------------------------------------

    abSwitchTextFill: {
      default: 'rgb( 235, 235, 0 )', // yellow
      projector: 'black'
    },

    modelsPanelFill: {
      default: 'black',
      projector: 'white'
    },

    modelsPanelStroke: {
      default: 'white',
      projector: 'black'
    },

    modelsRadioButtonTextFill: {
      default: 'white',
      projector: 'black'
    },

    modelsRadioButtonFill: {
      default: 'black',
      projector: 'white'
    },

    modelsRadioButtonSelectedStroke: {
      default: 'rgb( 235, 235, 0 )'
    },

    modelsRadioButtonDeselectedStroke: {
      default: 'rgb( 200, 200, 200 )'
    },

    continuumBarFill: {
      default: 'rgb( 220, 220, 220 )'
    },

    continuumBarTextFill: {
      default: 'black'
    },

    //------------------------------------------------------------------------------------------------------------------
    // Spectrometer
    //------------------------------------------------------------------------------------------------------------------

    spectrometerTitleFill: {
      default: 'rgb( 235, 235, 0 )', // yellow
      projector: 'black'
    },

    spectrometerSubtitleFill: {
      default: 'white',
      projector: 'black'
    },

    spectrometerAccordionBoxFill: {
      default: 'rgb( 80, 80, 80 )',
      projector: 'white'
    },

    spectrometerAccordionBoxStroke: {
      default: 'rgb( 140, 140, 140 )',
      projector: 'black'
    },

    spectrometerFill: {
      default: 'black',
      projector: 'white'
    },

    spectrometerStroke: {
      default: 'white',
      projector: 'black'
    },

    //------------------------------------------------------------------------------------------------------------------
    // Snapshots dialog
    //------------------------------------------------------------------------------------------------------------------

    snapshotsDialogFill: {
      default: 'white'
    },
    
    snapshotTextFill: {
      default: 'white',
      projector: 'black'
    },

    //------------------------------------------------------------------------------------------------------------------
    // Electron Energy Level
    //------------------------------------------------------------------------------------------------------------------

    electronEnergyLevelTitleFill: {
      default: 'rgb( 235, 235, 0 )', // yellow
      projector: 'black'
    },

    electronEnergyLevelAccordionBoxFill: {
      default: 'rgb( 80, 80, 80 )',
      projector: 'white'
    },

    electronEnergyLevelAccordionBoxStroke: {
      default: 'rgb( 140, 140, 140 )',
      projector: 'black'
    }

  } );

  //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/7 should these be changeable?
  MOTHAColorProfile.UV_COLOR = 'rgb( 160, 160, 160 )';
  MOTHAColorProfile.IR_COLOR = 'rgb( 160, 160, 160 )';

  return modelsOfTheHydrogenAtom.register( 'MOTHAColorProfile', MOTHAColorProfile );
} );