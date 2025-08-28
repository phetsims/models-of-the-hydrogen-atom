// Copyright 2015-2025, University of Colorado Boulder

/**
 * LegendPanel displays a legend (sic) for the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import AlignBox from '../../../../scenery/js/layout/nodes/AlignBox.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAColors from '../MOTHAColors.js';
import ElectronNode from './ElectronNode.js';
import PhotonNode from './PhotonNode.js';
import ProtonNode from './ProtonNode.js';
import ZoomedInBoxNode from './ZoomedInBoxNode.js';

// Make the icons appear to be the same size as particles in the zoomed-in box.
const ICON_SCALE = ZoomedInBoxNode.SIDE_LENGTH / ZoomedInBox.SIDE_LENGTH;

const PHOTON_ICON_WAVELENGTH = 410; // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/61

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

  private static readonly ITEM_FONT = new PhetFont( 16 );

  public constructor( iconNode: Node, iconAlignGroup: AlignGroup, labelStringProperty: TReadOnlyProperty<string>, tandem: Tandem ) {
    super( {
      isDisposable: false,
      spacing: 3,
      children: [
        new AlignBox( iconNode, {
          group: iconAlignGroup
        } ),
        new Text( labelStringProperty, {
          font: LegendNode.ITEM_FONT,
          fill: MOTHAColors.invertibleTextFillProperty,
          maxWidth: 75 // Determined empirically in the Energy Levels screen, where there is less space for the legend.
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