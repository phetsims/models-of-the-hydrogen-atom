// Copyright 2019-2022, University of Colorado Boulder

/**
 * SchrodingerModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Electron is a probability density field. Proton is at the center, visible only when the probability density
 * field strength is below a threshold value. The atom's state has 3 components (n,l,m). See transition rules below.
 *
 * Wavefunction:
 * This implementation solves the 3D Schrodinger wavefunction, used to compute probability density values in 3D space.
 *
 * Collision behavior:
 * Identical to the "brightness" views of de Broglie, which is why this class is an extension of DeBroglieModel.
 *
 * Absorption behavior:
 * Identical to Bohr and de Broglie.
 *
 * Emission behavior:
 * Both spontaneous and stimulated emission are similar to Bohr and de Broglie, but the rules for transitions (see below)
 * are more complicated.
 *
 * Transition rules:
 * All the following rules must be obeyed when choosing a transition. Note that transitions from state nlm=(2,0,0)
 * are a special case. The lower state (1,0,0) is not possible since it violates the abs(l-l')=1 rule. The only way to
 * get out of this state (2,0,0) is by going to a higher state.
 *
 *   n = [1...6] as in Bohr and de Broglie
 *   l = [0...n-1]
 *   m = [-l...+l]
 *   abs(l-l') = 1
 *   abs(m-m') < 1
 *   n transitions have varying transition strengths
 *   valid l and m transitions have equal probability
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import schrodingerButton_png from '../../../images/schrodingerButton_png.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import DeBroglieModel, { DeBroglieModelOptions } from './DeBroglieModel.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import BohrModel from './BohrModel.js';
import ProbabilisticChooser, { ProbabilisticChooserEntry } from './ProbabilisticChooser.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MOTHAUtils from '../MOTHAUtils.js';
import solveAssociatedLegendrePolynomial from './solveAssociatedLegendrePolynomial.js';
import Tandem from '../../../../tandem/js/Tandem.js';

/*
 * This table defines the transition strengths for the primary state component (n).
 * Some entries in this table are nonsensical, but their strengths are zero, and it helps to have a symmetrical table.
 * This table was taken from the Java simulation design document.
 *
 * Note that the table indexing is zero-indexed, while transitions are 1-based.
 * Here's an example that shows how the table is indexed:
 * TRANSITION_STRENGTH[5][0] is the transition strength from n=6 to n=1
 */
const TRANSITION_STRENGTH = [
  [ 0, 0, 0, 0, 0 ],
  [ 12.53, 0, 0, 0, 0 ],
  [ 3.34, 0.87, 0, 0, 0 ],
  [ 1.36, 0.24, 0.07, 0, 0 ],
  [ 0.69, 0.11, 0, 0.04, 0 ],
  [ 0.39, 0.06, 0.02, 0, 0 ]
];
assert && assert( TRANSITION_STRENGTH.length === BohrModel.getNumberOfStates() );

type SelfOptions = EmptySelfOptions;

export type SchrodingerModelOptions = SelfOptions & DeBroglieModelOptions;

export default class SchrodingerModel extends DeBroglieModel {

  //TODO electronStateTupleProperty: Property<{ n: number, l: number, m: number }>

  // secondary electron state number (l)
  public readonly secondaryElectronStateProperty: NumberProperty;

  // tertiary electron state number (m)
  public readonly tertiaryElectronStateProperty: NumberProperty;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: SchrodingerModelOptions ) {

    const options = optionize<SchrodingerModelOptions, SelfOptions, DeBroglieModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.schrodingerStringProperty,
      iconHTMLImageElement: schrodingerButton_png
    }, providedOptions );

    super( zoomedInBox, options );

    this.secondaryElectronStateProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      //TODO range is dynamic [0,n-1]
      tandem: options.tandem.createTandem( 'secondaryElectronStateProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'secondary electron state (l)'
    } );

    this.tertiaryElectronStateProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      //TODO range is dynamic [-l,+l]
      tandem: options.tandem.createTandem( 'tertiaryElectronStateProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'tertiary electron state (m)',
      //TODO do we need to opt out here?
      rangePropertyOptions: {
        tandem: Tandem.OPT_OUT
      }
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override step( dt: number ): void {
    //TODO
  }

  public override movePhoton( photon: Photon, dt: number ): void {
    //TODO
    photon.move( dt );
  }

  /**
   * Is this atom's electron in the specified state?
   */
  public isInState( n: number, l: number, m: number ): boolean {
    return ( this.getElectronState() === n ) &&
           ( this.secondaryElectronStateProperty.value === l ) &&
           ( this.tertiaryElectronStateProperty.value === m );
  }

  /**
   * Probabilistically determines whether to absorb a photon.
   * Typically, we defer to the superclass implementation. But if we're in state (2,0,0), the probability is 100%.
   * This is not physically correct, but we want to make it easier to get out of state (2,0,0).
   */
  protected override absorptionIsCertain(): boolean {
    if ( this.getElectronState() === 2 && this.secondaryElectronStateProperty.value === 0 ) {
      return true;
    }
    return super.absorptionIsCertain();
  }

  /**
   * Determines if a proposed state transition caused by stimulated emission is allowed.
   */
  protected override stimulatedEmissionIsAllowed( nOld: number, nNew: number ): boolean {
    let allowed = true;
    if ( nNew === nOld ) {
      allowed = false;
    }
    else if ( nNew === 1 && this.secondaryElectronStateProperty.value === 0 ) {

      // transition from (n,0,0) to (1,?,?) cannot satisfy the abs(l-l')=1 rule
      allowed = false;
    }
    else if ( nNew === 1 && this.secondaryElectronStateProperty.value !== 1 ) {

      // the only way to get to (1,0,0) is from (n,1,?)
      allowed = false;
    }

    return allowed;
  }

  /**
   * Chooses a new primary state (n) for the electron, -1 if there is no valid transition.
   */
  protected override chooseLowerElectronState(): number {
    return getLowerPrimaryState( this.getElectronState(), this.secondaryElectronStateProperty.value );
  }

  /**
   * Sets the electron's primary state. Randomly chooses the values for the secondary and tertiary states,
   * according to state transition rules.
   */
  protected override setElectronState( nNew: number ): void {

    const n = this.getElectronState();
    const l = this.secondaryElectronStateProperty.value;
    const m = this.tertiaryElectronStateProperty.value;

    const lNew = getNewSecondaryElectronState( nNew, l );
    const mNew = getNewTertiaryElectronState( lNew, m );

    // Verify that no transition rules have been broken.
    const valid = isaValidTransition( n, l, m, nNew, lNew, mNew, BohrModel.getNumberOfStates() );
    if ( valid ) {
      super.setElectronState( nNew );
      this.secondaryElectronStateProperty.value = lNew;
      this.tertiaryElectronStateProperty.value = mNew;
    }
    else {

      // There's a bug in the implementation of the transition rules.
      // Fall back to (1,0,0) if running without assertions.
      assert && assert( false, `bad transition attempted from (${n},${l},${m}) to (${nNew},${lNew},${mNew})` );
      super.setElectronState( 1 );
      this.secondaryElectronStateProperty.value = 0;
      this.tertiaryElectronStateProperty.value = 0;
    }
  }

  /**
   * Our Schrodinger model emits photons from a random point on the first Bohr orbit.
   */
  protected override getSpontaneousEmissionPosition(): Vector2 {

    // random point on the orbit, in polar coordinates
    const radius = this.getElectronOrbitRadius( MOTHAConstants.GROUND_STATE );
    const angle = MOTHAUtils.nextAngle();

    // convert to Cartesian coordinates, adjust for atom's position
    const x = ( radius * Math.cos( angle ) ) + this.position.x;
    const y = ( radius * Math.sin( angle ) ) + this.position.y;
    return new Vector2( x, y );
  }

  public fireOneAbsorbablePhoton(): void {
    //TODO port MetastableHandler
  }

  //----------------------------------------------------------------------------
  // Wave function
  //----------------------------------------------------------------------------

  /**
   * Probability Density. This algorithm is undefined for (x,y,z) = (0,0,0).
   * @param n primary state
   * @param l secondary state
   * @param m tertiary state
   * @param x coordinate on horizontal axis
   * @param y coordinate on axis the is perpendicular to the screen
   * @param z coordinate on vertical axis
   */
  public getProbabilityDensity( n: number, l: number, m: number, x: number, y: number, z: number ): number {
    //TODO validate state (n,l,m)
    assert && assert( !( x === 0 && y === 0 && z === 0 ), 'undefined for (x,y,z)=(0,0,0)' );

    // convert to Polar coordinates
    const r = Math.sqrt( ( x * x ) + ( y * y ) + ( z * z ) );
    const cosTheta = Math.abs( z ) / r;

    // calculate wave function
    const w = this.getWaveFunction( n, l, m, r, cosTheta );

    // square the wave function
    return ( w * w );
  }

  /**
   * Wavefunction.
   */
  private getWaveFunction( n: number, l: number, m: number, r: number, cosTheta: number ): number {
    const t1 = this.getGeneralizedLaguerrePolynomial( n, l, r );
    const t2 = solveAssociatedLegendrePolynomial( l, Math.abs( m ), cosTheta );
    return ( t1 * t2 );
  }

  /**
   * Generalized Laguerre Polynomial.
   * Codified from design document.
   */
  private getGeneralizedLaguerrePolynomial( n: number, l: number, r: number ): number {
    const a = this.getElectronOrbitRadius( n ) / ( n * n );
    const multiplier = Math.pow( r, l ) * Math.exp( -r / ( n * a ) );
    const b0 = 2.0 * Math.pow( ( n * a ), ( -1.5 ) ); // b0
    const limit = n - l - 1;
    let bj = b0;
    let sum = b0; // j==0
    for ( let j = 1; j <= limit; j++ ) {
      bj = ( 2.0 / ( n * a ) ) * ( ( j + l - n ) / ( j * ( j + ( 2.0 * l ) + 1.0 ) ) ) * bj;
      sum += ( bj * Math.pow( r, j ) );
    }
    return ( multiplier * sum );
  }
}

/**
 * Chooses a new lower value for the primary state (n).
 * The possible values of n are limited by the current value of l, since abs(l-l') must be 1.
 * The probability of each possible n transition is determined by its transition strength.
 *
 * @param nOld - the existing primary state
 * @param l - the current secondary state
 * @returns the new primary state, -1 there is no valid transition
 */
function getLowerPrimaryState( nOld: number, l: number ): number {

  let nNew = -1;

  if ( nOld < 2 ) {
    // no state is lower than (1,0,0)
    return -1;
  }
  else if ( nOld === 2 ) {
    if ( l === 0 ) {

      // transition from (2,0,?) to (1,0,?) cannot satisfy the abs(l-l')=1 rule
      return -1;
    }
    else {

      // the only transition from (2,1,?) is (1,0,0)
      nNew = 1;
    }
  }
  else if ( nOld > 2 ) {

    // determine the possible range of n
    const nMax = nOld - 1;
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
      const state = nMin + i;
      const transitionStrength = TRANSITION_STRENGTH[ nOld - 1 ][ state - 1 ];
      entries.push( { value: state, weight: transitionStrength } );
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

/*
 * Chooses a value for the secondary electron state (l) based on the primary state (n).
 * The new value l' must be in [0,...n-1], and l-l' must be in [-1,1].
 * This is a direct port from the Java version.
 *
 * @param nNew - the new primary state
 * @param lOld - the existing secondary state
 */
function getNewSecondaryElectronState( nNew: number, lOld: number ): number {
  assert && assert( Number.isInteger( nNew ) );
  assert && assert( Number.isInteger( lOld ) );

  let lNew = 0;

  if ( lOld === 0 ) {
    lNew = 1;
  }
  else if ( lOld === nNew ) {
    lNew = lOld - 1;
  }
  else if ( lOld === nNew - 1 ) {
    lNew = lOld - 1;
  }
  else {
    if ( dotRandom.nextBoolean() ) {
      lNew = lOld + 1;
    }
    else {
      lNew = lOld - 1;
    }
  }

  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Math.abs( lNew - lOld ) === 1 );
  return lNew;
}

/*
 * Chooses a value for the tertiary electron state (m) based on the primary state (l).
 * The new value m' must be in [-l,...,+l], and m-m' must be in [-1,0,1].
 * This is a direct port from the Java version.
 *
 * @param lNew - the new secondary state
 * @param mOld - the existing tertiary state
 */
function getNewTertiaryElectronState( lNew: number, mOld: number ): number {
  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Number.isInteger( mOld ) );

  let mNew = 0;

  if ( lNew === 0 ) {
    mNew = 0;
  }
  else if ( mOld > lNew ) {
    mNew = lNew;
  }
  else if ( mOld < -lNew ) {
    mNew = -lNew;
  }
  else if ( mOld === lNew ) {
    const a = dotRandom.nextInt( 2 );
    if ( a === 0 ) {
      mNew = mOld;
    }
    else {
      mNew = mOld - 1;
    }
  }
  else if ( mOld === -lNew ) {
    const a = dotRandom.nextInt( 2 );
    if ( a === 0 ) {
      mNew = mOld;
    }
    else {
      mNew = mOld + 1;
    }
  }
  else {
    const a = dotRandom.nextInt( 3 );
    if ( a === 0 ) {
      mNew = mOld + 1;
    }
    else if ( a === 1 ) {
      mNew = mOld - 1;
    }
    else {
      mNew = mOld;
    }
  }

  assert && assert( Number.isInteger( mNew ) );
  assert && assert( mNew >= -lNew && mNew <= lNew );
  assert && assert( mNew === -1 || mNew === 0 || mNew === 1 );
  return mNew;
}

/**
 * Checks state transition rules to see if a proposed transition is valid.
 */
function isaValidTransition( nOld: number, lOld: number, mOld: number, nNew: number, lNew: number, mNew: number, numberOfStates: number ): boolean {
  assert && assert( Number.isInteger( nOld ) );
  assert && assert( Number.isInteger( lOld ) );
  assert && assert( Number.isInteger( mOld ) );
  assert && assert( Number.isInteger( nNew ) );
  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Number.isInteger( mNew ) );
  assert && assert( Number.isInteger( numberOfStates ) && numberOfStates > 0 );

  return isValidState( nNew, lNew, mNew, numberOfStates ) &&
         ( nOld !== nNew ) &&
         ( lNew >= 0 && lNew <= nNew - 1 ) &&
         ( Math.abs( lOld - lNew ) === 1 ) &&
         ( Math.abs( mOld - mNew ) <= 1 );
}

/**
 * Validates an electron state.
 */
function isValidState( n: number, l: number, m: number, numberOfStates: number ): boolean {
  assert && assert( Number.isInteger( n ) );
  assert && assert( Number.isInteger( l ) );
  assert && assert( Number.isInteger( m ) );
  assert && assert( Number.isInteger( numberOfStates ) && numberOfStates > 0 );

  return ( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.GROUND_STATE + numberOfStates ) &&
         ( l >= 0 && l <= n - 1 ) &&
         ( m >= -l && m <= l );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );