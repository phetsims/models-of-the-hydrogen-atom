// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control for choosing one of the model name options.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ContinuumBarNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/spectra/view/ContinuumBarNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PredictiveModels = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModels' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Text = require( 'SCENERY/nodes/Text' );

  // images
  const billiardBallButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/billiardBallButton.png' );
  const bohrButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/bohrButton.png' );
  const classicalSolarSystemButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystemButton.png' );
  const deBroglieButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/deBroglieButton.png' );
  const plumPuddingButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/plumPuddingButton.png' );
  const schrodingerButtonImage = require( 'image!MODELS_OF_THE_HYDROGEN_ATOM/schrodingerButton.png' );

  // strings
  const billiardBallString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/billiardBall' );
  const bohrString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/bohr' );
  const classicalSolarSystemString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classicalSolarSystem' );
  const deBroglieString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/deBroglie' );
  const plumPuddingString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/plumPudding' );
  const schrodingerString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/schrodinger' );

  class PredictiveModelPanel extends Panel {

    /**
     * @param {EnumerationProperty.<PredictiveModels>} predictiveModelProperty
     * @param {Object} [options]
     */
    constructor( predictiveModelProperty, options ) {

      options = _.extend( {
        fill: MOTHAColorProfile.modelsPanelFillProperty,
        stroke: MOTHAColorProfile.modelsPanelStrokeProperty,
        xMargin: 10,
        yMargin: 10
      }, options );

      // content that appears on the radio buttons
      const contentArray = [
        createRadioButtonContent( PredictiveModels.BILLIARD_BALL, billiardBallString, billiardBallButtonImage ),
        createRadioButtonContent( PredictiveModels.PLUM_PUDDING, plumPuddingString, plumPuddingButtonImage ),
        createRadioButtonContent( PredictiveModels.CLASSICAL_SOLAR_SYSTEM, classicalSolarSystemString, classicalSolarSystemButtonImage ),
        createRadioButtonContent( PredictiveModels.BOHR, bohrString, bohrButtonImage ),
        createRadioButtonContent( PredictiveModels.DEBROGLIE, deBroglieString, deBroglieButtonImage ),
        createRadioButtonContent( PredictiveModels.SCHRODINGER, schrodingerString, schrodingerButtonImage )
      ];

      // radio buttons
      const radioButtonGroup = new RadioButtonGroup( predictiveModelProperty, contentArray, {
        baseColor: options.fill,
        disabledBaseColor: MOTHAColorProfile.modelsRadioButtonFillProperty,
        selectedStroke: MOTHAColorProfile.modelsRadioButtonSelectedStrokeProperty,
        deselectedStroke: MOTHAColorProfile.modelsRadioButtonFillProperty,
        overFill: MOTHAColorProfile.modelsRadioButtonFillProperty,
        overStroke: MOTHAColorProfile.modelsRadioButtonDeselectedStrokeProperty,
        overLineWidth: 2,
        selectedLineWidth: 2,
        labelAlign: 'left',
        spacing: 2,
        buttonContentXMargin: 12,
        buttonContentYMargin: 10,
        buttonContentXAlign: 'left',
        selectedButtonOpacity: 1,
        deselectedButtonOpacity: 1,
        selectedContentOpacity: 1,
        deselectedContentOpacity: 1,
        overButtonOpacity: 1,
        overContentOpacity: 1
      } );

      // continuum bar, 'Classical' to 'Quantum'
      const continuumBarNode = new ContinuumBarNode( radioButtonGroup.height );

      // panel content
      const contentNode = new HBox( {
        spacing: 10,
        children: [ continuumBarNode, radioButtonGroup ]
      } );

      super( contentNode, options );
    }
  }

  /**
   * Creates the content for one of the radio buttons.
   * @param {*} value
   * @param {string} text
   * @param {HTMLImageElement} image
   * @returns {{value:string, node:Node}}
   */
  function createRadioButtonContent( value, text, image ) {
    return {
      value: value,
      node: new HBox( {
        spacing: 10,
        children: [
          new Image( image, {
            scale: 0.2
          } ),
          new Text( text, {
            fill: MOTHAColorProfile.modelsRadioButtonTextFillProperty,
            font: new PhetFont( 16 ),
            maxWidth: 200 // i18n, determined empirically
          } )
        ]
      } )
    };
  }

  return modelsOfTheHydrogenAtom.register( 'PredictiveModelPanel', PredictiveModelPanel );
} );