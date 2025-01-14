// Copyright 2025, University of Colorado Boulder

/**
 * BohrOverlayNode displays user-interface elements (controls and displays) related to the Bohr model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import ElectronStateText from './ElectronStateText.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';

export default class BohrOverlayNode extends Node {

  public constructor( bohrModel: BohrModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBoxBounds: Bounds2,
                      tandem: Tandem ) {

    // n = ...
    const electronStateText = new ElectronStateText( bohrModel.electron.nProperty, tandem.createTandem( 'electronStateText' ) );

    super( {
      children: [ electronStateText ],
      visibleProperty: new DerivedProperty( [ hydrogenAtomProperty ], hydrogenAtom => hydrogenAtom === bohrModel ),
      tandem: tandem,
      phetioDocumentation: 'Overlay for user-interface elements in front of the Bohr atom'
    } );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    const electronStateTextRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    electronStateText.localBoundsProperty.link( () => {
      electronStateText.rightBottom = electronStateTextRightBottom;
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrOverlayNode', BohrOverlayNode );