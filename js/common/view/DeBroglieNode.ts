// Copyright 2022-2024, University of Colorado Boulder

/**
 * DeBroglieNode displays the de Broglie model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import PrimaryElectronStateText from './PrimaryElectronStateText.js';
import DeBroglieRepresentationComboBox from './DeBroglieRepresentationComboBox.js';
import { Node } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../MOTHAConstants.js';
import DeBroglieRadialNode from './DeBroglieRadialNode.js';
import DeBroglie3DNode from './DeBroglie3DNode.js';
import DeBroglieBrightnessNode from './DeBroglieBrightnessNode.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';

type SelfOptions = EmptySelfOptions;

type DeBroglieNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class DeBroglieNode extends HydrogenAtomNode {

  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;
  private readonly deBroglieRadialNode: DeBroglieRadialNode;
  private readonly deBroglie3DNode: DeBroglie3DNode;
  private readonly deBroglieBrightnessNode: DeBroglieBrightnessNode;

  public constructor( hydrogenAtom: DeBroglieModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      listboxParent: Node,
                      providedOptions: DeBroglieNodeOptions ) {

    const options = optionize<DeBroglieNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      // No default values, but we modify options below.
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    // Organize the view Nodes under a common parent, to improve presentation in Studio.
    // These Nodes control their own visibility, based on the value of hydrogenAtom.deBroglieRepresentationProperty.
    const viewNodesTandem = options.tandem.createTandem( 'viewNodes' );

    const deBroglieRadialNode = new DeBroglieRadialNode( hydrogenAtom, modelViewTransform, {
      tandem: viewNodesTandem.createTandem( 'deBroglieRadialNode' )
    } );

    const deBroglie3DNode = new DeBroglie3DNode( hydrogenAtom, modelViewTransform, {
      tandem: viewNodesTandem.createTandem( 'deBroglie3DNode' )
    } );

    const deBroglieBrightnessNode = new DeBroglieBrightnessNode( hydrogenAtom, modelViewTransform, {
      tandem: viewNodesTandem.createTandem( 'deBroglieBrightnessNode' )
    } );

    const viewNodes = new Node( {
      children: [ deBroglieRadialNode, deBroglie3DNode, deBroglieBrightnessNode ]
      // No need to PhET-iO instrument this Node.
    } );

    const deBroglieRepresentationComboBox = new DeBroglieRepresentationComboBox( hydrogenAtom.deBroglieRepresentationProperty, listboxParent, {
      leftTop: zoomedInBoxBounds.leftTop.plusXY( 5, 5 ),
      tandem: options.tandem.createTandem( 'deBroglieRepresentationComboBox' )
    } );

    const electronStateText = new PrimaryElectronStateText( hydrogenAtom.getElectronStateProperty(), {
      tandem: options.tandem.createTandem( 'electronStateText' )
    } );

    options.children = [ protonNode, viewNodes, deBroglieRepresentationComboBox, electronStateText ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    electronStateText.boundsProperty.link( bounds => {
      electronStateText.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );

    this.deBroglieRepresentationProperty = hydrogenAtom.deBroglieRepresentationProperty;
    this.deBroglieRadialNode = deBroglieRadialNode;
    this.deBroglie3DNode = deBroglie3DNode;
    this.deBroglieBrightnessNode = deBroglieBrightnessNode;
  }

  //TODO a better way to step the selected view
  public step( dt: number ): void {
    if ( this.deBroglieRepresentationProperty.value === '3D' ) {
      this.deBroglie3DNode.step( dt );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieNode', DeBroglieNode );