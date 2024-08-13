// Copyright 2022-2024, University of Colorado Boulder

/**
 * BilliardBallNode displays the "Billiard Ball" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BilliardBallModel from '../model/BilliardBallModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import MOTHAColors from '../MOTHAColors.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type BilliardBallNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class BilliardBallNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: BilliardBallModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: BilliardBallNodeOptions ) {

    const viewRadius = modelViewTransform.modelToViewDeltaX( hydrogenAtom.radius );
    const ballNode = new BallNode( 2 * viewRadius, providedOptions.tandem.createTandem( 'ballNode' ) );

    const options = optionize<BilliardBallNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {

      // HydrogenAtomNodeOptions
      children: [ ballNode ]
    }, providedOptions );

    super( hydrogenAtom, hydrogenAtomProperty, options );

    this.translation = modelViewTransform.modelToViewPosition( hydrogenAtom.position );
  }

  public static createIcon(): Node {
    return new BallNode( 15 );
  }
}

class BallNode extends ShadedSphereNode {
  public constructor( diameter: number, tandem = Tandem.OPT_OUT ) {
    super( diameter, combineOptions<ShadedSphereNodeOptions>( {}, MOTHAConstants.SHADED_SPHERE_NODE_OPTIONS, {
      mainColor: MOTHAColors.billiardBallColorProperty,
      highlightColor: MOTHAColors.billiardBallHighlightColorProperty,
      tandem: tandem
    } ) );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallNode', BilliardBallNode );