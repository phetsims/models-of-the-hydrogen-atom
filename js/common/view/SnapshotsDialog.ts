// Copyright 2016-2021, University of Colorado Boulder

//TODO reuse 1 instance of SnapshotsDialog for PhET-iO
/**
 * SnapshotsDialog is a dialog that displays spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import { IPaint, VBox } from '../../../../scenery/js/imports.js';
import Dialog from '../../../../sun/js/Dialog.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import SnapshotNode from './SnapshotNode.js';

//TODO get this from Dialog
type DialogOptions = {
  fill: IPaint;
  topMargin: number;
  bottomMargin: number;
  leftMargin: number;
};

type SelfOptions = {};

type SnapshotsDialogOptions = SelfOptions & DialogOptions;

export default class SnapshotsDialog extends Dialog {

  private readonly disposeSnapshotsDialog: () => void;

  constructor( numberOfSnapshotsProperty: IProperty<number>, providedOptions?: SnapshotsDialogOptions ) {

    assert && assert( numberOfSnapshotsProperty.value > 0 );

    const options = merge( {

      // DialogOptions
      fill: MOTHAColors.snapshotsDialogFillProperty,
      topMargin: 15,
      bottomMargin: 15,
      leftMargin: 15
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
        assert && assert( content instanceof VBox );
        content.children = createSnapshotNodes( numberOfSnapshotsProperty );
      }
    };
    numberOfSnapshotsProperty.lazyLink( numberOfSnapshotsObserver );

    this.disposeSnapshotsDialog = () => {
      numberOfSnapshotsProperty.unlink( numberOfSnapshotsObserver );
    };
  }

  //TODO verify whether this gets called and whether it works correctly, because Dialog.dispose has been suspect
  public override dispose(): void {
    this.disposeSnapshotsDialog();
    super.dispose();
  }
}

/**
 * Creates the snapshots.
 */
function createSnapshotNodes( numberOfSnapshotsProperty: IProperty<number> ): SnapshotNode[] {
  const snapshots = [];
  for ( let i = 0; i < numberOfSnapshotsProperty.value; i++ ) {
    snapshots.push( new SnapshotNode( numberOfSnapshotsProperty, {
      scale: 0.75
    } ) );
  }
  return snapshots;
}

modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );