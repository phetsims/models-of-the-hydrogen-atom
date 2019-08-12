// Copyright 2015-2019, University of Colorado Boulder

/**
 * Diagram that shows electron energy level.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const electronEnergyLevelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electronEnergyLevel' );

  // constants
  const DIAGRAM_SIZE = new Dimension2( 220, 420 );

  class EnergyDiagram extends AccordionBox {

    /**
     * @param {Property.<boolean>} expandedProperty
     * @param {Object} [options]
     */
    constructor( expandedProperty, options ) {

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

      assert && assert( !options.expandedProperty, 'EnergyDiagram sets expandedProperty' );
      options.expandedProperty = expandedProperty;

      assert && assert( !options.titleNode, 'EnergyDiagram sets titleNode' );
      options.titleNode = new Text( electronEnergyLevelString, {
        font: new MOTHAFont( { size: 16, weight: 'bold' } ),
        fill: 'white',
        maxWidth: 150 // i18n, determined empirically
      } );

      //TODO this is a placeholder
      const diagramNode = new Rectangle( 0, 0, DIAGRAM_SIZE.width, DIAGRAM_SIZE.height, {
        fill: 'white',
        stroke: 'black'
      } );

      super( diagramNode, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'EnergyDiagram', EnergyDiagram );
} );
