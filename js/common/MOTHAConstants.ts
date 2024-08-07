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

const MOTHAConstants = {

  // margins for all ScreenView instances
  SCREEN_VIEW_X_MARGIN: 20,
  SCREEN_VIEW_Y_MARGIN: 20,

  // This value is the same as the Java version, to preserve the same relative sizes of things in the model.
  // See ANIMATION_BOX_SIZE in HAConstants.java.
  ZOOMED_IN_BOX_MODEL_SIZE: 475,

  // This value is specific to the HTML5 version.
  ZOOMED_IN_BOX_VIEW_SIZE: 400,

  // The notion of "ground state" does not apply to all hydrogen atom models, but it is convenient to have it here.
  GROUND_STATE: 1,

  // radii, in model coordinates, unitless
  ELECTRON_RADIUS: 5,
  PROTON_RADIUS: 6,
  NEUTRON_RADIUS: 6,
  PHOTON_RADIUS: 15,
  BILLIARD_BALL_RADIUS: 30,
  PLUM_PUDDING_RADIUS: 30,

  // speeds, in distance per second
  PHOTON_INITIAL_SPEED: 300,

  //TODO Why 92? Isn't UV range [100,400] nm?
  MONOCHROMATIC_WAVELENGTH_RANGE: new Range( 92, VisibleColor.MAX_WAVELENGTH ),

  MAX_SPECTROMETER_SNAPSHOTS: 3,

  // margin between the state display and inside edge of zoomed-in box
  STATE_DISPLAY_MARGINS: new Vector2( 10, 10 ),

  TIME_SPEEDS: [ TimeSpeed.FAST, TimeSpeed.NORMAL ]
};

assert && assert( MOTHAConstants.GROUND_STATE === 1, 'This is a fundamental assumption of this implementation.' );

modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

export default MOTHAConstants;