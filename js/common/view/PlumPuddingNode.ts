// Copyright 2022, University of Colorado Boulder

/**
 * PlumPuddingNode shows the "plum pudding" representation of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import { Image } from '../../../../scenery/js/imports.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';

type SelfOptions = {};

type PlumPuddingNodeOptions = SelfOptions & HydrogenAtomNodeOptions;

export default class PlumPuddingNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: PlumPuddingModel, hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2, providedOptions: PlumPuddingNodeOptions ) {

    const options = optionize<PlumPuddingNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO
    }, providedOptions );

    const viewPosition = modelViewTransform.modelToViewPosition( hydrogenAtom.position );

    const plumPuddingImage = new Image( plumPudding_png );
    const imageHeight = plumPuddingImage.height;
    const atomHeight = 2 * modelViewTransform.modelToViewDeltaY( hydrogenAtom.radius );
    const imageScale = atomHeight / imageHeight;
    plumPuddingImage.scale( imageScale );
    plumPuddingImage.center = viewPosition;

    const electronNode = new ElectronNode( {
      center: viewPosition
    } );

    options.children = [ plumPuddingImage, electronNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingNode', PlumPuddingNode );