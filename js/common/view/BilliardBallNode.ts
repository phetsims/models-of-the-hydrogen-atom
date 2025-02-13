// Copyright 2022-2025, University of Colorado Boulder

/**
 * BilliardBallNode displays the "Billiard Ball" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BilliardBallModel from '../model/BilliardBallModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';

export default class BilliardBallNode extends HydrogenAtomNode {

  public constructor( billiardBallModel: BilliardBallModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2 ) {

    const ballNode = new ShadedSphereNode( 2 * modelViewTransform.modelToViewDeltaX( BilliardBallModel.RADIUS ),
      combineOptions<ShadedSphereNodeOptions>( {}, MOTHAConstants.SHADED_SPHERE_NODE_OPTIONS, {
        mainColor: MOTHAColors.billiardBallColorProperty,
        highlightColor: MOTHAColors.billiardBallHighlightColorProperty
      } ) );

    super( billiardBallModel, hydrogenAtomProperty, {
      children: [ ballNode ]
    } );

    this.translation = modelViewTransform.modelToViewPosition( billiardBallModel.position );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallNode', BilliardBallNode );