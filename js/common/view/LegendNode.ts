// Copyright 2015-2022, University of Colorado Boulder

/**
 * LegendNode displays a legend, identifying the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, HStrut, Node, NodeTranslationOptions, Text, VBox } from '../../../../scenery/js/imports.js';
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

type SelfOptions = {};

type LegendNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<AccordionBoxOptions, 'visibleProperty' | 'tandem'>;

export default class LegendNode extends AccordionBox {

  public constructor( providedOptions: LegendNodeOptions ) {

    const options = optionize<LegendNodeOptions, SelfOptions, AccordionBoxOptions>()( {

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

    // items that appear in the legend, { icon: {Node}, label: {string} }
    type LegendItem = {
      icon: Node;
      label: string;
    };
    const items: LegendItem[] = [
      { icon: ElectronNode.createIcon( ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.electron },
      { icon: ProtonNode.createIcon( ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.proton },
      { icon: NeutronNode.createIcon( ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.neutron },
      { icon: PhotonNode.createIcon( 480, ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.photon },
      { icon: PhotonNode.createIcon( 200, ICON_SCALE ), label: modelsOfTheHydrogenAtomStrings.uvPhoton }
    ];

    // widest icon, used to horizontally center all icons and left-align all labels
    const maxIconWidth = _.maxBy( items, ( item: LegendItem ) => item.icon.width )!.icon.width;

    const itemNodes: Node[] = [];
    items.forEach( item => {

      // pad the icon with a strut, so that all icons occupy the same amount of horizontal space
      const strut = new HStrut( maxIconWidth );
      const paddedIcon = new Node( { children: [ strut, item.icon ] } );
      strut.center = item.icon.center;

      itemNodes.push( new HBox( {
        spacing: 10,
        children: [
          paddedIcon,
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

modelsOfTheHydrogenAtom.register( 'LegendNode', LegendNode );