// Copyright 2022-2024, University of Colorado Boulder

/**
 * EnergyLevelsZoomedInBoxNode displays what's inside the zoomed-in box for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import BohrNode from '../../common/view/BohrNode.js';
import DeBroglieNode from '../../common/view/DeBroglieNode.js';
import SchrodingerNode from '../../common/view/SchrodingerNode.js';
import ZoomedInBoxNode, { ZoomedInBoxNodeOptions } from '../../common/view/ZoomedInBoxNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import EnergyLevelsModel from '../model/EnergyLevelsModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import BohrOverlayNode from '../../common/view/BohrOverlayNode.js';
import DeBroglieOverlayNode from '../../common/view/DeBroglieOverlayNode.js';
import SchrodingerOverlayNode from '../../common/view/SchrodingerOverlayNode.js';

type SelfOptions = EmptySelfOptions;

type EnergyLevelsZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class EnergyLevelsZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: EnergyLevelsModel, listboxParent: Node, providedOptions: EnergyLevelsZoomedInBoxNodeOptions ) {

    const options = providedOptions;

    const createHydrogenAtomNodes = ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => {

      const bohrNode = new BohrNode( model.bohrModel, model.hydrogenAtomProperty, modelViewTransform );

      const deBroglieNode = new DeBroglieNode( model.deBroglieModel, model.hydrogenAtomProperty,
        modelViewTransform, parentTandem.createTandem( 'deBroglieNode' ) );

      const schrodingerNode = new SchrodingerNode( model.schrodingerModel, model.hydrogenAtomProperty,
        model.zoomedInBox, modelViewTransform );

      return [
        bohrNode,
        deBroglieNode,
        schrodingerNode
      ];
    };

    const createOverlayNodes = ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => {

      const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( model.zoomedInBox );

      const bohrOverlayNode = new BohrOverlayNode( model.bohrModel, model.hydrogenAtomProperty, zoomedInBoxBounds,
        parentTandem.createTandem( 'bohrOverlayNode' ) );

      const deBroglieOverlayNode = new DeBroglieOverlayNode( model.deBroglieModel, model.hydrogenAtomProperty, zoomedInBoxBounds,
        listboxParent, parentTandem.createTandem( 'deBroglieOverlayNode' ) );

      const schrodingerOverlayNode = new SchrodingerOverlayNode( model.schrodingerModel, model.hydrogenAtomProperty,
        zoomedInBoxBounds, model.light, parentTandem.createTandem( 'schrodingerOverlayNode' ) );

      return [
        bohrOverlayNode,
        deBroglieOverlayNode,
        schrodingerOverlayNode
      ];
    };

    super( model.zoomedInBox, model.photonSystem, createHydrogenAtomNodes, createOverlayNodes, model.isExperimentProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsZoomedInBoxNode', EnergyLevelsZoomedInBoxNode );