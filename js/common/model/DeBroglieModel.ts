// Copyright 2019-2022, University of Colorado Boulder

/**
 * DeBroglieModel is a predictive model that models the hydrogen atom as TODO
 * While PhET typically does not name model elements with a 'Model' suffix, we're using the terminology that appears
 * in the literature.
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
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';

type SelfOptions = {};

type DeBroglieModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class DeBroglieModel extends HydrogenAtom {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.deBroglie, deBroglieButton_png, zoomedInBox, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );