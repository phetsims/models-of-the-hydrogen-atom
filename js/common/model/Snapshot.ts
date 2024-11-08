// Copyright 2024, University of Colorado Boulder

/**
 * Snapshot is a snapshot of spectrometer data for a specific model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class Snapshot extends PhetioObject {

  public readonly snapshotNumber: number;
  public readonly modelNameProperty: TReadOnlyProperty<string>;

  public constructor( snapshotNumber: number, modelNameProperty: TReadOnlyProperty<string> ) {
    super( {
      phetioState: false
    } );
    this.snapshotNumber = snapshotNumber;
    this.modelNameProperty = modelNameProperty;
  }
}

modelsOfTheHydrogenAtom.register( 'Snapshot', Snapshot );