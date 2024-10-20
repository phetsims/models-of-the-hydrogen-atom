// Copyright 2016-2024, University of Colorado Boulder

//TODO addLinkedElement for spectrometer.snapshotsProperty
/**
 * SnapshotsDialog is a dialog that displays spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TProperty from '../../../../axon/js/TProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Dialog, { DialogOptions } from '../../../../sun/js/Dialog.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import SnapshotNode from './SnapshotNode.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type SnapshotsDialogOptions = SelfOptions & PickRequired<DialogOptions, 'tandem'>;

export default class SnapshotsDialog extends Dialog {

  public constructor( numberOfSnapshotsProperty: TProperty<number>, providedOptions?: SnapshotsDialogOptions ) {

    const options = optionize<SnapshotsDialogOptions, SelfOptions, DialogOptions>()( {

      // DialogOptions
      isDisposable: false,
      fill: MOTHAColors.snapshotsDialogFillProperty,
      topMargin: 15,
      bottomMargin: 15,
      leftMargin: 15,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.mySnapshotsStringProperty
    }, providedOptions );

    const content = new VBox( {
      spacing: 10,
      children: createSnapshotNodes( numberOfSnapshotsProperty )
    } );

    super( content, options );

    //TODO remove a specific snapshot, rather than rebuilding them all
    const numberOfSnapshotsObserver = ( numberOfSnapshots: number ) => {
      if ( numberOfSnapshots === 0 ) {
        this.hide();
      }
      else {
        content.children = createSnapshotNodes( numberOfSnapshotsProperty );
      }
    };
    numberOfSnapshotsProperty.lazyLink( numberOfSnapshotsObserver );
  }
}

/**
 * Creates the snapshots.
 */
function createSnapshotNodes( numberOfSnapshotsProperty: TProperty<number> ): SnapshotNode[] {
  const snapshots = [];
  for ( let snapshotNumber = 1; snapshotNumber <= numberOfSnapshotsProperty.value; snapshotNumber++ ) {
    snapshots.push( new SnapshotNode( snapshotNumber, numberOfSnapshotsProperty, {
      scale: 0.8 //TODO Need to adjust this and MAX_SPECTROMETER_SNAPSHOTS to ensure the snapshots are readable.
    } ) );
  }
  return snapshots;
}

modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );