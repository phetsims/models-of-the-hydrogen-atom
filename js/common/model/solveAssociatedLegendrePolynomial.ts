// Copyright 2022, University of Colorado Boulder

/**
 * Solves the associated Legendre polynomial.  This is needed to compute the wave function for the Schrodinger
 * model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PolynomialTerm from './PolynomialTerm.js';

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
 * at http://www.nrbook.com/a/bookcpdf/c6-8.pdf
 *
 * @param l - electron's secondary state
 * @param m - electron's tertiary state
 * @param x - coordinate on horizontal (x) axis
 */
function solveAssociatedLegendrePolynomial( l: number, m: number, x: number ): number {

  // For large l, the brute-force solution below encounters instabilities.
  assert && assert( Number.isInteger( l ) && l >= 0 && l <= 6, `invalid l: ${l}` );
  assert && assert( Number.isInteger( m ) && m >= 0 && m <= l, `invalid m: ${m}` );
  assert && assert( Math.abs( x ) <= 1, `invalid x: ${x}` );

  let productTerms = [ new PolynomialTerm( 1, 0 ) ]; // 1x^0

  for ( let i = 0; i < l; i++ ) {

    // x^2-1 times each term on left side TODO what does this mean?
    const terms: PolynomialTerm[] = [];
    for ( let k = 0; k < productTerms.length; k++ ) {
      const term = productTerms[ k ];
      terms.push( new PolynomialTerm( term.coefficient, term.power + 2 ) );
      terms.push( new PolynomialTerm( -1 * term.coefficient, term.power ) );
    }
    productTerms = terms;
  }

  for ( let i = 0; i < productTerms.length; i++ ) {
    productTerms[ i ] = productTerms[ i ].derive( l + m );
  }

  // Wolfram says there is a sign convention difference here. TODO clarify this?
  return ( Math.pow( -1, m ) / ( Math.pow( 2, l ) * factorial( l ) ) )
         * Math.pow( 1 - x * x, m / 2 ) * evaluate( productTerms, x );
}

function evaluate( productTerms: PolynomialTerm[], x: number ): number {
  let sum = 0;
  for ( let i = 0; i < productTerms.length; i++ ) {
    sum += productTerms[ i ].evaluate( x );
  }
  return sum;
}

/**
 * Computes the factorial of an integer n without using recursion.
 * n! = 1 * 2 * ... * ( n - 1 ) * n
 */
function factorial( n: number ): number {
  assert && assert( Number.isInteger( n ) );
  let f = 1;
  let i = 2;
  while ( i <= n ) {
    f *= i;
    i++;
  }
  return f;
}

export default solveAssociatedLegendrePolynomial;