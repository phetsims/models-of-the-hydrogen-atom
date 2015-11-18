// Copyright 2015, University of Colorado Boulder

/**
 * The spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AccordionBox = require( 'SUN/AccordionBox' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var CloseButton = require( 'SCENERY_PHET/buttons/CloseButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var spectrometerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/spectrometer' );

  /**
   * @param {Property.<boolean>} expandedProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpectrometerNode( expandedProperty, options ) {

    options = _.extend( {
      fill: 'rgb( 160, 160, 160 )',
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5,
      buttonXMargin: 5,
      buttonYMargin: 5,
      contentXMargin: 5,
      contentYMargin: 5,
      contentYSpacing: 0
    }, options );

    options.expandedProperty = expandedProperty;

    options.titleNode = new Text( spectrometerString, {
      font: new MHAFont( { size: 16, weight: 'bold' } ),
      fill: 'white',
      maxWidth: 150 // i18n, determined empirically
    } );

    var contentNode = new Rectangle( 0, 0, 400, 85, {
      fill: 'white',
      stroke: 'black'
    } );

    AccordionBox.call( this, contentNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );

  return inherit( AccordionBox, SpectrometerNode );
} );
