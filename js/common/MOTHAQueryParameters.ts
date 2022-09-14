// Copyright 2022, University of Colorado Boulder

/**
 * Query parameters supported by the geometric-optics simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

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

  // Specifies how much to scale time (dt) for 'Normal' and 'Fast' time speeds, in that order.
  timeScale: {
    type: 'array',
    elementSchema: {
      type: 'number',
      isValidValue: ( scale: number ) => ( scale > 0 )
    },
    defaultValue: [ 1, 2 ],
    isValidValue: ( array: number[] ) => ( array.length === 2 ) && ( array[ 0 ] < array[ 1 ] )
  }
};

const MOTHAQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );

MOTHAQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

modelsOfTheHydrogenAtom.register( 'MOTHAQueryParameters', MOTHAQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.geometricOptics.MOTHAQueryParameters' );

export default MOTHAQueryParameters;