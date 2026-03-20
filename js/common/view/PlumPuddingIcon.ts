// Copyright 2025-2026, University of Colorado Boulder

/**
 * PlumPuddingIcon is the icon that represents the Plum Pudding atomic model in the user interface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import ElectronNode from './ElectronNode.js';

export default class PlumPuddingIcon extends Node {

  public constructor() {

    // Plum pudding
    const plumPuddingImage = new Image( plumPudding_png, {
      scale: 0.1
    } );

    // Electron
    const electronNode = ElectronNode.createIcon();
    electronNode.center = plumPuddingImage.center;

    super( {
      children: [ plumPuddingImage, electronNode ],
      scale: 0.5
    } );
  }
}
