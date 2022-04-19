// Copyright 2019-2021, University of Colorado Boulder

/**
 * SchrodingerModel is a predictive model that models the hydrogen atom as TODO
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

import schrodingerButton_png from '../../../images/schrodingerButton_png.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import PredictiveModel, { PredictiveModelOptions } from './PredictiveModel.js';

type SelfOptions = {};

type SchrodingerModelOptions = SelfOptions & Omit<PredictiveModelOptions, 'hasTransitionWavelengths'>;

export default class SchrodingerModel extends PredictiveModel {

  constructor( providedOptions?: SchrodingerModelOptions ) {

    const options = optionize<SchrodingerModelOptions, SelfOptions, PredictiveModelOptions>( {
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.schrodinger, schrodingerButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );