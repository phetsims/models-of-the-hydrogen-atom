// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAColors defines the colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { ProfileColorProperty } from '../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const MOTHAColors = {

  //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/7 should these be changeable?
  //TODO why are these the same color?
  UV_COLOR: 'rgb( 160, 160, 160 )',
  IR_COLOR: 'rgb( 160, 160, 160 )',

  screenBackgroundColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'screenBackgroundColor', {
    default: 'black',
    projector: 'white'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Box
  //------------------------------------------------------------------------------------------------------------------

  boxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'boxFill', {
    default: 'black',
    projector: 'white'
  } ),

  boxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'boxStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Legend
  //------------------------------------------------------------------------------------------------------------------

  legendTitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'legendTitleFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  legendTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'legendTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Light
  //------------------------------------------------------------------------------------------------------------------

  lightModeRadioButtonFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'lightModeRadioButtonFill', {
    default: 'black',
    projector: 'white'
  } ),

  lightModeRadioButtonSelectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'lightModeRadioButtonSelectedStroke', {
    default: 'rgb( 235, 235, 0 )'
  } ),

  lightModeRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'lightModeRadioButtonDeselectedStroke', {
    default: 'rgb( 200, 200, 200 )'
  } ),

  showAbsorptionWavelengthTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'showAbsorptionWavelengthTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  showAbsorptionWavelengthCheckboxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'showAbsorptionWavelengthCheckboxFill', {
    default: 'black',
    projector: 'white'
  } ),

  showAbsorptionWavelengthCheckboxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'showAbsorptionWavelengthCheckboxStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Models panel
  //------------------------------------------------------------------------------------------------------------------

  abSwitchTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'abSwitchTextFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  modelsPanelFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsPanelFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsPanelStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsPanelStroke', {
    default: 'white',
    projector: 'black'
  } ),

  modelsRadioButtonTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  modelsRadioButtonFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsRadioButtonSelectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonSelectedStroke', {
    default: 'rgb( 235, 235, 0 )'
  } ),

  modelsRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonDeselectedStroke', {
    default: 'rgb( 200, 200, 200 )'
  } ),

  continuumBarFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarFill', {
    default: 'rgb( 220, 220, 220 )'
  } ),

  continuumBarTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarTextFill', {
    default: 'black'
  } ),

  timeControlRadioButtonFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'timeControlRadioButtonFill', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Spectrometer
  //------------------------------------------------------------------------------------------------------------------

  spectrometerTitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerTitleFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  spectrometerSubtitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerSubtitleFill', {
    default: 'white',
    projector: 'black'
  } ),

  spectrometerAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerAccordionBoxFill', {
    default: 'rgb( 80, 80, 80 )',
    projector: 'white'
  } ),

  spectrometerAccordionBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerAccordionBoxStroke', {
    default: 'rgb( 140, 140, 140 )',
    projector: 'black'
  } ),

  spectrometerFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerFill', {
    default: 'black',
    projector: 'white'
  } ),

  spectrometerStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Snapshots dialog
  //------------------------------------------------------------------------------------------------------------------

  snapshotsDialogFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'snapshotsDialogFill', {
    default: 'white'
  } ),

  snapshotTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'snapshotTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Electron Energy Level
  //------------------------------------------------------------------------------------------------------------------

  electronEnergyLevelTitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelTitleFill', {
    default: 'rgb( 235, 235, 0 )', // yellow
    projector: 'black'
  } ),

  electronEnergyLevelAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxFill', {
    default: 'rgb( 80, 80, 80 )',
    projector: 'white'
  } ),

  electronEnergyLevelAccordionBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxStroke', {
    default: 'rgb( 140, 140, 140 )',
    projector: 'black'
  } )
};

modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );
export default MOTHAColors;