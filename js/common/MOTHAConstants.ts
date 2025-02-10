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
import { RichTextOptions } from '../../../scenery/js/nodes/RichText.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import MOTHAColors from './MOTHAColors.js';

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

  // Lit from bottom center, to match the direction of the light source.
  highlightXOffset: 0,
  highlightYOffset: 0.4
};

// Options for displaying the electron's state description.
const STATE_TEXT_OPTIONS: RichTextOptions = {
  isDisposable: false,
  font: new PhetFont( 16 ),
  fill: MOTHAColors.invertibleTextFillProperty,
  maxWidth: 200,
  phetioVisiblePropertyInstrumented: true,
  visiblePropertyOptions: {
    phetioFeatured: true
  }
};

const MOTHAConstants = {

  // Position of all hydrogen atoms, in the model coordinate frame.
  ATOM_POSITION: new Vector2( 0, 0 ),

  // Range for the monochromatic light slider.
  // Min is slightly below 94 nm for the 1 -> 6 state transition.
  MONOCHROMATIC_WAVELENGTH_RANGE: new Range( 92, VisibleColor.MAX_WAVELENGTH ),

  // Maximum number of spectrometer snapshots that can exist at a time.
  MAX_SPECTROMETER_SNAPSHOTS: 4,

  // Length of the line segments used to draw orbits.
  ORBIT_LINE_LENGTH: 3,

  // Dilation of mouse and touch pointer areas for close button in Dialogs.
  CLOSE_BUTTON_DILATION: 6,

  // Various shared options
  CORNER_RADIUS: CORNER_RADIUS,
  ACCORDION_BOX_OPTIONS: ACCORDION_BOX_OPTIONS,
  SHADED_SPHERE_NODE_OPTIONS: SHADED_SPHERE_NODE_OPTIONS,
  STATE_TEXT_OPTIONS: STATE_TEXT_OPTIONS
};

modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

export default MOTHAConstants;