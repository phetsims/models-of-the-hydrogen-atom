// Copyright 2025, University of Colorado Boulder

/**
 * SchrodingerIconNode is the icon that represents the Schrodinger atomic model in the user interface.
 * The icon consists of 4 overlapping rectangles.
 *
 * This was originally a static method of SchrodingerNode, but that caused problems with circular imports.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import ProtonNode from './ProtonNode.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
import MOTHAColors from '../MOTHAColors.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class SchrodingerIcon extends Node {

  public constructor() {

    const protonIcon = ProtonNode.createIcon( 0.5 );

    // Cannot use schrodingerImageCache.getDataURL here due to circular module imports. So fake it with a Circle.
    const orbitalRadius = 2.1 * protonIcon.width;
    const orbitalNode = new Circle( orbitalRadius, {
      fill: new RadialGradient( 0, 0, 0, 0, 0, orbitalRadius )
        .addColorStop( 0.2, MOTHAColors.electronBaseColorProperty )
        .addColorStop( 1, new DerivedProperty( [ MOTHAColors.electronBaseColorProperty ], electronBaseColor => electronBaseColor.withAlpha( 0.05 ) ) )
    } );
    orbitalNode.center = protonIcon.center;

    super( {
      children: [ orbitalNode, protonIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerIcon', SchrodingerIcon );