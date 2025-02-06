// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerQuantumNumbers is the set of quantum numbers (n,l,m) that describe a wavefunction for the electron.
 * In the context of the Schrodinger model, this is also referred to as 'the electron state' or 'the state'.
 *
 * For a given set of quantum numbers, each principal shell (n) has a fixed number of subshells (n,l), and
 * each subshell has a fixed number of orbitals (n,l,m).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import chooseWeightedValue, { WeightedValue } from './chooseWeightedValue.js';
import QuantumElectron from './QuantumElectron.js';

/*
 * This array defines the transition strengths for n (the primary quantum number) to lower values of n.
 * Values were specified in the design document for the Java version; see page 20 of doc/java-version/hydrogen-atom.pdf.
 * Note that the table indexing is zero-based, while n is 1-based.
 * For example, TRANSITION_STRENGTHS[5][0] is the transition strength from n=6 to n=1.
 */
const TRANSITION_STRENGTHS = [
  [], // There are no states lower than n = 1.
  [ 12.53 ], // 2 -> 1
  [ 3.34, 0.87 ], // 3 -> 1, 3 -> 2
  [ 1.36, 0.24, 0.07 ], // 4 -> 1, 4 -> 2, 4 -> 3
  [ 0.69, 0.11, 0, 0.04 ], // 5 -> 1, 5 -> 2, 5 -> 3, 5 -> 4
  [ 0.39, 0.06, 0.02, 0, 0 ] // 6 -> 1, 6 -> 2, 6 -> 3, 6 -> 4, 6 -> 5
];
assert && assert( TRANSITION_STRENGTHS.length === QuantumElectron.NUMBER_OF_STATES );
assert && assert( _.every( TRANSITION_STRENGTHS, ( entry, index ) => entry.length === index ) );

// This should match STATE_SCHEMA, but with JavaScript types.
type SchrodingerQuantumNumbersStateObject = {
  n: number;
  l: number;
  m: number;
};

// This should match SchrodingerQuantumNumbersStateObject, but with IOTypes.
const STATE_SCHEMA = {
  n: NumberIO,
  l: NumberIO,
  m: NumberIO
};

export default class SchrodingerQuantumNumbers {

  // Principal quantum number:
  // * n is an integer in the range [1,6].
  // * Indicates the energy of the electron and its average relative distance from the nucleus.
  // * As n increases, so does the average distance of the electron from the nucleus.
  // * All wavefunctions that have the same value of n are said to constitute a principal shell.
  // * The principal quantum number n corresponds to the n used by Bohr to describe electron orbits
  //   and by Rydberg to describe atomic energy levels.
  public readonly n: number;

  // Azimuthal quantum number:
  // * l is an integer in the range [0,n-1].
  // * When a state transition occurs, abs(l-l') must be 1.
  // * Describes the shape of the region of space occupied by an electron.
  // * All wavefunctions that have the same values of both n and l form a subshell.
  // * The regions of space occupied by electrons in the same subshell usually have the same shape,
  //   but they are oriented differently in space.
  public readonly l: number;

  // Magnetic quantum number:
  // * m is an integer in the range [-l,l].
  // * When a state transition occurs, m-m' must be -1, 0, or 1.
  // * Describes the orientation of the region of space occupied by an electron with respect to an applied magnetic field.
  public readonly m: number;

  public constructor( n: number, l: number, m: number ) {
    assert && assert( SchrodingerQuantumNumbers.isValidState( n, l, m ), `invalid state: (${n},${l},${m})` );
    this.n = n;
    this.l = l;
    this.m = m;
  }

  /**
   * For debugging and logging only. Do not rely on the format of this string.
   * @typescript-eslint/no-base-to-string
   */
  public toString(): string {
    return `(${this.n},${this.l},${this.m})`;
  }

  public equals( nlm: SchrodingerQuantumNumbers ): boolean {
    return ( nlm.n === this.n ) && ( nlm.l === this.l ) && ( nlm.m === this.m );
  }

  /**
   * Gets the next (n,l,m) state for a new value of n, based on the current state. Values for l and m are chosen
   * according to state transition rules.
   */
  public getNextState( nNext: number ): SchrodingerQuantumNumbers {
    assert && assert( SchrodingerQuantumNumbers.isValid_n( nNext ), `invalid nNext=${nNext}` );
    assert && assert( nNext !== this.n, `Next n must be different from the current n: ${nNext}` );

    // Compute values for l and m.
    const lNext = this.choose_l( nNext );
    const mNext = this.choose_m( nNext, lNext );
    let nlmNext = new SchrodingerQuantumNumbers( nNext, lNext, mNext );

    // Verify that the transition is valid.
    const valid = isaValidTransition( this, nlmNext );
    assert && assert( valid, `Invalid transition: (n,l,m) = ${this.toString()} -> ${nNext.toString()}` );
    if ( !valid ) {
      nlmNext = new SchrodingerQuantumNumbers( 1, 0, 0 ); // Fallback, if running without assertions.
    }

    return nlmNext;
  }

  /**
   * Chooses a lower value for n, based on the current values of n and l.
   * The possible values of n are limited by the current value of l, since abs(l-l') must be 1.
   * The probability of each possible n transition is determined by its transition strength.
   *
   * @returns n, null if there is no valid transition
   */
  public chooseLower_n(): number | null {

    const n = this.n;
    const l = this.l;
    let nNext: number | null = null;

    if ( n === 1 ) {
      return null; // There is no state that is lower than (1,0,0)
    }
    else if ( n === 2 ) {
      if ( l === 0 ) {
        return null; // Transition from (2,0,?) to (1,0,?) cannot satisfy the abs(l-l')=1 rule.
      }
      else {
        assert && assert( l === 1, `unexpected value l=${l}` );
        nNext = 1; // The only transition from (2,1,?) is (1,0,0)
      }
    }
    else if ( n > 2 ) {

      // Determine the possible range of n.
      const nMax = n - 1;
      let nMin = Math.max( l, 1 );
      if ( l === 0 ) {
        nMin = 2; // Transition from (n,0,?) to (1,0,?) cannot satisfy the abs(l-l')=1 rule
      }

      // Get the strengths for each possible transition.
      const numberOfEntries = nMax - nMin + 1;
      const weightedValues: WeightedValue[] = [];
      let strengthSum = 0;
      for ( let i = 0; i < numberOfEntries; i++ ) {
        const nValue = nMin + i;
        const transitionStrength = TRANSITION_STRENGTHS[ n - 1 ][ nValue - 1 ];
        weightedValues.push( { value: nValue, weight: transitionStrength } );
        strengthSum += transitionStrength;
      }

      // All transitions had zero strength, so none are possible.
      if ( strengthSum === 0 ) {
        return null;
      }

      // Choose a transition.
      const value = chooseWeightedValue( weightedValues );
      if ( value === null ) {
        return null;
      }
      nNext = value;
    }

    assert && assert( nNext === null || ( SchrodingerQuantumNumbers.isValid_n( nNext ) && nNext < n ),
      `invalid nNext: ${this.toString()} -> (${nNext},?,?)` );
    return nNext;
  }

  /**
   * Chooses a new value for l, based on the next value of n and current value of l.
   * The new value l' must be in the range [0,n-1], and abs(l-l') must be 1.
   */
  private choose_l( nNext: number ): number {
    assert && assert( SchrodingerQuantumNumbers.isValid_n( nNext ), `invalid nNext=${nNext}` );

    const l = this.l;
    let lNext;

    if ( l === 0 ) {
      lNext = 1;
    }
    else if ( l === nNext ) {
      lNext = l - 1;
    }
    else if ( l === nNext - 1 ) {
      lNext = l - 1;
    }
    else {
      if ( dotRandom.nextBoolean() ) {
        lNext = l + 1;
      }
      else {
        lNext = l - 1;
      }
    }

    assert && assert( Number.isInteger( lNext ), `lNext must be an integer: lNext=${lNext}` );
    assert && assert( lNext >= 0 && lNext <= nNext - 1, `lNext must be in the range [0,nNext-1]: ${this.toString()}) -> (${nNext},${lNext},?)` );
    assert && assert( Math.abs( l - lNext ) === 1, `(l - lNext) must be 1 or -1: ${this.toString()} -> (${nNext},${lNext},?)` );
    assert && assert( lNext < 3, `lNext is theoretically possible, but unexpected in practice: ${this.toString()} -> (${nNext},${lNext},?)` );
    return lNext;
  }

  /**
   * Chooses a new value for m, based on the next value of l and the current value of m.
   * The new value m' must be in the range [-l,l], and m-m' must be in the set [-1,0,1].
   */
  private choose_m( nNext: number, lNext: number ): number {
    assert && assert( Number.isInteger( lNext ) && lNext >= 0 && lNext <= QuantumElectron.MAX_STATE - 1, `invalid lNext=${lNext}` );

    const m = this.m;
    let mNext;

    if ( lNext === 0 ) {
      mNext = 0;
    }
    else if ( m > lNext ) {
      mNext = lNext;
    }
    else if ( m < -lNext ) {
      mNext = -lNext;
    }
    else if ( m === lNext ) {
      const a = dotRandom.nextInt( 2 );
      if ( a === 0 ) {
        mNext = m;
      }
      else {
        mNext = m - 1;
      }
    }
    else if ( m === -lNext ) {
      const a = dotRandom.nextInt( 2 );
      if ( a === 0 ) {
        mNext = m;
      }
      else {
        mNext = m + 1;
      }
    }
    else {
      const a = dotRandom.nextInt( 3 );
      if ( a === 0 ) {
        mNext = m + 1;
      }
      else if ( a === 1 ) {
        mNext = m - 1;
      }
      else {
        mNext = m;
      }
    }

    assert && assert( Number.isInteger( mNext ), `mNext must be an integer: mNew=${mNext}` );
    assert && assert( mNext >= -lNext && mNext <= lNext, `mNext must be in the range [-l,l]: ${this.toString()} -> (${nNext},${lNext},${mNext}` );
    assert && assert( [ -1, 0, 1 ].includes( m - mNext ), `(m - mNext) must be -1, 0, or 1: ${this.toString()} -> (${nNext},${lNext},${mNext}` );
    return mNext;
  }

  /**
   * Determines whether (n,l,m) describes a valid state.
   */
  public static isValidState( n: number, l: number, m: number ): boolean {
    return SchrodingerQuantumNumbers.isValid_n( n ) &&
           Number.isInteger( l ) && ( l >= 0 && l <= n - 1 ) &&
           Number.isInteger( m ) && ( m >= -l && m <= l );
  }

  /**
   * Validates n, the principal quantum number.
   */
  public static isValid_n( n: number ): boolean {
    return Number.isInteger( n ) && n >= QuantumElectron.GROUND_STATE && n <= QuantumElectron.MAX_STATE;
  }

  /**
   * Serializes this instance of SchrodingerQuantumNumbers.
   */
  private toStateObject(): SchrodingerQuantumNumbersStateObject {
    return {
      n: this.n,
      l: this.l,
      m: this.m
    };
  }

  /**
   * Deserializes an instance of SchrodingerQuantumNumbers.
   */
  private static fromStateObject( stateObject: SchrodingerQuantumNumbersStateObject ): SchrodingerQuantumNumbers {
    return new SchrodingerQuantumNumbers( stateObject.n, stateObject.l, stateObject.m );
  }

  /**
   * SchrodingerQuantumNumbersIO handles serialization of a SchrodingerQuantumNumbers. It implements 'Data Type Serialization'
   * as described in https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization.
   */
  public static readonly SchrodingerQuantumNumbersIO = new IOType<SchrodingerQuantumNumbers, SchrodingerQuantumNumbersStateObject>( 'SchrodingerQuantumNumbersIO', {
    valueType: SchrodingerQuantumNumbers,
    stateSchema: STATE_SCHEMA,
    toStateObject: ( dataPoint: SchrodingerQuantumNumbers ) => dataPoint.toStateObject(),
    fromStateObject: ( stateObject: SchrodingerQuantumNumbersStateObject ) => SchrodingerQuantumNumbers.fromStateObject( stateObject ),
    documentation: 'The quantum numbers (n,l,m) that describe a wavefunction for the electron.'
  } );
}

/**
 * Checks state transition rules to see if a proposed transition is valid.
 */
function isaValidTransition( nlmOld: SchrodingerQuantumNumbers, nlmNew: SchrodingerQuantumNumbers ): boolean {
  return SchrodingerQuantumNumbers.isValidState( nlmOld.n, nlmOld.l, nlmOld.m ) &&
         SchrodingerQuantumNumbers.isValidState( nlmNew.n, nlmNew.l, nlmNew.m ) &&
         ( nlmOld.n !== nlmNew.n ) &&
         ( Math.abs( nlmOld.l - nlmNew.l ) === 1 ) &&
         ( Math.abs( nlmOld.m - nlmNew.m ) <= 1 );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerQuantumNumbers', SchrodingerQuantumNumbers );