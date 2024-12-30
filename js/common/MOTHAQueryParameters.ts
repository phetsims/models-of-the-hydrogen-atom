// Copyright 2022-2024, University of Colorado Boulder

/**
 * Query parameters supported by the geometric-optics simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

/* global QueryStringMachineSchema */

const SCHEMA_MAP: Record<string, QueryStringMachineSchema> = {

  //----------------------------------------------------------------------------------------------------------------
  // Public-facing query parameters
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Internal query parameters
  //----------------------------------------------------------------------------------------------------------------

  // Draws a red rectangle around emitted photons.
  debugEmission: {
    type: 'flag'
  },

  // Specifies how much to scale time (dt) for 'Fast', 'Normal', and 'Slow' time speeds, in that order.
  timeScale: {
    type: 'array',
    elementSchema: {
      type: 'number',
      isValidValue: ( scale: number ) => ( scale > 0 )
    },
    defaultValue: [ 3, 1, 0.25 ],
    isValidValue: ( array: number[] ) => ( array.length === 3 ) && ( array[ 0 ] > array[ 1 ] ) && ( array[ 1 ] > array[ 2 ] )
  },

  // Expand all accordion boxes
  expandAll: {
    type: 'flag'
  },

  // Shows ticks marks for all possible emission wavelengths on the Spectrometer. Tick marks are otherwise not
  // shown unless a photon with the corresponding wavelength has been emitted.
  showAllTicks: {
    type: 'flag'
  },

  // Displays spectrometer data in text-only format, in the upper-right corner of the spectrometer and snapshots.
  debugSpectrometerData: {
    type: 'flag'
  }
};

const MOTHAQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

MOTHAQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

modelsOfTheHydrogenAtom.register( 'MOTHAQueryParameters', MOTHAQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.modelsOfTheHydrogenAtom.MOTHAQueryParameters' );

export default MOTHAQueryParameters;