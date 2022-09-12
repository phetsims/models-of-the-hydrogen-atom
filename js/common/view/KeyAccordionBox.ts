// Copyright 2015-2022, University of Colorado Boulder

/**
 * KeyAccordionBox displays a key to the symbols (particle types) that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import ElectronNode from './ElectronNode.js';
import NeutronNode from './NeutronNode.js';
import PhotonNode from './PhotonNode.js';
import ProtonNode from './ProtonNode.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const ITEM_FONT = new PhetFont( 16 );

type SelfOptions = {
  iconScale?: number;
};

type KeyAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<AccordionBoxOptions, 'expandedProperty' | 'tandem'>;

export default class KeyAccordionBox extends AccordionBox {

  public constructor( providedOptions: KeyAccordionBoxOptions ) {

    const options = optionize<KeyAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {

      // SelfOptions
      iconScale: MOTHAConstants.ZOOMED_IN_BOX_VIEW_SIZE / MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE,

      // AccordionBoxOptions
      fill: null,
      stroke: null,
      titleAlignX: 'left',
      titleXSpacing: 10,
      contentXMargin: 0,
      buttonXMargin: 0
    }, providedOptions );

    options.titleNode = new Text( ModelsOfTheHydrogenAtomStrings.key, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.keyTitleFillProperty,
      maxWidth: 100, // i18n, determined empirically
      tandem: options.tandem.createTandem( 'titleText' )
    } );

    const iconAlignGroup = new AlignGroup(); // to make all icons have the same effective dimensions

    // A Node for each item described in the Key, organized under a parent tandem
    const contentTandem = options.tandem.createTandem( 'content' );
    const keyNodes: KeyNode[] = [
      new KeyNode( ElectronNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.electron, contentTandem.createTandem( 'electronKeyNode' ) ),
      new KeyNode( ProtonNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.proton, contentTandem.createTandem( 'protonKeyNode' ) ),
      new KeyNode( NeutronNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.neutron, contentTandem.createTandem( 'neutronKeyNode' ) ),
      new KeyNode( PhotonNode.createIcon( 480, options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.photon, contentTandem.createTandem( 'photonKeyNode' ) )
    ];

    const content = new VBox( {
      spacing: 5,
      align: 'left',
      children: keyNodes
      // No need to PhET-iO instrument this Node.
    } );

    super( content, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

/**
 * The key for one symbol, described with text.
 */
class KeyNode extends HBox {

  public constructor( iconNode: Node, iconAlignGroup: AlignGroup, label: string, parentTandem: Tandem ) {
    super( {
      spacing: 5,
      children: [
        new AlignBox( iconNode, {
          group: iconAlignGroup,
          tandem: parentTandem.createTandem( 'iconNode' )
        } ),
        new Text( label, {
          font: ITEM_FONT,
          fill: MOTHAColors.keyTextFillProperty,
          maxWidth: 120, // determined empirically
          tandem: parentTandem.createTandem( 'text' )
        } )
      ],
      tandem: parentTandem
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'KeyAccordionBox', KeyAccordionBox );