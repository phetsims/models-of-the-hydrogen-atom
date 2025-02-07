// Copyright 2019-2025, University of Colorado Boulder

/**
 * MOTHAColors defines the colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetColorScheme from '../../../scenery-phet/js/PhetColorScheme.js';
import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';
import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const MOTHAColors = {

  // Joist requires 'black' and 'white' to change the navigation bar color, so do not change these colors.
  // Instead, see screenBackgroundRectangleColorProperty.
  screenBackgroundColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'screenBackgroundColor', {
    default: 'black',
    projector: 'white'
  } ),

  // We do not want the screen background to be pure 'black' and 'white', so we have worked around the joist
  // deficiency by adding a rectangle that covers the ScreenView's visible bounds.  This allows us to use
  // shades of gray that are close to 'black' and 'white', while still getting the desired color for the
  // navigation bar. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/96.
  screenBackgroundRectangleColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'screenBackgroundRectangleColor', {
    default: Color.grayColor( 35 ),
    projector: Color.grayColor( 235 )
  } ),

  panelFillColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'panelFillColor', {
    default: 'black',
    projector: 'white'
  } ),

  panelStrokeColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'panelStrokeColor', {
    default: Color.grayColor( 180 ),
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
    default: 'rgb( 108, 186, 223 )',
    projector: 'rgb( 6, 144, 249 )'
  } ),

  electronHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronHighlightColor', {
    default: 'rgb( 169, 214, 231 )',
    projector: 'rgb( 172, 217, 251 )'
  } ),

  protonBaseColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'protonBaseColor', {
    default: PhetColorScheme.RED_COLORBLIND
  } ),

  protonHighlightColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'protonHighlightColor', {
    default: 'rgb( 255, 130, 130 )'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Light Source
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
  // Atomic Models panel
  //------------------------------------------------------------------------------------------------------------------

  switchTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'switchTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  modelsRadioButtonFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonFill', {
    default: 'black',
    projector: 'white'
  } ),

  modelsRadioButtonSelectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonSelectedStroke', {
    default: PhetColorScheme.BUTTON_YELLOW
  } ),

  modelsRadioButtonDeselectedStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonDeselectedStroke', {
    default: Color.grayColor( 120 ),
    projector: Color.grayColor( 180 )
  } ),

  modelsRadioButtonOverStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'modelsRadioButtonOverStroke', {
    default: 'white',
    projector: 'black'
  } ),

  continuumBarFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarFill', {
    default: Color.grayColor( 230 ),
    projector: 'white'
  } ),

  continuumBarStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarStroke', {
    default: Color.grayColor( 180 )
  } ),

  continuumBarTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'continuumBarTextFill', {
    default: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Spectrometer
  //------------------------------------------------------------------------------------------------------------------

  spectrometerTitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerTitleFill', {
    default: 'white',
    projector: 'black'
  } ),

  spectrometerAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerAccordionBoxFill', {
    default: 'black',
    projector: 'white'
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
    default: 'black',
    projector: 'white'
  } ),

  spectrometerTickColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'spectrometerTickColor', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Spectrometer Snapshots
  //------------------------------------------------------------------------------------------------------------------

  snapshotsDialogFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'snapshotsDialogFill', {
    default: 'white'
  } ),

  snapshotFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'snapshotFill', {
    default: 'black',
    projector: 'white'
  } ),

  snapshotStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'snapshotStroke', {
    default: 'white',
    projector: 'black'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Electron Energy Level diagrams
  //------------------------------------------------------------------------------------------------------------------

  electronEnergyLevelTitleFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelTitleFill', {
    default: 'white',
    projector: 'black'
  } ),

  electronEnergyLevelAccordionBoxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'electronEnergyLevelAccordionBoxFill', {
    default: 'black',
    projector: 'white'
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
  // Buttons
  //------------------------------------------------------------------------------------------------------------------

  // Base color for most push buttons.
  pushButtonColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'pushButtonColor', {
    default: Color.grayColor( 200 )
  } ),

  exciteElectronButtonColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'exciteElectronButtonColor', {
    default: PhetColorScheme.BUTTON_YELLOW
  } ),

  stateInfoButtonFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'stateInfoButtonFill', {
    default: 'rgb( 0, 111, 153 )'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Miscellaneous
  //------------------------------------------------------------------------------------------------------------------

  // Catch-all for text that needs to switch between white and black.
  invertibleTextFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'invertibleTextFill', {
    default: 'white',
    projector: 'black'
  } ),

  xzAxesColorProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'xzAxesColor', {
    default: 'white',
    projector: 'black'
  } ),

  checkboxStrokeProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'checkboxStroke', {
    default: 'white',
    projector: 'black'
  } ),

  checkboxFillProperty: new ProfileColorProperty( modelsOfTheHydrogenAtom, 'checkboxFill', {
    default: 'black',
    projector: 'white'
  } ),

  //------------------------------------------------------------------------------------------------------------------
  // Static colors
  //------------------------------------------------------------------------------------------------------------------

  UV_COLOR: 'rgb( 160, 160, 160 )',
  IR_COLOR: 'rgb( 160, 160, 160 )',

  // Sparkle in the center of photons.
  VISIBLE_SPARKLE_COLOR: 'rgba( 255, 255, 255, 0.4 )',
  UV_SPARKLE_COLOR: VisibleColor.wavelengthToColor( 400 ),
  IR_SPARKLE_COLOR: VisibleColor.wavelengthToColor( 715 ),

  // Holo colors for specific photons, for debugging with ?showHalos
  SPONTANEOUS_EMISSION_HALO_COLOR: Color.RED,
  STIMULATED_EMISSION_HALO_COLOR: Color.GREEN,
  EXCITE_METASTABLE_HALO_COLOR: Color.BLUE
};

modelsOfTheHydrogenAtom.register( 'MOTHAColors', MOTHAColors );
export default MOTHAColors;