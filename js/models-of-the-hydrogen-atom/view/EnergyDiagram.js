// Copyright 2015, University of Colorado Boulder

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
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var electronEnergyLevelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electronEnergyLevel' );

  // constants
  var DIAGRAM_SIZE = new Dimension2( 220, 400 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function EnergyDiagram( options ) {

    options = _.extend( {
      fill: 'rgb( 160, 160, 160 )',
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5,
      buttonXMargin: 5,
      buttonYMargin: 5,
      contentXMargin: 5,
      contentYMargin: 5
    }, options );

    options.titleNode = new Text( electronEnergyLevelString, {
      font: new MHAFont( { size: 16, weight: 'bold' } ),
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
