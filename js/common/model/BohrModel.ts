// Copyright 2019-2022, University of Colorado Boulder

/**
 * BohrModel is a predictive model that models the hydrogen atom as TODO
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

import bohrButton_png from '../../../images/bohrButton_png.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtomModel, { HydrogenAtomModelOptions } from './HydrogenAtomModel.js';

type SelfOptions = {};

type BohrModelOptions = SelfOptions & Omit<HydrogenAtomModelOptions, 'hasTransitionWavelengths'>;

export default class BohrModel extends HydrogenAtomModel {

  constructor( providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomModelOptions>()( {

      // HydrogenAtomModelOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.bohr, bohrButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );