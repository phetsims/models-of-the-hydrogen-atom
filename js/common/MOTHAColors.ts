// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAColors defines the colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const DEFAULT_PANEL_FILL = Color.grayColor( 80 );
const PROJECTOR_PANEL_FILL = Color.grayColor( 235 );
const DEFAULT_PANEL_STROKE = Color.grayColor( 180 );
const PROJECTOR_PANEL_STROKE = 'black';
const YELLOW = 'rgb( 235, 235, 0 )';

const MOTHAColors = {

  //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/7 should these be changeable?
  //TODO why are these the same color?
  UV_COLOR: 'rgb( 160, 160, 160 )',
  IR_COLOR: 'rgb( 160, 160, 160 )',

  screenBackgroundColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'screenBackgroundColor', {
    default: Color.grayColor( 115 ),
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
    default: YELLOW,
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
    default: 'black'
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

  //------------------------------------------------------------------------------------------------------------------
  // Models panel
  //------------------------------------------------------------------------------------------------------------------

  abSwitchTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'abSwitchTextFill', {
    default: YELLOW,
    projector: 'black'
  } ),

  modelsPanelFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsPanelFill', {
    default: DEFAULT_PANEL_FILL,
    projector: PROJECTOR_PANEL_FILL
  } ),

  modelsPanelStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsPanelStroke', {
    default: DEFAULT_PANEL_STROKE,
    projector: PROJECTOR_PANEL_STROKE
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
    default: DEFAULT_PANEL_FILL,
    projector: PROJECTOR_PANEL_FILL
  } ),

  spectrometerAccordionBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerAccordionBoxStroke', {
    default: DEFAULT_PANEL_STROKE,
    projector: PROJECTOR_PANEL_STROKE
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
    default: YELLOW,
    projector: 'black'
  } ),

  electronEnergyLevelAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxFill', {
    default: DEFAULT_PANEL_FILL,
    projector: PROJECTOR_PANEL_FILL
  } ),

  electronEnergyLevelAccordionBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxStroke', {
    default: DEFAULT_PANEL_STROKE,
    projector: PROJECTOR_PANEL_STROKE
  } )
};

modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );
export default MOTHAColors;