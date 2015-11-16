// Copyright 2015, University of Colorado Boulder

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
  var MHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/models-of-the-hydrogen-atom/view/MHAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // images
  var billiardBallButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/billiardBallButton.png' );
  var plumPuddingButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/plumPuddingButton.png' );
  var classicalSolarSystemButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystemButton.png' );
  var bohrButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/bohrButton.png' );
  var deBroglieButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/deBroglieButton.png' );
  var schrodingerButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/schrodingerButton.png' );

  // strings
  var atomicModelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/atomicModel' );
  var billiardBallString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/billiardBall' );
  var plumPuddingString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/plumPudding' );
  var classicalSolarSystemString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystem' );
  var bohrString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/bohr' );
  var deBroglieString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/deBroglie' );
  var schrodingerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/schrodinger' );
  var classicalString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classical' );
  var quantumString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/quantum' );

  // constants
  var TITLE_FONT = new MHAFont( { size: 18, weight: 'bold' } );
  var BUTTON_FONT = new MHAFont( 13 );
  var SPECTRUM_FONT = new MHAFont( 14 );
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
      { value: 'billiardBall', node: createButtonIcon( billiardBallString, billiardBallButtonImage ) },
      { value: 'plumPudding', node: createButtonIcon( plumPuddingString, plumPuddingButtonImage ) },
      {
        value: 'classicalSolarSystem',
        node: createButtonIcon( classicalSolarSystemString, classicalSolarSystemButtonImage )
      },
      { value: 'bohr', node: createButtonIcon( bohrString, bohrButtonImage ) },
      { value: 'deBroglie', node: createButtonIcon( deBroglieString, deBroglieButtonImage ) },
      { value: 'schrodinger', node: createButtonIcon( schrodingerString, schrodingerButtonImage ) }
    ], {
      spacing: 2,
      buttonContentXMargin: 4,
      buttonContentYMargin: 4
    } );

    // title
    var titleNode = new Text( atomicModelString, {
      font: TITLE_FONT,
      maxWidth: buttonGroup.width
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
    var contentNode = new VBox( {
      spacing: 5,
      align: 'center',
      children: [
        titleNode,
        new HBox( {
          spacing: 6,
          children: [ buttonGroup, spectrumBar ]
        } )
      ]
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

  /**
   * @param {string} text
   * @param {HTMLImageElement|MipMap} image
   * @returns {*}
   */
  var createButtonIcon = function( text, image ) {
    return new VBox( {
      children: [
        new Text( text, {
          font: BUTTON_FONT,
          maxWidth: 125 // i18n, determined empirically
        } ),
        new Image( image )
      ]
    } );
  };

  return inherit( Node, ModelControl );
} );
