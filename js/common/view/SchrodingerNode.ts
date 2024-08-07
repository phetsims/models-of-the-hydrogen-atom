// Copyright 2022-2024, University of Colorado Boulder

/**
 * SchrodingerNode displays the Schrodinger model of the hydrogen atom.
 *
 * TODO port SchrodingerNode.java
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
import SchrodingerModel from '../model/SchrodingerModel.js';
import XZAxesNode from './XZAxesNode.js';
import MOTHAColors from '../MOTHAColors.js';
import FullElectronStateText from './FullElectronStateText.js';
import MOTHAConstants from '../MOTHAConstants.js';
import { VBox } from '../../../../scenery/js/imports.js';
import SchrodingerFieldNode from './SchrodingerFieldNode.js';
import ExciteAtomButton from './ExciteAtomButton.js';

type SelfOptions = EmptySelfOptions;

type SchrodingerNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class SchrodingerNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: SchrodingerModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: SchrodingerNodeOptions ) {

    const options = optionize<SchrodingerNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      tandem: options.tandem.createTandem( 'protonNode' )
    } );

    const fieldNode = new SchrodingerFieldNode( hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem( 'fieldNode' )
    } );

    const xzAxesNode = new XZAxesNode( {
      color: MOTHAColors.xzAxesColorProperty,
      left: zoomedInBoxBounds.left + 15,
      bottom: zoomedInBoxBounds.bottom - 10,
      tandem: options.tandem.createTandem( 'xzAxesNode' )
    } );

    const exciteAtomButton = new ExciteAtomButton( () => hydrogenAtom.excite(), {
      tandem: options.tandem.createTandem( 'exciteAtomButton' )
    } );

    const electronStateText = new FullElectronStateText( hydrogenAtom.getElectronStateProperty(),
      hydrogenAtom.secondaryElectronStateProperty, hydrogenAtom.tertiaryElectronStateProperty, {
        tandem: options.tandem.createTandem( 'electronStateText' )
      } );

    const vBox = new VBox( {
      align: 'right',
      spacing: 15,
      children: [ exciteAtomButton, electronStateText ]
    } );

    options.children = [ protonNode, fieldNode, xzAxesNode, vBox ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the 'Excite Atom' button and electron state positioned in the lower-right corner of the zoomed-in box.
    vBox.boundsProperty.link( bounds => {
      vBox.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerNode', SchrodingerNode );