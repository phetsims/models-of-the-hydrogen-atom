// Copyright 2025, University of Colorado Boulder

/**
 * AtomicModelPanel contains controls (radio buttons) for choosing one of the atomic models, and an optional
 * 'Classical' to 'Quantum' continuum bar. It is shown when the A/B switch is set to 'Model'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import GatedVisibleProperty from '../../../../axon/js/GatedVisibleProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { ModelOrExperiment } from '../model/MOTHAModel.js';
import AtomicModelRadioButtonGroup from './AtomicModelRadioButtonGroup.js';
import ContinuumBarNode from './ContinuumBarNode.js';

type SelfOptions = {
  radioButtonTextMaxWidth: number;
  hasContinuumBarNode?: boolean;
};

export type AtomicModelPanelOptions = SelfOptions & PickRequired<PanelOptions, 'tandem'>;

export default class AtomicModelPanel extends Panel {

  public constructor( atomicModelProperty: Property<HydrogenAtom>,
                      atomicModels: HydrogenAtom[],
                      modelOrExperimentProperty: TReadOnlyProperty<ModelOrExperiment>,
                      providedOptions: AtomicModelPanelOptions ) {

    const visibleProperty = new DerivedProperty( [ modelOrExperimentProperty ], modelOrExperiment => modelOrExperiment === 'model' );

    // Provides PhET-iO clients with a way to permanently hide this Node via 'selfVisibleProperty'
    const gatedVisibleProperty = new GatedVisibleProperty( visibleProperty, providedOptions.tandem );

    const options = optionize<AtomicModelPanelOptions, SelfOptions, PanelOptions>()( {

      // SelfOptions
      hasContinuumBarNode: true,

      // PanelOptions
      isDisposable: false,
      visibleProperty: gatedVisibleProperty,
      fill: null,
      stroke: null,
      xMargin: 0,
      yMargin: 0
    }, providedOptions );

    // Radio buttons
    const atomicModelRadioButtonGroup = new AtomicModelRadioButtonGroup( atomicModelProperty, atomicModels, {
      radioButtonTextMaxWidth: providedOptions.radioButtonTextMaxWidth,
      tandem: options.tandem.createTandem( 'atomicModelRadioButtonGroup' )
    } );

    const children: Node[] = [];

    // Optional continuum bar, 'Classical' to 'Quantum'
    if ( options.hasContinuumBarNode ) {
      const continuumBarNode = new ContinuumBarNode( atomicModelRadioButtonGroup.height, options.tandem.createTandem( 'continuumBarNode' ) );
      children.push( continuumBarNode );
    }

    children.push( atomicModelRadioButtonGroup );

    const contentNode = new HBox( {
      spacing: 10,
      children: children
    } );

    super( contentNode, options );
  }
}

modelsOfTheHydrogenAtom.register( 'AtomicModelPanel', AtomicModelPanel );