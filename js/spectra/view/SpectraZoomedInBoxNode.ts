// Copyright 2022-2024, University of Colorado Boulder

/**
 * SpectraZoomedInBoxNode displays what's inside the zoomed-in box for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import BilliardBallNode from '../../common/view/BilliardBallNode.js';
import BohrNode from '../../common/view/BohrNode.js';
import ClassicalSolarSystemNode from '../../common/view/ClassicalSolarSystemNode.js';
import DeBroglieNode from '../../common/view/DeBroglieNode.js';
import PlumPuddingNode from '../../common/view/PlumPuddingNode.js';
import SchrodingerNode from '../../common/view/SchrodingerNode.js';
import ZoomedInBoxNode, { ZoomedInBoxNodeOptions } from '../../common/view/ZoomedInBoxNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

type SpectraZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class SpectraZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: SpectraModel, popupParent: Node, providedOptions: SpectraZoomedInBoxNodeOptions ) {

    const options = providedOptions;

    const createHydrogenAtomNodes = ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => {

      const billiardBallNode = new BilliardBallNode( model.billiardBallModel, model.hydrogenAtomProperty, modelViewTransform );

      const plumPuddingNode = new PlumPuddingNode( model.plumPuddingModel, model.hydrogenAtomProperty, modelViewTransform );

      const classicalSolarSystemNode = new ClassicalSolarSystemNode( model.classicalSolarSystemModel,
        model.hydrogenAtomProperty, model.zoomedInBox, modelViewTransform, parentTandem.createTandem( 'classicalSolarSystemNode' ) );

      const bohrNode = new BohrNode( model.bohrModel, model.hydrogenAtomProperty, model.zoomedInBox, modelViewTransform,
        parentTandem.createTandem( 'bohrNode' ) );

      const deBroglieNode = new DeBroglieNode( model.deBroglieModel, model.hydrogenAtomProperty, model.zoomedInBox,
        modelViewTransform, popupParent, parentTandem.createTandem( 'deBroglieNode' ) );

      const schrodingerNode = new SchrodingerNode( model.schrodingerModel, model.hydrogenAtomProperty, model.zoomedInBox,
        model.light, modelViewTransform, parentTandem.createTandem( 'schrodingerNode' ) );

      return [
        billiardBallNode,
        plumPuddingNode,
        classicalSolarSystemNode,
        bohrNode,
        deBroglieNode,
        schrodingerNode
      ];
    };

    super( model.zoomedInBox, model.photonSystem, createHydrogenAtomNodes, model.isExperimentProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraZoomedInBoxNode', SpectraZoomedInBoxNode );