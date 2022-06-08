// Copyright 2015-2022, University of Colorado Boulder

/**
 * NeutronNode is the visual representation of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Neutron from '../model/Neutron.js';
import { Node } from '../../../../scenery/js/imports.js';

type SelfOptions = {};

type NeutronNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class NeutronNode extends ShadedSphereNode {

  public constructor( neutron: Neutron, modelViewTransform: ModelViewTransform2, providedOptions?: NeutronNodeOptions ) {

    const options = optionize<NeutronNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: 'rgb( 128, 128, 128 )',
      highlightColor: 'rgb( 175, 175, 175 )'
    }, providedOptions );

    super( 2 * neutron.radius, options );
  }

  /**
   * Creates a neutron icon, used in the Legend.
   */
  public static createIcon(): Node {
    const neutron = new Neutron();
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new NeutronNode( neutron, modelViewTransform );
  }
}

modelsOfTheHydrogenAtom.register( 'NeutronNode', NeutronNode );