// Copyright 2016-2022, University of Colorado Boulder

/**
 * SpectraScreen is the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../phet-core/js/optionize.js';
import MOTHAScreen, { MOTHAScreenOptions } from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';
import SpectraModel from './model/SpectraModel.js';
import SpectraScreenView from './view/SpectraScreenView.js';

type SelfOptions = {};

type SpectraScreenOptions = SelfOptions & Omit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class SpectraScreen extends MOTHAScreen<SpectraModel, SpectraScreenView> {

  constructor( providedOptions: SpectraScreenOptions ) {

    const options = optionize<SpectraScreenOptions, SelfOptions, MOTHAScreenOptions>()( {
      name: modelsOfTheHydrogenAtomStrings.screen.spectra
      //TODO add homeScreenIcon
    }, providedOptions );

    super(
      () => new SpectraModel( {
        tandem: options.tandem.createTandem( 'model' )
      } ),
      ( model: SpectraModel ) => new SpectraScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );