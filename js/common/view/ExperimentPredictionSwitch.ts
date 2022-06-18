// Copyright 2015-2022, University of Colorado Boulder

/**
 * ExperimentPredictionSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { NodeTranslationOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import ABSwitch, { ABSwitchOptions } from '../../../../sun/js/ABSwitch.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import MOTHAColors from '../MOTHAColors.js';
import { ModelMode } from '../model/ModelMode.js';
import Property from '../../../../axon/js/Property.js';

type SelfOptions = EmptyObjectType;

type ExperimentPredictionSwitchOptions = SelfOptions & NodeTranslationOptions & PickRequired<ABSwitchOptions, 'tandem'>

class ExperimentPredictionSwitch extends ABSwitch<ModelMode> {

  public constructor( modelModeProperty: Property<ModelMode>, providedOptions: ExperimentPredictionSwitchOptions ) {

    const options = optionize<ExperimentPredictionSwitchOptions, SelfOptions, ABSwitchOptions>()( {
      centerOnButton: true,
      toggleSwitchOptions: { size: new Dimension2( 50, 25 ) }
    }, providedOptions );

    const labelOptions = {
      font: new PhetFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColors.abSwitchTextFillProperty,
      maxWidth: 100
    };

    const experimentNode = new Text( modelsOfTheHydrogenAtomStrings.experiment,
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( 'experimentNode' )
      }, labelOptions ) );

    const predictionNode = new Text( modelsOfTheHydrogenAtomStrings.prediction,
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( 'predictionNode' )
      }, labelOptions ) );

    super( modelModeProperty, 'experiment', experimentNode, 'prediction', predictionNode, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );
export default ExperimentPredictionSwitch;