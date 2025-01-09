// Copyright 2016-2025, University of Colorado Boulder

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
import SpectrometerSnapshot from '../model/SpectrometerSnapshot.js';
import MOTHAColors from '../MOTHAColors.js';
import SpectrometerSnapshotNode from './SpectrometerSnapshotNode.js';

type SelfOptions = EmptySelfOptions;

type SnapshotsDialogOptions = SelfOptions & PickRequired<DialogOptions, 'tandem'>;

//TODO Need to adjust this and MAX_SPECTROMETER_SNAPSHOTS to ensure the snapshots are readable.
const SNAPSHOT_SCALE = 0.9;

export default class SnapshotsDialog extends Dialog {

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

    const content = new VBox( {
      spacing: 8,
      children: snapshots.map( snapshot => new SpectrometerSnapshotNode( snapshot, {
        scale: SNAPSHOT_SCALE
      } ) )
    } );

    super( content, options );

    // Add new snapshots to the end.
    snapshots.addItemAddedListener( snapshot => {
      const snapshotNode = new SpectrometerSnapshotNode( snapshot, {
        scale: SNAPSHOT_SCALE,
        backgroundFill: MOTHAColors.snapshotFillProperty,
        backgroundStroke: MOTHAColors.snapshotStrokeProperty
      } );
      content.addChild( snapshotNode );
    } );

    // Hide this dialog when all snapshots have been deleted.
    snapshots.lengthProperty.lazyLink( numberOfSnapshots => {
      if ( numberOfSnapshots === 0 ) {
        this.hide();
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );