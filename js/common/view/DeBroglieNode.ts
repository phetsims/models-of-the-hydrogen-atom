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

type SelfOptions = EmptyObjectType;

type DeBroglieNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class DeBroglieNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: DeBroglieModel,
                      hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      listboxParent: Node,
                      providedOptions: DeBroglieNodeOptions ) {

    const options = optionize<DeBroglieNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    // These Nodes control their own visibility, based on the value of hydrogenAtom.deBroglieViewProperty.
    const viewNodes = new Node( {
      children: [
        new DeBroglieRadialNode( hydrogenAtom, modelViewTransform, {
          tandem: options.tandem.createTandem( 'radialNode' )
        } ),
        new DeBroglieThreeDNode( hydrogenAtom, modelViewTransform, {
          tandem: options.tandem.createTandem( 'threeDNode' )
        } ),
        new DeBroglieBrightnessNode( hydrogenAtom, modelViewTransform, {
          tandem: options.tandem.createTandem( 'brightnessNode' )
        } )
      ]
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
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieNode', DeBroglieNode );