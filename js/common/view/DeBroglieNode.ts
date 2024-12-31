// Copyright 2022-2024, University of Colorado Boulder

//TODO Should deBroglieRepresentationComboBox and electronStateText be in front of photons?

/**
 * DeBroglieNode displays the de Broglie model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import DeBroglie3DHeightNode from './DeBroglie3DHeightNode.js';
import DeBroglieBrightnessNode from './DeBroglieBrightnessNode.js';
import DeBroglieRadialDistanceNode from './DeBroglieRadialDistanceNode.js';
import DeBroglieRepresentationComboBox from './DeBroglieRepresentationComboBox.js';
import ElectronStateText from './ElectronStateText.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import ZoomedInBox from '../model/ZoomedInBox.js';

type SelfOptions = EmptySelfOptions;

type DeBroglieNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class DeBroglieNode extends HydrogenAtomNode {

  private readonly deBroglie3DHeightNode: DeBroglie3DHeightNode;
  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;

  // For setting pdomOrder.
  public readonly deBroglieRepresentationComboBox: Node;

  public constructor( hydrogenAtom: DeBroglieModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBox: ZoomedInBox,
                      modelViewTransform: ModelViewTransform2,
                      listboxParent: Node,
                      providedOptions: DeBroglieNodeOptions ) {

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );

    const deBroglieRadialDistanceNode = new DeBroglieRadialDistanceNode( hydrogenAtom, modelViewTransform );

    const deBroglie3DHeightNode = new DeBroglie3DHeightNode( hydrogenAtom, modelViewTransform, {
      tandem: providedOptions.tandem.createTandem( 'deBroglie3DHeightNode' )
    } );

    const deBroglieBrightnessNode = new DeBroglieBrightnessNode( hydrogenAtom, modelViewTransform );

    const viewNodes = new Node( {
      children: [ deBroglieRadialDistanceNode, deBroglie3DHeightNode, deBroglieBrightnessNode ]
      // No need to PhET-iO instrument this Node.
    } );

    const deBroglieRepresentationComboBox = new DeBroglieRepresentationComboBox( hydrogenAtom.deBroglieRepresentationProperty, listboxParent, {
      leftTop: zoomedInBoxBounds.leftTop.plusXY( 5, 5 ),
      tandem: providedOptions.tandem.createTandem( 'deBroglieRepresentationComboBox' )
    } );

    const electronStateText = new ElectronStateText( hydrogenAtom.electron.nProperty, {
      tandem: providedOptions.tandem.createTandem( 'electronStateText' )
    } );

    const options = optionize<DeBroglieNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {

      // HydrogenAtomNodeOptions
      children: [ protonNode, viewNodes, deBroglieRepresentationComboBox, electronStateText ]
    }, providedOptions );

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    const electronStateTextRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    electronStateText.localBoundsProperty.link( () => {
      electronStateText.rightBottom = electronStateTextRightBottom;
    } );

    this.deBroglie3DHeightNode = deBroglie3DHeightNode;
    this.deBroglieRepresentationProperty = hydrogenAtom.deBroglieRepresentationProperty;
    this.deBroglieRepresentationComboBox = deBroglieRepresentationComboBox;
  }

  public override step( dt: number ): void {
    this.deBroglie3DHeightNode.step( dt );
  }

  /**
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