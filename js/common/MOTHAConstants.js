// Copyright 2016, University of Colorado Boulder

/**
 * Constants used throughout this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );

  var MOTHAConstants = {

    ELECTRON_DIAMETER: 9,
    NEUTRON_DIAMETER: 11,
    PHOTON_DIAMETER: 30,

    // how close a photon and electron (treated as points) must be for them to collide
    COLLISION_THRESHOLD: ( this.PHOTON_DIAMETER / 2 ) + ( this.ELECTRON_DIAMETER / 2 )
  };

  modelsOfTheHydrogenAtom.register( 'MOTHAConstants', MOTHAConstants );

  return MOTHAConstants;
} );
