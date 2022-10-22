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
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignBox, AlignGroup, HBox, Image, NodeTranslationOptions, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { ModelMode } from '../model/ModelMode.js';
import MOTHAColors from '../MOTHAColors.js';
import ContinuumBarNode from './ContinuumBarNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';

type SelfOptions = EmptySelfOptions;

type PredictionPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export default class PredictionPanel extends Panel {

  public constructor( predictiveModelProperty: Property<HydrogenAtom>,
                      predictiveModels: HydrogenAtom[],
                      modelModeProperty: TReadOnlyProperty<ModelMode>,
                      providedOptions: PredictionPanelOptions ) {

    const options = optionize<PredictionPanelOptions, SelfOptions, PanelOptions>()( {

      // Visible when model mode is 'prediction'
      visibleProperty: new DerivedProperty( [ modelModeProperty ], modelMode => ( modelMode === 'prediction' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      fill: MOTHAColors.modelsPanelFillProperty,
      stroke: MOTHAColors.modelsPanelStrokeProperty,
      xMargin: 10,
      yMargin: 10
    }, providedOptions );

    // So that all icons have the same effective size
    const iconAlignGroup = new AlignGroup();

    // content that appears on the radio buttons
    const items: RectangularRadioButtonGroupItem<HydrogenAtom>[] = [];
    for ( let i = 0; i < predictiveModels.length; i++ ) {
      items.push( createRadioButtonItem( predictiveModels[ i ], iconAlignGroup, options.tandem ) );
    }

    // radio buttons
    const modelRadioButtonGroup = new RectangularRadioButtonGroup( predictiveModelProperty, items, {
      spacing: 2,
      labelAlign: 'left',
      radioButtonOptions: {
        baseColor: options.fill,
        xMargin: 12,
        yMargin: 10,
        xAlign: 'left',
        buttonAppearanceStrategyOptions: {
          selectedStroke: MOTHAColors.modelsRadioButtonSelectedStrokeProperty,
          deselectedStroke: MOTHAColors.modelsRadioButtonFillProperty,
          selectedLineWidth: 2,
          selectedButtonOpacity: 1,
          deselectedButtonOpacity: 1,
          overButtonOpacity: 1
        },
        contentAppearanceStrategyOptions: {
          selectedContentOpacity: 1,
          deselectedContentOpacity: 1,
          overContentOpacity: 1
        }
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
function createRadioButtonItem( predictiveModel: HydrogenAtom, iconAlignGroup: AlignGroup, groupTandem: Tandem ):
  RectangularRadioButtonGroupItem<HydrogenAtom> {

  return {
    value: predictiveModel,
    createNode: tandem => new HBox( {
      spacing: 10,
      children: [
        new AlignBox( new Image( predictiveModel.iconHTMLImageElement, { scale: 0.2 } ), {
          group: iconAlignGroup
        } ),
        new Text( predictiveModel.displayNameProperty, {
          fill: MOTHAColors.modelsRadioButtonTextFillProperty,
          font: new PhetFont( 16 ),
          maxWidth: 200, // determined empirically
          tandem: tandem.createTandem( 'text' )
        } ) ]
    } ),
    tandemName: `${predictiveModel.tandem.name}RadioButton` //TODO too clever?
  };
}

modelsOfTheHydrogenAtom.register( 'PredictionPanel', PredictionPanel );