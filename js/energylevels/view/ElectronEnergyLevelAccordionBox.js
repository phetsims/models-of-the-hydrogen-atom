// Copyright 2015-2019, University of Colorado Boulder

/**
 * ElectronEnergyLevelAccordionBox shows electron energy levels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AccordionBox = require( 'SUN/AccordionBox' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const electronEnergyLevelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/electronEnergyLevel' );

  // constants
  const DIAGRAM_SIZE = new Dimension2( 220, 420 );

  class ElectronEnergyLevelAccordionBox extends AccordionBox {

    /**
     * @param {Property.<boolean>} expandedProperty
     * @param {Object} [options]
     */
    constructor( expandedProperty, options ) {

      options = _.extend( {
        fill: MOTHAColorProfile.electronEnergyLevelAccordionBoxFillProperty,
        stroke: MOTHAColorProfile.electronEnergyLevelAccordionBoxStrokeProperty,
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
        buttonAlign: 'left',
        titleAlignX: 'left',
        titleXSpacing: 10
      }, options );

      assert && assert( !options.expandedProperty, 'ElectronEnergyLevelAccordionBox sets expandedProperty' );
      options.expandedProperty = expandedProperty;

      assert && assert( !options.titleNode, 'ElectronEnergyLevelAccordionBox sets titleNode' );
      options.titleNode = new Text( electronEnergyLevelString, {
        font: new PhetFont( { size: 16, weight: 'bold' } ),
        fill: MOTHAColorProfile.electronEnergyLevelTitleFillProperty,
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

  return modelsOfTheHydrogenAtom.register( 'ElectronEnergyLevelAccordionBox', ElectronEnergyLevelAccordionBox );
} );
