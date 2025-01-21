// Copyright 2022-2024, University of Colorado Boulder

/**
 * PolynomialTerm is a minimal/incomplete implementation of a polynomial term, as needed for solving
 * associated Legendre polynomials.
 *
 * In the Java version, this was phet.colorado.edu.common.phetcommon.PolynomialTerm. This is a partial
 * port of that class, including only the methods needed by this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class PolynomialTerm {

  public readonly power: number;
  public readonly coefficient: number;

  public constructor( power: number, coefficient: number ) {
    assert && assert( Number.isInteger( power ), `invalid power: ${power}` );
    assert && assert( Number.isInteger( coefficient ), `invalid coefficient: ${coefficient}` );

    this.power = power;
    this.coefficient = coefficient;
  }

  public equals( term: PolynomialTerm ): boolean {
    return ( this.power === term.power ) && ( this.coefficient === term.coefficient );
  }

  public evaluate( x: number ): number {
    return Math.pow( x, this.power ) * this.coefficient;
  }

  public derive( iterations: number ): PolynomialTerm {
    assert && assert( Number.isInteger( iterations ) && iterations >= 0, `invalid iterations: ${iterations}` );

    let coefficient = this.coefficient;
    let power = this.power;
    for ( let i = 0; i < iterations - 1; i++ ) {
      if ( power === 0 ) {
        power = 0;
        coefficient = 0;
        break;
      }
      else {
        coefficient = coefficient * power;
        power = power - 1;
      }
    }
    return new PolynomialTerm( power, coefficient );
  }
}

modelsOfTheHydrogenAtom.register( 'PolynomialTerm', PolynomialTerm );