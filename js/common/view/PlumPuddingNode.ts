// Copyright 2022, University of Colorado Boulder

/**
 * PlumPuddingNode shows the "Plum Pudding" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Image } from '../../../../scenery/js/imports.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

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
    const plumPuddingImage = new Image( plumPudding_png, {
      tandem: options.tandem.createTandem( 'plumPuddingImage' )
    } );
    const imageHeight = plumPuddingImage.height;
    const atomHeight = 2 * modelViewTransform.modelToViewDeltaY( hydrogenAtom.radius );
    const imageScale = atomHeight / imageHeight;
    plumPuddingImage.scale( imageScale );
    plumPuddingImage.center = modelViewTransform.modelToViewPosition( hydrogenAtom.position );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform, {
      tandem: options.tandem.createTandem( 'electronNode' )
    } );

    options.children = [ plumPuddingImage, electronNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingNode', PlumPuddingNode );