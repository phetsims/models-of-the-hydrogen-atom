// Copyright 2016-2025, University of Colorado Boulder

/**
 * SpectrometerSnapshotsDialog is a dialog that displays spectrometer snapshots. To appease PhET-iO, it creates a
 * fixed number of SpectrometerSnapshotNode instances, then reuses them.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Dialog from '../../../../sun/js/Dialog.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import SpectrometerSnapshotNode from './SpectrometerSnapshotNode.js';
import Spectrometer from '../model/Spectrometer.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

const MARGINS = 10;

export default class SpectrometerSnapshotsDialog extends Dialog {

  public constructor( spectrometer: Spectrometer, tandem: Tandem ) {

    // Nodes that display snapshots. These Nodes are displayed from top to bottom in the Snapshots dialog.
    const snapshotNodes: SpectrometerSnapshotNode[] = [];
    for ( let i = 0; i < MOTHAConstants.MAX_SPECTROMETER_SNAPSHOTS; i++ ) {
      snapshotNodes.push( new SpectrometerSnapshotNode( spectrometer, i, tandem.createTandem( `snapshotNode${i}` ) ) );
    }

    const content = new VBox( {
      spacing: 8,
      children: snapshotNodes
    } );

    super( content, {
      isDisposable: false,
      fill: MOTHAColors.snapshotsDialogFillProperty,
      topMargin: MARGINS,
      bottomMargin: MARGINS,
      leftMargin: MARGINS,
      closeButtonRightMargin: MARGINS,
      closeButtonMouseAreaXDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      closeButtonMouseAreaYDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      closeButtonTouchAreaXDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      closeButtonTouchAreaYDilation: MOTHAConstants.CLOSE_BUTTON_DILATION,
      xSpacing: 0,
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.mySnapshotsDialog.accessibleNameStringProperty,
      tandem: tandem
    } );

    // Close this dialog if all snapshots have been deleted.
    spectrometer.snapshotsProperty.link( snapshots => {
      if ( !isSettingPhetioStateProperty.value ) {
        if ( snapshots.length === 0 && this.isShowingProperty.value ) {
          this.hide();
        }
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerSnapshotsDialog', SpectrometerSnapshotsDialog );