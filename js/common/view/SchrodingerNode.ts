// Copyright 2022-2025, University of Colorado Boulder

/**
 * SchrodingerNode displays the Schrodinger model of the hydrogen atom.
 *
 * The axes are orientated with x horizontal, z vertical, y depth.
 *
 * Probability density is computed in 3D. The atom's 3D space is treated as a cube containing NxNxN discrete cells.
 * The probability density is computed at the center of each cell.
 *
 * The NxNxN 3D cube is projected onto an NxN 2D grid that covers the zoomed-in box. Depth information is mapped to
 * opacity (alpha). The sum of probability densities for the depth dimension (y-axis) are normalized to an opacity
 * value that has the range [0,1].  Each cell in the NxN grid has an opacity value that is used as the alpha component
 * for the cell's fill color.
 *
 * Computing the probability density for an NxNxN cube is fairly expensive, so the resulting NxN array of opacity
 * values is cached for reuse. See SchrodingerImageCache.ts.
 *
 * In the Java implementation, this was SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import SchrodingerOrbitalNode from './SchrodingerOrbitalNode.js';

export default class SchrodingerNode extends HydrogenAtomNode {

  public constructor( schrodingerModel: SchrodingerModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2 ) {

    const orbitalNode = new SchrodingerOrbitalNode( schrodingerModel.nlmProperty, schrodingerModel.position,
      modelViewTransform );

    // Documentation in SchrodingerModel.java (the legacy version) said: "Proton is at the center, visible only when
    // the probability density field strength is below a threshold value." Discussed this with designers, and we
    // decided that the proton will always be visible. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/124.
    const protonNode = new ProtonNode( schrodingerModel.proton, modelViewTransform );

    super( schrodingerModel, hydrogenAtomProperty, {
      children: [ orbitalNode, protonNode ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerNode', SchrodingerNode );