// Copyright 2019-2022, University of Colorado Boulder

/**
 * ClassicalSolarSystemModel is a predictive model that models the hydrogen atom as TODO
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

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import classicalSolarSystemButton_png from '../../../images/classicalSolarSystemButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';

type SelfOptions = {};

type ClassicalSolarSystemModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class ClassicalSolarSystemModel extends HydrogenAtom {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: ClassicalSolarSystemModelOptions ) {

    const options = optionize<ClassicalSolarSystemModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: false
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.classicalSolarSystem, classicalSolarSystemButton_png, zoomedInBox, options );
  }

  public override step( dt: number ): void {
    //TODO
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );