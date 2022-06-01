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
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';

type SelfOptions = {};

export type SchrodingerModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class SchrodingerModel extends HydrogenAtom {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: SchrodingerModelOptions ) {

    const options = optionize<SchrodingerModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.schrodinger, schrodingerButton_png, zoomedInBox, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );