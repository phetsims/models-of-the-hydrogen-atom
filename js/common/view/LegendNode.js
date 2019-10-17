// Copyright 2015-2019, University of Colorado Boulder

/**
 * LegendNode displays a legend, identifying the particle types that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ElectronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/ElectronNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const NeutronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/NeutronNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const ProtonNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/ProtonNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const electronString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electron' );
  const legendString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/legend' );
  const neutronString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/neutron' );
  const protonString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/proton' );

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

  return modelsOfTheHydrogenAtom.register( 'LegendNode', LegendNode );
} );