// Copyright 2016-2020, University of Colorado Boulder

/**
 * SpectraScreen is the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAScreen from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtomStrings from '../modelsOfTheHydrogenAtomStrings.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import SpectraModel from './model/SpectraModel.js';
import SpectraScreenView from './view/SpectraScreenView.js';

const screenSpectraString = modelsOfTheHydrogenAtomStrings.screen.spectra;

class SpectraScreen extends MOTHAScreen {

  constructor() {

    const options = {
      name: screenSpectraString
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