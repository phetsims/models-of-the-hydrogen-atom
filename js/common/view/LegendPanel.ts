// Copyright 2015-2025, University of Colorado Boulder

/**
 * LegendPanel displays a legend (sic) for the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, Text, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ElectronNode from './ElectronNode.js';
import PhotonNode from './PhotonNode.js';
import ProtonNode from './ProtonNode.js';

const ITEM_FONT = new PhetFont( 16 );
const PHOTON_ICON_WAVELENGTH = 410; // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/61
const ICON_SCALE = MOTHAConstants.ZOOMED_IN_BOX_VIEW_SIZE / MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE;

export default class LegendPanel extends Panel {

  public constructor( tandem: Tandem ) {

    // To make all icons have the same effective size.
    const iconAlignGroup = new AlignGroup();

    const legendNodes: LegendNode[] = [
      new LegendNode( ProtonNode.createIcon( ICON_SCALE ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.protonStringProperty, tandem.createTandem( 'protonNode' ) ),
      new LegendNode( ElectronNode.createIcon( ICON_SCALE ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.electronStringProperty, tandem.createTandem( 'electronNode' ) ),
      new LegendNode( PhotonNode.createIcon( PHOTON_ICON_WAVELENGTH, ICON_SCALE ), iconAlignGroup,
        ModelsOfTheHydrogenAtomStrings.photonStringProperty, tandem.createTandem( 'photonNode' ) )
    ];

    const content = new VBox( {
      spacing: 4,
      align: 'left',
      children: legendNodes
    } );

    super( content, {
      isDisposable: false,
      fill: null,
      stroke: null,
      xMargin: 0,
      yMargin: 0,
      visiblePropertyOptions: {
        phetioFeatured: true
      },
      tandem: tandem
    } );
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
          maxWidth: 80 // determined empirically in the Energy Levels screen
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