// Copyright 2022-2024, University of Colorado Boulder

//TODO port SchrodingerNode.java
//TODO Should xzAxesNode, exciteAtomButton, stateText, and quantumNumbersInfoButton be in front of photons?

/**
 * SchrodingerNode displays the Schrodinger model of the hydrogen atom.
 *
 * The axes are orientated with x horizontal, z vertical, y depth.
 *
 * Probability density is computed in 3D. The atom's 3D space is treated as a cube containing NxNxN discrete cells.
 * The probability density is computed at the center of each cell.
 *
 * The NxNxN 3D cube is projected onto an NxN 2D grid that covers the animation box. Depth information is mapped to
 * color brightness. The sum of probability densities * for the depth dimension (y-axis) are normalized to a brightness
 * value that has the range [0,1].  Each cell in the NxN grid has a brightness value that is used to generate the
 * cell's color.
 *
 * Computing the probability density for an NxNxN cube is fairly expensive, so the resulting NxN array of brightness
 * values is cache for reuse.
 *
 * In the Java implementation, this was SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { HBox, Node, Rectangle, VBox } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import Light from '../model/Light.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import MOTHAColors from '../MOTHAColors.js';
import ExciteAtomButton from './ExciteAtomButton.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import QuantumNumbersInfoButton from './QuantumNumbersInfoButton.js';
import QuantumNumbersInfoDialog from './QuantumNumbersInfoDialog.js';
import SchrodingerFieldNode from './SchrodingerFieldNode.js';
import SchrodingerStateText from './SchrodingerStateText.js';
import UnderConstructionText from './UnderConstructionText.js';
import XZAxesNode from './XZAxesNode.js';
import ZoomedInBox from '../model/ZoomedInBox.js';

type SelfOptions = EmptySelfOptions;

type SchrodingerNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class SchrodingerNode extends HydrogenAtomNode {

  // For setting pdomOrder.
  public readonly quantumNumbersInfoButton: Node;

  public constructor( hydrogenAtom: SchrodingerModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBox: ZoomedInBox,
                      light: Light,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: SchrodingerNodeOptions ) {

    const options = optionize<SchrodingerNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );

    const fieldNode = new SchrodingerFieldNode( hydrogenAtom, zoomedInBox, modelViewTransform );

    const xzAxesNode = new XZAxesNode( {
      color: MOTHAColors.xzAxesColorProperty,
      tandem: options.tandem.createTandem( 'xzAxesNode' )
    } );
    xzAxesNode.localBoundsProperty.link( () => {
      xzAxesNode.left = zoomedInBoxBounds.left + 15;
      xzAxesNode.bottom = zoomedInBoxBounds.bottom - 10;
    } );

    // 'Excite Atom' button that appears when the atom is in the metastable state (n,l,m) = (2,0,0).
    // Pressing this button fires a photon that transitions the atom to a higher energy level.
    const exciteAtomButton = new ExciteAtomButton( hydrogenAtom.isMetastableStateProperty, light,
      () => hydrogenAtom.excite(), {
        tandem: options.tandem.createTandem( 'exciteAtomButton' )
      } );

    //TODO stateText visibly shifts around as the state changes. Can we get rid of xzAxesNode, and move quantumNumbersInfoButton and stateText to left corner?
    const stateText = new SchrodingerStateText( hydrogenAtom.nlmProperty, {
      tandem: options.tandem.createTandem( 'stateText' )
    } );

    const quantumNumbersInfoDialog = new QuantumNumbersInfoDialog( options.tandem.createTandem( 'quantumNumbersInfoDialog' ) );

    const quantumNumbersInfoButton = new QuantumNumbersInfoButton( quantumNumbersInfoDialog,
      options.tandem.createTandem( 'quantumNumbersInfoButton' ) );

    const stateBox = new HBox( {
      children: [ stateText, quantumNumbersInfoButton ],
      spacing: 8
    } );

    const vBox = new VBox( {
      align: 'right',
      spacing: 15,
      children: [ exciteAtomButton, stateBox ]
    } );

    //TODO Under Construction
    const underConstructionText = new UnderConstructionText( {
      centerX: zoomedInBoxBounds.centerX,
      top: zoomedInBoxBounds.top + 100
    } );

    options.children = [ fieldNode, protonNode, xzAxesNode, vBox, underConstructionText ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the 'Excite Atom' button and electron state positioned in the lower-right corner of the zoomed-in box.
    const electronStateTextRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    vBox.localBoundsProperty.link( () => {
      vBox.rightBottom = electronStateTextRightBottom;
    } );

    this.quantumNumbersInfoButton = quantumNumbersInfoButton;
  }

  /**
   * Creates the icon that represents this model in the user interface. The icon consists of 4 overlapping rectangles.
   */
  public static createIcon(): Node {

    const opacity = 0.4;

    const rect1Size = new Dimension2( 75, 50 );
    const rect3Size = new Dimension2( 1.35 * rect1Size.width, rect1Size.width );
    assert && assert( rect3Size.height === rect1Size.width );

    // rect1 and rect2 have the same dimensions, 90 degrees different (swapped).
    const rect1 = new Rectangle( 0, 0, rect1Size.width, rect1Size.height, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity
    } );
    const rect2 = new Rectangle( 0, 0, rect1Size.height, rect1Size.width, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    // rect3 and rect4 have the same dimensions, 90 degrees different (swapped).
    const rect3 = new Rectangle( 0, 0, rect3Size.width, rect3Size.height, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );
    const rect4 = new Rectangle( 0, 0, rect3Size.height, rect3Size.width, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    return new Node( {
      children: [ rect1, rect2, rect3, rect4 ],
      scale: 0.25
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerNode', SchrodingerNode );