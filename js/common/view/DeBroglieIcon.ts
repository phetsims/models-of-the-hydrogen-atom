// Copyright 2025, University of Colorado Boulder

/**
 * DeBroglieIcon is the icon that represents the de Broglie atomic model in the user interface.
 * This icon corresponds to the 'Radial' view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MOTHAColors from '../MOTHAColors.js';
import ProtonNode from './ProtonNode.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';

export default class DeBroglieIcon extends Node {

  public constructor() {

    // Proton
    const protonIcon = ProtonNode.createIcon( 0.5 );

    // Electron orbit
    const orbitRadius = 1.5 * protonIcon.height;
    const orbitNode = new Circle( orbitRadius, {
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ]
    } );

    // Electron 'radial' representation
    const electronIcon = new Circle( {
      radius: orbitRadius,
      stroke: MOTHAColors.electronBaseColorProperty,
      top: orbitNode.top - 5
    } );

    super( {
      children: [ orbitNode, protonIcon, electronIcon ]
    } );

  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieIcon', DeBroglieIcon );