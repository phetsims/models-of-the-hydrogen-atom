// Copyright 2019-2025, University of Colorado Boulder

/**
 * SchrodingerModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Electron is a probability density field. Proton is at the center, visible only when the probability density
 * field strength is below a threshold value. The electron's state is specified by 3 quantum numbers (n,l,m),
 * see SchrodingerQuantumNumbers.
 *
 * Wavefunction:
 * Probability density is computed by solving the 3D Schrödinger wave function, which in turn involves solving
 * the generalized Laguerre Polynomial and the associated Legendre polynomial.
 *
 * Collision behavior:
 * Identical to Bohr and de Broglie.
 *
 * Absorption behavior:
 * Identical to Bohr and de Broglie.
 *
 * Emission behavior:
 * Both spontaneous and stimulated emission are similar to Bohr and de Broglie, but the rules for electron state
 * transitions are more complicated. See SchrodingerQuantumNumbers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAUtils from '../MOTHAUtils.js';
import SchrodingerNode from '../view/SchrodingerNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import BohrModel from './BohrModel.js';
import DeBroglieBaseModel, { DeBroglieBaseModelOptions } from './DeBroglieBaseModel.js';
import { DeBroglieModelOptions } from './DeBroglieModel.js';
import LightSource from './LightSource.js';
import MetastableHandler from './MetastableHandler.js';
import PolynomialTerm from './PolynomialTerm.js';
import SchrodingerQuantumNumbers from './SchrodingerQuantumNumbers.js';
import SchrodingerElectron from './SchrodingerElectron.js';
import QuantumElectron from './QuantumElectron.js';

type SelfOptions = EmptySelfOptions;

export type SchrodingerModelOptions = SelfOptions & DeBroglieBaseModelOptions;

export default class SchrodingerModel extends DeBroglieBaseModel {

  // Quantum numbers (n,l,m) that specify the wavefunction for the electron.
  public readonly nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>;

  // Responsible for the case where the electron gets stuck in the metastable state (n,l,m) = (2,0,0).
  public readonly metastableHandler: MetastableHandler;

  // When reset is called, the value of nlmProperty may change in a way that violates state transition rules.
  // This flag allows us to know when we are resetting, and ignore those violations.
  // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/59.
  private _isResetting = false;

  public constructor( position: Vector2, lightSource: LightSource, providedOptions: SchrodingerModelOptions ) {

    const schrodingerElectron = new SchrodingerElectron( position, providedOptions.tandem.createTandem( 'electron' ) );

    const options = optionize<SchrodingerModelOptions, SelfOptions, DeBroglieModelOptions>()( {

      // DeBroglieModelOptions
      electron: schrodingerElectron,
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.schrodingerStringProperty,
      debugName: 'Schrodinger',
      icon: SchrodingerNode.createIcon(),
      tandemNamePrefix: 'schrodinger'
    }, providedOptions );

    super( position, options );

    this.nlmProperty = schrodingerElectron.nlmProperty;

    this.metastableHandler = new MetastableHandler( this.nlmProperty, lightSource,
      options.tandem.createTandem( 'metastableHandler' ) );
  }

  public override reset(): void {
    this._isResetting = true;
    this.metastableHandler.reset();
    super.reset();
    this._isResetting = false;
  }

  /**
   * Whether this atomic model is currently resetting. This is useful because the (n,l,m) )transition that occurs
   * when resetting is very likely to be invalid, and other code needs to know when to ignore validation.
   */
  public isResetting(): boolean {
    return this._isResetting;
  }

  /**
   * Convenience method for getting n, the principal quantum number. See SchrodingerQuantumNumbers for details.
   */
  private get n(): number {
    return this.nlmProperty.value.n;
  }

  /**
   * Convenience method for getting l, the azimuthal quantum number. See SchrodingerQuantumNumbers for details.
   */
  private get l(): number {
    return this.nlmProperty.value.l;
  }

  /**
   * Convenience method for getting m, the magnetic quantum number. See SchrodingerQuantumNumbers for details.
   */
  private get m(): number {
    return this.nlmProperty.value.m;
  }

  /**
   * Steps the atomic model.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {
    super.step( dt );
    this.metastableHandler.step( dt );
  }

  /**
   * Probabilistically determines whether to absorb a photon. Typically, we defer to the superclass implementation.
   * But if we're in the metastable state (2,0,0), the probability is 100%. This is not physically correct, but we
   * want to make it easier to get out of state (2,0,0).
   */
  protected override absorptionIsCertain(): boolean {
    if ( this.metastableHandler.isMetastableStateProperty.value ) {
      return true;
    }
    return super.absorptionIsCertain();
  }

  /**
   * Determines if a proposed state transition caused by stimulated emission is allowed.
   */
  protected override stimulatedEmissionIsAllowed( nOld: number, nNew: number ): boolean {
    assert && assert( nOld === this.n, `nOld=${nOld}, expected ${this.n}` );
    let allowed = true;
    if ( nNew >= nOld ) {

      // Stimulated emission occurs when moving to a lower energy state.
      allowed = false;
    }
    else if ( nNew === 1 && this.l === 0 ) {

      // Transition from (?,0,?) to (1,?,?) cannot satisfy the l=[0,n-1] constraint and abs(l-l')=1 rule.
      // lNew would need to be 1, and would result in (1,1,?).
      allowed = false;
    }
    else if ( nNew === 1 && this.l !== 1 ) {

      // If nNew is 1, then the only valid of lNew would be 0, to satisfy the l=[0,n-1] constraint.
      // And the only way to get to lNew of 0 is if it is currently 1, to satisfy the abs(l-l')=1 rule.
      allowed = false;
    }
    return allowed;
  }

  /**
   * Chooses a lower value for n. Returns null if there is no valid transition.
   */
  protected override chooseLower_n(): number | null {
    return this.nlmProperty.value.chooseLower_n();
  }

  /**
   * For spontaneous emission, our Schrodinger model emits photons from a random point on the first Bohr orbit.
   */
  protected override getSpontaneousEmissionPosition(): Vector2 {

    // Choose a random point on the first orbit, in polar coordinates.
    const angle = MOTHAUtils.nextAngle();
    const radius = BohrModel.getElectronOrbitRadius( QuantumElectron.GROUND_STATE );

    // Convert to Cartesian coordinates, adjusted for the atom's position.
    const x = ( radius * Math.cos( angle ) ) + this.position.x;
    const y = ( radius * Math.sin( angle ) ) + this.position.y;
    return new Vector2( x, y );
  }

  /**
   * Solves the Schrodinger probability density equation.
   * @param nlm - quantum numbers that describe the electron's state
   * @param x - coordinate on horizontal axis
   * @param y - coordinate on axis that is perpendicular to the screen
   * @param z - coordinate on vertical axis
   */
  public static solveProbabilityDensity( nlm: SchrodingerQuantumNumbers, x: number, y: number, z: number ): number {
    assert && assert( !( x === 0 && y === 0 && z === 0 ), 'undefined for (x,y,z)=(0,0,0)' );

    // Convert to Polar coordinates.
    const r = Math.sqrt( ( x * x ) + ( y * y ) + ( z * z ) );
    const cosTheta = Math.abs( z ) / r;

    // Solve the wavefunction.
    const w = solveWavefunction( nlm, r, cosTheta );

    // Square the result.
    return ( w * w );
  }
}

/**
 * Solves the electron's wavefunction, as specified in the Java design document.
 * See page 28 of doc/java-version/hydrogen-atom.pdf.
 * @param nlm - quantum numbers that describe the electron's state
 * @param r - radius
 * @param cosTheta - cosine of the angle
 */
function solveWavefunction( nlm: SchrodingerQuantumNumbers, r: number, cosTheta: number ): number {
  const t1 = solveGeneralizedLaguerrePolynomial( nlm.n, nlm.l, r );
  const t2 = solveAssociatedLegendrePolynomial( nlm.l, nlm.m, cosTheta );
  return ( t1 * t2 );
}

/**
 * Solves the generalized Laguerre Polynomial, as specified in the Java design document.
 * See page 28 of doc/java-version/hydrogen-atom.pdf.
 * @param n - principal quantum number
 * @param l - azimuthal quantum number
 * @param r - radius
 */
function solveGeneralizedLaguerrePolynomial( n: number, l: number, r: number ): number {

  // From doc/java-version/hydrogen-atom.pdf, page 29:
  // Normally, a, the “Bohr radius,” is equal to the radius of the smallest Bohr orbit. Since we’ve rescaled the
  // Bohr orbits, we need to rescale a too. For a given value of n, set a=r/n2, where r is the radius of the Bohr
  // orbit for that n.
  const a = BohrModel.getElectronOrbitRadius( n ) / ( n * n );

  const multiplier = Math.pow( r, l ) * Math.exp( -r / ( n * a ) );
  const b0 = 2 * Math.pow( n * a, -1.5 ); // b0
  const limit = n - l - 1;
  let bj = b0;
  let sum = b0; // j=0
  for ( let j = 1; j <= limit; j++ ) {
    bj = ( 2 / ( n * a ) ) * ( ( j + l - n ) / ( j * ( j + ( 2 * l ) + 1 ) ) ) * bj;
    sum += ( bj * Math.pow( r, j ) );
  }
  return ( multiplier * sum );
}

/**
 * Solves the associated Legendre polynomial, as specified in the Java design document.
 * See page 28 of doc/java-version/hydrogen-atom.pdf.
 *
 * In the java version, this was AssociatedLegendrePolynomials.java.
 *
 * This solution uses Wolfram's definition of the associated Legendre polynomial. See
 * https://mathworld.wolfram.com/AssociatedLegendrePolynomial.html
 * http://mathworld.wolfram.com/LegendrePolynomial.html
 *
 * When l > 6, this implementation starts to differ from Wolfram and "Numerical Recipes in C".
 * To compare with Mathematica online, use: x^2*(3)*( LegendreP[7,3,-0.99])
 * as the input to the Integral Calculator at http://integrals.wolfram.com/index.jsp
 *
 * For details on why this doesn't work for l > 6, see Section 6.8 of "Numerical Recipes in C, Second Edition" (1992)
 * at https://www.grad.hr/nastava/gs/prg/NumericalRecipesinC.pdf
 *
 * @param l - azimuthal quantum number
 * @param m - magnetic quantum number
 * @param x - x-axis coordinate
 */
function solveAssociatedLegendrePolynomial( l: number, m: number, x: number ): number {

  // From doc/java-version/hydrogen-atom.pdf:
  // Note that the probability density will always be the same for +m and –m.
  const mAbs = Math.abs( m );

  let productTerms = [ new PolynomialTerm( 1, 0 ) ]; // 1x^0
  for ( let i = 0; i < l; i++ ) {

    // x^2-1 times each term on left side
    // (This comment was ported from AssociatedLegendrePolynomials.java, and we're not sure what it means.)
    const terms: PolynomialTerm[] = [];
    for ( let k = 0; k < productTerms.length; k++ ) {
      const term = productTerms[ k ];
      terms.push( new PolynomialTerm( term.coefficient, term.exponent + 2 ) );
      terms.push( new PolynomialTerm( -1 * term.coefficient, term.exponent ) );
    }
    productTerms = terms;
  }

  for ( let i = 0; i < productTerms.length; i++ ) {
    productTerms[ i ] = productTerms[ i ].derive( l + mAbs );
  }

  // According to https://mathworld.wolfram.com/AssociatedLegendrePolynomial.html, there are 2 two sign conventions
  // for associated Legendre polynomials. Some authors omit the Condon-Shortley phase (-1)^m, while others include it.
  // We are including it here, as the first term.
  return Math.pow( -1, mAbs ) / ( Math.pow( 2, l ) * MOTHAUtils.factorial( l ) ) *
         Math.pow( 1 - x * x, mAbs / 2 ) * PolynomialTerm.evaluatePolynomial( productTerms, x );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );