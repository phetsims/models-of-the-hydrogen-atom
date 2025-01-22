// Copyright 2024-2025, University of Colorado Boulder

/**
 * PhotonAbsorptionModel maps from absorption/emission wavelengths to electron state (n) transitions.
 * This model is relevant for the quantum models of the hydrogen atom: Bohr, de Broglie, and Schrodinger.
 * A singleton instance is used throughout the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Utils from '../../../../dot/js/Utils.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';

type StateTransition = {
  n1: number;
  n2: number; // n2 > n1
};

class PhotonAbsorptionModel {

  private readonly map: Map<number, StateTransition>;

  public constructor() {

    // Instantiate and populate the map.
    this.map = new Map<number, StateTransition>();
    for ( let n1 = MOTHAConstants.GROUND_STATE; n1 < MOTHAConstants.MAX_STATE; n1++ ) {
      for ( let n2 = MOTHAConstants.MAX_STATE; n2 > n1; n2-- ) {
        const wavelength = computeAbsorptionWavelength( n1, n2 );
        const transition = { n1: n1, n2: n2 };
        this.map.set( wavelength, transition );
      }
    }
  }

  /**
   * Gets the complete set of absorption/emission wavelengths.
   */
  public getWavelengths(): number[] {
    return [ ...this.map.keys() ];
  }

  /**
   * Gets the absorption wavelengths that are in the visible spectrum.
   */
  public getVisibleWavelengths(): number[] {
    return Array.from( this.map.keys() ).filter( wavelength => VisibleColor.isVisibleWavelength( wavelength ) );
  }

  /**
   * Gets the absorption wavelengths that are in the UV spectrum.
   */
  public getUVWavelengths(): number[] {
    return Array.from( this.map.keys() ).filter( wavelength => wavelength < VisibleColor.MIN_WAVELENGTH );
  }

  /**
   * Gets the absorption wavelengths that are in the IR spectrum.
   */
  public getIRWavelengths(): number[] {
    return Array.from( this.map.keys() ).filter( wavelength => wavelength > VisibleColor.MAX_WAVELENGTH );
  }

  /**
   * Gets the wavelengths that can be absorbed in state n.
   */
  public getAbsorptionWavelengths( n: number ): number[] {
    assert && assert( Number.isInteger( n ), `n should be an integer: ${n}` );
    assert && assert( n >= MOTHAConstants.GROUND_STATE && n < MOTHAConstants.MAX_STATE, `invalid n=${n}` );

    const wavelengths: number[] = [];
    for ( const [ wavelength, transition ] of this.map ) {
      if ( n === transition.n1 ) {
        wavelengths.push( wavelength );
      }
    }

    assert && assert( wavelengths.length > 0, 'Expected to have one or more absorption wavelengths.' );
    assert && assert( _.every( wavelengths, wavelength => Number.isInteger( wavelength ) ), 'All wavelengths must be integer values.' );
    return wavelengths;
  }

  /**
   * Gets the wavelength (in nm) that results in a transition between 2 values of n.
   */
  public getTransitionWavelength( n1: number, n2: number ): number {
    assert && assert( n1 !== n2, `Transition cannot occur between the same value of n: ${n1}` );
    if ( n2 > n1 ) {
      return this.getAbsorptionWavelength( n1, n2 );
    }
    else {
      return this.getEmissionWavelength( n1, n2 );
    }
  }

  /**
   * Gets the wavelength that is absorbed when the electron transitions from state n1 to state n2, where n2 > n1.
   */
  public getAbsorptionWavelength( n1: number, n2: number ): number {
    // It's simpler/faster to compute the wavelength than to look it up in the map.
    const wavelength = computeAbsorptionWavelength( n1, n2 );
    assert && assert( this.map.get( wavelength ) );
    return wavelength;
  }

  /**
   * Gets the wavelength that is emitted when the electron transitions from n1 to n2, where n2 < n1.
   */
  public getEmissionWavelength( n1: number, n2: number ): number {
    return this.getAbsorptionWavelength( n2, n1 );
  }

  /**
   * Gets the transition for a specified wavelength. Returns null if no transition exists.
   */
  public getTransition( wavelength: number ): StateTransition | null {
    return this.map.get( wavelength ) || null;
  }

  /**
   * Gets the lower energy state for a current state and transition wavelength.
   * Returns null if there is no such state.
   */
  public getLowerStateForWavelength( nCurrent: number, wavelength: number ): number | null {
    let nNew: number | null = null;
    for ( let n = MOTHAConstants.GROUND_STATE; n < nCurrent && nNew === null; n++ ) {
      if ( wavelength === this.getAbsorptionWavelength( n, nCurrent ) ) {
        nNew = n;
      }
    }
    return nNew;
  }

  /**
   * Gets the higher energy state for a current state and transition wavelength.
   * Returns null if there is no such state.
   */
  public getHigherStateForWavelength( nCurrent: number, wavelength: number ): number | null {
    let nNew: number | null = null;
    for ( let n = nCurrent + 1; n <= MOTHAConstants.MAX_STATE && nNew === null; n++ ) {
      const transitionWavelength = this.getAbsorptionWavelength( nCurrent, n );
      if ( wavelength === transitionWavelength ) {
        nNew = n;
      }
    }
    return nNew;
  }
}

/**
 * Computes the wavelength that is absorbed when the electron transitions from state n1 to state n2, where n2 > n1.
 */
function computeAbsorptionWavelength( n1: number, n2: number ): number {
  assert && assert( MOTHAConstants.GROUND_STATE === 1 );
  assert && assert( Number.isInteger( n1 ) && n1 >= MOTHAConstants.GROUND_STATE, `bad n1=${n1}` );
  assert && assert( Number.isInteger( n2 ) && n2 <= MOTHAConstants.MAX_STATE, `bad n2=${n2}` );
  assert && assert( n1 < n2, `n1=${n1} must be < n2=${n2}` );

  // Rydberg formula, see doc/java-version/hydrogen-atom.pdf page 20.
  const wavelength = 1240 / ( 13.6 * ( ( 1 / ( n1 * n1 ) ) - ( 1 / ( n2 * n2 ) ) ) );

  // As a simplification to benefit PhET-iO, convert to an integer value.
  // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53.
  return Utils.toFixedNumber( wavelength, 0 );
}

// Singleton
const photonAbsorptionModel = new PhotonAbsorptionModel();

modelsOfTheHydrogenAtom.register( 'PhotonAbsorptionModel', PhotonAbsorptionModel );
export default photonAbsorptionModel;