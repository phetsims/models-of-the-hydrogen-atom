// Copyright 2024, University of Colorado Boulder

/**
 * SchrodingerQuadrantNode renders one quadrant of the 2D Schrodinger field.
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

const PERCENT_CELL_OVERLAP = 0.1; // 1.0 = 100%
const MIN_COLOR_PROPERTY = MOTHAColors.zoomedInBoxFillProperty;
const MAX_COLOR_PROPERTY = MOTHAColors.electronBaseColorProperty;

export default class SchrodingerQuadrantNode extends CanvasNode {

  private readonly quadrantWidth: number;
  private readonly quadrantHeight: number;
  private brightness: number[][]; // brightness values, [row][column]
  private cellWidth: number;
  private cellHeight: number;

  public constructor( quadrantWidth: number, quadrantHeight: number ) {

    super( {
      pickable: false
    } );

    this.quadrantWidth = quadrantWidth;
    this.quadrantHeight = quadrantHeight;
    this.brightness = [];
    this.cellWidth = 0;
    this.cellHeight = 0;

    // If the colors that we use to render the Canvas change, trigger a call to paintCanvas.
    Multilink.lazyMultilink( [ MIN_COLOR_PROPERTY, MAX_COLOR_PROPERTY ], () => this.invalidatePaint() );
  }

  /**
   * Sets the brightness values that are applied to the cells in the grid.
   * The dimensions of the brightness array determine the number of cells.
   */
  public setBrightness( brightness: number[][] ): void {
    this.brightness = brightness;
    this.cellWidth = this.quadrantWidth / brightness[ 0 ].length;
    this.cellHeight = this.quadrantHeight / brightness.length;

    // Compute the canvasBounds, the region to which we draw. This needs to be done before the animation frame happens.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/43
    //TODO Can canvasBounds just be set to quadrantWidth x quadrantHeight in constructor?
    const numberOfRows = this.brightness.length;
    const numberOfColumns = Math.max( ...this.brightness.map( row => row.length ) );
    this.canvasBounds = new Bounds2(
      0,
      0,
      ( ( numberOfColumns - 1 ) * this.cellWidth ) + ( 1 + PERCENT_CELL_OVERLAP ) * this.cellWidth,
      ( ( numberOfRows - 1 ) * this.cellHeight ) + ( 1 + PERCENT_CELL_OVERLAP ) * this.cellHeight
    );

    this.invalidatePaint(); // results in a call to paintCanvas
  }

  /**
   * From superclass CanvasNode: paintCanvas should have no outside effects other than drawing to the context.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    let x: number;
    let z: number;
    const w = ( 1 + PERCENT_CELL_OVERLAP ) * this.cellWidth;
    const h = ( 1 + PERCENT_CELL_OVERLAP ) * this.cellHeight;
    const numberOfRows = this.brightness.length;

    const minColor = MIN_COLOR_PROPERTY.value;
    const maxColor = MAX_COLOR_PROPERTY.value;

    // For each cell in the 2D grid...
    for ( let row = 0; row < numberOfRows; row++ ) {
      const numberOfColumns = this.brightness[ row ].length;
      for ( let column = 0; column < numberOfColumns; column++ ) {

        // Define the cell.
        x = ( column * this.cellWidth );
        z = ( row * this.cellHeight );
        context.rect( x, z, w, h );

        // Fill the cell.
        const brightness = this.brightness[ row ][ column ];
        const color = Color.interpolateRGBA( minColor, maxColor, brightness );
        context.fillStyle = color.toCSS();
        context.fill();
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerQuadrantNode', SchrodingerQuadrantNode );