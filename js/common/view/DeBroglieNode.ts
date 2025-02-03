// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglieNode displays the de Broglie model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import DeBroglie3DHeightNode from './DeBroglie3DHeightNode.js';
import DeBroglieBrightnessNode from './DeBroglieBrightnessNode.js';
import DeBroglieRadialDistanceNode from './DeBroglieRadialDistanceNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class DeBroglieNode extends HydrogenAtomNode {

  // View for the '3D Height' representation. We need a reference to this so that it can be animated via the step method.
  private readonly deBroglie3DHeightNode: DeBroglie3DHeightNode;

  public constructor( deBroglieModel: DeBroglieModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      tandem: Tandem ) {

    const protonNode = new ProtonNode( deBroglieModel.proton, modelViewTransform );

    const deBroglieRadialDistanceNode = new DeBroglieRadialDistanceNode( deBroglieModel, modelViewTransform );

    const deBroglie3DHeightNode = new DeBroglie3DHeightNode( deBroglieModel, modelViewTransform,
      tandem.createTandem( 'deBroglie3DHeightNode' ) );

    const deBroglieBrightnessNode = new DeBroglieBrightnessNode( deBroglieModel, modelViewTransform );

    super( deBroglieModel, hydrogenAtomProperty, {
      children: [ protonNode, deBroglieRadialDistanceNode, deBroglie3DHeightNode, deBroglieBrightnessNode ],
      tandem: tandem
    } );

    this.deBroglie3DHeightNode = deBroglie3DHeightNode;
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    this.deBroglie3DHeightNode.step( dt );
  }

  /**
   * Creates the icon that represents this atomic model in the user interface.
   * This icon corresponds to the 'Radial' view.
   */
  public static createIcon(): Node {

    // Proton
    const protonIcon = ProtonNode.createIcon();
    protonIcon.setScaleMagnitude( 0.5 );

    // Electron orbit
    const orbitRadius = 1.5 * protonIcon.height;
    const orbitNode = new Circle( orbitRadius, {
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ]
    } );

    // Electron 'radial' representation
    const electronIcon = new Circle( {
      radius: orbitRadius,
      stroke: MOTHAColors.electronBaseColorProperty,
      top: orbitNode.top - 5
    } );

    return new Node( {
      children: [ orbitNode, protonIcon, electronIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieNode', DeBroglieNode );