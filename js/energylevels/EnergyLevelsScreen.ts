// Copyright 2016-2023, University of Colorado Boulder

/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';
import MOTHAScreen, { MOTHAScreenOptions } from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from './model/EnergyLevelsModel.js';
import EnergyLevelsScreenView from './view/EnergyLevelsScreenView.js';
import energyLevelsScreenIcon_png from '../../images/energyLevelsScreenIcon_png.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

type EnergyLevelsScreenOptions = SelfOptions & StrictOmit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class EnergyLevelsScreen extends MOTHAScreen<EnergyLevelsModel, EnergyLevelsScreenView> {

  public constructor( providedOptions: EnergyLevelsScreenOptions ) {

    const options = optionize<EnergyLevelsScreenOptions, SelfOptions, MOTHAScreenOptions>()( {
      name: ModelsOfTheHydrogenAtomStrings.screen.energyLevelsStringProperty,
      homeScreenIcon: new ScreenIcon( new Image( energyLevelsScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      isDisposable: false
    }, providedOptions );

    super(
      () => new EnergyLevelsModel( options.tandem.createTandem( 'model' ) ),
      model => new EnergyLevelsScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );