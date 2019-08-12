// Copyright 2016-2019, University of Colorado Boulder

/**
 * Dialog that shows spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const Dialog = require( 'SUN/Dialog' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const SnapshotNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SnapshotNode' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  class SnapshotsDialog extends Dialog {
    /**
     * @param numberOfSnapshotsProperty
     * @param {Object} [options]
     */
    constructor( numberOfSnapshotsProperty, options ) {

      assert && assert( numberOfSnapshotsProperty.get() > 0 );

      options = _.extend( {

        layoutStrategy: Dialog.layoutStrategyCenteredInScreen,
        topMargin: 15,
        bottomMargin: 15,
        leftMargin: 15
      }, options );

      const content = new VBox( {
        spacing: 10,
        children: createSnapshotNodes( numberOfSnapshotsProperty )
      } );

      super( content, options );

      const self = this;

      //TODO remove a specific snapshot, rather than rebuilding them all
      const numberOfSnapshotsObserver = function( numberOfSnapshots ) {
        if ( numberOfSnapshots === 0 ) {
          self.hide();
        }
        else {
          assert && assert( content instanceof VBox );
          content.children = createSnapshotNodes( numberOfSnapshotsProperty );
        }
      };
      numberOfSnapshotsProperty.lazyLink( numberOfSnapshotsObserver );

      // @private
      this.disposeSnapshotsDialog = function() {
        numberOfSnapshotsProperty.unlink( numberOfSnapshotsObserver );
      };
    }

    //TODO this never gets called because of https://github.com/phetsims/joist/issues/424#issuecomment-314214885
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
  const createSnapshotNodes = function( numberOfSnapshotsProperty ) {
    const snapshots = [];
    for ( let i = 0; i < numberOfSnapshotsProperty.get(); i++ ) {
      snapshots.push( new SnapshotNode( numberOfSnapshotsProperty, {
        scale: 0.75
      } ) );
    }
    return snapshots;
  };

  return modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );
} );
