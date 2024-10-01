// Copyright 2022-2024, University of Colorado Boulder

/**
 * OrbitsNode is the set of 2D orbits for a hydrogen atom's electron. It is used in the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import OrbitNode from './OrbitNode.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';

type SelfOptions = EmptySelfOptions;

type OrbitsNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class OrbitsNode extends Node {

  public constructor( hydrogenAtomPosition: Vector2, modelViewTransform: ModelViewTransform2, providedOptions: OrbitsNodeOptions ) {

    const options = optionize<OrbitsNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false,
      center: modelViewTransform.modelToViewPosition( hydrogenAtomPosition )
    }, providedOptions );

    const orbitNodes = [];
    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const radius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );
      const orbitNode = new OrbitNode( radius );
      orbitNodes.push( orbitNode );
    }
    options.children = orbitNodes;

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'OrbitsNode', OrbitsNode );