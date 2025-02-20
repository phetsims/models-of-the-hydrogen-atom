// Copyright 2022-2025, University of Colorado Boulder

/**
 * SchrodingerNode displays the Schrödinger model of the hydrogen atom.
 *
 * The axes are orientated with x horizontal, z vertical, y depth.
 *
 * Schrödinger orbitals are created by sampling the probability density on a uniform grid in 3D space, then projecting
 * into a uniform 2D grid. These samples are then used to create small PNG images for each orbital, where each sample
 * is used to create an RGBA pixel in the PNG image. The small PNG image is rendered using a scenery Image node, and
 * scaling it up to fit the zoomed-in box automatically provides smoothing of the image.
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