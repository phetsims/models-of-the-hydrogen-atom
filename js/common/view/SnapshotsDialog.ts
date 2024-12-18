// Copyright 2016-2024, University of Colorado Boulder

//TODO addLinkedElement for spectrometer.snapshotsProperty
/**
 * SnapshotsDialog is a dialog that displays spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { VBox } from '../../../../scenery/js/imports.js';
import Dialog, { DialogOptions } from '../../../../sun/js/Dialog.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Snapshot from '../model/Snapshot.js';
import MOTHAColors from '../MOTHAColors.js';
import SnapshotNode from './SnapshotNode.js';

type SelfOptions = EmptySelfOptions;

type SnapshotsDialogOptions = SelfOptions & PickRequired<DialogOptions, 'tandem'>;

export default class SnapshotsDialog extends Dialog {

  public constructor( snapshots: ObservableArray<Snapshot>, providedOptions?: SnapshotsDialogOptions ) {

    const options = optionize<SnapshotsDialogOptions, SelfOptions, DialogOptions>()( {

      // DialogOptions
      isDisposable: false,
      fill: MOTHAColors.snapshotsDialogFillProperty,
      topMargin: 15,
      bottomMargin: 15,
      leftMargin: 15,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.mySnapshotsDialog.accessibleNameStringProperty
    }, providedOptions );

    const content = new VBox( {
      spacing: 10,
      children: createSnapshotNodes( snapshots )
    } );

    super( content, options );

    //TODO remove a specific snapshot, rather than rebuilding them all
    const numberOfSnapshotsObserver = ( numberOfSnapshots: number ) => {
      if ( numberOfSnapshots === 0 ) {
        this.hide();
      }
      else {
        content.children = createSnapshotNodes( snapshots );
      }
    };
    snapshots.lengthProperty.lazyLink( numberOfSnapshotsObserver );
  }
}

/**
 * Creates a Node for each snapshot.
 */
function createSnapshotNodes( snapshots: ObservableArray<Snapshot> ): SnapshotNode[] {
  return snapshots.map( snapshot => new SnapshotNode( snapshot, {
    scale: 0.8 //TODO Need to adjust this and MAX_SPECTROMETER_SNAPSHOTS to ensure the snapshots are readable.
  } ) );
}

modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );