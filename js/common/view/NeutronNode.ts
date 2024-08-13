// Copyright 2015-2024, University of Colorado Boulder

/**
 * NeutronNode is the visual representation of a neutron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Neutron from '../model/Neutron.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type NeutronNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class NeutronNode extends ShadedSphereNode {

  public constructor( neutron: Neutron, modelViewTransform: ModelViewTransform2, providedOptions?: NeutronNodeOptions ) {

    const options = optionize4<NeutronNodeOptions, SelfOptions, ShadedSphereNodeOptions>()(
      {}, MOTHAConstants.SHADED_SPHERE_NODE_OPTIONS, {

        // ShadedSphereNodeOptions
        isDisposable: false,
        mainColor: MOTHAColors.neutronBaseColorProperty,
        highlightColor: MOTHAColors.neutronHighlightColorProperty
      }, providedOptions );

    super( 2 * modelViewTransform.modelToViewDeltaX( neutron.radius ), options );
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