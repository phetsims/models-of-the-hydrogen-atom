// Copyright 2015-2016, University of Colorado Boulder

/**
 * Control for selecting one of several predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
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
  var SPECTRUM_FONT = new MOTHAFont( 14 );
  var PANEL_X_MARGIN = 10;
  var PANEL_Y_MARGIN = 10;
  var SPECTRUM_TEXT_MARGIN = 6;

  /**
   * @param {Property.<string>} modelProperty
   * @param {Object} [options]
   * @constructor
   */
  function ModelControl( modelProperty, options ) {

    // radio buttons
    var buttonGroup = new RadioButtonGroup( modelProperty, [
      createButtonContent( 'billiardBall', billiardBallString, billiardBallButtonImage ),
      createButtonContent( 'plumPudding', plumPuddingString, plumPuddingButtonImage ),
      createButtonContent( 'classicalSolarSystem', classicalSolarSystemString, classicalSolarSystemButtonImage ),
      createButtonContent( 'bohr', bohrString, bohrButtonImage ),
      createButtonContent( 'deBroglie', deBroglieString, deBroglieButtonImage ),
      createButtonContent( 'schrodinger', schrodingerString, schrodingerButtonImage )
    ], {
      baseColor: 'black',
      disabledBaseColor: 'black',
      selectedStroke: 'yellow',
      deselectedStroke: 'black',
      overFill: 'black',
      overStroke: 'gray',
      overLineWidth: 1,
      selectedLineWidth: 2,
      labelAlign: 'left',
      spacing: 2,
      buttonContentXMargin: 4,
      buttonContentYMargin: 2
    } );

    // spectrum bar, 'Classical' to 'Quantum'
    var spectrumTextOptions = {
      font: SPECTRUM_FONT,
      rotation: Math.PI / 2,
      maxHeight: 0.4 * buttonGroup.height
    };
    var classicalText = new Text( classicalString, _.extend( {}, spectrumTextOptions, { fill: 'black' } ) );
    var quantumText = new Text( quantumString, _.extend( {}, spectrumTextOptions, { fill: 'white' } ) );
    var spectrumHeight = buttonGroup.height;
    var spectrumBackgroundNode = new Rectangle( 0, 0, Math.max( classicalText.width, quantumText.width ) + 10, spectrumHeight, {
      cornerRadius: 5,
      fill: new LinearGradient( 0, 0, 0, spectrumHeight ).addColorStop( 0, 'white' ).addColorStop( 1, 'black' )
    } );
    var spectrumBar = new Node( {
      children: [
        spectrumBackgroundNode,
        classicalText,
        quantumText
      ]
    } );
    classicalText.centerX = spectrumBackgroundNode.centerX;
    classicalText.top = spectrumBackgroundNode.top + SPECTRUM_TEXT_MARGIN;
    quantumText.centerX = spectrumBackgroundNode.centerX;
    quantumText.bottom = spectrumBackgroundNode.bottom - SPECTRUM_TEXT_MARGIN;

    // panel content
    var contentNode = new HBox( {
      spacing: 6,
      children: [ spectrumBar, buttonGroup ]
    } );

    // panel background
    var backgroundNode = new ShadedRectangle(
      new Bounds2( 0, 0, contentNode.width + ( 2 * PANEL_X_MARGIN ), contentNode.height + ( 2 * PANEL_Y_MARGIN ) ), {
        baseColor: 'rgb( 146, 146, 146 )'
      } );

    // content centered in panel
    contentNode.center = backgroundNode.center;

    options.children = [ backgroundNode, contentNode ];
    Node.call( this, options );

    // Change the selection to match the model.
    // No need to unlink since ModelControl exists for the lifetime of the sim.
    modelProperty.link( function( model ) {
        //TODO
      }
    );
  }

  modelsOfTheHydrogenAtom.register( 'ModelControl', ModelControl );

  /**
   * @param {*} value
   * @param {string} text
   * @param {HTMLImageElement} image
   * @returns {{value:string, node:Node}}
   */
  var createButtonContent = function( value, text, image ) {
    return {
      value: value,
      node: new HBox( {
        spacing: 8,
        children: [
          new Image( image, {
            scale: 0.5
          } ),
          new Text( text, {
            fill: 'white',
            font: new MOTHAFont( 16 ),
            maxWidth: 150 // i18n, determined empirically
          } )
        ]
      } )
    };
  };

  return inherit( Node, ModelControl );
} );
