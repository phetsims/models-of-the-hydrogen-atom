// Copyright 2022, University of Colorado Boulder

/**
 * SchrodingerNode shows the Schrodinger model of the hydrogen atom.
 *
 * TODO copy details from SchrodingerNode.java
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
import SchrodingerModel from '../model/SchrodingerModel.js';
import XZAxesNode from './XZAxesNode.js';
import MOTHAColors from '../MOTHAColors.js';
import FullElectronStateNode from './FullElectronStateNode.js';
import MOTHAConstants from '../MOTHAConstants.js';
import RectangularPushButton from '../../../../sun/js/buttons/RectangularPushButton.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import SchrodingerFieldNode from './SchrodingerFieldNode.js';

type SelfOptions = EmptyObjectType;

type SchrodingerNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class SchrodingerNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: SchrodingerModel,
                      hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
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

    const exciteAtomButton = new RectangularPushButton( {
      baseColor: MOTHAColors.exciteButtonColorProperty,
      content: new Text( modelsOfTheHydrogenAtomStrings.exciteAtom, {
        font: new PhetFont( 16 ),
        maxWidth: 100
      } ),
      listener: () => hydrogenAtom.fireOneAbsorbablePhoton(),
      tandem: options.tandem.createTandem( 'exciteAtomButton' )
    } );

    const electronStateNode = new FullElectronStateNode( hydrogenAtom.getElectronStateProperty(),
      hydrogenAtom.secondaryElectronStateProperty, hydrogenAtom.tertiaryElectronStateProperty, {
        tandem: options.tandem.createTandem( 'electronStateNode' )
      } );

    const vBox = new VBox( {
      align: 'right',
      spacing: 15,
      children: [ exciteAtomButton, electronStateNode ]
    } );

    options.children = [ protonNode, fieldNode, xzAxesNode, vBox ];

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the 'Excite Atom' button and electron state positioned in the lower-right corner of the zoomed-in box.
    vBox.boundsProperty.link( bounds => {
      vBox.rightBottom = zoomedInBoxBounds.rightBottom.minus( MOTHAConstants.STATE_DISPLAY_MARGINS );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerNode', SchrodingerNode );