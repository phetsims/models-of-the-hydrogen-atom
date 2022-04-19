// Copyright 2015-2021, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
/**
 * PredictiveModelPanel contains controls (radio buttons) for choosing one of the predictive models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import IProperty from '../../../../axon/js/IProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { HBox, Image, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import PredictiveModel from '../model/PredictiveModel.js';
import MOTHAColors from '../MOTHAColors.js';
import ContinuumBarNode from './ContinuumBarNode.js';

type SelfOptions = {};

type PredictiveModelPanelOptions = SelfOptions & PanelOptions;

export default class PredictiveModelPanel extends Panel {

  constructor( predictiveModelProperty: IProperty<PredictiveModel>, predictiveModels: PredictiveModel[],
               providedOptions?: PredictiveModelPanelOptions ) {

    const options = optionize<PredictiveModelPanelOptions, SelfOptions, PanelOptions>( {
      fill: MOTHAColors.modelsPanelFillProperty,
      stroke: MOTHAColors.modelsPanelStrokeProperty,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    // content that appears on the radio buttons
    const contentArray: RectangularRadioButtonItem<PredictiveModel>[] = [];
    for ( let i = 0; i < predictiveModels.length; i++ ) {
      contentArray.push( createRadioButtonContent( predictiveModels[ i ] ) );
    }

    // radio buttons
    const radioButtonGroup = new RectangularRadioButtonGroup( predictiveModelProperty, contentArray, {
      baseColor: options.fill,
      selectedStroke: MOTHAColors.modelsRadioButtonSelectedStrokeProperty,
      deselectedStroke: MOTHAColors.modelsRadioButtonFillProperty,

      //TODO these are not defined for RectangularRadioButtonGroup
      // overFill: MOTHAColors.modelsRadioButtonFillProperty,
      // overStroke: MOTHAColors.modelsRadioButtonDeselectedStrokeProperty,
      // overLineWidth: 2,

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
 */
function createRadioButtonContent( predictiveModel: PredictiveModel ): RectangularRadioButtonItem<PredictiveModel> {

  const node = new HBox( {
    spacing: 10,
    children: [
      new Image( predictiveModel.icon, {
        scale: 0.2
      } ),
      new Text( predictiveModel.displayName, {
        fill: MOTHAColors.modelsRadioButtonTextFillProperty,
        font: new PhetFont( 16 ),
        maxWidth: 200 // i18n, determined empirically
      } )
    ]
  } );

  return {
    value: predictiveModel,
    node: node
  };
}

modelsOfTheHydrogenAtom.register( 'PredictiveModelPanel', PredictiveModelPanel );