// Copyright 2015-2024, University of Colorado Boulder

/**
 * ModelPanel contains controls (radio buttons) for choosing one of the predictive models.
 * It is shown when the AB-switch is set to 'Model'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions, optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { ModelMode } from '../model/ModelMode.js';
import MOTHAColors from '../MOTHAColors.js';
import ContinuumBarNode from './ContinuumBarNode.js';
import ModelRadioButtonGroup from './ModelRadioButtonGroup.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type ModelPanelOptions = SelfOptions & NodeTranslationOptions & PickRequired<PanelOptions, 'tandem'>;

export default class ModelPanel extends Panel {

  public constructor( predictiveModelProperty: Property<HydrogenAtom>,
                      predictiveModels: HydrogenAtom[],
                      modelModeProperty: TReadOnlyProperty<ModelMode>,
                      providedOptions: ModelPanelOptions ) {

    const options = optionize4<ModelPanelOptions, SelfOptions, PanelOptions>()( {}, MOTHAConstants.PANEL_OPTIONS, {

      // PanelOptions
      isDisposable: false,
      visibleProperty: new DerivedProperty( [ modelModeProperty ], modelMode => ( modelMode === 'model' ), {
        tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      fill: MOTHAColors.modelsPanelFillProperty,
      stroke: MOTHAColors.modelsPanelStrokeProperty
    }, providedOptions );

    // radio buttons
    const modelRadioButtonGroup = new ModelRadioButtonGroup( predictiveModelProperty, predictiveModels, {
      tandem: options.tandem.createTandem( 'modelRadioButtonGroup' )
    } );

    // continuum bar, 'Classical' to 'Quantum'
    const continuumBarNode = new ContinuumBarNode( modelRadioButtonGroup.height, {
      tandem: options.tandem.createTandem( 'continuumBarNode' )
    } );

    // panel content
    const contentNode = new HBox( {
      spacing: 10,
      children: [ continuumBarNode, modelRadioButtonGroup ]
    } );

    super( contentNode, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ModelPanel', ModelPanel );