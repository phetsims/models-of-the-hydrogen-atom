// Copyright 2019-2022, University of Colorado Boulder

/**
 * BohrModel is a predictive model of the hydrogen atom. (While PhET typically does not name model elements with
 * a 'Model' suffix, we're using the terminology that appears in the literature.)
 *
 * Physical representation:
 * Electron orbiting a proton. Each orbit corresponds to a different electron state. See createOrbitRadii for details
 * on how orbit radii are calculated.
 *
 * Collision behavior:
 * Alpha particles are repelled by the electron using a Rutherford Scattering algorithm. Photons may be absorbed
 * if they collide with the electron.
 *
 * Absorption behavior:
 * Photons that match the transition wavelength of the electron's state are absorbed with some probability. Other
 * photons are not absorbed or affected.
 *
 * Emission behavior:
 * Spontaneous emission of a photon takes the electron to a lower state, and the photon emitted has the transition
 * wavelength that corresponds to the current and new state. Transition to each lower state is equally likely.
 * Stimulated emission of a photon occurs when a photon hits the electron, and the photon's wavelength corresponds
 * to a wavelength that could have been absorbed in a lower state.  In this case, the colliding photon is not absorbed,
 * but a new photon is emitted with the same wavelength, and the electron moves to the lower state.
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

// Radius of each orbit supported by this model. These are distorted to fit in zoomedInBox.
const ORBIT_RADII = [ 15, 44, 81, 124, 174, 233 ];

type SelfOptions = {};

export type BohrModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class BohrModel extends HydrogenAtom {

  constructor( zoomedInBox: ZoomedInBox, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: true
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.bohr, bohrButton_png, zoomedInBox, options );
  }

  public override step( dt: number ): void {
    //TODO
  }

  /**
   * Gets the number of electron states that the model supports.
   * For this model, it's the same as the number of orbits.
   */
  public static override getNumberOfStates(): number {
    return ORBIT_RADII.length;
  }

  /**
   * Gets the set of wavelengths that cause a state transition. With white light, the light prefers to fire
   * these wavelengths so that the probability of seeing a photon absorbed is higher.
   */
  public static getTransitionWavelengths( minWavelength: number, maxWavelength: number ): number[] {
    assert && assert( minWavelength < maxWavelength );

    // Create the set of wavelengths, include only those between min and max.
    const wavelengths = [];
    const n = BohrModel.getNumberOfStates();
    const g = HydrogenAtom.GROUND_STATE;
    for ( let i = g; i < g + n - 1; i++ ) {
      for ( let j = i + 1; j < g + n; j++ ) {
        const wavelength = this.getWavelengthAbsorbed( i, j );
        if ( wavelength >= minWavelength && wavelength <= maxWavelength ) {
          wavelengths.push( wavelength );
        }
      }
    }
    return wavelengths;
  }

  /**
   * Gets the wavelength that must be absorbed for the electron to transition from state nOld to state nNew,
   * where nOld < nNew. This algorithm assumes that the ground state is 1.
   */
  public static getWavelengthAbsorbed( nOld: number, nNew: number ): number {
    assert && assert( Number.isInteger( nOld ) && Number.isInteger( nNew ) );
    assert && assert( HydrogenAtom.GROUND_STATE === 1 );
    assert && assert( nOld >= HydrogenAtom.GROUND_STATE );
    assert && assert( nOld < nNew );
    assert && assert( nNew <= HydrogenAtom.GROUND_STATE + BohrModel.getNumberOfStates() );
    return 1240.0 / ( 13.6 * ( ( 1.0 / ( nOld * nOld ) ) - ( 1.0 / ( nNew * nNew ) ) ) );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );