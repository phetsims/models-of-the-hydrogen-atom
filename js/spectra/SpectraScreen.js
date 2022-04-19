// Copyright 2016-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * SpectraScreen is the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAScreen from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';
import SpectraModel from './model/SpectraModel.js';
import SpectraScreenView from './view/SpectraScreenView.js';

class SpectraScreen extends MOTHAScreen {

  constructor() {

    const options = {
      name: modelsOfTheHydrogenAtomStrings.screen.spectra
      //TODO add homeScreenIcon
    };

    super(
      () => new SpectraModel(),
      model => new SpectraScreenView( model ),
      options
    );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );
export default SpectraScreen;