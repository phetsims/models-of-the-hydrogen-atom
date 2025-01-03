// Copyright 2016-2024, University of Colorado Boulder

/**
 * SpectraScreen is the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';
import MOTHAColors from '../common/MOTHAColors.js';
import MOTHAScreen, { MOTHAScreenOptions } from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';
import SpectraModel from './model/SpectraModel.js';
import SpectraScreenView from './view/SpectraScreenView.js';
import { VisibleEmissionChart } from '../common/view/EmissionChart.js';
import Property from '../../../axon/js/Property.js';
import SpectrometerDataPoint from '../common/model/SpectrometerDataPoint.js';

type SelfOptions = EmptySelfOptions;

type SpectraScreenOptions = SelfOptions & StrictOmit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class SpectraScreen extends MOTHAScreen<SpectraModel, SpectraScreenView> {

  public constructor( providedOptions: SpectraScreenOptions ) {

    const options = optionize<SpectraScreenOptions, SelfOptions, MOTHAScreenOptions>()( {

      // MOTHAScreenOptions
      isDisposable: false,
      name: ModelsOfTheHydrogenAtomStrings.screen.spectraStringProperty,
      homeScreenIcon: createScreenIcon(),
      screenButtonsHelpText: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenButtonsHelpTextStringProperty
    }, providedOptions );

    super(
      () => new SpectraModel( options.tandem.createTandem( 'model' ) ),
      model => new SpectraScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the ScreenIcon for this Screen.
 */
function createScreenIcon(): ScreenIcon {

  const dataPoints = [
    new SpectrometerDataPoint( 410, 8 ),
    new SpectrometerDataPoint( 434, 10 ),
    new SpectrometerDataPoint( 486, 15 ),
    new SpectrometerDataPoint( 656, 12 )
  ];
  const dataPointsProperty = new Property( dataPoints );
  const icon = new VisibleEmissionChart( dataPointsProperty, 150, {
    hasTickMarks: false,
    hasAxisLabel: false
  } );

  return new ScreenIcon( icon, {
    maxIconWidthProportion: 0.85,
    maxIconHeightProportion: 0.85,
    fill: MOTHAColors.spectrometerFillProperty
  } );
}

modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );