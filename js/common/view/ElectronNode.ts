// Copyright 2015-2022, University of Colorado Boulder

/**
 * ElectronNode is the visual representation of an electron.
 * An electron is blue, and has a specular highlight with the light source coming from below.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Electron from '../model/Electron.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

type ElectronNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ElectronNode extends ShadedSphereNode {

  public constructor( electron: Electron,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions?: ElectronNodeOptions ) {

    const options = optionize<ElectronNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: MOTHAColors.electronBaseColorProperty,
      highlightColor: MOTHAColors.electronHighlightColorProperty
    }, providedOptions );

    super( 2 * modelViewTransform.modelToViewDeltaX( electron.radius ), options );

    electron.positionProperty.link( position => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Creates an electron icon, used in the Key.
   */
  public static createIcon( scale = 1 ): Node {
    const electron = new Electron( {
      tandem: Tandem.OPT_OUT
    } );
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new ElectronNode( electron, modelViewTransform, {
      scale: scale,
      tandem: Tandem.OPT_OUT
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'ElectronNode', ElectronNode );