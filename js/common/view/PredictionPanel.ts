// Copyright 2015-2022, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
//TODO colors of Billiard Ball icon do not match BilliardBallNode
/**
 * PredictionPanel contains controls (radio buttons) for choosing one of the predictive models.
 * It is shown when the AB-switch is set to 'Prediction'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Image, NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { ModelMode } from '../model/ModelMode.js';
import MOTHAColors from '../MOTHAColors.js';
import ContinuumBarNode from './ContinuumBarNode.js';

type SelfOptions = EmptySelfOptions;

type PredictionPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export default class PredictionPanel extends Panel {

  public constructor( predictiveModelProperty: Property<HydrogenAtom>,
                      predictiveModels: HydrogenAtom[],
                      modelModeProperty: IReadOnlyProperty<ModelMode>,
                      providedOptions: PredictionPanelOptions ) {

    const options = optionize<PredictionPanelOptions, SelfOptions, PanelOptions>()( {

      // Visible when model mode is 'prediction'
      visibleProperty: new DerivedProperty( [ modelModeProperty ], modelMode => ( modelMode === 'prediction' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
      } ),
      fill: MOTHAColors.modelsPanelFillProperty,
      stroke: MOTHAColors.modelsPanelStrokeProperty,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    // So that all icons have the same effective size
    const iconAlignGroup = new AlignGroup();

    // content that appears on the radio buttons
    const items: RectangularRadioButtonItem<HydrogenAtom>[] = [];
    for ( let i = 0; i < predictiveModels.length; i++ ) {
      items.push( createRadioButtonItem( predictiveModels[ i ], iconAlignGroup ) );
    }

    // radio buttons
    const modelRadioButtonGroup = new RectangularRadioButtonGroup( predictiveModelProperty, items, {
      spacing: 2,
      labelAlign: 'left',
      radioButtonOptions: {
        baseColor: options.fill,
        selectedStroke: MOTHAColors.modelsRadioButtonSelectedStrokeProperty,
        deselectedStroke: MOTHAColors.modelsRadioButtonFillProperty,
        selectedLineWidth: 2,
        xMargin: 12,
        yMargin: 10,
        xAlign: 'left',
        selectedButtonOpacity: 1,
        deselectedButtonOpacity: 1,
        selectedContentOpacity: 1,
        deselectedContentOpacity: 1,
        overButtonOpacity: 1,
        overContentOpacity: 1
      },
      tandem: options.tandem.createTandem( 'modelRadioButtonGroup' )
    } );

    // continuum bar, 'Classical' to 'Quantum'
    const continuumBarNode = new ContinuumBarNode( modelRadioButtonGroup.height );

    // panel content
    const contentNode = new HBox( {
      spacing: 10,
      children: [ continuumBarNode, modelRadioButtonGroup ]
    } );

    super( contentNode, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

/**
 * Creates the item for one radio buttons.
 */
function createRadioButtonItem( predictiveModel: HydrogenAtom, iconAlignGroup: AlignGroup ): RectangularRadioButtonItem<HydrogenAtom> {

  const icon = new AlignBox( new Image( predictiveModel.iconHTMLImageElement, { scale: 0.2 } ), {
    group: iconAlignGroup
  } );

  const text = new Text( predictiveModel.displayName, {
    fill: MOTHAColors.modelsRadioButtonTextFillProperty,
    font: new PhetFont( 16 ),
    maxWidth: 200 // determined empirically
  } );

  const node = new HBox( {
    spacing: 10,
    children: [ icon, text ]
  } );

  return {
    value: predictiveModel,
    node: node,
    tandemName: `${predictiveModel.tandem.name}RadioButton` //TODO too clever?
  };
}

modelsOfTheHydrogenAtom.register( 'PredictionPanel', PredictionPanel );