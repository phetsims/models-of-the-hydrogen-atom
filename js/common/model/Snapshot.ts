// Copyright 2024, University of Colorado Boulder

/**
 * Snapshot is a snapshot of spectrometer data for a specific model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectrometerDataPoint from './SpectrometerDataPoint.js';
import HydrogenAtom from './HydrogenAtom.js';

export default class Snapshot extends PhetioObject {

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
}

modelsOfTheHydrogenAtom.register( 'Snapshot', Snapshot );