// Copyright 2016-2019, University of Colorado Boulder

//TODO this is a placeholder
/**
 * SnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  const Text = require( 'SCENERY/nodes/Text' );

  class SnapshotNode extends Node {

    /**
     * @param {Property.<number>} numberOfSnapshotsProperty
     * @param {Object} [options]
     */
    constructor( numberOfSnapshotsProperty, options ) {

      options = merge( {}, options );

      const backgroundNode = new Rectangle( 0, 0, 500, 150, {
        cornerRadius: 5,
        fill: MOTHAColorProfile.spectrometerFillProperty,
        stroke: MOTHAColorProfile.spectrometerStrokeProperty
      } );

      //TODO i18n
      const titleNode = new Text( 'Snapshot', {
        font: new PhetFont( 16 ),
        fill: MOTHAColorProfile.snapshotTextFillProperty,
        left: backgroundNode.left + 10,
        top: backgroundNode.top + 10
      } );

      const trashButton = new RectangularPushButton( {
        content: new FontAwesomeNode( 'trash', { scale: 0.5 } ),
        baseColor: 'rgb( 200, 200, 200 )',
        listener: () => {
          numberOfSnapshotsProperty.value--;
        },
        right: backgroundNode.right - 10,
        bottom: backgroundNode.bottom - 10
      } );

      assert && assert( !options.children, 'SnapshotNode sets children' );
      options.children = [ backgroundNode, titleNode, trashButton ];

      super( options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );
} );
