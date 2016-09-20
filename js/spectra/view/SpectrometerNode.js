// Copyright 2015-2016, University of Colorado Boulder

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
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAColors = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColors' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Property = require( 'AXON/Property' );
  var RecordStopButton = require( 'SCENERY_PHET/buttons/RecordStopButton' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RectangularPushButton = require( 'SUN/buttons/RectangularPushButton' );
  var ResetButton = require( 'SCENERY_PHET/buttons/ResetButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var photonsEmittedNmString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/photonsEmittedNm' );
  var spectrometerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/spectrometer' );

  // constants
  var BUTTON_COLOR = 'rgb( 245, 245, 245 )';
  var DISPLAY_SIZE = new Dimension2( 525, 140 );

  /**
   * @param {Property.<boolean>} expandedProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpectrometerNode( expandedProperty, options ) {

    options = _.extend( {
      fill: 'rgb( 80, 80, 80 )',
      stroke: 'rgb( 200, 200, 200 )',
      xMargin: 5,
      yMargin: 5,
      cornerRadius: 5,
      buttonXMargin: 5,
      buttonYMargin: 5,
      contentXMargin: 10,
      contentYMargin: 5,
      contentYSpacing: 0,
      buttonLength: 22,
      buttonTouchAreaXDilation: 16,
      buttonTouchAreaYDilation: 16,
      buttonAlign: 'right',
      titleAlignX: 'left'
    }, options );

    options.expandedProperty = expandedProperty;

    var titleNode = new Text( spectrometerString, {
      font: new MOTHAFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.TITLE_FILL
    } );

    var subtitleNode = new Text( photonsEmittedNmString, {
      font: new MOTHAFont( 12 ),
      fill: 'white'
    } );

    // show subtitle only when expanded
    expandedProperty.link( function( expanded ) {
      subtitleNode.visible = expanded;
    } );

    assert && assert( !options.titleNode );
    options.titleNode = new HBox( {
      align: 'bottom',
      spacing: 12,
      children: [ titleNode, subtitleNode ],
      maxWidth: 290 // i18n, determined empirically
    } );

    //TODO placeholder
    var displayNode = new Rectangle( 0, 0, DISPLAY_SIZE.width, DISPLAY_SIZE.height, {
      fill: 'black'
    } );

    //TODO relocate, handle reset
    var recordingProperty = new Property( false );
    recordingProperty.link( function( recording ) {
      //TODO
    } );

    var recordStopButton = new RecordStopButton( recordingProperty, {
      radius: 15,
      baseColor: BUTTON_COLOR,
      touchAreaDilation: 10
    } );

    var resetButton = new ResetButton( {
      baseColor: BUTTON_COLOR,
      arrowColor: 'black',
      radius: recordStopButton.height / 2,
      touchAreaDilation: 10,
      listener: function() {
        //TODO
      }
    } );

    var cameraButton = new RectangularPushButton( {
      maxHeight: recordStopButton.height,
      baseColor: BUTTON_COLOR,
      content: new FontAwesomeNode( 'camera' ),
      touchAreaXDilation: 10,
      touchAreaYDilation: 10,
      listener: function() {
        //TODO
      }
    } );

    var buttonGroup = new VBox( {
      spacing: 10,
      align: 'center',
      children: [ recordStopButton, resetButton, cameraButton ]
    } );

    var contentNode = new HBox( {
      spacing: 12,
      align: 'bottom',
      children: [ displayNode, buttonGroup ]
    } );

    AccordionBox.call( this, contentNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );

  return inherit( AccordionBox, SpectrometerNode );
} );
