// Copyright 2022-2025, University of Colorado Boulder

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

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import SchrodingerBrightness from './SchrodingerBrightness.js';
import SchrodingerQuadrantNode from './SchrodingerQuadrantNode.js';
import ZoomedInBox from '../model/ZoomedInBox.js';

export default class SchrodingerFieldNode extends Node {

  private readonly brightnessCache: SchrodingerBrightness;

  public constructor( schrodingerModel: SchrodingerModel, zoomedInBox: ZoomedInBox, modelViewTransform: ModelViewTransform2 ) {

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox );

    const quadrantWidth = zoomedInBoxBounds.width / 2;
    const quadrantHeight = zoomedInBoxBounds.height / 2;

    const bottomRightQuadrantNode = new SchrodingerQuadrantNode( quadrantWidth, quadrantHeight );
    //TODO wrap bottomRightQuadrantNode in 3 other Nodes, reflected for each quadrant

    super( {
      isDisposable: false,
      children: [ bottomRightQuadrantNode ],
      translation: modelViewTransform.modelToViewPosition( schrodingerModel.position )
    } );

    this.brightnessCache = new SchrodingerBrightness( schrodingerModel, zoomedInBoxBounds );

    schrodingerModel.nlmProperty.link( nlm => {
      const brightness = this.brightnessCache.getBrightness( nlm );
      bottomRightQuadrantNode.setBrightness( brightness );
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerFieldNode', SchrodingerFieldNode );