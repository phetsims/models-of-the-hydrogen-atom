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
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MOTHAFont' );
  var Property = require( 'AXON/Property' );
  var RecordStopButton = require( 'SCENERY_PHET/buttons/RecordStopButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ResetButton = require( 'SCENERY_PHET/buttons/ResetButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var spectrometerPhotonsEmittedNmString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/spectrometerPhotonsEmittedNm' );

  // constants
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
      contentXMargin: 10,
      contentYMargin: 5,
      contentYSpacing: 0,
      buttonTouchAreaXDilation: 16,
      buttonTouchAreaYDilation: 16,
      buttonAlign: 'right',
      titleAlignX: 'left'
    }, options );

    options.expandedProperty = expandedProperty;

    options.titleNode = new Text( spectrometerPhotonsEmittedNmString, {
      font: new MOTHAFont( { size: 16, weight: 'bold' } ),
      fill: 'white',
      maxWidth: 290 // i18n, determined empirically
    } );

    //TODO relocate, handle reset
    var recordingProperty = new Property( false );
    recordingProperty.link( function( recording ) {
      //TODO
    } );

    var recordStopButton = new RecordStopButton( recordingProperty, {
      radius: 15,
      baseColor: BUTTON_COLOR
    } );

    var resetButton = new ResetButton( {
      baseColor: BUTTON_COLOR,
      arrowColor: 'black',
      radius: recordStopButton.height / 2,
      listener: function() {
        //TODO
      }
    } );

    var cameraButton = new RectangularPushButton( {
      maxHeight: recordStopButton.height,
      baseColor: BUTTON_COLOR,
      content: new FontAwesomeNode( 'camera' ),
      listener: function() {
        //TODO
      }
    } );

    //TODO placeholder
    var displayNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      fill: 'white',
      stroke: 'black'
    } );

    var SPACING = 20;
    var STRUT_WITH = displayNode.width - ( ( 3 * SPACING ) +  recordStopButton.width + resetButton.width + cameraButton.width );
    var buttonGroup = new HBox( {
      spacing: 20,
      children: [ recordStopButton, new HStrut( STRUT_WITH ), resetButton, cameraButton ]
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
