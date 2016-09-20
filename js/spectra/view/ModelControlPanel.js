// Copyright 2015-2016, University of Colorado Boulder

/**
 * Control panel for selecting one of several predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var billiardBallButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/billiardBallButton.png' );
  var bohrButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/bohrButton.png' );
  var classicalSolarSystemButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystemButton.png' );
  var deBroglieButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/deBroglieButton.png' );
  var plumPuddingButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/plumPuddingButton.png' );
  var schrodingerButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/schrodingerButton.png' );

  // strings
  var billiardBallString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/billiardBall' );
  var bohrString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/bohr' );
  var classicalString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classical' );
  var classicalSolarSystemString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystem' );
  var deBroglieString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/deBroglie' );
  var plumPuddingString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/plumPudding' );
  var quantumString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/quantum' );
  var schrodingerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/schrodinger' );

  // constants
  var SPECTRUM_TEXT_MARGIN = 6;

  /**
   * @param {Property.<string>} modelProperty
   * @param {Object} [options]
   * @constructor
   */
  function ModelControlPanel( modelProperty, options ) {

    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      xMargin: 10,
      yMargin: 10
    }, options );

    // content that appears on the radio buttons
    var contentArray = [
      createRadioButtonContent( 'billiardBall', billiardBallString, billiardBallButtonImage ),
      createRadioButtonContent( 'plumPudding', plumPuddingString, plumPuddingButtonImage ),
      createRadioButtonContent( 'classicalSolarSystem', classicalSolarSystemString, classicalSolarSystemButtonImage ),
      createRadioButtonContent( 'bohr', bohrString, bohrButtonImage ),
      createRadioButtonContent( 'deBroglie', deBroglieString, deBroglieButtonImage ),
      createRadioButtonContent( 'schrodinger', schrodingerString, schrodingerButtonImage )
    ];

    // Workaround for https://github.com/phetsims/sun/issues/268.
    // RadioButtonGroup options.align is broken, so handle left alignment ourselves.
    var maxContentNodeWidth = 0;
    contentArray.forEach( function( content ) {
      maxContentNodeWidth = Math.max( maxContentNodeWidth, content.node.width );
    } );
    contentArray.forEach( function( content ) {
      content.node.addChild( new HStrut( maxContentNodeWidth - content.node.width ) );
    } );

    // radio buttons
    var radioButtonGroup = new RadioButtonGroup( modelProperty, contentArray, {
      baseColor: 'black',
      disabledBaseColor: 'black',
      selectedStroke: 'yellow',
      deselectedStroke: 'black',
      overFill: 'black',
      overStroke: 'rgb( 200, 200, 200 )',
      overLineWidth: 2,
      selectedLineWidth: 2,
      labelAlign: 'left',
      spacing: 2,
      buttonContentXMargin: 4,
      buttonContentYMargin: 2,
      selectedButtonOpacity: 1,
      deselectedButtonOpacity: 1,
      selectedContentOpacity: 1,
      deselectedContentOpacity: 1,
      overButtonOpacity: 1,
      overContentOpacity: 1
    } );

    // continuum bar, 'Classical' to 'Quantum'
    var continuumTextOptions = {
      font: new MOTHAFont( 14 ),
      rotation: Math.PI / 2,
      maxWidth: 0.4 * radioButtonGroup.height
    };
    var classicalText = new Text( classicalString, continuumTextOptions );
    var quantumText = new Text( quantumString, continuumTextOptions );
    var continuumBackgroundNode = new Rectangle( 0, 0, Math.max( classicalText.width, quantumText.width ) + 10, radioButtonGroup.height, {
      cornerRadius: 5,
      fill: 'rgb( 220, 220, 220 )'
    } );
    var continuumNode = new Node( {
      children: [
        continuumBackgroundNode,
        classicalText,
        quantumText
      ]
    } );
    classicalText.centerX = continuumBackgroundNode.centerX;
    classicalText.top = continuumBackgroundNode.top + SPECTRUM_TEXT_MARGIN;
    quantumText.centerX = continuumBackgroundNode.centerX;
    quantumText.bottom = continuumBackgroundNode.bottom - SPECTRUM_TEXT_MARGIN;

    // panel content
    var contentNode = new HBox( {
      spacing: 10,
      children: [ continuumNode, radioButtonGroup ]
    } );

    Panel.call( this, contentNode, options );
  }

  modelsOfTheHydrogenAtom.register( 'ModelControlPanel', ModelControlPanel );

  /**
   * @param {*} value
   * @param {string} text
   * @param {HTMLImageElement} image
   * @returns {{value:string, node:Node}}
   */
  var createRadioButtonContent = function( value, text, image ) {
    return {
      value: value,
      node: new HBox( {
        spacing: 10,
        children: [
          new Image( image, {
            scale: 0.65
          } ),
          new Text( text, {
            fill: 'white',
            font: new MOTHAFont( 16 ),
            maxWidth: 200 // i18n, determined empirically
          } )
        ]
      } )
    };
  };

  return inherit( Panel, ModelControlPanel );
} );
