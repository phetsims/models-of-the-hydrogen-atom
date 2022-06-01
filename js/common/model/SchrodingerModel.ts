// Copyright 2019-2022, University of Colorado Boulder

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
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtomModel, { HydrogenAtomModelOptions } from './HydrogenAtomModel.js';

type SelfOptions = {};

export type SchrodingerModelOptions = SelfOptions & StrictOmit<HydrogenAtomModelOptions, 'hasTransitionWavelengths'>;

export default class SchrodingerModel extends HydrogenAtomModel {

  constructor( providedOptions: SchrodingerModelOptions ) {

    const options = optionize<SchrodingerModelOptions, SelfOptions, HydrogenAtomModelOptions>()( {

      // HydrogenAtomModelOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.schrodinger, schrodingerButton_png, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );