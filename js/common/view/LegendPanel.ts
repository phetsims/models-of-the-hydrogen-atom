// Copyright 2015-2024, University of Colorado Boulder

/**
 * LegendPanel displays a legend (sic) for the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import ElectronNode from './ElectronNode.js';
import PhotonNode from './PhotonNode.js';
import ProtonNode from './ProtonNode.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';

const ITEM_FONT = new PhetFont( 16 );
const PHOTO_WAVELENGTH = 480; // nm, for the photon icon

type SelfOptions = {
  iconScale?: number;
};

type LegendPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class LegendPanel extends Panel {

  public constructor( providedOptions: LegendPanelOptions ) {

    const options = optionize4<LegendPanelOptions, SelfOptions, PanelOptions>()( {}, MOTHAConstants.PANEL_OPTIONS, {

      // SelfOptions
      iconScale: MOTHAConstants.ZOOMED_IN_BOX_VIEW_SIZE / MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE,

      // PanelOptions
      isDisposable: false,
      fill: null,
      stroke: null,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    }, providedOptions );

    // To make all icons have the same effective size.
    const iconAlignGroup = new AlignGroup();

    const legendNodes: LegendNode[] = [
      new LegendNode( ProtonNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.protonStringProperty, options.tandem.createTandem( 'protonNode' ) ),
      new LegendNode( ElectronNode.createIcon( options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.electronStringProperty, options.tandem.createTandem( 'electronNode' ) ),
      new LegendNode( PhotonNode.createIcon( PHOTO_WAVELENGTH, options.iconScale ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.photonStringProperty, options.tandem.createTandem( 'photonNode' ) )
    ];

    const content = new VBox( {
      spacing: 4,
      align: 'left',
      children: legendNodes
    } );

    super( content, options );
  }
}

/**
 * Legend (sic) for one symbol, described with text.
 */
class LegendNode extends HBox {

  public constructor( iconNode: Node, iconAlignGroup: AlignGroup, labelStringProperty: TReadOnlyProperty<string>, tandem: Tandem ) {
    super( {

      // HBoxOptions
      isDisposable: false,
      spacing: 5,
      children: [
        new AlignBox( iconNode, {
          group: iconAlignGroup
        } ),
        new Text( labelStringProperty, {
          font: ITEM_FONT,
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 100 // determined empirically
        } )
      ],
      tandem: tandem,
      visiblePropertyOptions: {
        phetioFeatured: true
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'LegendPanel', LegendPanel );