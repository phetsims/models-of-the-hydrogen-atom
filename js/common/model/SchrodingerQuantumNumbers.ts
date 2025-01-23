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
import MOTHAConstants from '../MOTHAConstants.js';
import chooseWeightedValue, { WeightedValue } from './chooseWeightedValue.js';

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
assert && assert( TRANSITION_STRENGTHS.length === MOTHAConstants.NUMBER_OF_STATES );
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
    assert && assert( SchrodingerQuantumNumbers.isValidState( n, l, m ), `invalid wavefunction: (${n},${l},${m}` );
    this.n = n;
    this.l = l;
    this.m = m;
  }

  public equals( quantumNumbers: SchrodingerQuantumNumbers ): boolean {
    return ( quantumNumbers.n === this.n ) && ( quantumNumbers.l === this.l ) && ( quantumNumbers.m === this.m );
  }

  /**
   * Chooses a lower value for n, based on the current values of n and l.
   * The possible values of n are limited by the current value of l, since abs(l-l') must be 1.
   * The probability of each possible n transition is determined by its transition strength.
   *
   * @returns n, null if there is no valid transition
   */
  public chooseLower_n(): number | null {
    return chooseLower_n( this.n, this.l );
  }

  /**
   * Gets the next state for a new value of n.
   * Randomly chooses the values for l and m, according to state transition rules.
   */
  public getNextState( nNext: number ): SchrodingerQuantumNumbers {
    assert && assert( Number.isInteger( nNext ) && nNext >= MOTHAConstants.GROUND_STATE && nNext <= MOTHAConstants.MAX_STATE, `invalid nNext=${nNext}` );

    // Compute the next wavefunction.
    const lNext = choose_l( nNext, this.l );
    const mNext = choose_m( lNext, this.m );
    let fNext = new SchrodingerQuantumNumbers( nNext, lNext, mNext );

    // Verify that no transition rules have been broken.
    const valid = isaValidTransition( this, fNext );
    assert && assert( valid, `Buggy transition rules resulted in (${this.n},${this.l},${this.m}) -> (${nNext},${lNext},${mNext})` );
    if ( !valid ) {
      fNext = new SchrodingerQuantumNumbers( 1, 0, 0 ); // Fallback, if running without assertions.
    }

    return fNext;
  }

  /**
   * Determines whether (n,l,m) describes a valid state.
   */
  public static isValidState( n: number, l: number, m: number ): boolean {
    return Number.isInteger( n ) &&
           Number.isInteger( l ) &&
           Number.isInteger( m ) &&
           ( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.MAX_STATE ) &&
           ( l >= 0 && l <= n - 1 ) &&
           ( m >= -l && m <= l );
  }

  /**
   * Serializes this SchrodingerQuantumNumbers.
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
 * Chooses a lower value for n, based on the current values of n and l.
 * The possible values of n are limited by the current value of l, since abs(l-l') must be 1.
 * The probability of each possible n transition is determined by its transition strength.
 *
 * @returns n, null if there is no valid transition
 */
function chooseLower_n( n: number, l: number ): number | null {
  assert && assert( Number.isInteger( n ) && n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.MAX_STATE, `invalid n=${n}` );
  assert && assert( Number.isInteger( l ) && l >= 0 && l <= n - 1, `invalid l=${l}, n=${n}` );

  let nNext: number | null = null;

  if ( n === 1 ) {
    // There is no state that is lower than (1,0,0)
    return null;
  }
  else if ( n === 2 ) {
    //TODO Why does n=2 need to be a special case?
    if ( l === 0 ) {

      // transition from (2,0,?) to (1,0,?) cannot satisfy the abs(l-l')=1 rule
      return null;
    }
    else {

      // the only transition from (2,1,?) is (1,0,0)
      nNext = 1;
    }
  }
  else if ( n > 2 ) {

    // determine the possible range of n
    const nMax = n - 1;
    let nMin = Math.max( l, 1 );
    if ( l === 0 ) {

      // transition from (n,0,0) to (1,?,?) cannot satisfy the abs(l-l')=1 rule
      nMin = 2;
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

  assert && assert( nNext === null || ( Number.isInteger( nNext ) && nNext >= MOTHAConstants.GROUND_STATE && nNext < n ), `invalid nNext=${nNext}` );
  return nNext;
}

/**
 * Chooses a new value for l, based on the next value of n and current value of l.
 * The new value l' must be in the range [0,n-1], and abs(l-l') must be 1.
 */
function choose_l( nNext: number, l: number ): number {
  assert && assert( Number.isInteger( nNext ) && nNext >= MOTHAConstants.GROUND_STATE && nNext <= MOTHAConstants.MAX_STATE, `invalid nNext=${nNext}` );
  assert && assert( Number.isInteger( l ), `invalid l=${l}` );

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
  assert && assert( lNext >= 0 && lNext <= nNext - 1, `lNext must be in the range [0,nNext-1]: nNext=${nNext} l=${l} lNext=${lNext}` );
  assert && assert( Math.abs( lNext - l ) === 1, `(lNext - l) must be 1 or -1: l=${l} lNext=${lNext}` );
  return lNext;
}

/**
 * Chooses a value for m, based on the next value of l and the current value of m.
 * The new value m' must be in the range [-l,l], and m-m' must be in the set [-1,0,1].
 */
function choose_m( lNext: number, m: number ): number {
  assert && assert( Number.isInteger( lNext ) && lNext >= 0 && lNext <= MOTHAConstants.MAX_STATE - 1, `invalid lNext=${lNext}` );
  assert && assert( Number.isInteger( m ), `invalid m=${m}` );

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
  assert && assert( mNext >= -lNext && mNext <= lNext, `mNext must be in the range [-l,l]: mNext=${mNext}, lNext=${lNext}` );
  assert && assert( [ -1, 0, 1 ].includes( mNext - m ), `(mNext - m) must be -1, 0, or 1: m=${m} mNext=${mNext}` );
  return mNext;
}

/**
 * Checks state transition rules to see if a proposed transition is valid.
 */
function isaValidTransition( fOld: SchrodingerQuantumNumbers, fNew: SchrodingerQuantumNumbers ): boolean {
  return ( fOld.n !== fNew.n ) && ( Math.abs( fOld.l - fNew.l ) === 1 ) && ( Math.abs( fOld.m - fNew.m ) <= 1 );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerQuantumNumbers', SchrodingerQuantumNumbers );