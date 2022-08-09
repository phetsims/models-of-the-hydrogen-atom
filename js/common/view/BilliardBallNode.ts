// Copyright 2022, University of Colorado Boulder

/**
 * BilliardBallNode shows the "Billiard Ball" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BilliardBallModel from '../model/BilliardBallModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import MOTHAColors from '../MOTHAColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

type SelfOptions = EmptySelfOptions;

type BilliardBallNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class BilliardBallNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: BilliardBallModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: BilliardBallNodeOptions ) {

    const options = optionize<BilliardBallNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const viewRadius = modelViewTransform.modelToViewDeltaX( hydrogenAtom.radius );
    const ballNode = new ShadedSphereNode( 2 * viewRadius, {
      mainColor: MOTHAColors.billiardBallColorProperty,
      highlightColor: MOTHAColors.billiardBallHighlightColorProperty,
      tandem: options.tandem.createTandem( 'ballNode' )
    } );

    options.children = [ ballNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    this.translation = modelViewTransform.modelToViewPosition( hydrogenAtom.position );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallNode', BilliardBallNode );