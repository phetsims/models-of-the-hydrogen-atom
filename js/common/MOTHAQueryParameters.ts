// Copyright 2022-2025, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import SchrodingerQuantumNumbers from './model/SchrodingerQuantumNumbers.js';

// Without this next line, ESLint will complain: 'QueryStringMachineSchema' is not defined.(no-undef)
/* global QueryStringMachineSchema */

const SCHEMA_MAP: Record<string, QueryStringMachineSchema> = {

  //----------------------------------------------------------------------------------------------------------------
  // Public-facing query parameters
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Internal query parameters
  //----------------------------------------------------------------------------------------------------------------

  // Draws a halo around special photons, to make them easier to see. This includes photons that are emitted by the
  // atom, and photons that are used to excite the Schrodinger electron out of the metastable state (n,l,m) = (2,0,0).
  // See MOTHAColors.*_HALO_COLOR for the halo colors.
  showHalos: {
    type: 'flag'
  },

  // Specifies how much to scale time (dt) for 'Fast', 'Normal', and 'Slow' time speeds, in that order.
  // Careful! If 'Fast' is too large, dt may be so big that photons jump over the atom.
  timeScale: {
    type: 'array',
    elementSchema: {
      type: 'number'
    },
    defaultValue: [ 3, 1, 0.25 ],
    isValidValue: ( array: number[] ) => ( array.length === 3 ) && ( array[ 0 ] > array[ 1 ] ) && ( array[ 1 ] > array[ 2 ] )
  },

  // Displays maximum numbers of photons at all possible emission wavelengths on the spectrometer.
  // This is useful for debugging how the spectrometer looks when it is displaying a lot of data.
  debugSpectrometer: {
    type: 'flag'
  },

  // The initial state (n,l,m) for the Schrodinger model. This is useful for checking an orbital shape, without
  // having to wait for the sim to get to a specific state.
  nlm: {
    type: 'array',
    elementSchema: {
      type: 'number'
    },
    defaultValue: [ 1, 0, 0 ],
    isValidValue: ( array: number[] ) => {
      const n = array[ 0 ];
      const l = array[ 1 ];
      const m = array[ 2 ];
      return ( array.length === 3 ) && SchrodingerQuantumNumbers.isValidState( n, l, m );
    }
  },

  // Size of the NxNxN grid used to compute probability density for Schrodinger orbitals.
  // As this value gets larger, performance will be impacted.
  gridSize: {
    type: 'number',
    defaultValue: 40,
    isValidValue: value => Number.isInteger( value ) && ( value > 20 )
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