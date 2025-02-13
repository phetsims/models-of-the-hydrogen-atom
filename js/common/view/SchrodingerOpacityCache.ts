// Copyright 2022-2025, University of Colorado Boulder

/**
 * SchrodingerOpacityCache is responsible for representing each Schrodinger (n,l,m) state as a 2D grid of opacity values
 * in the range [0,1], where 0 is transparent and 1 is opaque. The grid is used to render the electron's orbital.
 *
 * A grid is computed on demand for each (n,l,m) state, then cached. Alternatively, calling the populate method
 * will eagerly compute values for all (n,l,m) states reachable in the sim, improving runtime performance at
 * the expense of startup time.
 *
 * A singleton instance is used throughout the sim, so that we only compute the grid once for each (n,l,m) state,
 * and both screens can benefit from the same cache.
 *
 * In the Java implementation, this was class BrightnessCache in SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import QuantumElectron from '../model/QuantumElectron.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';

// Number of cells in one quadrant of the 2D grid, or in 1/8 of the 3D space.
const NUMBER_OF_CELLS = MOTHAQueryParameters.gridSize;

const QUADRANT_SIDE_LENGTH = ZoomedInBox.SIDE_LENGTH / 2; // in model coordinates!

// A 2D grid of opacity values that describes the orbital for a specific (n,l,m) state, in [row][column] order.
export type OpacityGrid = Array<Array<number>>;

class SchrodingerOpacityCache {

  // Cache of 2D opacity grids, indexed by [n-1][l][abs(m)]. This data structure is large, but heap snapshots in
  // Chrome Dev Tools show that the sim still has a reasonable memory footprint.
  private readonly cache: Array<Array<Array<OpacityGrid | null>>>;

  // Reusable array for summing probability densities.
  private readonly sums: Array<Array<number>>;

  // The length of one side of a cell, which is a cube.
  private readonly cellSideLength: number;

  public constructor() {

    // Create the cache and initialize entries to null for all reachable (n,l,m) states.
    this.cache = [];
    for ( let n = 1; n <= QuantumElectron.MAX_STATE; n++ ) {
      const index = n - 1; // The cache is indexed by n-1, because the range of n is [1,6].
      this.cache[ index ] = [];
      for ( let l = 0; l <= Math.min( n - 1, SchrodingerQuantumNumbers.lMax ); l++ ) {
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

    // 3D cell size, where each cell is a cube.
    this.cellSideLength = QUADRANT_SIDE_LENGTH / NUMBER_OF_CELLS;

    // Eagerly populate the cache.
    if ( MOTHAQueryParameters.computeOrbitals === 'atStartup' ) {
      this.populate();
    }
  }

  /**
   * Eagerly populates the cache for the electron states that are reachable in this sim.
   */
  private populate(): void {
    for ( let n = 1; n <= QuantumElectron.MAX_STATE; n++ ) {
      for ( let l = 0; l <= Math.min( n - 1, SchrodingerQuantumNumbers.lMax ); l++ ) {
        for ( let m = 0; m <= l; m++ ) {
          this.getOpacityGrid( new SchrodingerQuantumNumbers( n, l, m ) );
        }
      }
    }
  }

  /**
   * Gets the 2D opacity grid for a state. If it's not already cached, compute it and cache it.
   */
  public getOpacityGrid( nlm: SchrodingerQuantumNumbers ): OpacityGrid {
    let opacityGrid = this.getCachedOpacityGrid( nlm );
    assert && assert( opacityGrid !== undefined );
    if ( opacityGrid === null ) {
      opacityGrid = this.computeOpacityGrid( nlm );
      this.setCachedOpacityGrid( nlm, opacityGrid );
    }
    return opacityGrid;
  }

  /**
   * Sets opacity values for an electron state (n,l,m) in the cache.
   * Note that the cache is indexed by n-1, because the range of n is [1,6].
   */
  private setCachedOpacityGrid( nlm: SchrodingerQuantumNumbers, opacityGrid: OpacityGrid ): void {
    phet.log && phet.log( `Populating orbital cache for (n,l,m) = ${nlm.toString()}` );
    this.cache[ nlm.n - 1 ][ nlm.l ][ Math.abs( nlm.m ) ] = opacityGrid;
  }

  /**
   * Gets opacity values for an electron state (n,l,m) from the cache.
   * Note that the cache is indexed by n-1, because the range of n is [1,6].
   */
  private getCachedOpacityGrid( nlm: SchrodingerQuantumNumbers ): OpacityGrid | null {
    return this.cache[ nlm.n - 1 ][ nlm.l ][ Math.abs( nlm.m ) ];
  }

  /**
   * Computes the 2D opacity grid for an (n,l,m) state.
   */
  private computeOpacityGrid( nlm: SchrodingerQuantumNumbers ): OpacityGrid {

    // The maximum sum, to be used for normalizing.
    let maxSum = 0;

    // Calculate the probability density at each point in 3D space. Then sum the values along the depth (y) axis
    // that have the same (x,z) coordinates.
    for ( let row = 0; row < NUMBER_OF_CELLS; row++ ) {
      const z = ( row * this.cellSideLength ) + ( this.cellSideLength / 2 );
      for ( let column = 0; column < NUMBER_OF_CELLS; column++ ) {
        const x = ( column * this.cellSideLength ) + ( this.cellSideLength / 2 );
        let sum = 0;
        for ( let depth = 0; depth < NUMBER_OF_CELLS; depth++ ) {
          const y = ( depth * this.cellSideLength ) + ( this.cellSideLength / 2 );
          const probabilityDensity = SchrodingerModel.solveProbabilityDensity( nlm, x, y, z );
          sum += probabilityDensity;
        }
        this.sums[ row ][ column ] = sum;
        if ( sum > maxSum ) {
          maxSum = sum;
        }
      }
    }

    // Create the 2D grid, initially filled with zeros
    const opacityGrid = new Array( NUMBER_OF_CELLS );
    for ( let i = 0; i < NUMBER_OF_CELLS; i++ ) {
      opacityGrid[ i ] = new Array( NUMBER_OF_CELLS ).fill( 0 );
    }

    // Populate the 2D grid with normalized opacity values in the range [0,1].
    for ( let row = 0; row < NUMBER_OF_CELLS; row++ ) {
      for ( let column = 0; column < NUMBER_OF_CELLS; column++ ) {
        let opacity = 0;
        if ( maxSum > 0 ) {
          opacity = this.sums[ row ][ column ] / maxSum;
        }
        opacityGrid[ row ][ column ] = opacity;
      }
    }

    return opacityGrid;
  }
}

// Singleton
const schrodingerOpacityCache = new SchrodingerOpacityCache();

modelsOfTheHydrogenAtom.register( 'SchrodingerOpacityCache', SchrodingerOpacityCache );
export default schrodingerOpacityCache;