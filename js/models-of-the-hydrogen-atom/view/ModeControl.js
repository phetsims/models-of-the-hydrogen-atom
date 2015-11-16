// Copyright 2015, University of Colorado Boulder

/**
 * Control for switching between 'Experiment' and 'Prediction' modes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var modeSwitchDownImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/modeSwitchDown.png' );
  var modeSwitchUpImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/modeSwitchUp.png' );

  // strings
  var experimentString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/experiment' );
  var predictionString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/prediction' );
  var whatReallyHappensString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/whatReallyHappens' );
  var whatTheModelPredictsString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/whatTheModelPredicts' );

  // constants
  var X_MARGIN = 10;
  var Y_MARGIN = 10;
  var ON_COLOR = 'white';  // UI components are this color when they are 'on'
  var OFF_COLOR = 'black'; // UI components are this color when they are 'off'
  var TICK_LENGTH = 15;
  var TEXT_MAX_WIDTH = 145; // for i18n, determined empirically

  /**
   * @param {Property.<string>} modeProperty - the mode, 'experiment'|'prediction'
   * @param {Object} [options]
   * @constructor
   */
  function ModeSwitch( modeProperty, options ) {

    // switches
    var switchOptions = { cursor: 'pointer' };
    var experimentSwitch = new Image( modeSwitchUpImage, switchOptions );
    var predictionSwitch = new Image( modeSwitchDownImage, switchOptions );

    // big text
    var bigTextOptions = {
      font: new MHAFont( { size: 18, weight: 'bold' } ),
      maxWidth: TEXT_MAX_WIDTH
    };
    var experimentBigText = new Text( experimentString, bigTextOptions );
    var predictionBigText = new Text( predictionString, bigTextOptions );

    // small (parenthetical) text
    var smallTextOptions = {
      font: new MHAFont( 12 ),
      maxWidth: TEXT_MAX_WIDTH
    };
    var experimentSmallText = new Text( whatReallyHappensString, smallTextOptions );
    var predictionSmallText = new Text( whatTheModelPredictsString, smallTextOptions );

    var labelOptions = {
      align: 'left',
      spacing: 1
    };

    // label for experiment setting
    var experimentLabel = new VBox( _.extend( {}, labelOptions, {
      children: [
        experimentBigText,
        experimentSmallText
      ]
    } ) );

    // label for prediction setting
    var predictionLabel = new VBox( _.extend( {}, labelOptions, {
      children: [
        predictionBigText,
        predictionSmallText
      ]
    } ) );

    // tick marks that the switch points to
    var lineOptions = { lineWidth: 3, stroke: 'black', lineCap: 'round' };
    var experimentTick = new Line( 0, 0, TICK_LENGTH, 0, lineOptions );
    var predictionTick = new Line( 0, 0, TICK_LENGTH, 0, lineOptions );

    // contents of the panel
    var contentNode = new Node( {
      children: [ predictionSwitch, experimentSwitch, experimentTick, predictionTick, experimentLabel, predictionLabel ]
    } );
    experimentSwitch.center = predictionSwitch.center;
    experimentTick.left = experimentSwitch.right;
    experimentTick.top = experimentSwitch.top + 5;
    predictionTick.left = experimentTick.left;
    predictionTick.bottom = predictionSwitch.bottom - 5;
    experimentLabel.left = experimentTick.right + 4;
    experimentLabel.top = experimentTick.centerY - ( experimentBigText.height / 2 );
    predictionLabel.left = experimentLabel.left;
    predictionLabel.top = predictionTick.centerY - ( predictionBigText.height / 2 );

    // panel background
    var backgroundNode = new ShadedRectangle(
      new Bounds2( 0, 0, contentNode.width + ( 2 * X_MARGIN ), contentNode.height + ( 2 * Y_MARGIN ) ), {
        baseColor: 'rgb( 146, 146, 146 )'
      } );

    options.children = [ backgroundNode, contentNode ];
    Node.call( this, options );

    // content centered in panel
    contentNode.center = backgroundNode.center;

    // Change the selection to match the mode.
    // No need to unlink since ModeControl exists for the lifetime of the sim.
    modeProperty.link( function( mode ) {

      // 'Experiment' mode components
      experimentSwitch.visible = ( mode === 'experiment' );
      var upColor = ( mode === 'experiment' ) ? ON_COLOR : OFF_COLOR;
      experimentTick.stroke = experimentBigText.fill = experimentSmallText.fill = upColor;

      // 'Prediction' mode components
      predictionSwitch.visible = ( mode === 'prediction' );
      var downColor = ( mode === 'prediction' ) ? ON_COLOR : OFF_COLOR;
      predictionTick.stroke = predictionBigText.fill = predictionSmallText.fill = downColor;
    } );

    // interactions that switch to 'Experiment' mode
    var experimentListener = new DownUpListener( {
      upInside: function( event, trail ) {
        modeProperty.set( 'experiment' );
      }
    } );
    predictionSwitch.addInputListener( experimentListener );
    experimentTick.addInputListener( experimentListener );
    experimentLabel.addInputListener( experimentListener );

    // interactions that switch to 'Prediction' mode
    var predictionListener = new DownUpListener( {
      upInside: function( event, trail ) {
        modeProperty.set( 'prediction' );
      }
    } );
    experimentSwitch.addInputListener( predictionListener );
    predictionTick.addInputListener( predictionListener );
    predictionLabel.addInputListener( predictionListener );
  }

  modelsOfTheHydrogenAtom.register( 'ModeSwitch', ModeSwitch );

  return inherit( Node, ModeSwitch );
} );
