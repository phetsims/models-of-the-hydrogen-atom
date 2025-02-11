// Copyright 2022-2025, University of Colorado Boulder

/**
 * PolynomialTerm is a minimal/incomplete implementation of a polynomial term, as needed for solving
 * associated Legendre polynomials.
 *
 * In the Java version, this was edu.colorado.phet.colorado.phetcommon.math.PolynomialTerm. This is a partial
 * port of that class, including only the methods needed by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class PolynomialTerm {

  // The term's coefficient, e.g. '2' in '2x^3'.
  public readonly coefficient: number;

  // The term's exponent, e.g. '3' in '2x^3'.
  public readonly exponent: number;

  private static readonly ZERO = new PolynomialTerm( 0, 0 );

  public constructor( coefficient: number, exponent: number ) {
    assert && assert( Number.isInteger( coefficient ), `invalid coefficient: ${coefficient}` );
    assert && assert( Number.isInteger( exponent ), `invalid exponent: ${exponent}` );

    this.coefficient = coefficient;
    this.exponent = exponent;
  }

  /**
   * Evaluates this polynomial for a specified value of the variable.
   */
  public evaluate( x: number ): number {
    return this.coefficient * Math.pow( x, this.exponent );
  }

  /**
   * Derives a new PolynomialTerm from this PolynomialTerm.
   */
  public derive( iterations: number ): PolynomialTerm {
    assert && assert( Number.isInteger( iterations ) && iterations >= 0, `invalid iterations: ${iterations}` );
    if ( iterations === 0 ) {
      return this;
    }
    else {
      let term = this.derivative();
      for ( let i = 1; i < iterations; i++ ) {
        term = term.derivative();
      }
      return term;
    }
  }

  /**
   * Computes the derivative of this Polynomial.
   */
  private derivative(): PolynomialTerm {
    if ( this.exponent === 0 ) {

      // The derivative of a constant is zero.
      return PolynomialTerm.ZERO;
    }
    else {

      // power rule
      return new PolynomialTerm( this.coefficient * this.exponent, this.exponent - 1 );
    }
  }

  /**
   * Evaluates a polynomial (a set of PolynomialTerms) for a specified value of the variable.
   */
  public static evaluatePolynomial( terms: PolynomialTerm[], x: number ): number {
    let sum = 0;
    for ( let i = 0; i < terms.length; i++ ) {
      sum += terms[ i ].evaluate( x );
    }
    return sum;
  }
}

modelsOfTheHydrogenAtom.register( 'PolynomialTerm', PolynomialTerm );