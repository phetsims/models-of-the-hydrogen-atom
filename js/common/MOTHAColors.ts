// Copyright 2019-2024, University of Colorado Boulder

/**
 * MOTHAColors defines the colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import { Color, ProfileColorProperty } from '../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';

const YELLOW = 'rgb( 235, 235, 0 )';

const MOTHAColors = {

  screenBackgroundColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'screenBackgroundColor', {
    default: 'black',
    projector: 'white'
  } ),

  panelFillColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'panelFillColor', {
    default: 'black',
    projector: 'white'
  } ),

  panelStrokeColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'panelStrokeColor', {
    default: 'white',
    projector: 'black'
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
  // Light
  //------------------------------------------------------------------------------------------------------------------

  wavelengthSliderThumbStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'wavelengthSliderThumbStroke', {
    default: 'white',
    projector: 'black'
  } ),

  wavelengthTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'wavelengthTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  wavelengthNumberDisplayFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'wavelengthNumberDisplayFill', {
    default: 'black',
    projector: 'white'
  } ),

  wavelengthNumberDisplayStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'wavelengthNumberDisplayStroke', {
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

  modelsRadioButtonFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsRadioButtonSelectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonSelectedStroke', {
    default: YELLOW
  } ),

  modelsRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonDeselectedStroke', {
    default: Color.grayColor( 60 ),
    projector: Color.grayColor( 230 )
  } ),

  modelsRadioButtonOverStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonOverStroke', {
    default: 'white',
    projector: 'black'
  } ),

  continuumBarFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarFill', {
    default: Color.grayColor( 220 )
  } ),

  continuumBarTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarTextFill', {
    default: 'black'
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

  // Catch-all for text that needs to switch between white and black.
  invertibleTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'invertibleTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  pushButtonBaseColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'pushButtonBaseColor', {
    default: Color.grayColor( 245 )
  } ),

  xzAxesColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'xzAxesColor', {
    default: 'white',
    projector: 'black'
  } ),

  exciteButtonColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'exciteButtonColor', {
    default: PhetColorScheme.BUTTON_YELLOW
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Static colors
  //------------------------------------------------------------------------------------------------------------------

  UV_COLOR: 'rgb( 160, 160, 160 )',
  IR_COLOR: 'rgb( 160, 160, 160 )',

  // Sparkle in the center of photons
  VISIBLE_SPARKLE_COLOR: 'rgba( 255, 255, 255, 0.4 )',
  UV_SPARKLE_COLOR: VisibleColor.wavelengthToColor( 400 ),
  IR_SPARKLE_COLOR: VisibleColor.wavelengthToColor( 715 )
};

modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );
export default MOTHAColors;