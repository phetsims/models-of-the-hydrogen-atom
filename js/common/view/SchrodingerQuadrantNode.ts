// Copyright 2024, University of Colorado Boulder

/**
 * SchrodingerQuadrantNode renders one quadrant of the Schrodinger field. The field is divided into a 2D grid of cells,
 * and the cells are filled with colors of varying brightness to represent the state (n,l,m) of the electron.
 *
 * In the Java implementation, this was class GridNode in SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { CanvasNode, Color } from '../../../../scenery/js/imports.js';
import MOTHAColors from '../MOTHAColors.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Utils from '../../../../dot/js/Utils.js';

const PERCENT_CELL_OVERLAP = 0.1; // percent overlap of cells in the grid, 1.0 = 100%
const NUMBER_OF_COLORS = 100; // number of unique colors for the range of brightness values

export default class SchrodingerQuadrantNode extends CanvasNode {

  private readonly quadrantWidth: number;
  private readonly quadrantHeight: number;
  private brightness: number[][]; // brightness values, [row][column]
  private cellWidth: number;
  private cellHeight: number;

  // Caches the mapping of brightness [0,1] to color. The human eye can only differentiate between a small number of
  // different brightnesses of color, so this array can be relatively small.
  private readonly colorCache: Color[];

  public constructor( quadrantWidth: number, quadrantHeight: number ) {

    super( {
      pickable: false,
      canvasBounds: new Bounds2( 0, 0, quadrantWidth, quadrantHeight )
    } );

    this.quadrantWidth = quadrantWidth;
    this.quadrantHeight = quadrantHeight;
    this.brightness = [];
    this.cellWidth = 0;
    this.cellHeight = 0;
    this.colorCache = [];

    // If the colors change, update the color cache and trigger a call to paintCanvas.
    //TODO Why are we interpolating between 2 opaque colors? Why not just use brightness as the alpha component for electronBaseColorProperty?
    Multilink.multilink( [ MOTHAColors.zoomedInBoxFillProperty, MOTHAColors.electronBaseColorProperty ],
      ( minColor, maxColor ) => {
        this.colorCache.length = 0;
        for ( let i = 0; i <= NUMBER_OF_COLORS; i++ ) {
          this.colorCache[ i ] = Color.interpolateRGBA( minColor, maxColor, i / NUMBER_OF_COLORS );
        }
        this.invalidatePaint();
      } );
  }

  /**
   * Sets the brightness values that are applied to the cells in the grid.
   * The dimensions of the brightness array determine the number of cells.
   */
  public setBrightness( brightness: number[][] ): void {

    // Set fields used by paintCanvas.
    this.brightness = brightness;
    this.cellWidth = this.quadrantWidth / brightness[ 0 ].length;
    this.cellHeight = this.quadrantHeight / brightness.length;

    // This results in a call to paintCanvas.
    this.invalidatePaint();
  }

  /**
   * According to the documentation in superclass CanvasNode, paintCanvas should have no outside effects other than
   * drawing to the context.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    // Values used for drawing each cell.
    let x: number;
    let z: number;
    const w = ( 1 + PERCENT_CELL_OVERLAP ) * this.cellWidth;
    const h = ( 1 + PERCENT_CELL_OVERLAP ) * this.cellHeight;

    // For each cell in the 2D grid...
    const numberOfRows = this.brightness.length;
    for ( let row = 0; row < numberOfRows; row++ ) {
      const numberOfColumns = this.brightness[ row ].length;
      for ( let column = 0; column < numberOfColumns; column++ ) {

        const brightness = this.brightness[ row ][ column ];

        // Skip cells that contain no information.
        if ( brightness > 0 ) {

          // Add a rectangle for the cell.
          x = ( column * this.cellWidth );
          z = ( row * this.cellHeight );
          context.rect( x, z, w, h );

          // Fill the cell.
          const colorIndex = Utils.toFixedNumber( brightness * NUMBER_OF_COLORS, 0 );
          const color = this.colorCache[ colorIndex ];
          context.fillStyle = color.toCSS();
          context.fill();
        }
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerQuadrantNode', SchrodingerQuadrantNode );