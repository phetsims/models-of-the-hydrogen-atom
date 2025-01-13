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
import Light from '../model/Light.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import MOTHAColors from '../MOTHAColors.js';
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
                      light: Light,
                      tandem: Tandem ) {

    const xzAxesNode = new XZAxesNode( {
      color: MOTHAColors.xzAxesColorProperty,
      tandem: tandem.createTandem( 'xzAxesNode' )
    } );
    xzAxesNode.localBoundsProperty.link( () => {
      xzAxesNode.left = zoomedInBoxBounds.left + 15;
      xzAxesNode.bottom = zoomedInBoxBounds.bottom - 10;
    } );

    // 'Excite Atom' button that appears when the atom is in the metastable state (n,l,m) = (2,0,0).
    // Pressing this button fires a photon that transitions the atom to a higher energy level.
    const exciteAtomButton = new ExciteAtomButton( schrodingerModel.isMetastableStateProperty, light,
      () => schrodingerModel.excite(), {
        tandem: tandem.createTandem( 'exciteAtomButton' )
      } );

    // (n,l,m) = ...
    const electronStateText = new SchrodingerStateText( schrodingerModel.nlmProperty, {
      tandem: tandem.createTandem( 'electronStateText' )
    } );

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
      phetioDocumentation: 'Overlay for user-interface elements in front of the Schrödinger atom'
    } );

    // Keep the 'Excite Atom' button and electron state positioned in the lower-right corner of the zoomed-in box.
    const electronStateTextRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    vBox.localBoundsProperty.link( () => {
      vBox.rightBottom = electronStateTextRightBottom;
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerOverlayNode', SchrodingerOverlayNode );