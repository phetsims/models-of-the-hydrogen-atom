// Copyright 2022, University of Colorado Boulder

/**
 * Query parameters supported by the geometric-optics simulation.
 * Running with ?log will print these query parameters and their values to the console at startup.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';

const SCHEMA_MAP = {

  //----------------------------------------------------------------------------------------------------------------
  // Public-facing query parameters
  //----------------------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------------------
  // Internal query parameters
  //----------------------------------------------------------------------------------------------------------------

  // Draws a red rectangle around emitted photons.
  debugEmission: {
    type: 'flag'
  }
} as const;

const MOTHAQueryParameters = QueryStringMachine.getAll( SCHEMA_MAP );
MOTHAQueryParameters.SCHEMA_MAP = SCHEMA_MAP;

modelsOfTheHydrogenAtom.register( 'MOTHAQueryParameters', MOTHAQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.geometricOptics.MOTHAQueryParameters' );

export default MOTHAQueryParameters;