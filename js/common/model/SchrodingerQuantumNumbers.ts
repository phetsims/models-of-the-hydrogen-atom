// Copyright 2024, University of Colorado Boulder

/**
 * SchrodingerQuantumNumbers is the set of quantum numbers (n,l,m) that describe a wavefunction for the electron.
 * In the context of the Schrodinger model, this is also referred to as 'the electron state' or 'the state'.
 *
 * For a given set of quantum numbers, each principal shell (n) has a fixed number of subshells (n,l), and
 * each subshell has a fixed number of orbitals (n,l,m).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import MOTHAConstants from '../MOTHAConstants.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import ProbabilisticChooser, { ProbabilisticChooserEntry } from './ProbabilisticChooser.js';

//TODO Revise TRANSITION_STRENGTH_TABLE table to remove 'nonsensical' entries.
/*
 * This table defines the transition strengths for the primary state component (n).
 * Some entries in this table are nonsensical, but their strengths are zero, and it helps to have a symmetrical table.
 * This table was taken from the Java simulation design document.
 *
 * Note that the table indexing is zero-based, while transitions are 1-based.
 * Here's an example that shows how the table is indexed:
 * TRANSITION_STRENGTH_TABLE[5][0] is the transition strength from n=6 to n=1
 */
const TRANSITION_STRENGTH_TABLE = [
  [ 0, 0, 0, 0, 0 ],
  [ 12.53, 0, 0, 0, 0 ],
  [ 3.34, 0.87, 0, 0, 0 ],
  [ 1.36, 0.24, 0.07, 0, 0 ],
  [ 0.69, 0.11, 0, 0.04, 0 ],
  [ 0.39, 0.06, 0.02, 0, 0 ]
];
assert && assert( TRANSITION_STRENGTH_TABLE.length === MOTHAConstants.NUMBER_OF_STATES );

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
  // * Indicates the energy of the electron and its average relative distance from the nucleus.
  // * As n increases, so does the average distance of the electron from the nucleus.
  // * All wave functions that have the same value of n are said to constitute a principal shell.
  // * The principal quantum number n corresponds to the n used by Bohr to describe electron orbits and by Rydberg to
  //   describe atomic energy levels
  public readonly n: number;

  // Azimuthal quantum number:
  // * Describes the shape of the region of space occupied by an electron.
  // * All wave functions that have the same values of both n and l form a subshell.
  // * The regions of space occupied by electrons in the same subshell usually have the same shape, but they are
  //   oriented differently in space.
  public readonly l: number;

  // Magnetic quantum number:
  // * Describes the orientation of the region of space occupied by an electron with respect to an applied magnetic field.
  public readonly m: number;

  public constructor( n: number, l: number, m: number ) {
    assert && assert( SchrodingerQuantumNumbers.isValidState( n, l, m ), `invalid wavefunction: (${n},${l},${m}` );
    this.n = n;
    this.l = l;
    this.m = m;
  }

  /**
   * Chooses a lower value for n, based on the current values of n and l.
   * The possible values of n are limited by the current value of l, since abs(l-l') must be 1.
   * The probability of each possible n transition is determined by its transition strength.
   *
   * @returns n, -1 there is no valid transition
   */
  public chooseLower_n(): number {

    const n = this.n;
    const l = this.l;

    let nNew = -1;

    if ( n < 2 ) {
      // no state is lower than (1,0,0)
      return -1;
    }
    else if ( n === 2 ) {
      if ( l === 0 ) {

        // transition from (2,0,?) to (1,0,?) cannot satisfy the abs(l-l')=1 rule
        return -1;
      }
      else {

        // the only transition from (2,1,?) is (1,0,0)
        nNew = 1;
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
      const entries: ProbabilisticChooserEntry<number>[] = [];
      let strengthSum = 0;
      for ( let i = 0; i < numberOfEntries; i++ ) {
        const nValue = nMin + i;
        const transitionStrength = TRANSITION_STRENGTH_TABLE[ n - 1 ][ nValue - 1 ];
        entries.push( { value: nValue, weight: transitionStrength } );
        strengthSum += transitionStrength;
      }

      // all transitions had zero strength, none are possible
      if ( strengthSum === 0 ) {
        return -1;
      }

      // choose a transition
      const chooser = new ProbabilisticChooser( entries );
      const value = chooser.getNext();
      if ( value === null ) {
        return -1;
      }
      nNew = value;
    }

    return nNew;
  }

  /**
   * Gets the next state for a new value of n.
   * Randomly chooses the values for l and m, according to state transition rules.
   */
  public getNextState( nNext: number ): SchrodingerQuantumNumbers {

    // Compute the next wavefunction.
    const lNext = choose_l( nNext, this.l );
    const mNext = choose_m( lNext, this.m );
    let fNext = new SchrodingerQuantumNumbers( nNext, lNext, mNext );

    // Verify that no transition rules have been broken.
    const valid = isaValidTransition( this, fNext );
    if ( !valid ) {

      // There's a bug in the implementation of the transition rules.
      // Fall back to (n,l,m) = (1,0,0) if running without assertions.
      fNext = new SchrodingerQuantumNumbers( 1, 0, 0 );
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
 * Chooses a value for l, based on the current values of n and l.
 * The new value l' must be in [0,...n-1], and l-l' must be in [-1,1].
 */
function choose_l( n: number, l: number ): number {
  assert && assert( Number.isInteger( n ) );
  assert && assert( Number.isInteger( l ) );

  let lNew;

  if ( l === 0 ) {
    lNew = 1;
  }
  else if ( l === n ) {
    lNew = l - 1;
  }
  else if ( l === n - 1 ) {
    lNew = l - 1;
  }
  else {
    if ( dotRandom.nextBoolean() ) {
      lNew = l + 1;
    }
    else {
      lNew = l - 1;
    }
  }

  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Math.abs( lNew - l ) === 1 );
  return lNew;
}

/**
 * Chooses a value for m, based on the current values of l and m.
 * The new value m' must be in [-l,...,+l], and m-m' must be in [-1,0,1].
 */
function choose_m( l: number, m: number ): number {
  assert && assert( Number.isInteger( l ) );
  assert && assert( Number.isInteger( m ) );

  let mNew;

  if ( l === 0 ) {
    mNew = 0;
  }
  else if ( m > l ) {
    mNew = l;
  }
  else if ( m < -l ) {
    mNew = -l;
  }
  else if ( m === l ) {
    const a = dotRandom.nextInt( 2 );
    if ( a === 0 ) {
      mNew = m;
    }
    else {
      mNew = m - 1;
    }
  }
  else if ( m === -l ) {
    const a = dotRandom.nextInt( 2 );
    if ( a === 0 ) {
      mNew = m;
    }
    else {
      mNew = m + 1;
    }
  }
  else {
    const a = dotRandom.nextInt( 3 );
    if ( a === 0 ) {
      mNew = m + 1;
    }
    else if ( a === 1 ) {
      mNew = m - 1;
    }
    else {
      mNew = m;
    }
  }

  assert && assert( Number.isInteger( mNew ) );
  assert && assert( mNew >= -l && mNew <= l );
  assert && assert( mNew === -1 || mNew === 0 || mNew === 1 );
  return mNew;
}

/**
 * Checks state transition rules to see if a proposed transition is valid.
 */
function isaValidTransition( fOld: SchrodingerQuantumNumbers, fNew: SchrodingerQuantumNumbers ): boolean {
  return ( fOld.n !== fNew.n ) &&
         ( fNew.l >= 0 && fNew.l <= fNew.n - 1 ) &&
         ( Math.abs( fOld.l - fNew.l ) === 1 ) &&
         ( Math.abs( fOld.m - fNew.m ) <= 1 );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerQuantumNumbers', SchrodingerQuantumNumbers );