// Copyright 2016-2019, University of Colorado Boulder

//TODO this is a placeholder
/**
 * SnapshotNode is a snapshot from the spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import FontAwesomeNode from '../../../../sun/js/FontAwesomeNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';

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

modelsOfTheHydrogenAtom.register( 'SnapshotNode', SnapshotNode );
export default SnapshotNode;