// Copyright 2016, University of Colorado Boulder

/**
 * Dialog that shows spectrometer snapshots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Dialog = require( 'JOIST/Dialog' );
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
    numberOfSnapshotsProperty.lazyLink( function( numberOfSnapshots ) {
      if ( numberOfSnapshots === 0 ) {
        self.hide();
      }
      else {
        assert && assert( content instanceof VBox );
        content.children = createSnapshotNodes( numberOfSnapshotsProperty );
      }
    } );

    // @private
    this.disposeSnapshotsDialog = function() {
      //TODO
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

    // @public @override
    dispose: function() {
      this.disposeSnapshotsDialog();
      Dialog.prototype.dispose.call( this );
      //TODO Dialog.dispose fails, see https://github.com/phetsims/models-of-the-hydrogen-atom/issues/10 and https://github.com/phetsims/joist/issues/366
      //JO: Not calling super dispose here will fail an assertion.
      // Dialog.prototype.dispose.call( this );
    },

    // @public @override
    hide: function() {
      Dialog.prototype.hide.call( this );
      this.dispose();
    }
  } );
} );
