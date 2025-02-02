// Copyright 2025, University of Colorado Boulder

/**
 * SchrodingerOverlayNode displays user-interface elements (controls and displays) related to the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { HBox, Node, VBox } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import LightSource from '../model/LightSource.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import ExciteAtomButton from './ExciteAtomButton.js';
import QuantumNumbersInfoButton from './QuantumNumbersInfoButton.js';
import QuantumNumbersInfoDialog from './QuantumNumbersInfoDialog.js';
import SchrodingerStateText from './SchrodingerStateText.js';
import XZAxesNode from './XZAxesNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

export default class SchrodingerOverlayNode extends Node {

  public constructor( schrodingerModel: SchrodingerModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBoxBounds: Bounds2,
                      lightSource: LightSource,
                      tandem: Tandem ) {

    const xzAxesNode = new XZAxesNode( tandem.createTandem( 'xzAxesNode' ) );

    // 'Excite Atom' button that appears when the atom is in the metastable state (n,l,m) = (2,0,0).
    // Pressing this button fires a photon that transitions the atom to a higher energy level.
    const exciteAtomButton = new ExciteAtomButton( schrodingerModel.metastableHandler.isMetastableStateProperty, lightSource,
      () => schrodingerModel.metastableHandler.exciteElectron(), tandem.createTandem( 'exciteAtomButton' ) );

    // (n,l,m) = ...
    const electronStateText = new SchrodingerStateText( schrodingerModel.nlmProperty, tandem.createTandem( 'electronStateText' ) );

    const quantumNumbersInfoDialog = new QuantumNumbersInfoDialog( tandem.createTandem( 'quantumNumbersInfoDialog' ) );

    const quantumNumbersInfoButton = new QuantumNumbersInfoButton( quantumNumbersInfoDialog,
      tandem.createTandem( 'quantumNumbersInfoButton' ) );

    const vBox = new VBox( {
      align: 'right',
      spacing: 15,
      children: [
        exciteAtomButton,
        new HBox( {
          children: [ electronStateText, quantumNumbersInfoButton ],
          spacing: 8
        } )
      ]
    } );

    super( {
      children: [ xzAxesNode, vBox ],
      visibleProperty: new DerivedProperty( [ hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === schrodingerModel ),
      tandem: tandem,
      phetioDocumentation: 'Overlay for user-interface elements in front of the Schrödinger atom.'
    } );

    // xz-axes are in the left-bottom corner of the zoomed-in box.
    const xzAxesNodeLeftBottom = zoomedInBoxBounds.erodedXY( 15, 10 ).leftBottom;
    xzAxesNode.localBoundsProperty.link( () => {
      xzAxesNode.leftBottom = xzAxesNodeLeftBottom;
    } );

    // Other elements are in the right-bottom corner of the zoomed-in box.
    const vBoxRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    vBox.localBoundsProperty.link( () => {
      vBox.rightBottom = vBoxRightBottom;
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerOverlayNode', SchrodingerOverlayNode );