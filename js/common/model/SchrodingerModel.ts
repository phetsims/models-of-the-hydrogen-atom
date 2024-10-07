// Copyright 2019-2024, University of Colorado Boulder

/**
 * SchrodingerModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Electron is a probability density field. Proton is at the center, visible only when the probability density
 * field strength is below a threshold value. The electron's state is specified by 3 quantum numbers (n,l,m),
 * see SchrodingerQuantumNumbers.
 *
 * Wavefunction:
 * This implementation solves the 3D Schrodinger wavefunction, used to compute probability density values in 3D space.
 * The quantum numbers (n,l,m) describe the wavefunction.
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

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import SchrodingerNode from '../view/SchrodingerNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import ZoomedInBox from './ZoomedInBox.js';
import { DeBroglieModelOptions } from './DeBroglieModel.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MOTHAUtils from '../MOTHAUtils.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import SchrodingerQuantumNumbers from './SchrodingerQuantumNumbers.js';
import Property from '../../../../axon/js/Property.js';
import BohrModel from './BohrModel.js';
import MetastableHandler from './MetastableHandler.js';
import Light from './Light.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import PolynomialTerm from './PolynomialTerm.js';
import DeBroglieBaseModel, { DeBroglieBaseModelOptions } from './DeBroglieBaseModel.js';

type SelfOptions = EmptySelfOptions;

export type SchrodingerModelOptions = SelfOptions & DeBroglieBaseModelOptions;

export default class SchrodingerModel extends DeBroglieBaseModel {

  // Quantum numbers (n,l,m) that specify the wavefunction for the electron.
  public readonly nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>;
  private readonly _nlmProperty: Property<SchrodingerQuantumNumbers>;

  // Whether the atom in the metastable state (n,l,m) = (2,0,0)
  public readonly isMetastableStateProperty: TReadOnlyProperty<boolean>;

  public readonly metastableHandler: MetastableHandler;

  public constructor( zoomedInBox: ZoomedInBox, light: Light, providedOptions: SchrodingerModelOptions ) {

    const options = optionize<SchrodingerModelOptions, SelfOptions, DeBroglieModelOptions>()( {

      // DeBroglieModelOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.schrodingerStringProperty,
      icon: SchrodingerNode.createIcon()
    }, providedOptions );

    super( zoomedInBox, options );

    // We would prefer that this be a DerivedProperty, but its derivation depends on its previous value.
    //TODO Should nlmProperty be a Property of SchrodingerElectron?
    this._nlmProperty = new Property( new SchrodingerQuantumNumbers( this.electron.nProperty.value, 0, 0 ), {
      phetioValueType: SchrodingerQuantumNumbers.SchrodingerQuantumNumbersIO,
      tandem: this.electron.tandem.createTandem( 'nlmProperty' ), //TODO create SchrodingerElectron and add nlmProperty?
      phetioFeatured: true,
      phetioReadOnly: true,
      phetioDocumentation: 'The quantum numbers (n,l,m) that specify a wavefunction for the electron.'
    } );
    this.nlmProperty = this._nlmProperty;
    phet.log && this.nlmProperty.lazyLink( ( nlmNew, nlmOld ) =>
      phet.log( `SchrodingerModel: (n,l,m) (${nlmOld.n},${nlmOld.l},${nlmOld.m}) -> (${nlmNew.n},${nlmNew.l},${nlmNew.m})` ) );

    // When n changes, compute the next state.
    this.electron.nProperty.lazyLink( n => {
      this._nlmProperty.value = this.nlmProperty.value.getNextState( n );
    } );

    this.isMetastableStateProperty = new DerivedProperty( [ this.nlmProperty ],
      nlm => nlm.equals( MetastableHandler.METASTABLE_STATE ), {
        tandem: this.electron.tandem.createTandem( 'isMetastableStateProperty' ), //TODO create SchrodingerElectron and add nlmProperty?
        phetioValueType: BooleanIO,
        phetioFeatured: true,
        phetioDocumentation: 'True when the atom is in the metastable state (n,l,m) = (2,0,0).'
      } );

    this.metastableHandler = new MetastableHandler( this.nlmProperty, this.isMetastableStateProperty, light, {
      tandem: options.tandem.createTandem( 'metastableHandler' )
    } );
  }

  public override reset(): void {
    this.metastableHandler.reset();
    super.reset();
  }

  private get n(): number {
    return this.nlmProperty.value.n;
  }

  private get l(): number {
    return this.nlmProperty.value.l;
  }

  private get m(): number {
    return this.nlmProperty.value.m;
  }

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
    //TODO Java version was if ( n === 2 && l === 0 ), ignoring m.
    if ( this.isMetastableStateProperty.value ) {
      return true;
    }
    return super.absorptionIsCertain();
  }

  /**
   * Determines if a proposed state transition caused by stimulated emission is allowed.
   */
  protected override stimulatedEmissionIsAllowed( nOld: number, nNew: number ): boolean {
    let allowed = true;
    if ( nNew >= nOld ) {

      // Stimulated emission occurs when moving to a lower energy state.
      allowed = false;
    }
    else if ( nNew === 1 && this.l === 0 ) {

      // transition from (n,0,0) to (1,?,?) cannot satisfy the abs(l-l')=1 rule
      allowed = false;
    }
    else if ( nNew === 1 && this.l !== 1 ) {

      // the only way to get to (1,0,0) is from (n,1,?)
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
   * Our Schrodinger model emits photons from a random point on the first Bohr orbit.
   */
  protected override getSpontaneousEmissionPosition(): Vector2 {

    // Choose a random point on the first orbit, in polar coordinates.
    const angle = MOTHAUtils.nextAngle();
    const radius = BohrModel.getElectronOrbitRadius( MOTHAConstants.GROUND_STATE );

    // Convert to Cartesian coordinates, adjusted for the atom's position.
    const x = ( radius * Math.cos( angle ) ) + this.position.x;
    const y = ( radius * Math.sin( angle ) ) + this.position.y;
    return new Vector2( x, y );
  }

  /**
   * Excites the atom when it is in the metastable state (n,l,m) = (2,0,0) by firing an absorbable photon
   * directly at the center of the atom. This moves the atom to a higher energy level.
   */
  public excite(): void {
    assert && assert( this.isMetastableStateProperty.value );
    this.metastableHandler.exciteAtom();
  }

  /**
   * Solves the electron's wavefunction.
   */
  public static solveWavefunction( n: number, l: number, m: number, r: number, cosTheta: number ): number {
    const t1 = solveGeneralizedLaguerrePolynomial( n, l, r );
    const t2 = solveAssociatedLegendrePolynomial( l, Math.abs( m ), cosTheta );
    return ( t1 * t2 );
  }
}

/**
 * Solves the generalized Laguerre Polynomial, as specified in the Java design document.
 */
function solveGeneralizedLaguerrePolynomial( n: number, l: number, r: number ): number {
  const a = BohrModel.getElectronOrbitRadius( n ) / ( n * n );
  const multiplier = Math.pow( r, l ) * Math.exp( -r / ( n * a ) );
  const b0 = 2 * Math.pow( n * a, -1.5 ); // b0
  const limit = n - l - 1;
  let bj = b0;
  let sum = b0; // j==0
  for ( let j = 1; j <= limit; j++ ) {
    bj = ( 2 / ( n * a ) ) * ( ( j + l - n ) / ( j * ( j + ( 2 * l ) + 1 ) ) ) * bj;
    sum += ( bj * Math.pow( r, j ) );
  }
  return ( multiplier * sum );
}

/**
 * Solves the associated Legendre polynomial. In the java version, this was AssociatedLegendrePolynomials.java.
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

  // For large l, the brute-force solution below encounters instabilities.
  assert && assert( Number.isInteger( l ) && l >= 0 && l <= 6, `invalid l: ${l}` );
  assert && assert( Number.isInteger( m ) && m >= 0 && m <= l, `invalid m: ${m}` );
  assert && assert( Math.abs( x ) <= 1, `invalid x: ${x}` );

  let productTerms = [ new PolynomialTerm( 0, 1 ) ]; // 1x^0

  for ( let i = 0; i < l; i++ ) {

    // x^2-1 times each term on left side TODO what does this mean?
    const terms: PolynomialTerm[] = [];
    for ( let k = 0; k < productTerms.length; k++ ) {
      const term = productTerms[ k ];
      terms.push( new PolynomialTerm( term.power + 2, term.coefficient ) );
      terms.push( new PolynomialTerm( term.power, -1 * term.coefficient ) );
    }
    productTerms = terms;
  }

  for ( let i = 0; i < productTerms.length; i++ ) {
    productTerms[ i ] = productTerms[ i ].derive( l + m );
  }

  // Wolfram says there is a sign convention difference here. TODO clarify this?
  return Math.pow( -1, m ) / ( Math.pow( 2, l ) * MOTHAUtils.factorial( l ) ) *
         Math.pow( 1 - x * x, m / 2 ) * evaluate( productTerms, x );
}

function evaluate( productTerms: PolynomialTerm[], x: number ): number {
  let sum = 0;
  for ( let i = 0; i < productTerms.length; i++ ) {
    sum += productTerms[ i ].evaluate( x );
  }
  return sum;
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );