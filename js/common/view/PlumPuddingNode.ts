// Copyright 2022-2025, University of Colorado Boulder

/**
 * PlumPuddingNode displays the "Plum Pudding" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';

export default class PlumPuddingNode extends HydrogenAtomNode {

  public constructor( plumPuddingModel: PlumPuddingModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2 ) {

    // Plum pudding image, centered at the atom's position
    const plumPuddingImage = new Image( plumPudding_png );
    const atomHeight = Math.abs( 2 * modelViewTransform.modelToViewDeltaY( PlumPuddingModel.RADIUS ) );
    const imageScale = atomHeight / plumPuddingImage.height;
    plumPuddingImage.scale( imageScale );
    plumPuddingImage.center = modelViewTransform.modelToViewPosition( plumPuddingModel.position );

    const electronNode = new ElectronNode( plumPuddingModel.electron, modelViewTransform );

    super( plumPuddingModel, hydrogenAtomProperty, {
      children: [ plumPuddingImage, electronNode ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingNode', PlumPuddingNode );