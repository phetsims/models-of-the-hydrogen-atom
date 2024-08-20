// Copyright 2024, University of Colorado Boulder

/**
 * SpectrometerDataPoint is a data point on the spectrometer. It indicates the number of photons that have been
 * emitted for a specified wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';

// This should match SPECTROMETER_DATA_POINT_STATE_SCHEMA, but with JavaScript types.
type SpectrometerDataPointStateObject = {
  wavelength: number;
  numberOfPhotonsEmitted: number;
};

// This should match SpectrometerDataPointStateObject, but with IOTypes.
const SPECTROMETER_DATA_POINT_STATE_SCHEMA = {
  wavelength: NumberIO,
  numberOfPhotonsEmitted: NumberIO
};

export default class SpectrometerDataPoint {

  public readonly wavelength: number;
  public numberOfPhotonsEmitted: number;

  public constructor( wavelength: number, numberOfPhotonsEmitted: number ) {
    this.wavelength = wavelength;
    this.numberOfPhotonsEmitted = numberOfPhotonsEmitted;
  }

  /**
   * Serializes this SpectrometerDataPoint.
   */
  private toStateObject(): SpectrometerDataPointStateObject {
    return {
      wavelength: this.wavelength,
      numberOfPhotonsEmitted: this.numberOfPhotonsEmitted
    };
  }

  /**
   * Deserializes an instance of SpectrometerDataPoint.
   */
  private static fromStateObject( stateObject: SpectrometerDataPointStateObject ): SpectrometerDataPoint {
    return new SpectrometerDataPoint( stateObject.wavelength, stateObject.numberOfPhotonsEmitted );
  }

  /**
   * SpectrometerDataPointIO handles serialization of a SpectrometerDataPoint. It implements 'Data Type Serialization'
   * as described in https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.
   */
  public static readonly SpectrometerDataPointIO = new IOType<SpectrometerDataPoint, SpectrometerDataPointStateObject>( 'SpectrometerDataPointIO', {
    valueType: SpectrometerDataPoint,
    stateSchema: SPECTROMETER_DATA_POINT_STATE_SCHEMA,
    toStateObject: ( dataPoint: SpectrometerDataPoint ) => dataPoint.toStateObject(),
    fromStateObject: ( stateObject: SpectrometerDataPointStateObject ) => SpectrometerDataPoint.fromStateObject( stateObject ),
    documentation: 'Number of photons that have been emitted for a specified wavelength.'
  } );
}

modelsOfTheHydrogenAtom.register( 'SpectrometerDataPoint', SpectrometerDataPoint );