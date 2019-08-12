// Copyright 2016-2019, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  // constants used to compute other constants
  const ELECTRON_DIAMETER = 9;
  const PHOTON_DIAMETER = 30;

  const MOTHAConstants = {

    ELECTRON_DIAMETER: ELECTRON_DIAMETER,
    NEUTRON_DIAMETER: 11,
    PHOTON_DIAMETER: PHOTON_DIAMETER,

    // how close a photon and electron (treated as points) must be for them to collide
    COLLISION_THRESHOLD: ( PHOTON_DIAMETER / 2 ) + ( ELECTRON_DIAMETER / 2 ),

    MAX_SPECTROMETER_SNAPSHOTS: 3
  };

  modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

  return MOTHAConstants;
} );
