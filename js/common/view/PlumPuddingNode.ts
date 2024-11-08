// Copyright 2022-2024, University of Colorado Boulder

/**
 * PlumPuddingNode displays the "Plum Pudding" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Image, Node } from '../../../../scenery/js/imports.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';

type SelfOptions = EmptySelfOptions;

type PlumPuddingNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class PlumPuddingNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: PlumPuddingModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: PlumPuddingNodeOptions ) {

    const options = optionize<PlumPuddingNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    // Plum pudding image, centered at the atom's position
    const plumPuddingImage = new Image( plumPudding_png );
    const atomHeight = Math.abs( 2 * modelViewTransform.modelToViewDeltaY( hydrogenAtom.radius ) );
    const imageScale = atomHeight / plumPuddingImage.height;
    plumPuddingImage.scale( imageScale );
    plumPuddingImage.center = modelViewTransform.modelToViewPosition( hydrogenAtom.position );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform );

    options.children = [ plumPuddingImage, electronNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );
  }

  public static createIcon(): Node {
    const plumPuddingImage = new Image( plumPudding_png, {
      scale: 0.1
    } );
    const electronNode = ElectronNode.createIcon();
    electronNode.center = plumPuddingImage.center;
    return new Node( {
      children: [ plumPuddingImage, electronNode ],
      scale: 0.5
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingNode', PlumPuddingNode );