// Copyright 2016-2022, University of Colorado Boulder

/**
 * MOTHAConstants is the collection of constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import Range from '../../../dot/js/Range.js';

// constants used to compute other constants
const ELECTRON_DIAMETER = 9;
const PHOTON_DIAMETER = 30;

const MOTHAConstants = {

  // margins for all ScreenView instances
  SCREEN_VIEW_X_MARGIN: 20,
  SCREEN_VIEW_Y_MARGIN: 20,

  ELECTRON_DIAMETER: ELECTRON_DIAMETER,
  NEUTRON_DIAMETER: 11,
  PHOTON_DIAMETER: PHOTON_DIAMETER,

  // how close a photon and electron (treated as points) must be for them to collide
  COLLISION_THRESHOLD: ( PHOTON_DIAMETER / 2 ) + ( ELECTRON_DIAMETER / 2 ),

  MONOCHROMATIC_WAVELENGTH_RANGE: new Range( 92, VisibleColor.MAX_WAVELENGTH ),

  PHOTON_INITIAL_SPEED: 5,
  ALPHA_PARTICLE_INITIAL_SPEED: 5,

  MAX_SPECTROMETER_SNAPSHOTS: 3
};

modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

export default MOTHAConstants;