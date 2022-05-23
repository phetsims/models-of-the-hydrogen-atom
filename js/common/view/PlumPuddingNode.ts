// Copyright 2022, University of Colorado Boulder

/**
 * PlumPuddingNode shows the "plum pudding" representation of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Image, Node, NodeTranslationOptions, RectangleOptions } from '../../../../scenery/js/imports.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';

type SelfOptions = {};

type PlumPuddingNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<RectangleOptions, 'tandem'>;

export default class PlumPuddingNode extends Node {

  constructor( atom: PlumPuddingModel, modelViewTransform: ModelViewTransform2, providedOptions: PlumPuddingNodeOptions ) {

    const options = optionize<PlumPuddingNodeOptions, SelfOptions, RectangleOptions>()( {
      //TODO
    }, providedOptions );

    const plumPuddingImage = new Image( plumPudding_png );
    const imageHeight = plumPuddingImage.height;
    const atomHeight = 2 * modelViewTransform.modelToViewDeltaY( atom.radius );
    const imageScale = atomHeight / imageHeight;
    plumPuddingImage.scale( imageScale );

    options.children = [ plumPuddingImage ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingNode', PlumPuddingNode );