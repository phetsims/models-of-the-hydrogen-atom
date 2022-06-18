// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAColors defines the colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const YELLOW = 'rgb( 235, 235, 0 )';

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
  // Key to symbols
  //------------------------------------------------------------------------------------------------------------------

  keyTitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'keyTitleFill', {
    default: YELLOW,
    projector: 'black'
  } ),

  keyTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'keyTextFill', {
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
    default: YELLOW
  } ),

  lightModeRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'lightModeRadioButtonDeselectedStroke', {
    default: Color.grayColor( 200 )
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

  beamStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'beamStroke', {
    default: 'transparent',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Models panel
  //------------------------------------------------------------------------------------------------------------------

  abSwitchTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'abSwitchTextFill', {
    default: YELLOW,
    projector: 'black'
  } ),

  modelsPanelFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsPanelFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsPanelStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsPanelStroke', {
    default: Color.grayColor( 180 ),
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
    default: YELLOW
  } ),

  modelsRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonDeselectedStroke', {
    default: Color.grayColor( 200 )
  } ),

  continuumBarFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarFill', {
    default: Color.grayColor( 220 )
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
    default: YELLOW,
    projector: 'black'
  } ),

  spectrometerSubtitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerSubtitleFill', {
    default: 'white',
    projector: 'black'
  } ),

  spectrometerAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerAccordionBoxFill', {
    default: Color.grayColor( 80 ),
    projector: Color.grayColor( 235 )
  } ),

  spectrometerAccordionBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerAccordionBoxStroke', {
    default: Color.grayColor( 180 ),
    projector: 'black'
  } ),

  spectrometerFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerFill', {
    default: 'black',
    projector: 'white'
  } ),

  spectrometerStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerStroke', {
    default: Color.grayColor( 117 ),
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
    default: YELLOW,
    projector: 'black'
  } ),

  electronEnergyLevelAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxFill', {
    default: Color.grayColor( 80 ),
    projector: Color.grayColor( 235 )
  } ),

  electronEnergyLevelAccordionBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxStroke', {
    default: Color.grayColor( 180 ),
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Electron Energy Level
  //------------------------------------------------------------------------------------------------------------------

  billiardBallColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'billiardBallColor', {
    default: 'rgb( 196, 78, 14 )'
  } ),

  billiardBallHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'billiardBallHighlightColor', {
    default: 'rgb( 255, 141, 21 )'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Miscellaneous
  //------------------------------------------------------------------------------------------------------------------

  orbitStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'orbitStroke', {
    default: 'white',
    projector: 'black'
  } ),

  stateDisplayFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'stateDisplayFill', {
    default: 'white',
    projector: 'black'
  } )
};

modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );
export default MOTHAColors;