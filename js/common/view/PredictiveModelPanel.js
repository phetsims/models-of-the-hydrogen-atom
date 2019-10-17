// Copyright 2015-2019, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
/**
 * PredictiveModelPanel contains controls (radio buttons) for choosing one of the predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ContinuumBarNode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/view/ContinuumBarNode' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const Image = require( 'SCENERY/nodes/Image' );
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Panel = require( 'SUN/Panel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PredictiveModel = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/PredictiveModel' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Text = require( 'SCENERY/nodes/Text' );

  class PredictiveModelPanel extends Panel {

    /**
     * @param {Property.<PredictiveModel>} predictiveModelProperty
     * @param {PredictiveModel[]} predictiveModels
     * @param {Object} [options]
     */
    constructor( predictiveModelProperty, predictiveModels, options ) {

      options = merge( {
        fill: MOTHAColorProfile.modelsPanelFillProperty,
        stroke: MOTHAColorProfile.modelsPanelStrokeProperty,
        xMargin: 10,
        yMargin: 10
      }, options );

      // content that appears on the radio buttons
      const contentArray = [];
      for ( let i = 0; i < predictiveModels.length; i++ ) {
        contentArray.push( createRadioButtonContent( predictiveModels[ i ] ) );
      }

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
   * @param {PredictiveModel} predictiveModel
   * @returns {{value:string, node:Node}}
   */
  function createRadioButtonContent( predictiveModel ) {
    assert && assert( predictiveModel instanceof PredictiveModel, `invalid predictiveModel: ${predictiveModel}` );
    
    return {
      value: predictiveModel,
      node: new HBox( {
        spacing: 10,
        children: [
          new Image( predictiveModel.icon, {
            scale: 0.2
          } ),
          new Text( predictiveModel.displayName, {
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
