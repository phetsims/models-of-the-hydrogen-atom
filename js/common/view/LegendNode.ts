// Copyright 2015-2022, University of Colorado Boulder

/**
 * LegendNode displays a legend, identifying the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, HStrut, Node, NodeTranslationOptions, Text, VBox, VBoxOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import ElectronNode from './ElectronNode.js';
import NeutronNode from './NeutronNode.js';
import ProtonNode from './ProtonNode.js';

// constants
const LABEL_OPTIONS = {
  font: new PhetFont( 16 ),
  fill: MOTHAColors.legendTextFillProperty,
  maxWidth: 120 // i18n, determined empirically
};

type SelfOptions = {};

type LegendNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<VBoxOptions, 'visibleProperty' | 'tandem'>;

export default class LegendNode extends VBox {

  public constructor( providedOptions: LegendNodeOptions ) {

    const options = optionize<LegendNodeOptions, SelfOptions, VBoxOptions>()( {

      // VBoxOptions
      spacing: 8,
      align: 'left'
    }, providedOptions );

    // title
    const titleNode = new Text( modelsOfTheHydrogenAtomStrings.legend, {
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
      { icon: new ElectronNode(), label: modelsOfTheHydrogenAtomStrings.electron },
      { icon: new ProtonNode(), label: modelsOfTheHydrogenAtomStrings.proton },
      { icon: new NeutronNode(), label: modelsOfTheHydrogenAtomStrings.neutron }
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

    options.children = [
      titleNode,
      new VBox( {
        spacing: 5,
        align: 'left',
        children: itemNodes
      } )
    ];

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'LegendNode', LegendNode );