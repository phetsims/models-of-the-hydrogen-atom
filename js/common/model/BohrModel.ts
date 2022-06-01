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
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';

type SelfOptions = {};

type BohrModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class BohrModel extends HydrogenAtom {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.bohr, bohrButton_png, zoomedInBox, options );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );