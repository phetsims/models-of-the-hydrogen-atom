// Copyright 2022-2025, University of Colorado Boulder

//TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/115 Make this a singleton, to reuse the same cache for both screens.
/**
 * SchrodingerBrightnessCache is responsible for representing Schrodinger states (and their associated wavefunctions)
 * as brightness values that are used to render the electron orbital. Brightness is computed on demand, then cached.
 * The cache is configured for a fixed number of states, and a fixed size 2D grid. See SchrodingerNode for more
 * documentation.
 *
 * In the Java implementation, this was class BrightnessCache in SchrodingerNode.java. The Java version provided
 * an option to pre-populate the cache. This proved to be quite time-consuming and the option was never used.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import QuantumElectron from '../model/QuantumElectron.js';

// Number of cells in one quadrant, in all dimensions.
const NUMBER_OF_CELLS = 40; //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/115 Improve resolution by increasing number of cells? But that hurts performance...

export default class SchrodingerBrightnessCache {

  // Cache of 2D brightness values [row][column], indexed by [n-1][l][abs(m)].
  // This data structure is huge, but Chrome heap snapshot shows that the sim still has a relatively normal memory footprint.
  private readonly cache: Array<Array<Array<null | Array<Array<number>>>>>;

  // reusable array for computing sums
  private readonly sums: Array<Array<number>>;

  // The length of one side of a cell, which is a cube.
  private readonly cellSideLength: number;

  /**
   * @param quadrantSideLength - side length of the quadrant, which is square
   */
  public constructor( quadrantSideLength: number ) {

    // Create the cache and initialize entries to null.
    this.cache = [];
    for ( let n = 1; n <= QuantumElectron.MAX_STATE; n++ ) {
      const index = n - 1; // The cache is indexed by n-1, because the range of n is [1,6].
      this.cache[ index ] = [];
      for ( let l = 0; l <= n - 1; l++ ) {
        this.cache[ index ][ l ] = [];
        for ( let m = 0; m <= l; m++ ) {
          this.cache[ index ][ l ][ m ] = null;
        }
      }
    }

    // Initialize reusable sums with zeros.
    this.sums = new Array( NUMBER_OF_CELLS );
    for ( let i = 0; i < NUMBER_OF_CELLS; i++ ) {
      this.sums[ i ] = new Array( NUMBER_OF_CELLS ).fill( 0 );
    }
    phet.log && phet.log( `SchrodingerBrightness.sums contains ${this.sums.length} entries.` );

    // 3D cell size
    this.cellSideLength = quadrantSideLength / NUMBER_OF_CELLS;
  }

  /**
   * Gets the 2D brightness for a state. If it's not already cached, compute it and cache it.
   */
  public getBrightness( nlm: SchrodingerQuantumNumbers ): number[][] {
    let brightness = this.getCachedBrightness( nlm );
    assert && assert( brightness !== undefined );
    if ( brightness === null ) {
      brightness = this.computeBrightness( nlm );
      this.setCachedBrightness( nlm, brightness );
    }
    return brightness;
  }

  /**
   * Sets brightness values for an electron state (n,l,m) in the cache.
   * Note that the cache is indexed by n-1, because the range of n is [1,6].
   */
  private setCachedBrightness( nlm: SchrodingerQuantumNumbers, brightness: number[][] ): void {
    this.cache[ nlm.n - 1 ][ nlm.l ][ Math.abs( nlm.m ) ] = brightness;
  }

  /**
   * Gets brightness values for an electron state (n,l,m) from the cache.
   * Note that the cache is indexed by n-1, because the range of n is [1,6].
   */
  private getCachedBrightness( nlm: SchrodingerQuantumNumbers ): number[][] | null {
    return this.cache[ nlm.n - 1 ][ nlm.l ][ Math.abs( nlm.m ) ];
  }


  /**
   * Computes the 2D brightness for a state.
   */
  private computeBrightness( nlm: SchrodingerQuantumNumbers ): number[][] {

    // 2D array filled with zeros
    const brightness = new Array( NUMBER_OF_CELLS );
    for ( let i = 0; i < NUMBER_OF_CELLS; i++ ) {
      brightness[ i ] = new Array( NUMBER_OF_CELLS ).fill( 0 );
    }

    let maxSum = 0;

    for ( let row = 0; row < NUMBER_OF_CELLS; row++ ) {
      const z = ( row * this.cellSideLength ) + ( this.cellSideLength / 2 );
      assert && assert( z > 0, `invalid z: ${z}` );
      for ( let column = 0; column < NUMBER_OF_CELLS; column++ ) {
        const x = ( column * this.cellSideLength ) + ( this.cellSideLength / 2 );
        assert && assert( x > 0, `invalid x: ${x}` );
        let sum = 0;
        for ( let depth = 0; depth < NUMBER_OF_CELLS; depth++ ) {
          const y = ( depth * this.cellSideLength ) + ( this.cellSideLength / 2 );
          assert && assert( y > 0, `invalid y: ${y}` );
          const probabilityDensity = SchrodingerModel.solveProbabilityDensity( nlm, x, y, z );
          sum += probabilityDensity;
        }
        this.sums[ row ][ column ] = sum;
        if ( sum > maxSum ) {
          maxSum = sum;
        }
      }
    }

    for ( let row = 0; row < NUMBER_OF_CELLS; row++ ) {
      for ( let column = 0; column < NUMBER_OF_CELLS; column++ ) {
        let b = 0;
        if ( maxSum > 0 ) {
          b = this.sums[ row ][ column ] / maxSum;
        }
        brightness[ row ][ column ] = b;
      }
    }

    return brightness;
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerBrightnessCache', SchrodingerBrightnessCache );