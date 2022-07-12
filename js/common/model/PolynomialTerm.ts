// Copyright 2022, University of Colorado Boulder

//TODO is this used?
/**
 * PolynomialTerm is a minimal/incomplete implementation of a polynomial term, as needed for solving
 * associated Legendre polynomials. See solveAssociatedLegendrePolynomial.ts
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class PolynomialTerm {

  public readonly coefficient: number;
  public readonly power: number;
  public static readonly ZERO = new PolynomialTerm( 0, 0 );

  public constructor( coefficient: number, power: number ) {
    assert && assert( Number.isInteger( coefficient ) );
    assert && assert( Number.isInteger( power ) && power >= 0 );

    this.coefficient = coefficient;
    this.power = power;
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public evaluate( x: number ): number {
    return Math.pow( x, this.power ) * this.coefficient;
  }

  public derive( iterations: number ): PolynomialTerm {
    assert && assert( Number.isInteger( iterations ) );

    let term = this.deriveThis();
    for ( let i = 0; i < iterations - 1; i++ ) {
      term = term.deriveThis();
    }
    return term;
  }

  private deriveThis(): PolynomialTerm {
    if ( this.power === 0 ) {
      return PolynomialTerm.ZERO;
    }
    else {
      return new PolynomialTerm( this.power - 1, this.coefficient * this.power );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'PolynomialTerm', PolynomialTerm );