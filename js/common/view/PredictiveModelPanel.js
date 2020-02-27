// Copyright 2015-2019, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
/**
 * PredictiveModelPanel contains controls (radio buttons) for choosing one of the predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import Panel from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PredictiveModel from '../model/PredictiveModel.js';
import MOTHAColorProfile from '../MOTHAColorProfile.js';
import ContinuumBarNode from './ContinuumBarNode.js';

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

modelsOfTheHydrogenAtom.register( 'PredictiveModelPanel', PredictiveModelPanel );
export default PredictiveModelPanel;