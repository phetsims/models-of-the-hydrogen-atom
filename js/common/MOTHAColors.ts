// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAColors defines the colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const YELLOW = 'rgb( 235, 235, 0 )';

const MOTHAColors = {

  //TODO Should these be changeable? Why are these the same color?
  UV_COLOR: 'rgb( 160, 160, 160 )',
  IR_COLOR: 'rgb( 160, 160, 160 )',

  screenBackgroundColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'screenBackgroundColor', {
    default: 'black',
    projector: 'white'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Boxes
  //------------------------------------------------------------------------------------------------------------------

  boxOfHydrogenLightFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'boxOfHydrogenLightFill', {
    default: 'rgb( 249, 249, 249 )'
  } ),

  boxOfHydrogenDarkFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'boxOfHydrogenDarkFill', {
    default: Color.grayColor( 100 )
  } ),

  boxOfHydrogenStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'boxOfHydrogenStroke', {
    default: 'black'
  } ),

  boxOfHydrogenSymbolColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'boxOfHydrogenSymbolColor', {
    default: 'black'
  } ),

  zoomedInBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'zoomedInBoxFill', {
    default: 'black',
    projector: 'white'
  } ),

  zoomedInBoxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'zoomedInBoxStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Particles
  //------------------------------------------------------------------------------------------------------------------

  electronBaseColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronBaseColor', {
    default: 'rgb( 120, 120, 255 )'
  } ),

  electronHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronHighlightColor', {
    default: 'rgb( 140, 140, 255 )'
  } ),

  neutronBaseColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'neutronBaseColor', {
    default: 'rgb( 128, 128, 128 )'
  } ),

  neutronHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'neutronHighlightColor', {
    default: 'rgb( 175, 175, 175 )'
  } ),

  protonBaseColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'protonBaseColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),

  protonHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'protonHighlightColor', {
    default: 'rgb( 255, 130, 130 )'
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

  switchTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'switchTextFill', {
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
  // Hydrogen Atom models
  //------------------------------------------------------------------------------------------------------------------

  billiardBallColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'billiardBallColor', {
    default: 'rgb( 196, 78, 14 )'
  } ),

  billiardBallHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'billiardBallHighlightColor', {
    default: 'rgb( 255, 141, 21 )'
  } ),

  deBroglieNegativeAmplitudeColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'deBroglieNegativeAmplitudeColor', {
    default: 'black'
  } ),

  orbitStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'orbitStroke', {
    default: 'white',
    projector: 'black'
  } ),

  stateDisplayFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'stateDisplayFill', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Miscellaneous
  //------------------------------------------------------------------------------------------------------------------

  pushButtonBaseColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'pushButtonBaseColor', {
    default: Color.grayColor( 245 )
  } ),

  xzAxesColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'xzAxesColor', {
    default: 'white',
    projector: 'black'
  } ),

  exciteButtonColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'exciteButtonColor', {
    default: PhetColorScheme.BUTTON_YELLOW
  } )
};

modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );
export default MOTHAColors;