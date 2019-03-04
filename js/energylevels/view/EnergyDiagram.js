// Copyright 2015-2016, University of Colorado Boulder

/**
 * Diagram that shows electron energy level.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AccordionBox = require( 'SUN/AccordionBox' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var electronEnergyLevelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electronEnergyLevel' );

  // constants
  var DIAGRAM_SIZE = new Dimension2( 220, 420 );

  /**
   * @param {Property.<boolean>} expandedProperty
   * @param {Object} [options]
   * @constructor
   */
  function EnergyDiagram( expandedProperty, options ) {

    options = _.extend( {
      fill: 'rgb( 160, 160, 160 )',
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5,
      buttonXMargin: 5,
      buttonYMargin: 5,
      contentXMargin: 5,
      contentYMargin: 5,
      contentYSpacing: 0,
      expandCollapseButtonOptions: {
        touchAreaXDilation: 16,
        touchAreaYDilation: 16
      },
      buttonAlign: 'right',
      titleAlignX: 'left'
    }, options );

    options.expandedProperty = expandedProperty;

    options.titleNode = new Text( electronEnergyLevelString, {
      font: new MOTHAFont( { size: 16, weight: 'bold' } ),
      fill: 'white',
      maxWidth: 150 // i18n, determined empirically
    } );

    //TODO this is a placeholder
    var diagramNode = new Rectangle( 0, 0, DIAGRAM_SIZE.width, DIAGRAM_SIZE.height, {
      fill: 'white',
      stroke: 'black'
    } );

    AccordionBox.call( this, diagramNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'EnergyDiagram', EnergyDiagram );

  return inherit( AccordionBox, EnergyDiagram );
} );
