// Copyright 2025, University of Colorado Boulder

/**
 * SchrodingerImageCache is a cache of PNG images for Schrodinger orbitals. PNG files can be created as needed,
 * or eagerly on startup by calling the populate method.
 *
 * Here's the process for creating the image that corresponds to the orbital for some (n,l,m) state:
 *
 * 1. Probability density is sampled on a uniform 3D grid, for 1/8 of the 3D space.
 * 2. The 3D grid is projected into 2D space, for the rightBottom quadrant.
 * 3. The 2D data for the rightBottom quadrant is used to symmetrically fill data for the other 3 quadrants.
 * 4. Pixel data (rgba) is created from the 2D probability density samples. The electron color is used for the
 *    rgb components, and the probability density sample is used to compute the alpha component (a).
 * 5. Canvas draws the pixel data to an internal "file", where it is accessible via a data URL.
 * 6. The data URL is cached.
 *
 * To get the PNG file for an orbital, call getDataURL( nlm ). Since the PNG contains only pixels for the sample points,
 * the PNG will need to be scaled up when rendered. Scaling up will automatically provide interpolation/smoothing of
 * the image. See SchrodingerOrbitalNode for details.
 *
 * Useful references for orbital shapes:
 * https://upload.wikimedia.org/wikipedia/commons/e/e7/Hydrogen_Density_Plots.png
 * https://en.wikipedia.org/wiki/Atomic_orbital#Orbitals_table
 * https://www.mathworks.com/matlabcentral/fileexchange/64274-hydrogen-orbitals
 * https://www.falstad.com/qmatom/
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import QuantumElectron from '../model/QuantumElectron.js';
import ZoomedInBox from '../model/ZoomedInBox.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import MOTHAColors from '../MOTHAColors.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

// Number of cells in 1/8 of the 3D grid, and one quadrant of the 2D grid.
const NUMBER_OF_CELLS = MOTHAQueryParameters.gridSize;

// The length of one side of a 3D or 2D cell, in model coordinates.
const CELL_SIDE_LENGTH = ( ZoomedInBox.SIDE_LENGTH / 2 ) / NUMBER_OF_CELLS;

const CANVAS_SIDE_LENGTH = 2 * NUMBER_OF_CELLS;

// A 2D grid of numbers.
type NumberGrid2D = Array<Array<number>>;

class SchrodingerImageCache {

  // Cache of dataURLs, indexed by [n-1][l][abs(m)]. These dataURLs point to PNG files for the orbitals.
  private readonly cache: Array<Array<Array<string | null>>>;

  // Reusable array for summing probability densities. This is used to project 3D samples into 2D.
  private readonly sums: NumberGrid2D;

  // Canvas and context used to create PNG files.
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

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

    // Reusable canvas and context.
    this.canvas = document.createElement( 'canvas' );
    this.canvas.width = CANVAS_SIDE_LENGTH;
    this.canvas.height = CANVAS_SIDE_LENGTH;
    this.context = this.canvas.getContext( '2d', { alpha: true } )!;

    // Eagerly populate the cache. The alternative is to populate the cache as needed, when getDataURL is called.
    if ( MOTHAQueryParameters.computeOrbitals === 'atStartup' ) {
      this.populate();
    }
  }

  /**
   * Eagerly populates the cache for the electron states that are reachable in this sim.
   */
  private populate(): void {
    let count = 0;
    for ( let n = 1; n <= this.cache.length; n++ ) {
      const index = n - 1; // The cache is indexed by n-1, because the range of n is [1,6].
      for ( let l = 0; l < this.cache[ index ].length; l++ ) {
        for ( let m = 0; m < this.cache[ index ][ l ].length; m++ ) {
          this.getDataURL( new SchrodingerQuantumNumbers( n, l, m ) ); // Requesting a dataURL causes it to be cached.
          count++;
        }
      }
    }
    phet.log && phet.log( `Cached ${count} orbital images.`, {
      color: MOTHAColors.LOG_CACHE_ORBITAL
    } );
  }

  /**
   * Gets a dataURL containing an orbital's image in PNG format. If not previously cached, it will be created and cached.
   * This PNG file shows the complete orbital, for all 4 quadrants.
   */
  public getDataURL( nlm: SchrodingerQuantumNumbers ): string {

    // Attempt to get the data URL for the orbital image from the cache.
    let dataURL = this.getCachedDataURL( nlm );

    // If not cached, create the image and cache its data URL.
    if ( !dataURL ) {

      // Use the electron's color for rgb components.
      const r = MOTHAColors.electronBaseColorProperty.value.r;
      const g = MOTHAColors.electronBaseColorProperty.value.g;
      const b = MOTHAColors.electronBaseColorProperty.value.b;

      // Compute 2D probability density for the electron state.
      const probabilityDensity2D = this.computeProbabilityDensity2D( nlm );
      const probabilityDensity1D = probabilityDensity2D.flat();
      assert && assert( probabilityDensity1D.length === CANVAS_SIDE_LENGTH * CANVAS_SIDE_LENGTH,
        'probabilityDensity1D does not fill the canvas dimensions.' );

      // Create rgba pixels for the PNG image, with probabilityDensity used to compute the alpha component.
      const rgbaArray = probabilityDensity1D.map( probabilityDensity =>
        [ r, g, b, toFixedNumber( probabilityDensity * 255, 0 ) ] ).flat();
      assert && assert( rgbaArray.length === 4 * CANVAS_SIDE_LENGTH * CANVAS_SIDE_LENGTH,
        'rgbaArray does not fill the canvas dimensions.' );
      const imageData = new ImageData( CANVAS_SIDE_LENGTH, CANVAS_SIDE_LENGTH );
      imageData.data.set( rgbaArray );

      // Draw the pixels to the canvas, and create a data URL in PNG format. We do not need to clear the canvas
      // because imageData completely fills the canvas dimensions.
      this.context.putImageData( imageData, 0, 0 );
      dataURL = this.canvas.toDataURL( 'image/png' );

      // Cache the data URL for the PNG file.
      this.setCachedDataURL( nlm, dataURL );
    }

    return dataURL;
  }

  /**
   * Sets the data URL (PNG image) for an electron state (n,l,m) in the cache. Note that:
   * - The cache is indexed by n-1, because the range of n is [1,6].
   * - The orbital is (n,l,+m) and (n,l,-m) is the same. See solveAssociatedLegendrePolynomial.
   */
  private setCachedDataURL( nlm: SchrodingerQuantumNumbers, dataURL: string ): void {
    phet.log && phet.log( `Populating orbital cache for (n,l,m) = ${nlm.toString()}`, {
      color: MOTHAColors.LOG_CACHE_ORBITAL
    } );
    this.cache[ nlm.n - 1 ][ nlm.l ][ Math.abs( nlm.m ) ] = dataURL;
  }

  /**
   * Gets the data URL (PNG image) for an electron state (n,l,m) in the cache. Note that:
   * - The cache is indexed by n-1, because the range of n is [1,6].
   * - The orbital is (n,l,+m) and (n,l,-m) is the same. See solveAssociatedLegendrePolynomial.
   */
  private getCachedDataURL( nlm: SchrodingerQuantumNumbers ): string | null {
    return this.cache[ nlm.n - 1 ][ nlm.l ][ Math.abs( nlm.m ) ];
  }

  /**
   * Computes the 2D probability density grid for an (n,l,m) state.
   */
  private computeProbabilityDensity2D( nlm: SchrodingerQuantumNumbers ): NumberGrid2D {

    // The maximum sum, to be used for normalizing.
    let maxSum = 0;

    // Calculate the probability density at each point in 3D space. Then project to 2D by summing the values along
    // the depth (y) axis that have the same (x,z) coordinates. This is for the rightBottom quadrant of the 2D grid.
    for ( let row = 0; row < NUMBER_OF_CELLS; row++ ) {
      const z = ( row * CELL_SIDE_LENGTH ) + ( CELL_SIDE_LENGTH / 2 );
      for ( let column = 0; column < NUMBER_OF_CELLS; column++ ) {
        const x = ( column * CELL_SIDE_LENGTH ) + ( CELL_SIDE_LENGTH / 2 );
        let sum = 0;
        for ( let depth = 0; depth < NUMBER_OF_CELLS; depth++ ) {
          const y = ( depth * CELL_SIDE_LENGTH ) + ( CELL_SIDE_LENGTH / 2 );
          const probabilityDensity = SchrodingerModel.solveProbabilityDensity( nlm, x, y, z );
          sum += probabilityDensity;
        }
        this.sums[ row ][ column ] = sum;
        if ( sum > maxSum ) {
          maxSum = sum;
        }
      }
    }

    // Create the 2D grid for the rightBottom quadrant, initially filled with zeros
    const rightBottomGrid = new Array<Array<number>>( NUMBER_OF_CELLS );
    for ( let i = 0; i < NUMBER_OF_CELLS; i++ ) {
      rightBottomGrid[ i ] = new Array<number>( NUMBER_OF_CELLS ).fill( 0 );
    }

    // Data for the rightBottom quadrant, normalized to range [0,1].
    for ( let row = 0; row < NUMBER_OF_CELLS; row++ ) {
      for ( let column = 0; column < NUMBER_OF_CELLS; column++ ) {
        let normalizedValue = 0;
        if ( maxSum > 0 ) {
          normalizedValue = this.sums[ row ][ column ] / maxSum;
        }
        rightBottomGrid[ row ][ column ] = normalizedValue;
      }
    }

    // Data for the leftBottom quadrant.
    const leftBottomGrid = rightBottomGrid.map( rightHalfRow => [ ...rightHalfRow ].reverse() );

    // Data for the bottom half of the grid, by combining the data for leftBottom and rightBottom quadrants.
    const bottomHalfGrid: NumberGrid2D = [];
    for ( let i = 0; i < leftBottomGrid.length; i++ ) {
      const leftRow = leftBottomGrid[ i ];
      const rightRow = rightBottomGrid[ i ];
      bottomHalfGrid.push( [ ...leftRow, ...rightRow ] );
    }

    // Data for the top half for the grid.
    const topHalfGrid: NumberGrid2D = [ ...bottomHalfGrid ].reverse();

    // Data for the full 2D grid, which completely describes the orbital's probability density.
    return [ ...topHalfGrid, ...bottomHalfGrid ];
  }
}

// Singleton
const schrodingerImageCache = new SchrodingerImageCache();

modelsOfTheHydrogenAtom.register( 'SchrodingerImageCache', SchrodingerImageCache );
export { schrodingerImageCache };