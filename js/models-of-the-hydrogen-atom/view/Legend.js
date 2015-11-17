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
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var NeutronNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/NeutronNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
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
    font: new MHAFont( { size: 18, weight: 'bold' } ),
    fill: 'white'
  };
  var ITEM_OPTIONS = {
    font: new MHAFont( 18 ),
    fill: 'white'
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Legend( options ) {

    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      cornerRadius: 6,
      xMargin: 10,
      yMargin: 5
    }, options );

    // title
    var titleNode = new Text( legendString, TITLE_OPTIONS );

    // items that appear in the legend
    var items = [
      { icon: new ElectronNode(), label: electronString },
      { icon: new ProtonNode(), label: protonString },
      { icon: new NeutronNode(), label: neutronString }
    ];

    // widest icon, used to horizontally center all icons and left-align all labels
    var maxIconWidth = _.max( items, function( item ) {
      return item.icon.width;
    } ).icon.width;

    var itemNodes = [];
    items.forEach( function( item ) {

      // pad the icon with a strut, so that all icons occupy the same amount of horizontal space
      var strut = new HStrut( maxIconWidth );
      var paddedIcon = new Node( { children: [ strut, item.icon ] } );
      strut.center = item.icon.center;

      itemNodes.push( new HBox( {
        spacing: 10,
        children: [
          paddedIcon,
          new Text( item.label, ITEM_OPTIONS ) ]
      } ) );
    } );

    var itemsBox = new VBox( {
      spacing: 5,
      align: 'left',
      children: itemNodes
    } );

    var contentNode = new VBox( {
      spacing: 8,
      align: 'center',
      children: [
        titleNode,
        itemsBox
      ]
    } );

    Panel.call( this, contentNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'Legend', Legend );

  return inherit( Panel, Legend );
} );