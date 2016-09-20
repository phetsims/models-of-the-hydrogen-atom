// Copyright 2016, University of Colorado Boulder

//TODO this is a placeholder
/**
 * Displays a snapshot of from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Property.<number>} numberOfSnapshotsProperty
   * @param {Object} [options]
   * @constructor
   */
  function SnapshotNode( numberOfSnapshotsProperty, options ) {

    options = options || {};

    var backgroundNode = new Rectangle( 0, 0, 500, 150, {
      cornerRadius: 5,
      fill: 'black'
    } );

    //TODO i18n
    var titleNode = new Text( 'Snapshot', {
      font: new MOTHAFont( 16 ),
      fill: 'white',
      left: backgroundNode.left + 10,
      top: backgroundNode.top + 10
    } );

    var trashButton = new RectangularPushButton( {
      content: new FontAwesomeNode( 'trash', { scale: 0.5 } ),
      baseColor: 'rgb( 200, 200, 200 )',
      listener: function() {
        numberOfSnapshotsProperty.set( numberOfSnapshotsProperty.get() - 1 );
      },
      right: backgroundNode.right - 10,
      bottom: backgroundNode.bottom - 10
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ backgroundNode, titleNode, trashButton ];

    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );

  return inherit( Node, SnapshotNode );
} );
