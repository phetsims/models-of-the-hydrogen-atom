// Copyright 2015-2024, University of Colorado Boulder

/**
 * LegendPanel displays a legend for the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import ElectronNode from './ElectronNode.js';
import NeutronNode from './NeutronNode.js';
import PhotonNode from './PhotonNode.js';
import ProtonNode from './ProtonNode.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';

const ITEM_FONT = new PhetFont( 16 );

type SelfOptions = {
  iconScale?: number;
};

type LegendPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export default class LegendPanel extends Panel {

  public constructor( providedOptions: LegendPanelOptions ) {

    const options = optionize<LegendPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      iconScale: MOTHAConstants.ZOOMED_IN_BOX_VIEW_SIZE / MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE,

      // PanelOptions
      fill: null,
      stroke: null,
      xMargin: 0,
      yMargin: 0,
      isDisposable: false
    }, providedOptions );

    const iconAlignGroup = new AlignGroup(); // to make all icons have the same effective dimensions

    // A Node for each item described in the Key, organized under a parent tandem
    const contentTandem = options.tandem.createTandem( 'content' );
    const keyNodes: KeyNode[] = [
      new KeyNode( ElectronNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.electronStringProperty, contentTandem.createTandem( 'electronKeyNode' ) ),
      new KeyNode( ProtonNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.protonStringProperty, contentTandem.createTandem( 'protonKeyNode' ) ),
      new KeyNode( NeutronNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.neutronStringProperty, contentTandem.createTandem( 'neutronKeyNode' ) ),
      new KeyNode( PhotonNode.createIcon( 480, options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.photonStringProperty, contentTandem.createTandem( 'photonKeyNode' ) )
    ];

    const content = new VBox( {
      spacing: 4,
      align: 'left',
      children: keyNodes
    } );

    super( content, options );
  }
}

/**
 * The key for one symbol, described with text.
 */
class KeyNode extends HBox {

  public constructor( iconNode: Node, iconAlignGroup: AlignGroup, labelStringProperty: TReadOnlyProperty<string>, parentTandem: Tandem ) {
    super( {
      spacing: 5,
      children: [
        new AlignBox( iconNode, {
          group: iconAlignGroup,
          tandem: parentTandem.createTandem( 'iconNode' )
        } ),
        new Text( labelStringProperty, {
          font: ITEM_FONT,
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 100 // determined empirically
        } )
      ],
      isDisposable: false,
      tandem: parentTandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'LegendPanel', LegendPanel );