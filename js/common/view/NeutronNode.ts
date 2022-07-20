// Copyright 2015-2022, University of Colorado Boulder

//TODO duplication with ElectronNode
/**
 * NeutronNode is the visual representation of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Neutron from '../model/Neutron.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type NeutronNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class NeutronNode extends ShadedSphereNode {

  public constructor( neutron: Neutron, modelViewTransform: ModelViewTransform2, providedOptions?: NeutronNodeOptions ) {

    const options = optionize<NeutronNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: MOTHAColors.neutronBaseColorProperty,
      highlightColor: MOTHAColors.neutronHighlightColorProperty
    }, providedOptions );

    super( 2 * modelViewTransform.modelToViewDeltaX( neutron.radius ), options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Creates a neutron icon, used in the Key.
   */
  public static createIcon( scale = 1 ): Node {
    const neutron = new Neutron( {
      tandem: Tandem.OPT_OUT
    } );
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new NeutronNode( neutron, modelViewTransform, {
      scale: scale
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'NeutronNode', NeutronNode );