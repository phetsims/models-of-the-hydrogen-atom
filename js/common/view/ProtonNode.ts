// Copyright 2015-2022, University of Colorado Boulder

/**
 * ProtonNode is the visual representation of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Proton from '../model/Proton.js';
import { Node } from '../../../../scenery/js/imports.js';

type SelfOptions = EmptyObjectType;

type ProtonNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ProtonNode extends ShadedSphereNode {

  public constructor( proton: Proton, modelViewTransform: ModelViewTransform2, providedOptions?: ProtonNodeOptions ) {

    const options = optionize<ProtonNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: PhetColorScheme.RED_COLORBLIND,
      highlightColor: 'rgb( 255, 130, 130 )' // lighter red
    }, providedOptions );

    super( 2 * modelViewTransform.modelToViewDeltaX( proton.radius ), options );

    proton.positionProperty.link( position => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    } );
  }

  /**
   * Creates a proton icon, used in the Legend.
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