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
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtomModel, { HydrogenAtomModelOptions } from './HydrogenAtomModel.js';
import ZoomedInBox from './ZoomedInBox.js';

type SelfOptions = {};

type DeBroglieModelOptions = SelfOptions & StrictOmit<HydrogenAtomModelOptions, 'hasTransitionWavelengths'>;

export default class DeBroglieModel extends HydrogenAtomModel {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, HydrogenAtomModelOptions>()( {

      // HydrogenAtomModelOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.deBroglie, deBroglieButton_png, zoomedInBox, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );