// Copyright 2015-2024, University of Colorado Boulder

/**
 * ProtonNode is the visual representation of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Proton from '../model/Proton.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type ProtonNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ProtonNode extends ShadedSphereNode {

  public constructor( proton: Proton, modelViewTransform: ModelViewTransform2, providedOptions?: ProtonNodeOptions ) {

    const options = optionize4<ProtonNodeOptions, SelfOptions, ShadedSphereNodeOptions>()(
      {}, MOTHAConstants.SHADED_SPHERE_NODE_OPTIONS, {

        // ShadedSphereNodeOptions
        isDisposable: false,
        mainColor: MOTHAColors.protonBaseColorProperty,
        highlightColor: MOTHAColors.protonHighlightColorProperty,
        translation: modelViewTransform.modelToViewPosition( proton.position )
      }, providedOptions );

    super( 2 * modelViewTransform.modelToViewDeltaX( Proton.RADIUS ), options );
  }

  /**
   * Creates a proton icon, used in the legend.
   */
  public static createIcon( scale = 1 ): Node {
    const proton = new Proton();
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new ProtonNode( proton, modelViewTransform, {
      scale: scale
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ProtonNode', ProtonNode );