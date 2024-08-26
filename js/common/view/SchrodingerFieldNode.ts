// Copyright 2022-2024, University of Colorado Boulder

//TODO Java implementation assumes a 1:1 transform between model and view coordinates.
//   So we need to map from view to model coordinates before computing probability density.

/**
 * SchrodingerFieldNode displays the probability density field for the Schrodinger model of the hydrogen atom.
 * See SchrodingerFieldNode for more documentation.
 *
 * In the Java implementation, this was class AtomNode is SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Node } from '../../../../scenery/js/imports.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import SchrodingerBrightness from './SchrodingerBrightness.js';
import SchrodingerQuadrantNode from './SchrodingerQuadrantNode.js';

export default class SchrodingerFieldNode extends Node {

  private readonly brightnessCache: SchrodingerBrightness;

  public constructor( hydrogenAtom: SchrodingerModel, modelViewTransform: ModelViewTransform2 ) {

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const upperLeftQuadrantNode = new SchrodingerQuadrantNode( zoomedInBoxBounds.width / 2, zoomedInBoxBounds.height / 2 );
    //TODO wrap upperLeftQuadrantNode in 4 other Nodes, transformed for each quadrant

    super( {
      isDisposable: false,
      children: [ upperLeftQuadrantNode ]
    } );

    this.brightnessCache = new SchrodingerBrightness( hydrogenAtom, zoomedInBoxBounds );

    hydrogenAtom.nlmProperty.link( nlm => {
      const brightness = this.brightnessCache.getBrightness( nlm );
      upperLeftQuadrantNode.setBrightness( brightness );
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerFieldNode', SchrodingerFieldNode );