// Copyright 2016-2025, University of Colorado Boulder

/**
 * SpectrometerSnapshotsDialog is a dialog that displays spectrometer snapshots.
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
import SpectrometerSnapshot from '../model/SpectrometerSnapshot.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrometerSnapshotNode from './SpectrometerSnapshotNode.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type SnapshotsDialogOptions = SelfOptions & PickRequired<DialogOptions, 'tandem'>;

export default class SpectrometerSnapshotsDialog extends Dialog {

  public constructor( snapshots: ObservableArray<SpectrometerSnapshot>, providedOptions?: SnapshotsDialogOptions ) {

    const options = optionize<SnapshotsDialogOptions, SelfOptions, DialogOptions>()( {

      // DialogOptions
      isDisposable: false,
      fill: MOTHAColors.snapshotsDialogFillProperty,
      topMargin: 10,
      bottomMargin: 10,
      leftMargin: 10,
      closeButtonRightMargin: 10,
      xSpacing: 0,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.mySnapshotsDialog.accessibleNameStringProperty
    }, providedOptions );

    // Nodes that display snapshots. These Nodes are displayed from top to bottom in the Snapshots dialog.
    const snapshotNodes: SpectrometerSnapshotNode[] = [];
    for ( let i = 0; i < MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS; i++ ) {
      snapshotNodes.push( new SpectrometerSnapshotNode( options.tandem.createTandem( `snapshotNode${i}` ) ) );
    }

    const content = new VBox( {
      spacing: 8,
      children: snapshotNodes
    } );

    super( content, options );

    // When the snapshots change, mutate all snapshotNodes. While not the most performant implementation, it is much
    // simpler than shuffling the order of snapshotNodes as snapshots are added and deleted. And for PhET-iO, the
    // order of snapshotNodes is always that same in the dialog.
    snapshots.lengthProperty.lazyLink( numberOfSnapshots => {
      assert && assert( numberOfSnapshots >= 0 && numberOfSnapshots <= MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS,
        `unexpected numberOfSnapshots: ${numberOfSnapshots}` );

      // Populate all snapshotNodes in order, from top to bottom.
      for ( let i = 0; i < snapshotNodes.length; i++ ) {
        snapshotNodes[ i ].snapshotProperty.value = snapshots[ i ] || null;
      }

      // Close this dialog if all snapshots have been deleted.
      if ( numberOfSnapshots === 0 && this.isShowingProperty.value ) {
        this.hide();
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerSnapshotsDialog', SpectrometerSnapshotsDialog );