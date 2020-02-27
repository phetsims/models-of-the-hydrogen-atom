// Copyright 2015-2019, University of Colorado Boulder

/**
 * LegendNode displays a legend, identifying the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import modelsOfTheHydrogenAtomStrings from '../../models-of-the-hydrogen-atom-strings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';
import ElectronNode from './ElectronNode.js';
import NeutronNode from './NeutronNode.js';
import ProtonNode from './ProtonNode.js';

const electronString = modelsOfTheHydrogenAtomStrings.electron;
const legendString = modelsOfTheHydrogenAtomStrings.legend;
const neutronString = modelsOfTheHydrogenAtomStrings.neutron;
const protonString = modelsOfTheHydrogenAtomStrings.proton;

// constants
const LABEL_OPTIONS = {
  font: new PhetFont( 16 ),
  fill: MOTHAColorProfile.legendTextFillProperty,
  maxWidth: 120 // i18n, determined empirically
};

class LegendNode extends VBox {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      spacing: 8,
      align: 'left'
    }, options );

    // title
    const titleNode = new Text( legendString, {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColorProfile.legendTitleFillProperty,
      maxWidth: 100 // i18n, determined empirically
    } );

    // items that appear in the legend, { icon: {Node}, label: {string} }
    const items = [
      { icon: new ElectronNode(), label: electronString },
      { icon: new ProtonNode(), label: protonString },
      { icon: new NeutronNode(), label: neutronString }
    ];

    // widest icon, used to horizontally center all icons and left-align all labels
    const maxIconWidth = _.maxBy( items, item => item.icon.width ).icon.width;

    const itemNodes = []; // {Node[]}
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

    assert && assert( !options.children, 'LegendNode sets children' );
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
export default LegendNode;