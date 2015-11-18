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
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MOTHAFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var cameraImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/camera.png' );

  // strings
  var resetString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/reset' );
  var spectrometerPhotonsEmittedNmString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/spectrometerPhotonsEmittedNm' );
  var stopString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/stop' );

  // constants
  var BUTTON_LABEL_OPTIONS = {
    font: new MOTHAFont( 14 ),
    maxWidth: 50 // i18n, determined empirically
  };
  var BUTTON_COLOR = 'rgb( 245, 245, 245 )';
  var DISPLAY_SIZE = new Dimension2( 400, 55 );

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

    options.titleNode = new Text( spectrometerPhotonsEmittedNmString, {
      font: new MOTHAFont( { size: 16, weight: 'bold' } ),
      fill: 'white',
      maxWidth: 290 // i18n, determined empirically
    } );

    var stopButton = new RectangularPushButton( {
      baseColor: BUTTON_COLOR,
      content: new Text( stopString, BUTTON_LABEL_OPTIONS ),
      listener: function() {
        //TODO
      }
    } );

    var resetButton = new RectangularPushButton( {
      baseColor: BUTTON_COLOR,
      content: new Text( resetString, BUTTON_LABEL_OPTIONS ),
      listener: function() {
        //TODO
      }
    } );

    var cameraButton = new RectangularPushButton( {
      maxHeight: stopButton.height,
      baseColor: BUTTON_COLOR,
      content: new Image( cameraImage ),
      listener: function() {
        //TODO
      }
    } );

    var buttonGroup = new HBox( {
      spacing: 20,
      children: [ stopButton, resetButton, cameraButton ]
    } );

    //TODO placeholder
    var displayNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      fill: 'white',
      stroke: 'black'
    } );

    var contentNode = new VBox( {
      spacing: 5,
      children: [
        displayNode,
        buttonGroup
      ]
    } );

    AccordionBox.call( this, contentNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );

  return inherit( AccordionBox, SpectrometerNode );
} );
