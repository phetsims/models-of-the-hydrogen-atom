// Copyright 2022-2025, University of Colorado Boulder

/**
 * SpectraZoomedInBoxNode displays what's inside the zoomed-in box for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BilliardBallNode from '../../common/view/BilliardBallNode.js';
import BohrNode from '../../common/view/BohrNode.js';
import BohrOverlayNode from '../../common/view/BohrOverlayNode.js';
import ClassicalSolarSystemNode from '../../common/view/ClassicalSolarSystemNode.js';
import ClassicalSolarSystemOverlayNode from '../../common/view/ClassicalSolarSystemOverlayNode.js';
import DeBroglieNode from '../../common/view/DeBroglieNode.js';
import DeBroglieOverlayNode from '../../common/view/DeBroglieOverlayNode.js';
import PlumPuddingNode from '../../common/view/PlumPuddingNode.js';
import SchrodingerNode from '../../common/view/SchrodingerNode.js';
import SchrodingerOverlayNode from '../../common/view/SchrodingerOverlayNode.js';
import ZoomedInBoxNode from '../../common/view/ZoomedInBoxNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SpectraModel from '../model/SpectraModel.js';

export default class SpectraZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: SpectraModel, listboxParent: Node, tandem: Tandem ) {

    // Creates the view for this screen's atomic models.
    const createHydrogenAtomNodes = ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => {

      const billiardBallNode = new BilliardBallNode( model.billiardBallModel, model.hydrogenAtomProperty, modelViewTransform );

      const plumPuddingNode = new PlumPuddingNode( model.plumPuddingModel, model.hydrogenAtomProperty, modelViewTransform );

      const classicalSolarSystemNode = new ClassicalSolarSystemNode( model.classicalSolarSystemModel,
        model.hydrogenAtomProperty, modelViewTransform );

      const bohrNode = new BohrNode( model.bohrModel, model.hydrogenAtomProperty, modelViewTransform );

      const deBroglieNode = new DeBroglieNode( model.deBroglieModel, model.hydrogenAtomProperty, modelViewTransform,
        parentTandem.createTandem( 'deBroglieNode' ) );

      const schrodingerNode = new SchrodingerNode( model.schrodingerModel, model.hydrogenAtomProperty, modelViewTransform );

      return [
        billiardBallNode,
        plumPuddingNode,
        classicalSolarSystemNode,
        bohrNode,
        deBroglieNode,
        schrodingerNode
      ];
    };

    // Creates the overlays that have controls and displays for this screen's atomic models.
    const createOverlayNodes = ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => {

      const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( model.zoomedInBox.bounds );

      const classicalSolarSystemOverlayNode = new ClassicalSolarSystemOverlayNode( model.classicalSolarSystemModel,
        model.hydrogenAtomProperty, zoomedInBoxBounds, parentTandem.createTandem( 'classicalSolarSystemOverlayNode' ) );

      const bohrOverlayNode = new BohrOverlayNode( model.bohrModel, model.hydrogenAtomProperty, zoomedInBoxBounds,
        parentTandem.createTandem( 'bohrOverlayNode' ) );

      const deBroglieOverlayNode = new DeBroglieOverlayNode( model.deBroglieModel, model.hydrogenAtomProperty,
        zoomedInBoxBounds, listboxParent, parentTandem.createTandem( 'deBroglieOverlayNode' ) );

      const schrodingerOverlayNode = new SchrodingerOverlayNode( model.schrodingerModel, model.hydrogenAtomProperty,
        zoomedInBoxBounds, model.lightSource, parentTandem.createTandem( 'schrodingerOverlayNode' ) );

      return [
        classicalSolarSystemOverlayNode,
        bohrOverlayNode,
        deBroglieOverlayNode,
        schrodingerOverlayNode
      ];
    };

    super( model, createHydrogenAtomNodes, createOverlayNodes, tandem );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraZoomedInBoxNode', SpectraZoomedInBoxNode );