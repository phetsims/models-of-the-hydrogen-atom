// Copyright 2025, University of Colorado Boulder

/**
 * BohrIcon is the icon that represents the Bohr atomic model in the user interface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import MOTHAColors from '../MOTHAColors.js';
import ProtonNode from './ProtonNode.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ElectronNode from './ElectronNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';

export default class BohrIcon extends Node {

  public constructor() {

    // Proton
    const protonIcon = ProtonNode.createIcon();
    protonIcon.setScaleMagnitude( 0.5 );

    // Electron orbit
    const orbitRadius = 1.5 * protonIcon.height;
    const orbitNode = new Circle( orbitRadius, {
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ]
    } );

    // Electron particle
    const electronIcon = ElectronNode.createIcon();
    electronIcon.setScaleMagnitude( 0.5 );
    const electronAngle = 1.25 * Math.PI;
    electronIcon.centerX = orbitRadius * Math.sin( electronAngle );
    electronIcon.centerY = orbitRadius * Math.cos( electronAngle );

    super( {
      children: [ orbitNode, protonIcon, electronIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrIcon', BohrIcon );