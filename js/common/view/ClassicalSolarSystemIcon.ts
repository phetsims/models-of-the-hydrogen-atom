// Copyright 2025, University of Colorado Boulder

/**
 * ClassicalSolarSystemIcon is the icon that represents the Classical Solar System atomic model in the user interface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ProtonNode from './ProtonNode.js';
import ElectronNode from './ElectronNode.js';

export default class ClassicalSolarSystemIcon extends Node {

  public constructor() {

    // Proton
    const protonIcon = ProtonNode.createIcon( 0.5 );
    protonIcon.setScaleMagnitude( 0.5 );

    // Electron
    const electronIcon = ElectronNode.createIcon( 0.5 );

    // Electron above and right of proton
    const electronAngle = 0.75 * Math.PI;
    const orbitRadius = 1.5 * protonIcon.height;
    electronIcon.centerX = orbitRadius * Math.sin( electronAngle );
    electronIcon.centerY = orbitRadius * Math.cos( electronAngle );

    super( {
      children: [ protonIcon, electronIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemIcon', ClassicalSolarSystemIcon );