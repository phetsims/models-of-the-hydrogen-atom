// Copyright 2016-2022, University of Colorado Boulder

/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../phet-core/js/optionize.js';
import MOTHAScreen, { MOTHAScreenOptions } from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from './model/EnergyLevelsModel.js';
import EnergyLevelsScreenView from './view/EnergyLevelsScreenView.js';

type SelfOptions = {};

type EnergyLevelsScreenOptions = SelfOptions & Omit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class EnergyLevelsScreen extends MOTHAScreen<EnergyLevelsModel, EnergyLevelsScreenView> {

  constructor( providedOptions: EnergyLevelsScreenOptions ) {

    const options = optionize<EnergyLevelsScreenOptions, SelfOptions, MOTHAScreenOptions>()( {
      name: modelsOfTheHydrogenAtomStrings.screen.energyLevels
      //TODO add homeScreenIcon
    }, providedOptions );

    super(
      () => new EnergyLevelsModel( {
        tandem: options.tandem.createTandem( 'model' )
      } ),
      ( model: EnergyLevelsModel ) => new EnergyLevelsScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );