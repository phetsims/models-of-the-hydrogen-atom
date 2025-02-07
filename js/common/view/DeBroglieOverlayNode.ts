// Copyright 2025, University of Colorado Boulder

/**
 * DeBroglieOverlayNode displays user-interface elements (controls and displays) related to the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import DeBroglieRepresentationComboBox from './DeBroglieRepresentationComboBox.js';
import ElectronStateText from './ElectronStateText.js';

export default class DeBroglieOverlayNode extends Node {

  public constructor( deBroglieModel: DeBroglieModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBoxBounds: Bounds2,
                      listboxParent: Node,
                      tandem: Tandem ) {

    const deBroglieRepresentationComboBox = new DeBroglieRepresentationComboBox( deBroglieModel.deBroglieRepresentationProperty, listboxParent, {
      leftTop: zoomedInBoxBounds.leftTop.plusXY( 5, 5 ),
      tandem: tandem.createTandem( 'deBroglieRepresentationComboBox' )
    } );

    // n = ...
    const electronStateText = new ElectronStateText( deBroglieModel.electron.nProperty,
      tandem.createTandem( 'electronStateText' ) );

    super( {
      children: [ deBroglieRepresentationComboBox, electronStateText ],
      visibleProperty: new DerivedProperty( [ hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === deBroglieModel ),
      tandem: tandem,
      phetioDocumentation: 'Overlay for user-interface elements in front of the de Broglie atom.'
    } );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    const electronStateTextRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    electronStateText.localBoundsProperty.link( () => {
      electronStateText.rightBottom = electronStateTextRightBottom;
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieOverlayNode', DeBroglieOverlayNode );