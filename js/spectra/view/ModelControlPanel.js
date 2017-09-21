// Copyright 2015-2017, University of Colorado Boulder

/**
 * Control panel for selecting one of several predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ContinuumBarNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ContinuumBarNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAColors = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColors' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Panel = require( 'SUN/Panel' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
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
  var classicalSolarSystemString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystem' );
  var deBroglieString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/deBroglie' );
  var plumPuddingString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/plumPudding' );
  var schrodingerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/schrodinger' );

  /**
   * @param {Property.<string>} modelNameProperty
   * @param {Object} [options]
   * @constructor
   */
  function ModelControlPanel( modelNameProperty, options ) {

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

    // radio buttons
    var radioButtonGroup = new RadioButtonGroup( modelNameProperty, contentArray, {
      baseColor: options.fill,
      disabledBaseColor: options.fill,
      selectedStroke: MOTHAColors.SELECTED_COLOR,
      deselectedStroke: options.fill,
      overFill: options.fill,
      overStroke: MOTHAColors.DESELECTED_COLOR,
      overLineWidth: 2,
      selectedLineWidth: 2,
      labelAlign: 'left',
      spacing: 2,
      buttonContentXMargin: 4,
      buttonContentYMargin: 2,
      buttonContentXAlign: 'left',
      selectedButtonOpacity: 1,
      deselectedButtonOpacity: 1,
      selectedContentOpacity: 1,
      deselectedContentOpacity: 1,
      overButtonOpacity: 1,
      overContentOpacity: 1
    } );

    // continuum bar, 'Classical' to 'Quantum'
    var continuumBarNode = new ContinuumBarNode( radioButtonGroup.height );

    // panel content
    var contentNode = new HBox( {
      spacing: 10,
      children: [ continuumBarNode, radioButtonGroup ]
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
