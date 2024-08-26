// Copyright 2022-2024, University of Colorado Boulder

/**
 * SchrodingerBrightness is responsible for representing Schrodinger states (and their associated wavefunctions)
 * as brightness. Brightness is computed on demand, then cached. The cache is configured for a fixed number of states,
 * and a fixed size 2D grid. See SchrodingerFieldNode for more documentation.
 *
 * In the Java implementation, this was class BrightnessCache in SchrodingerNode.java. The Java version provided
 * an option to pre-populate the cache. This proved to be quite time-consuming and the option was never used.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import SchrodingerModel from '../model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import MOTHAConstants from '../MOTHAConstants.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';

const NUMBER_OF_HORIZONTAL_CELLS = 40;
const NUMBER_OF_VERTICAL_CELLS = NUMBER_OF_HORIZONTAL_CELLS;
const NUMBER_OF_DEPTH_CELLS = NUMBER_OF_HORIZONTAL_CELLS;

export default class SchrodingerBrightness {

  private readonly hydrogenAtom: SchrodingerModel;

  private readonly cache: Array<Array<Array<null | Array<Array<number>>>>>; // [n][l][m][z][x]
  private readonly sums: Array<Array<number>>; // reusable array for computing sums

  private readonly cellWidth: number;
  private readonly cellHeight: number;
  private readonly cellDepth: number;

  /**
   * @param hydrogenAtom
   * @param zoomedInBoxBounds - in view coordinates
   */
  public constructor( hydrogenAtom: SchrodingerModel, zoomedInBoxBounds: Bounds2 ) {

    this.hydrogenAtom = hydrogenAtom;

    const nMax = MOTHAConstants.MAX_STATE;

    // Initialize brightness entries to null. This data structure is huge - 89,600 entries.
    // Chrome heap snapshot shows that the sim still has a relatively normal memory footprint.
    this.cache = new Array( nMax );
    let numberOfEntries = 0;
    for ( let n = 1; n <= nMax; n++ ) {
      const lSize = n;
      this.cache[ n - 1 ] = new Array( lSize );
      for ( let l = 0; l < lSize; l++ ) {
        const mSize = l + 1;
        this.cache[ n - 1 ][ l ] = new Array( mSize );
        for ( let m = 0; m < l + 1; m++ ) {
          const zSize = NUMBER_OF_VERTICAL_CELLS;
          this.cache[ n - 1 ][ l ][ m ] = new Array( zSize );
          for ( let z = 0; z < zSize; z++ ) {
            for ( let x = 0; x < NUMBER_OF_HORIZONTAL_CELLS; x++ ) {
              this.cache[ n - 1 ][ l ][ m ] = null;
              numberOfEntries++;
            }
          }
        }
      }
    }
    phet.log && phet.log( `SchrodingerBrightness.cache contains ${numberOfEntries} entries.` );

    // Initialize sums with zeros
    this.sums = new Array( NUMBER_OF_VERTICAL_CELLS );
    for ( let i = 0; i < NUMBER_OF_VERTICAL_CELLS; i++ ) {
      this.sums[ i ] = new Array( NUMBER_OF_HORIZONTAL_CELLS ).fill( 0 );
    }
    phet.log && phet.log( `SchrodingerBrightness.sums contains ${this.sums.length} entries.` );

    // 3D cell size
    this.cellWidth = ( zoomedInBoxBounds.width / NUMBER_OF_HORIZONTAL_CELLS ) / 2;
    this.cellHeight = ( zoomedInBoxBounds.height / NUMBER_OF_VERTICAL_CELLS ) / 2;
    this.cellDepth = ( zoomedInBoxBounds.height / NUMBER_OF_DEPTH_CELLS ) / 2;
  }

  /**
   * Gets the 2D brightness for a state. If it's not already cached, compute it and cache it.
   */
  public getBrightness( quantumNumbers: SchrodingerQuantumNumbers ): number[][] {

    const n = quantumNumbers.n;
    const l = quantumNumbers.l;
    const m = Math.abs( quantumNumbers.m );

    let brightness: number[][] | null = this.cache[ n - 1 ][ l ][ m ];
    assert && assert( brightness !== undefined );
    if ( brightness === null ) {
      brightness = this.computeBrightness( n, l, m );
      this.cache[ n - 1 ][ l ][ m ] = brightness;
    }
    return brightness;
  }

  /**
   * Computes the 2D brightness for a state.
   */
  private computeBrightness( n: number, l: number, m: number ): number[][] {

    // 2D array filled with zeros
    const brightness = Array( NUMBER_OF_VERTICAL_CELLS );
    for ( let i = 0; i < NUMBER_OF_VERTICAL_CELLS; i++ ) {
      brightness[ i ] = Array( NUMBER_OF_HORIZONTAL_CELLS ).fill( 0 );
    }

    let maxSum = 0;

    for ( let row = 0; row < NUMBER_OF_VERTICAL_CELLS; row++ ) {
      const z = ( row * this.cellHeight ) + ( this.cellHeight / 2 );
      assert && assert( z > 0 );
      for ( let column = 0; column < NUMBER_OF_HORIZONTAL_CELLS; column++ ) {
        const x = ( column * this.cellWidth ) + ( this.cellWidth / 2 );
        assert && assert( x > 0 );
        let sum = 0;
        for ( let depth = 0; depth < NUMBER_OF_DEPTH_CELLS; depth++ ) {
          const y = ( depth * this.cellDepth ) + ( this.cellDepth / 2 );
          assert && assert( y > 0 );
          const probabilityDensity = this.hydrogenAtom.getProbabilityDensity( n, l, m, x, y, z );
          sum += probabilityDensity;
        }
        this.sums[ row ][ column ] = sum;
        if ( sum > maxSum ) {
          maxSum = sum;
        }
      }
    }

    for ( let row = 0; row < NUMBER_OF_VERTICAL_CELLS; row++ ) {
      for ( let column = 0; column < NUMBER_OF_HORIZONTAL_CELLS; column++ ) {
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

modelsOfTheHydrogenAtom.register( 'SchrodingerBrightness', SchrodingerBrightness );