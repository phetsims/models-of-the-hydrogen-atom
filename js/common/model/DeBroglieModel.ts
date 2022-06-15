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
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import BohrModel, { BohrModelOptions } from './BohrModel.js';

type SelfOptions = EmptyObjectType;

export type DeBroglieModelOptions = SelfOptions & BohrModelOptions;

export default class DeBroglieModel extends BohrModel {

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: DeBroglieModelOptions ) {

    const options = optionize<DeBroglieModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // DeBroglieModelOptions
      displayName: modelsOfTheHydrogenAtomStrings.deBroglie,
      iconHTMLImageElement: deBroglieButton_png
    }, providedOptions );

    super( zoomedInBox, options );
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