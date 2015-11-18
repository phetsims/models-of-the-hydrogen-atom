// Copyright 2015, University of Colorado Boulder

/**
 * Diagram that shows electron energy level.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CloseButton = require( 'SCENERY_PHET/buttons/CloseButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var electronEnergyLevelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electronEnergyLevel' );

  // constants
  var TITLE_X_SPACING = 5;

  /**
   * @param {Property.<boolean>} energyDiagramVisible
   * @param {Object} [options]
   * @constructor
   */
  function EnergyDiagram( energyDiagramVisible, options ) {

    options = _.extend( {
      fill: 'rgb( 128, 128, 128 )',
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5
    }, options );

    var diagramNode = new Rectangle( 0, 0, 220, 400, {
      fill: 'white',
      stroke: 'black'
    } );

    var closeButton = new CloseButton( {
      iconLength: 6,
      xTouchExpansion: 8,
      yTouchExpansion: 8,
      listener: function() {
        energyDiagramVisible.set( false );
      }
    } );

    var titleNode = new Text( electronEnergyLevelString, {
      font: new MHAFont( { size: 16, weight: 'bold' } ),
      fill: 'white',
      maxWidth: diagramNode.width - closeButton.width - TITLE_X_SPACING
    } );

    var titleBar = new Node( { children: [ titleNode, closeButton ] } );
    closeButton.right = titleNode.left + diagramNode.width;
    closeButton.centerY = titleNode.centerY;

    var contentNode = new VBox( {
      align: 'center',
      spacing: 5,
      children: [ titleBar, diagramNode ]
    } );

    Panel.call( this, contentNode, options );

    energyDiagramVisible.linkAttribute( this, 'visible' );
  }

  modelsOfTheHydrogenAtom.register( 'EnergyDiagram', EnergyDiagram );

  return inherit( Panel, EnergyDiagram );
} );
