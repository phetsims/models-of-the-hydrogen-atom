// Copyright 2022-2024, University of Colorado Boulder

//TODO Should we have 1 orbitsVisibleProperty used by all 3 representations? Should orbits even be instrumented?
//TODO Should we have 1 electronVisibleProperty used by all 3 representations? Should electron representation even be instrumented?

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
import OrbitNode from './OrbitNode.js';
import ProtonNode from './ProtonNode.js';

type SelfOptions = EmptySelfOptions;

type DeBroglieNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class DeBroglieNode extends HydrogenAtomNode {

  private readonly deBroglie3DHeightNode: DeBroglie3DHeightNode;
  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;

  // For setting pdomOrder.
  public readonly deBroglieRepresentationComboBox: Node;

  public constructor( hydrogenAtom: DeBroglieModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      listboxParent: Node,
                      providedOptions: DeBroglieNodeOptions ) {

    const options = optionize<DeBroglieNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      // No default values, but we modify options below.
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );

    // Organize the view Nodes under a common parent, to improve presentation in Studio.
    // These Nodes control their own visibility, based on the value of hydrogenAtom.deBroglieRepresentationProperty.
    const representationNodes = options.tandem.createTandem( 'representationNodes' );

    const deBroglieRadialDistanceNode = new DeBroglieRadialDistanceNode( hydrogenAtom, modelViewTransform, {
      tandem: representationNodes.createTandem( 'deBroglieRadialDistanceNode' )
    } );

    const deBroglie3DHeightNode = new DeBroglie3DHeightNode( hydrogenAtom, modelViewTransform, {
      tandem: representationNodes.createTandem( 'deBroglie3DHeightNode' )
    } );

    const deBroglieBrightnessNode = new DeBroglieBrightnessNode( hydrogenAtom, modelViewTransform, {
      tandem: representationNodes.createTandem( 'deBroglieBrightnessNode' )
    } );

    const viewNodes = new Node( {
      children: [ deBroglieRadialDistanceNode, deBroglie3DHeightNode, deBroglieBrightnessNode ]
      // No need to PhET-iO instrument this Node.
    } );

    //TODO Should be in front of photons.
    const deBroglieRepresentationComboBox = new DeBroglieRepresentationComboBox( hydrogenAtom.deBroglieRepresentationProperty, listboxParent, {
      leftTop: zoomedInBoxBounds.leftTop.plusXY( 5, 5 ),
      tandem: options.tandem.createTandem( 'deBroglieRepresentationComboBox' )
    } );

    //TODO Should be in front of photons?
    const electronStateText = new ElectronStateText( hydrogenAtom.electron.nProperty, {
      tandem: options.tandem.createTandem( 'electronStateText' )
    } );

    options.children = [ protonNode, viewNodes, deBroglieRepresentationComboBox, electronStateText ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    electronStateText.localBoundsProperty.link( () => {
      electronStateText.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );

    this.deBroglie3DHeightNode = deBroglie3DHeightNode;
    this.deBroglieRepresentationProperty = hydrogenAtom.deBroglieRepresentationProperty;
    this.deBroglieRepresentationComboBox = deBroglieRepresentationComboBox;
  }

  public step( dt: number ): void {
    this.deBroglie3DHeightNode.step( dt );
  }

  /**
   * This icon corresponds to the 'Radial' view.
   */
  public static createIcon(): Node {
    const protonIcon = ProtonNode.createIcon();
    protonIcon.setScaleMagnitude( 0.5 );
    const orbitRadius = 1.5 * protonIcon.height;
    const orbitNode = new OrbitNode( orbitRadius );
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