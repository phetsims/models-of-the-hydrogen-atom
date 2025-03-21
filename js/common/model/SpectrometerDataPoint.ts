// Copyright 2024-2025, University of Colorado Boulder

/**
 * SpectrometerDataPoint is a data point on the spectrometer. It indicates the number of photons that have been
 * emitted for a specified wavelength.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// This should match STATE_SCHEMA, but with JavaScript types.
export type SpectrometerDataPointStateObject = {
  wavelength: number;
  numberOfPhotonsEmitted: number;
};

// This should match SpectrometerDataPointStateObject, but with IOTypes.
const STATE_SCHEMA = {
  wavelength: NumberIO,
  numberOfPhotonsEmitted: NumberIO
};

export default class SpectrometerDataPoint {

  // The wavelength that was emitted by the atom.
  public readonly wavelength: number;

  // The number of photons that have been emitted for the specified wavelength.
  public numberOfPhotonsEmitted: number;

  public constructor( wavelength: number, numberOfPhotonsEmitted: number ) {
    this.wavelength = wavelength;
    this.numberOfPhotonsEmitted = numberOfPhotonsEmitted;
  }

  /**
   * Clones this data point. Used when taking snapshots of spectrometer data.
   */
  public clone(): SpectrometerDataPoint {
    return new SpectrometerDataPoint( this.wavelength, this.numberOfPhotonsEmitted );
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
    stateSchema: STATE_SCHEMA,
    toStateObject: ( dataPoint: SpectrometerDataPoint ) => dataPoint.toStateObject(),
    fromStateObject: ( stateObject: SpectrometerDataPointStateObject ) => SpectrometerDataPoint.fromStateObject( stateObject ),
    documentation: 'Number of photons that have been emitted for a specified wavelength.'
  } );
}

modelsOfTheHydrogenAtom.register( 'SpectrometerDataPoint', SpectrometerDataPoint );