// Copyright 2016-2017, University of Colorado Boulder

/**
 * Dialog that shows spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dialog = require( 'JOIST/Dialog' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var SnapshotNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/SnapshotNode' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param numberOfSnapshotsProperty
   * @param {Object} [options]
   * @constructor
   */
  function SnapshotsDialog( numberOfSnapshotsProperty, options ) {

    assert && assert( numberOfSnapshotsProperty.get() > 0 );

    options = _.extend( {
      modal: true,
      hasCloseButton: false,

      // center dialog on the screen
      layoutStrategy: function( dialog, simBounds, screenBounds, scale ) {
        dialog.center = screenBounds.center.times( 1.0 / scale );
      }
    }, options );

    var self = this;

    var content = new VBox( {
      spacing: 10,
      children: createSnapshotNodes( numberOfSnapshotsProperty )
    } );

    Dialog.call( this, content, options );

    //TODO remove a specific snapshot, rather than rebuilding them all
    var numberOfSnapshotsObserver = function( numberOfSnapshots ) {
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

  modelsOfTheHydrogenAtom.register( 'SnapshotsDialog', SnapshotsDialog );

  /**
   * Creates the snapshots.
   *
   * @param numberOfSnapshotsProperty
   * @returns {Array}
   */
  var createSnapshotNodes = function( numberOfSnapshotsProperty ) {
    var snapshots = [];
    for ( var i = 0; i < numberOfSnapshotsProperty.get(); i++ ) {
      snapshots.push( new SnapshotNode( numberOfSnapshotsProperty, {
        scale: 0.75
      } ) );
    }
    return snapshots;
  };

  return inherit( Dialog, SnapshotsDialog, {

    //TODO this never gets called because of https://github.com/phetsims/joist/issues/424#issuecomment-314214885
    // @public @override
    dispose: function() {
      this.disposeSnapshotsDialog();
      Dialog.prototype.dispose.call( this );
    }
  } );
} );
