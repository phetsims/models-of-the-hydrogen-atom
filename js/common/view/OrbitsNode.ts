// Copyright 2022, University of Colorado Boulder

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

type SelfOptions = EmptySelfOptions;

type OrbitsNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class OrbitsNode extends Node {

  //TODO BohrModel is not quite the right type here
  public constructor( hydrogenAtom: BohrModel, modelViewTransform: ModelViewTransform2, providedOptions: OrbitsNodeOptions ) {

    const options = optionize<OrbitsNodeOptions, SelfOptions, NodeOptions>()( {
      center: modelViewTransform.modelToViewPosition( hydrogenAtom.position )
    }, providedOptions );

    const orbitNodes = [];
    const minState = MOTHAConstants.GROUND_STATE;
    const maxState = MOTHAConstants.GROUND_STATE + BohrModel.getNumberOfStates() - 1;
    for ( let state = minState; state <= maxState; state++ ) {
      const radius = modelViewTransform.modelToViewDeltaX( hydrogenAtom.getElectronOrbitRadius( state ) );
      const orbitNode = new OrbitNode( radius );
      orbitNodes.push( orbitNode );
    }
    options.children = orbitNodes;

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'OrbitsNode', OrbitsNode );