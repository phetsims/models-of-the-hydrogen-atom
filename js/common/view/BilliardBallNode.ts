// Copyright 2022, University of Colorado Boulder

/**
 * BilliardBallNode shows the billiard-ball representation of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import BilliardBallModel from '../model/BilliardBallModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import ShadedSphereNode from '../../../../scenery-phet/js/ShadedSphereNode.js';
import MOTHAColors from '../MOTHAColors.js';
import Photon from '../model/Photon.js';
import PhotonNode from './PhotonNode.js';

type SelfOptions = {};

type BilliardBallNodeOptions = SelfOptions & HydrogenAtomNodeOptions;

export default class BilliardBallNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: BilliardBallModel, hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2, providedOptions: BilliardBallNodeOptions ) {

    const options = optionize<BilliardBallNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO
    }, providedOptions );

    const viewPosition = modelViewTransform.modelToViewPosition( hydrogenAtom.position );

    const shadedSphereNode = new ShadedSphereNode( 2 * hydrogenAtom.radius, {
      mainColor: MOTHAColors.billiardBallColorProperty,
      highlightColor: MOTHAColors.billiardBallHighlightColorProperty,
      center: viewPosition
    } );

    //TODO delete this test of PhotonNode
    const photon = new Photon( { wavelength: 640 } );
    const photonNode = new PhotonNode( photon );
    photonNode.centerX = shadedSphereNode.x;
    photonNode.top = shadedSphereNode.bottom + 50;

    options.children = [ shadedSphereNode, photonNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallNode', BilliardBallNode );