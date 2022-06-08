// Copyright 2016-2022, University of Colorado Boulder

/**
 * MOTHAConstants is the collection of constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import Range from '../../../dot/js/Range.js';

const MOTHAConstants = {

  // margins for all ScreenView instances
  SCREEN_VIEW_X_MARGIN: 20,
  SCREEN_VIEW_Y_MARGIN: 20,

  // radii in model coordinates, unitless
  ELECTRON_RADIUS: 10,
  PROTON_RADIUS: 11,
  NEUTRON_RADIUS: 11,
  PHOTON_RADIUS: 25,

  MONOCHROMATIC_WAVELENGTH_RANGE: new Range( 92, VisibleColor.MAX_WAVELENGTH ),

  MAX_SPECTROMETER_SNAPSHOTS: 3
};

modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

export default MOTHAConstants;