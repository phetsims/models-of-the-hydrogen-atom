// Copyright 2022-2025, University of Colorado Boulder

/**
 * Query parameters supported by the geometric-optics simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

// Without this next line, ESLint will complain: 'QueryStringMachineSchema' is not defined.(no-undef)
/* global QueryStringMachineSchema */

const SCHEMA_MAP: Record<string, QueryStringMachineSchema> = {

  //----------------------------------------------------------------------------------------------------------------
  // Public-facing query parameters
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Internal query parameters
  //----------------------------------------------------------------------------------------------------------------

  // Draws a halo around special photons, to make them easier to see. This includes photons that are emitted by
  // the atom, and photons that are used to excite the Schrodinger atom out of the metastable state (2,0,0).
  showHalos: {
    type: 'flag'
  },

  // Specifies how much to scale time (dt) for 'Fast', 'Normal', and 'Slow' time speeds, in that order.
  // Careful! If 'Fast' is too large, dt may be so big that photons jump over the atom.
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

  // For debugging, displays maximum numbers of photons for all possible emission wavelengths.
  debugSpectrometer: {
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