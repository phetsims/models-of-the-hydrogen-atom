// Copyright 2022-2025, University of Colorado Boulder

/**
 * BohrNode displays the Bohr model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import OrbitsNode from './OrbitsNode.js';
import ProtonNode from './ProtonNode.js';

export default class BohrNode extends HydrogenAtomNode {

  public constructor( bohrModel: BohrModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2 ) {

    const orbitsNode = new OrbitsNode( bohrModel.position, modelViewTransform );

    const protonNode = new ProtonNode( bohrModel.proton, modelViewTransform );

    const electronNode = new ElectronNode( bohrModel.electron, modelViewTransform );

    super( bohrModel, hydrogenAtomProperty, {
      children: [ orbitsNode, protonNode, electronNode ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrNode', BohrNode );