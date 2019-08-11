// Copyright 2015-2017, University of Colorado Boulder

/**
 * The legend identifies the icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const ElectronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ElectronNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const NeutronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/NeutronNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ProtonNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ProtonNode' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  const electronString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electron' );
  const legendString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/legend' );
  const neutronString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/neutron' );
  const protonString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/proton' );

  // constants
  const TITLE_OPTIONS = {
    font: new MOTHAFont( { size: 16, weight: 'bold' } ),
    fill: MOTHAColorProfile.titleFillProperty,
    maxWidth: 100 // i18n, determined empirically
  };
  const LABEL_OPTIONS = {
    font: new MOTHAFont( 16 ),
    fill: 'white',
    maxWidth: 120 // i18n, determined empirically
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function LegendNode( options ) {

    options = _.extend( {
      spacing: 8,
      align: 'left'
    }, options );

    // title
    const titleNode = new Text( legendString, TITLE_OPTIONS );

    // items that appear in the legend, { icon: {Node}, label: {string} }
    const items = [
      { icon: new ElectronNode(), label: electronString },
      { icon: new ProtonNode(), label: protonString },
      { icon: new NeutronNode(), label: neutronString }
    ];

    // widest icon, used to horizontally center all icons and left-align all labels
    const maxIconWidth = _.maxBy( items, function( item ) {
      return item.icon.width;
    } ).icon.width;

    const itemNodes = []; // {Node[]}
    items.forEach( function( item ) {

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

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [
      titleNode,
      new VBox( {
        spacing: 5,
        align: 'left',
        children: itemNodes
      } )
    ];

    VBox.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'LegendNode', LegendNode );

  return inherit( VBox, LegendNode );
} );