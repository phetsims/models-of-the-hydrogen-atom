// Copyright 2015, University of Colorado Boulder

/**
 * The legend identifies the icons that appear in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ElectronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ElectronNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MOTHAFont' );
  var NeutronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/NeutronNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ProtonNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/ProtonNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electronString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electron' );
  var legendString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/legend' );
  var neutronString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/neutron' );
  var protonString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/proton' );

  // constants
  var TITLE_OPTIONS = {
    font: new MOTHAFont( { size: 18, weight: 'bold' } ),
    fill: 'rgb( 182, 182, 111 )',
    maxWidth: 100 // i18n, determined empirically
  };
  var LABEL_OPTIONS = {
    font: new MOTHAFont( 18 ),
    fill: 'white',
    maxWidth: 100 // i18n, determined empirically
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
    var titleNode = new Text( legendString, TITLE_OPTIONS );

    // items that appear in the legend, { icon: {Node}, label: {string} }
    var items = [
      { icon: new ElectronNode(), label: electronString },
      { icon: new ProtonNode(), label: protonString },
      { icon: new NeutronNode(), label: neutronString }
    ];

    // widest icon, used to horizontally center all icons and left-align all labels
    var maxIconWidth = _.max( items, function( item ) {
      return item.icon.width;
    } ).icon.width;

    var itemNodes = []; // {Node[]}
    items.forEach( function( item ) {

      // pad the icon with a strut, so that all icons occupy the same amount of horizontal space
      var strut = new HStrut( maxIconWidth );
      var paddedIcon = new Node( { children: [ strut, item.icon ] } );
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