// Copyright 2016-2024, University of Colorado Boulder

/**
 * MOTHAConstants is the collection of constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import Range from '../../../dot/js/Range.js';
import Vector2 from '../../../dot/js/Vector2.js';
import TimeSpeed from '../../../scenery-phet/js/TimeSpeed.js';
import { ShadedSphereNodeOptions } from '../../../scenery-phet/js/ShadedSphereNode.js';
import { PanelOptions } from '../../../sun/js/Panel.js';
import { AccordionBoxOptions } from '../../../sun/js/AccordionBox.js';

const GROUND_STATE = 1;
const MAX_STATE = 6;
const MIN_UV_WAVELENGTH = 92; //TODO Why 92? Isn't UV range [100,400] nm?
const MAX_IR_WAVELENGTH = 7500; // slightly above 7460 nm for the 5 -> 6 state transition

const CORNER_RADIUS = 5;

const ACCORDION_BOX_OPTIONS: AccordionBoxOptions = {
  cornerRadius: CORNER_RADIUS,
  buttonXMargin: 8,
  buttonYMargin: 5,
  contentXMargin: 5,
  contentYMargin: 5,
  contentYSpacing: 0,
  buttonAlign: 'left',
  titleAlignX: 'left',
  titleXSpacing: 10,
  expandCollapseButtonOptions: {
    sideLength: 22,
    touchAreaXDilation: 10,
    touchAreaYDilation: 10
  }
};

const PANEL_OPTIONS: PanelOptions = {
  xMargin: 10,
  yMargin: 10,
  cornerRadius: CORNER_RADIUS
};

const SHADED_SPHERE_NODE_OPTIONS: ShadedSphereNodeOptions = {

  // Lit from bottom center, which is where the light shines.
  highlightXOffset: 0,
  highlightYOffset: 0.4
};

const MOTHAConstants = {

  // margins for all ScreenView instances
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  // This value is the same as the Java version, to preserve the same relative sizes of things in the model.
  // This constant was ANIMATION_BOX_SIZE in HAConstants.java.
  ZOOMED_IN_BOX_MODEL_SIZE: 475,

  // This value is specific to the HTML5 version.
  ZOOMED_IN_BOX_VIEW_SIZE: 400,

  // The notion of "ground state" does not apply to all hydrogen atom models, but it is convenient to have it here.
  GROUND_STATE: GROUND_STATE,
  MAX_STATE: MAX_STATE,
  NUMBER_OF_STATES: MAX_STATE - GROUND_STATE + 1,

  // radii, in unitless model coordinates
  ELECTRON_RADIUS: 5,
  PROTON_RADIUS: 6,
  PHOTON_RADIUS: 15,
  BILLIARD_BALL_RADIUS: 30,
  PLUM_PUDDING_RADIUS: 30,

  // Photon speed is constant, in distance per second
  PHOTON_SPEED: 300,

  MONOCHROMATIC_WAVELENGTH_RANGE: new Range( MIN_UV_WAVELENGTH, VisibleColor.MAX_WAVELENGTH ),
  SPECTROMETER_WAVELENGTH_RANGE: new Range( MIN_UV_WAVELENGTH, MAX_IR_WAVELENGTH ),

  // Electron energy in the ground state, in eV
  E1: -13.6,

  MAX_SPECTROMETER_SNAPSHOTS: 4,

  // margin between the state display and inside edge of zoomed-in box
  STATE_DISPLAY_MARGINS: new Vector2( 10, 10 ),

  // The Java version had a wider range of speeds and a speed slider. For the HTML5 version, this was simplified to
  // 3 speeds, using the standard PhET TimeControlNode.
  TIME_SPEEDS: [ TimeSpeed.FAST, TimeSpeed.NORMAL, TimeSpeed.SLOW ],

  // Length of the line segments used to draw orbits.
  ORBIT_LINE_LENGTH: 3,

  // Various shared options
  CORNER_RADIUS: CORNER_RADIUS,
  ACCORDION_BOX_OPTIONS: ACCORDION_BOX_OPTIONS,
  PANEL_OPTIONS: PANEL_OPTIONS,
  SHADED_SPHERE_NODE_OPTIONS: SHADED_SPHERE_NODE_OPTIONS
};

assert && assert( MOTHAConstants.GROUND_STATE === 1, 'This is a fundamental assumption of this implementation.' );

modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

export default MOTHAConstants;