// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieNode shows the de Broglie model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import ElectronStateDisplay from './ElectronStateDisplay.js';
import DeBroglieViewComboBox from './DeBroglieViewComboBox.js';
import { Node } from '../../../../scenery/js/imports.js';
import MOTHAConstants from '../MOTHAConstants.js';
import DeBroglieRadialNode from './DeBroglieRadialNode.js';
import DeBroglieThreeDNode from './DeBroglieThreeDNode.js';
import DeBroglieBrightnessNode from './DeBroglieBrightnessNode.js';
import { DeBroglieView } from '../model/DeBroglieView.js';

type SelfOptions = EmptyObjectType;

type DeBroglieNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class DeBroglieNode extends HydrogenAtomNode {

  private readonly deBroglieViewProperty: IReadOnlyProperty<DeBroglieView>;
  private readonly deBroglieRadialNode: DeBroglieRadialNode;
  private readonly deBroglieThreeDNode: DeBroglieThreeDNode;
  private readonly deBroglieBrightnessNode: DeBroglieBrightnessNode;

  public constructor( hydrogenAtom: DeBroglieModel,
                      hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      listboxParent: Node,
                      providedOptions: DeBroglieNodeOptions ) {

    const options = optionize<DeBroglieNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    // Organize the view Nodes under a common parent, to improve presentation in Studio.
    // These Nodes control their own visibility, based on the value of hydrogenAtom.deBroglieViewProperty.
    const viewNodesTandem = options.tandem.createTandem( 'viewNodes' );

    const deBroglieRadialNode = new DeBroglieRadialNode( hydrogenAtom, modelViewTransform, {
      tandem: viewNodesTandem.createTandem( 'radialNode' )
    } );

    const deBroglieThreeDNode = new DeBroglieThreeDNode( hydrogenAtom, modelViewTransform, {
      tandem: viewNodesTandem.createTandem( 'threeDNode' )
    } );

    const deBroglieBrightnessNode = new DeBroglieBrightnessNode( hydrogenAtom, modelViewTransform, {
      tandem: viewNodesTandem.createTandem( 'brightnessNode' )
    } );

    const viewNodes = new Node( {
      children: [ deBroglieRadialNode, deBroglieThreeDNode, deBroglieBrightnessNode ]
      // No need to PhET-iO instrument this Node.
    } );

    const deBroglieViewComboBox = new DeBroglieViewComboBox( hydrogenAtom.deBroglieViewProperty, listboxParent, {
      leftTop: zoomedInBoxBounds.leftTop.plusXY( 5, 5 ),
      tandem: options.tandem.createTandem( 'deBroglieViewComboBox' )
    } );

    const electronStateDisplay = new ElectronStateDisplay( hydrogenAtom.electronStateProperty, {
      tandem: options.tandem.createTandem( 'electronStateDisplay' )
    } );

    options.children = [ protonNode, viewNodes, deBroglieViewComboBox, electronStateDisplay ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the state display positioned in the lower-right corner of the zoomed-in box.
    electronStateDisplay.boundsProperty.link( bounds => {
      electronStateDisplay.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );

    this.deBroglieViewProperty = hydrogenAtom.deBroglieViewProperty;
    this.deBroglieRadialNode = deBroglieRadialNode;
    this.deBroglieThreeDNode = deBroglieThreeDNode;
    this.deBroglieBrightnessNode = deBroglieBrightnessNode;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  //TODO a better way to step the selected view
  public step( dt: number ): void {
    const deBroglieView = this.deBroglieViewProperty.value;
    if ( deBroglieView === 'radial' ) {
      this.deBroglieRadialNode.step( dt );
    }
    else if ( deBroglieView === 'threeD' ) {
      this.deBroglieThreeDNode.step( dt );
    }
    else if ( deBroglieView === 'brightness' ) {
      this.deBroglieBrightnessNode.step( dt );
    }
    else {
      assert && assert( false, `unsupported DeBroglieView: ${deBroglieView}` );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieNode', DeBroglieNode );