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
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {Property.<number>} numberOfSnapshotsProperty
   * @param {Object} [options]
   * @constructor
   */
  function SnapshotNode( numberOfSnapshotsProperty, options ) {

    options = options || {};

    const backgroundNode = new Rectangle( 0, 0, 500, 150, {
      cornerRadius: 5,
      fill: 'black'
    } );

    //TODO i18n
    const titleNode = new Text( 'Snapshot', {
      font: new MOTHAFont( 16 ),
      fill: 'white',
      left: backgroundNode.left + 10,
      top: backgroundNode.top + 10
    } );

    const trashButton = new RectangularPushButton( {
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
