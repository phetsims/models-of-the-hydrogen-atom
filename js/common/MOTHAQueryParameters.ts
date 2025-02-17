// Copyright 2022-2025, University of Colorado Boulder

/**
 * MOTHAQueryParameters is the set of query parameters supported by this simulation.
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

  // Controls the number of probability density samples for Schrodinger orbitals. Because orbitals have reflectional
  // symmetry about the origin, we only need to sample probability density in 1 octant of the 3D space, and gridSize
  // is the number of samples in 1 dimension of that octant. For example, gridSize=35 results in 35x35x35 samples.
  // As this value gets larger, performance will be impacted. Note that this value can be small because the orbital
  // image is scaled up by scenery Image, which will automatically provide interpolation/smoothing. So set this value
  // to be as small as possible, until you see an adverse impact on the rendering quality of the orbitals.
  gridSize: {
    type: 'number',
    defaultValue: 35,
    isValidValue: value => Number.isInteger( value ) && ( value >= 10 )
  },

  // Determines when to create and cache the orbital images for all reachable Schrodinger (n,l,m) electron states.
  // 'eagerly' populates the entire cache at once, on startup and when the electron color Property changes. It will
  // result in longer startup time and a slight delay when 'Projector Mode' is changed in Preferences.
  // 'onDemand' creates and caches an image the first time that the electron enters a state. It may result in the sim
  // pausing the first time that the electron is in a specific (n,l,m) state.
  computeOrbitals: {
    type: 'string',
    defaultValue: 'eagerly',
    isValidValue: value => value === 'eagerly' || value === 'onDemand'
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