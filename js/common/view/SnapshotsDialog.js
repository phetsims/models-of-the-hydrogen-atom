// Copyright 2016-2021, University of Colorado Boulder

/**
 * SnapshotsDialog is a dialog that displays spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import Dialog from '../../../../sun/js/Dialog.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import SnapshotNode from './SnapshotNode.js';

class SnapshotsDialog extends Dialog {

  /**
   * @param numberOfSnapshotsProperty
   * @param {Object} [options]
   */
  constructor( numberOfSnapshotsProperty, options ) {

    assert && assert( numberOfSnapshotsProperty.value > 0 );

    options = merge( {

      fill: MOTHAColors.snapshotsDialogFillProperty,
      topMargin: 15,
      bottomMargin: 15,
      leftMargin: 15
    }, options );

    const content = new VBox( {
      spacing: 10,
      children: createSnapshotNodes( numberOfSnapshotsProperty )
    } );

    super( content, options );

    //TODO remove a specific snapshot, rather than rebuilding them all
    const numberOfSnapshotsObserver = numberOfSnapshots => {
      if ( numberOfSnapshots === 0 ) {
        this.hide();
      }
      else {
        assert && assert( content instanceof VBox );
        content.children = createSnapshotNodes( numberOfSnapshotsProperty );
      }
    };
    numberOfSnapshotsProperty.lazyLink( numberOfSnapshotsObserver );

    // @private
    this.disposeSnapshotsDialog = () => {
      numberOfSnapshotsProperty.unlink( numberOfSnapshotsObserver );
    };
  }

  //TODO verify whether this calls and whether it works correctly, because Dialog.dispose has been suspect
  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeSnapshotsDialog();
    super.dispose();
  }
}

/**
 * Creates the snapshots.
 * @param numberOfSnapshotsProperty
 * @returns {Array}
 */
function createSnapshotNodes( numberOfSnapshotsProperty ) {
  const snapshots = [];
  for ( let i = 0; i < numberOfSnapshotsProperty.value; i++ ) {
    snapshots.push( new SnapshotNode( numberOfSnapshotsProperty, {
      scale: 0.75
    } ) );
  }
  return snapshots;
}

modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );
export default SnapshotsDialog;