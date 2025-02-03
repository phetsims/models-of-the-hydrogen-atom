// Copyright 2016-2025, University of Colorado Boulder

/**
 * MOTHAConstants is the collection of constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Range from '../../../dot/js/Range.js';
import Vector2 from '../../../dot/js/Vector2.js';
import { ShadedSphereNodeOptions } from '../../../scenery-phet/js/ShadedSphereNode.js';
import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';
import { AccordionBoxOptions } from '../../../sun/js/AccordionBox.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

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

const SHADED_SPHERE_NODE_OPTIONS: ShadedSphereNodeOptions = {

  // Lit from bottom center, which is where the light shines.
  highlightXOffset: 0,
  highlightYOffset: 0.4
};

const MOTHAConstants = {

  // margins for all ScreenView instances
  SCREEN_VIEW_X_MARGIN: 15,
  SCREEN_VIEW_Y_MARGIN: 15,

  // Position of all hydrogen atoms, in the model coordinate frame.
  ATOM_POSITION: new Vector2( 0, 0 ),

  // This value is the same as the Java version, to preserve the same relative sizes of things in the model.
  // This constant was ANIMATION_BOX_SIZE in HAConstants.java.
  ZOOMED_IN_BOX_MODEL_SIZE: 475,

  // This value is specific to the HTML5 version.
  ZOOMED_IN_BOX_VIEW_SIZE: 400,

  // Range for the monochromatic light slider.
  // Min is slightly below 94 nm for the 1 -> 6 state transition.
  MONOCHROMATIC_WAVELENGTH_RANGE: new Range( 92, VisibleColor.MAX_WAVELENGTH ),

  // Maximum number of spectrometer snapshots that can exist at a time.
  MAX_SPECTROMETER_SNAPSHOTS: 4,

  // Length of the line segments used to draw orbits.
  ORBIT_LINE_LENGTH: 3,

  // Various shared options
  CORNER_RADIUS: CORNER_RADIUS,
  ACCORDION_BOX_OPTIONS: ACCORDION_BOX_OPTIONS,
  SHADED_SPHERE_NODE_OPTIONS: SHADED_SPHERE_NODE_OPTIONS
};

modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

export default MOTHAConstants;