// Copyright 2015-2022, University of Colorado Boulder

/**
 * LegendAccordionBox displays a legend, identifying the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Node, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import AccordionBox, { AccordionBoxOptions } from '../../../../sun/js/AccordionBox.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import ElectronNode from './ElectronNode.js';
import NeutronNode from './NeutronNode.js';
import PhotonNode from './PhotonNode.js';
import ProtonNode from './ProtonNode.js';

// constants
const LABEL_OPTIONS = {
  font: new PhetFont( 16 ),
  fill: MOTHAColors.legendTextFillProperty,
  maxWidth: 120 // i18n, determined empirically
};
const ICON_SCALE = 0.5;

// Describes an item in the legend
type LegendItem = {
  icon: Node;
  label: string;
};

type SelfOptions = {};

type LegendAccordionBoxOptions = SelfOptions & NodeTranslationOptions &
  PickRequired<AccordionBoxOptions, 'expandedProperty' | 'tandem'>;

export default class LegendAccordionBox extends AccordionBox {

  public constructor( providedOptions: LegendAccordionBoxOptions ) {

    const options = optionize<LegendAccordionBoxOptions, SelfOptions, AccordionBoxOptions>()( {

      // AccordionBoxOptions
      fill: null,
      stroke: null,
      titleAlignX: 'left',
      titleXSpacing: 10,
      contentXMargin: 0,
      buttonXMargin: 0
    }, providedOptions );

    options.titleNode = new Text( modelsOfTheHydrogenAtomStrings.legend, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.legendTitleFillProperty,
      maxWidth: 100 // i18n, determined empirically
    } );

    const items: LegendItem[] = [
      { icon: ElectronNode.createIcon( ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.electron },
      { icon: ProtonNode.createIcon( ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.proton },
      { icon: NeutronNode.createIcon( ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.neutron },
      { icon: PhotonNode.createIcon( 480, ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.photon }
    ];

    const iconGroup = new AlignGroup(); // to make all icons have the same effective dimensions
    const itemNodes: Node[] = [];
    items.forEach( item => {
      itemNodes.push( new HBox( {
        spacing: 5,
        children: [
          new AlignBox( item.icon, { group: iconGroup } ),
          new Text( item.label, LABEL_OPTIONS ) ]
      } ) );
    } );

    const content = new VBox( {
      spacing: 5,
      align: 'left',
      children: itemNodes
    } );

    super( content, options );
  }
}

modelsOfTheHydrogenAtom.register( 'LegendAccordionBox', LegendAccordionBox );