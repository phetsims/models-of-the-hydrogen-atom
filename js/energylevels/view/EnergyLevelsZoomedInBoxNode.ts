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

type SelfOptions = EmptySelfOptions;

type EnergyLevelsZoomedInBoxNodeOptions = SelfOptions & ZoomedInBoxNodeOptions;

export default class EnergyLevelsZoomedInBoxNode extends ZoomedInBoxNode {

  public constructor( model: EnergyLevelsModel, popupParent: Node, providedOptions: EnergyLevelsZoomedInBoxNodeOptions ) {

    const options = providedOptions;

    const createHydrogenAtomNodes = ( modelViewTransform: ModelViewTransform2, parentTandem: Tandem ) => {

      const bohrNode = new BohrNode( model.bohrModel, model.hydrogenAtomProperty, model.zoomedInBox, modelViewTransform, {
        tandem: parentTandem.createTandem( 'bohrNode' )
      } );

      const deBroglieNode = new DeBroglieNode( model.deBroglieModel, model.hydrogenAtomProperty, model.zoomedInBox,
        modelViewTransform, popupParent, {
          tandem: parentTandem.createTandem( 'deBroglieNode' )
        } );

      const schrodingerNode = new SchrodingerNode( model.schrodingerModel, model.hydrogenAtomProperty, model.zoomedInBox,
        model.light, modelViewTransform, {
          tandem: parentTandem.createTandem( 'schrodingerNode' )
        } );

      return [
        bohrNode,
        deBroglieNode,
        schrodingerNode
      ];
    };

    super( model.zoomedInBox, model.photonSystem, createHydrogenAtomNodes, model.isExperimentProperty, options );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsZoomedInBoxNode', EnergyLevelsZoomedInBoxNode );