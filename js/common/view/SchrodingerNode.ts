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
import { Node, Rectangle, VBox } from '../../../../scenery/js/imports.js';
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

    const electronStateText = new FullElectronStateText( hydrogenAtom.electronStateProperty,
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

  /**
   * Creates the icons for the Schrodinger model, consisting of 4 overlapping rectangles.
   */
  public static createIcon(): Node {

    const opacity = 0.4;
    const d1 = 75;
    const d2 = 50;
    const d3 = 1.35 * d1;

    // rect1 and rect2 have the same dimensions, 90 degrees different.
    const rect1 = new Rectangle( 0, 0, d1, d2, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity
    } );
    const rect2 = new Rectangle( 0, 0, d2, d1, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    // rect3 and rect4 have the same dimensions, 90 degrees different.
    const rect3 = new Rectangle( 0, 0, d3, d1, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );
    const rect4 = new Rectangle( 0, 0, d1, d3, {
      fill: MOTHAColors.electronBaseColorProperty,
      opacity: opacity,
      center: rect1.center
    } );

    return new Node( {
      children: [ rect1, rect2, rect3, rect4 ],
      scale: 0.25
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerNode', SchrodingerNode );