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

// margin between the state display and zoomed-in box
const STATE_DISPLAY_MARGIN = 15;

type SelfOptions = EmptyObjectType;

type DeBroglieNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class DeBroglieNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: DeBroglieModel, hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2, providedOptions: DeBroglieNodeOptions ) {

    const options = optionize<DeBroglieNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO
    }, providedOptions );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    const electronStateDisplay = new ElectronStateDisplay( hydrogenAtom.electronStateProperty, {
      tandem: options.tandem.createTandem( 'electronStateDisplay' )
    } );

    options.children = [ protonNode, electronStateDisplay ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the state display positioned in the lower-right corner of the zoomed-in box.
    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );
    electronStateDisplay.boundsProperty.link( bounds => {
      electronStateDisplay.right = zoomedInBoxBounds.right - STATE_DISPLAY_MARGIN;
      electronStateDisplay.bottom = zoomedInBoxBounds.bottom - STATE_DISPLAY_MARGIN;
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieNode', DeBroglieNode );