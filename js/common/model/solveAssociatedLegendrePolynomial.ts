// Copyright 2022-2023, University of Colorado Boulder

/**
 * Solves the associated Legendre polynomial.  This is needed to compute the wave function for the Schrodinger
 * model of the hydrogen atom.
 *
 * In the java version, this was AssociatedLegendrePolynomials.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PolynomialTerm from './PolynomialTerm.js';
import MOTHAUtils from '../MOTHAUtils.js';

/**
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

export default solveAssociatedLegendrePolynomial;