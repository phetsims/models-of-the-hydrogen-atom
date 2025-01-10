// Copyright 2024-2025, University of Colorado Boulder

/**
 * SpectrometerSnapshot is a snapshot of spectrometer data for a specific model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectrometerDataPoint, { SpectrometerDataPointStateObject } from './SpectrometerDataPoint.js';
import HydrogenAtom from './HydrogenAtom.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';

// This should match STATE_SCHEMA, but with JavaScript/TypeScript types.
type SpectrometerSnapshotStateObject = {
  snapshotNumber: number;
  hydrogenAtom: ReferenceIOState;
  dataPoints: SpectrometerDataPointStateObject[];
};

// This should match SpectrometerSnapshotStateObject, but with IOTypes.
const STATE_SCHEMA = {
  snapshotNumber: NumberIO,
  hydrogenAtom: HydrogenAtom.HydrogenAtomIO,
  dataPoints: ArrayIO( SpectrometerDataPoint.SpectrometerDataPointIO )
};

export default class SpectrometerSnapshot extends PhetioObject {

  // The snapshot number, as it appears in the snapshots dialog.
  public readonly snapshotNumber: number;

  // The hydrogen atom model that this snapshot is associated with.
  public readonly hydrogenAtom: HydrogenAtom;

  // The spectrometer data that was captured for this snapshot.
  public readonly dataPoints: SpectrometerDataPoint[];

  public constructor( snapshotNumber: number, hydrogenAtom: HydrogenAtom, dataPoints: SpectrometerDataPoint[] ) {
    super( {
      phetioState: false
    } );
    this.snapshotNumber = snapshotNumber;
    this.hydrogenAtom = hydrogenAtom;
    this.dataPoints = dataPoints;
  }

  /**
   * Deserializes an instance of SpectrometerSnapshot.
   */
  private static fromStateObject( stateObject: SpectrometerSnapshotStateObject ): SpectrometerSnapshot {
    return new SpectrometerSnapshot( stateObject.snapshotNumber,
      HydrogenAtom.HydrogenAtomIO.fromStateObject( stateObject.hydrogenAtom ),
      ArrayIO( SpectrometerDataPoint.SpectrometerDataPointIO ).fromStateObject( stateObject.dataPoints ) );
  }

  /**
   * SpectrometerSnapshotIO handles serialization of a SpectrometerSnapshot. It implements 'Data Type Serialization'
   * as described in https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.                                                                                               H
   */
  public static readonly SpectrometerSnapshotIO = new IOType<SpectrometerSnapshot, SpectrometerSnapshotStateObject>( 'SpectrometerSnapshotIO', {
    valueType: SpectrometerSnapshot,
    stateSchema: STATE_SCHEMA,
    // toStateObject will be derived automatically from STATE_SCHEMA.
    fromStateObject: ( stateObject: SpectrometerSnapshotStateObject ) => SpectrometerSnapshot.fromStateObject( stateObject ),
    documentation: 'Number of photons that have been emitted for a specified wavelength.'
  } );
}

modelsOfTheHydrogenAtom.register( 'SpectrometerSnapshot', SpectrometerSnapshot );