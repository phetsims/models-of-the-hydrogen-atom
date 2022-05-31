// Copyright 2019-2022, University of Colorado Boulder

/**
 * DeBroglieModel is a predictive model that models the hydrogen atom as TODO
 *
 * Physical representation:
 * TODO
 *
 * Collision behavior:
 * TODO
 *
 * Absorption behavior:
 * TODO
 *
 * Emission behavior:
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import deBroglieButton_png from '../../../images/deBroglieButton_png.js';
import OmitStrict from '../../../../phet-core/js/types/OmitStrict.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtomModel, { HydrogenAtomModelOptions } from './HydrogenAtomModel.js';

type SelfOptions = {};

type DeBroglieModelOptions = SelfOptions & OmitStrict<HydrogenAtomModelOptions, 'hasTransitionWavelengths'>;

export default class DeBroglieModel extends HydrogenAtomModel {

  constructor( providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, HydrogenAtomModelOptions>()( {

      // HydrogenAtomModelOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.deBroglie, deBroglieButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );