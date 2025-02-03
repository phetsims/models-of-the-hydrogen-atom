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

  // Exponent of the term's variable, e.g. '3' in '2x^3'.
  public readonly exponent: number;

  // The term's multiplier, e.g. '2' in '2x^3'.
  public readonly coefficient: number;

  public constructor( exponent: number, coefficient: number ) {
    assert && assert( Number.isInteger( exponent ), `invalid exponent: ${exponent}` );
    assert && assert( Number.isInteger( coefficient ), `invalid coefficient: ${coefficient}` );

    this.exponent = exponent;
    this.coefficient = coefficient;
  }

  public equals( term: PolynomialTerm ): boolean {
    return ( this.exponent === term.exponent ) && ( this.coefficient === term.coefficient );
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

    let coefficient = this.coefficient;
    let exponent = this.exponent;
    for ( let i = 0; i < iterations - 1; i++ ) {
      if ( exponent === 0 ) {
        exponent = 0;
        coefficient = 0;
        break;
      }
      else {
        coefficient = coefficient * exponent;
        exponent = exponent - 1;
      }
    }
    return new PolynomialTerm( exponent, coefficient );
  }
}

modelsOfTheHydrogenAtom.register( 'PolynomialTerm', PolynomialTerm );