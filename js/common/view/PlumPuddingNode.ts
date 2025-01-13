// Copyright 2022-2024, University of Colorado Boulder

/**
 * PlumPuddingNode displays the "Plum Pudding" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
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
    const atomHeight = Math.abs( 2 * modelViewTransform.modelToViewDeltaY( plumPuddingModel.radius ) );
    const imageScale = atomHeight / plumPuddingImage.height;
    plumPuddingImage.scale( imageScale );
    plumPuddingImage.center = modelViewTransform.modelToViewPosition( plumPuddingModel.position );

    const electronNode = new ElectronNode( plumPuddingModel.electron, modelViewTransform );

    super( plumPuddingModel, hydrogenAtomProperty, {
      children: [ plumPuddingImage, electronNode ]
    } );
  }

  /**
   * Creates the icon that represents this model in the user interface.
   */
  public static createIcon(): Node {

    // Plum pudding
    const plumPuddingImage = new Image( plumPudding_png, {
      scale: 0.1
    } );

    // Electron
    const electronNode = ElectronNode.createIcon();
    electronNode.center = plumPuddingImage.center;

    return new Node( {
      children: [ plumPuddingImage, electronNode ],
      scale: 0.5
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingNode', PlumPuddingNode );