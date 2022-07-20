// Copyright 2015-2022, University of Colorado Boulder

//TODO duplication with ElectronNode
/**
 * ProtonNode is the visual representation of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Proton from '../model/Proton.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type ProtonNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ProtonNode extends ShadedSphereNode {

  public constructor( proton: Proton, modelViewTransform: ModelViewTransform2, providedOptions?: ProtonNodeOptions ) {

    const options = optionize<ProtonNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: MOTHAColors.protonBaseColorProperty,
      highlightColor: MOTHAColors.protonHighlightColorProperty
    }, providedOptions );

    super( 2 * modelViewTransform.modelToViewDeltaX( proton.radius ), options );

    proton.positionProperty.link( position => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Creates a proton icon, used in the Key.
   */
  public static createIcon( scale = 1 ): Node {
    const proton = new Proton( {
      tandem: Tandem.OPT_OUT
    } );
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new ProtonNode( proton, modelViewTransform, {
      scale: scale
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ProtonNode', ProtonNode );