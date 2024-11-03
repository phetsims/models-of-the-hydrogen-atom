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
import { optionize4 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, Node } from '../../../../scenery/js/imports.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import ContinuumBarNode from './ContinuumBarNode.js';
import ModelRadioButtonGroup from './ModelRadioButtonGroup.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = {
  hasContinuumBar?: boolean;
};

type ModelPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class ModelPanel extends Panel {

  public constructor( predictiveModelProperty: Property<HydrogenAtom>,
                      predictiveModels: HydrogenAtom[],
                      isExperimentProperty: TReadOnlyProperty<boolean>,
                      providedOptions: ModelPanelOptions ) {

    const options = optionize4<ModelPanelOptions, SelfOptions, PanelOptions>()( {}, MOTHAConstants.PANEL_OPTIONS, {

      // SelfOptions
      hasContinuumBar: true,

      // PanelOptions
      isDisposable: false,
      visibleProperty: DerivedProperty.not( isExperimentProperty ),
      fill: MOTHAColors.modelsPanelFillProperty,
      stroke: MOTHAColors.modelsPanelStrokeProperty
    }, providedOptions );

    // radio buttons
    const modelRadioButtonGroup = new ModelRadioButtonGroup( predictiveModelProperty, predictiveModels, {
      tandem: options.tandem.createTandem( 'modelRadioButtonGroup' )
    } );

    const children: Node[] = [];

    // continuum bar, 'Classical' to 'Quantum'
    if ( options.hasContinuumBar ) {
      //TODO Dynamically resize continuumBarNode to modelRadioButtonGroup.boundsProperty.value.height.
      const continuumBarNode = new ContinuumBarNode( modelRadioButtonGroup.height, {
        tandem: options.tandem.createTandem( 'continuumBarNode' )
      } );
      children.push( continuumBarNode );
    }

    children.push( modelRadioButtonGroup );

    // panel content
    const contentNode = new HBox( {
      spacing: 10,
      children: children
    } );

    super( contentNode, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ModelPanel', ModelPanel );