// Copyright 2019-2020, University of Colorado Boulder

/**
 * MOTHAColorProfile defines the color profiles for this simulation.
 * Default colors are required. Colors for other profiles are optional.
 * Profile 'projector' is used for Projector Mode, which can be set via the Options dialog.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const MOTHAColorProfile = {

  screenBackgroundColorProperty: new ProfileColorProperty( 'screenBackgroundColor', {
    default: 'black',
    projector: 'white'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Box
  //------------------------------------------------------------------------------------------------------------------

  boxFillProperty: new ProfileColorProperty( 'boxFill', {
    default: 'black',
    projector: 'white'
  } ),

  boxStrokeProperty: new ProfileColorProperty( 'boxStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Legend
  //------------------------------------------------------------------------------------------------------------------

  legendTitleFillProperty: new ProfileColorProperty( 'legendTitleFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  legendTextFillProperty: new ProfileColorProperty( 'legendTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Light
  //------------------------------------------------------------------------------------------------------------------

  lightModeRadioButtonFillProperty: new ProfileColorProperty( 'lightModeRadioButtonFill', {
    default: 'black',
    projector: 'white'
  } ),

  lightModeRadioButtonSelectedStrokeProperty: new ProfileColorProperty( 'lightModeRadioButtonSelectedStroke', {
    default: 'rgb( 235, 235, 0 )'
  } ),

  lightModeRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( 'lightModeRadioButtonDeselectedStroke', {
    default: 'rgb( 200, 200, 200 )'
  } ),

  showAbsorptionWavelengthTextFillProperty: new ProfileColorProperty( 'showAbsorptionWavelengthTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  showAbsorptionWavelengthCheckboxFillProperty: new ProfileColorProperty( 'showAbsorptionWavelengthCheckboxFill', {
    default: 'black',
    projector: 'white'
  } ),

  showAbsorptionWavelengthCheckboxStrokeProperty: new ProfileColorProperty( 'showAbsorptionWavelengthCheckboxStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Models panel
  //------------------------------------------------------------------------------------------------------------------

  abSwitchTextFillProperty: new ProfileColorProperty( 'abSwitchTextFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  modelsPanelFillProperty: new ProfileColorProperty( 'modelsPanelFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsPanelStrokeProperty: new ProfileColorProperty( 'modelsPanelStroke', {
    default: 'white',
    projector: 'black'
  } ),

  modelsRadioButtonTextFillProperty: new ProfileColorProperty( 'modelsRadioButtonTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  modelsRadioButtonFillProperty: new ProfileColorProperty( 'modelsRadioButtonFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsRadioButtonSelectedStrokeProperty: new ProfileColorProperty( 'modelsRadioButtonSelectedStroke', {
    default: 'rgb( 235, 235, 0 )'
  } ),

  modelsRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( 'modelsRadioButtonDeselectedStroke', {
    default: 'rgb( 200, 200, 200 )'
  } ),

  continuumBarFillProperty: new ProfileColorProperty( 'continuumBarFill', {
    default: 'rgb( 220, 220, 220 )'
  } ),

  continuumBarTextFillProperty: new ProfileColorProperty( 'continuumBarTextFill', {
    default: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Spectrometer
  //------------------------------------------------------------------------------------------------------------------

  spectrometerTitleFillProperty: new ProfileColorProperty( 'spectrometerTitleFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  spectrometerSubtitleFillProperty: new ProfileColorProperty( 'spectrometerSubtitleFill', {
    default: 'white',
    projector: 'black'
  } ),

  spectrometerAccordionBoxFillProperty: new ProfileColorProperty( 'spectrometerAccordionBoxFill', {
    default: 'rgb( 80, 80, 80 )',
    projector: 'white'
  } ),

  spectrometerAccordionBoxStrokeProperty: new ProfileColorProperty( 'spectrometerAccordionBoxStroke', {
    default: 'rgb( 140, 140, 140 )',
    projector: 'black'
  } ),

  spectrometerFillProperty: new ProfileColorProperty( 'spectrometerFill', {
    default: 'black',
    projector: 'white'
  } ),

  spectrometerStrokeProperty: new ProfileColorProperty( 'spectrometerStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Snapshots dialog
  //------------------------------------------------------------------------------------------------------------------

  snapshotsDialogFillProperty: new ProfileColorProperty( 'snapshotsDialogFill', {
    default: 'white'
  } ),

  snapshotTextFillProperty: new ProfileColorProperty( 'snapshotTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Electron Energy Level
  //------------------------------------------------------------------------------------------------------------------

  electronEnergyLevelTitleFillProperty: new ProfileColorProperty( 'electronEnergyLevelTitleFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  electronEnergyLevelAccordionBoxFillProperty: new ProfileColorProperty( 'electronEnergyLevelAccordionBoxFill', {
    default: 'rgb( 80, 80, 80 )',
    projector: 'white'
  } ),

  electronEnergyLevelAccordionBoxStrokeProperty: new ProfileColorProperty( 'electronEnergyLevelAccordionBoxStroke', {
    default: 'rgb( 140, 140, 140 )',
    projector: 'black'
  } )
};

//TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/7 should these be changeable?
MOTHAColorProfile.UV_COLOR = 'rgb( 160, 160, 160 )';
MOTHAColorProfile.IR_COLOR = 'rgb( 160, 160, 160 )';

modelsOfTheHydrogenAtom.register( 'MOTHAColorProfile', MOTHAColorProfile );
export default MOTHAColorProfile;