// Copyright 2019-2022, University of Colorado Boulder

/**
 * DeBroglieModel is a predictive model of the hydrogen atom.
 *
 * DeBroglieModel is identical to BohrModel, but has different visual representations. The different visual
 * representations mean that it requires different methods of handling collision detection and determining electron
 * position. The algorithms for collision detection and calculation of electron position differ greatly for 2D and 3D
 * views. Therefore, this model needs to know something about the view in order to make things look right in 3D. So
 * this model cannot be shown in both 2D and 3D views simultaneously. There are undoubtedly ways to do this, but this
 * simulation does not require multiple simultaneous views of the model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import deBroglieButton_png from '../../../images/deBroglieButton_png.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';

type SelfOptions = EmptyObjectType;

type DeBroglieModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

//TODO extends BohrModel
export default class DeBroglieModel extends HydrogenAtom {

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.deBroglie, deBroglieButton_png, zoomedInBox, options );
  }

  public override step( dt: number ): void {
    //TODO
  }

  public override movePhoton( photon: Photon, dt: number ): void {
    //TODO
    photon.move( dt );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieModel', DeBroglieModel );