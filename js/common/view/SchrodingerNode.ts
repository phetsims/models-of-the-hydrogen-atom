// Copyright 2022-2025, University of Colorado Boulder

//TODO port SchrodingerNode.java

/**
 * SchrodingerNode displays the Schrodinger model of the hydrogen atom.
 *
 * The axes are orientated with x horizontal, z vertical, y depth.
 *
 * Probability density is computed in 3D. The atom's 3D space is treated as a cube containing NxNxN discrete cells.
 * The probability density is computed at the center of each cell.
 *
 * The NxNxN 3D cube is projected onto an NxN 2D grid that covers the animation box. Depth information is mapped to
 * color brightness. The sum of probability densities * for the depth dimension (y-axis) are normalized to a brightness
 * value that has the range [0,1].  Each cell in the NxN grid has a brightness value that is used to generate the
 * cell's color.
 *
 * Computing the probability density for an NxNxN cube is fairly expensive, so the resulting NxN array of brightness
 * values is cache for reuse.
 *
 * In the Java implementation, this was SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import MOTHAColors from '../MOTHAColors.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import SchrodingerFieldNode from './SchrodingerFieldNode.js';
import ZoomedInBox from '../model/ZoomedInBox.js';

export default class SchrodingerNode extends HydrogenAtomNode {

  public constructor( schrodingerModel: SchrodingerModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBox: ZoomedInBox,
                      modelViewTransform: ModelViewTransform2 ) {

    const protonNode = new ProtonNode( schrodingerModel.proton, modelViewTransform );

    const fieldNode = new SchrodingerFieldNode( schrodingerModel, zoomedInBox, modelViewTransform );

    super( schrodingerModel, hydrogenAtomProperty, {
      children: [ fieldNode, protonNode ]
    } );
  }

  /**
   * Creates the icon that represents this model in the user interface. The icon consists of 4 overlapping rectangles.
   */
  public static createIcon(): Node {

    const opacity = 0.4;

    const rect1Size = new Dimension2( 75, 50 );
    const rect3Size = new Dimension2( 1.35 * rect1Size.width, rect1Size.width );
    assert && assert( rect3Size.height === rect1Size.width );

    // rect1 and rect2 have the same dimensions, 90 degrees different (swapped).
    const rect1 = new Rectangle( 0, 0, rect1Size.width, rect1Size.height, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity
    } );
    const rect2 = new Rectangle( 0, 0, rect1Size.height, rect1Size.width, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    // rect3 and rect4 have the same dimensions, 90 degrees different (swapped).
    const rect3 = new Rectangle( 0, 0, rect3Size.width, rect3Size.height, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );
    const rect4 = new Rectangle( 0, 0, rect3Size.height, rect3Size.width, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    return new Node( {
      children: [ rect1, rect2, rect3, rect4 ],
      scale: 0.25
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerNode', SchrodingerNode );