// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerOrbitalNode renders the atomic orbital, a function describing the location and wave-like behavior of the
 * electron. The orbital is characterized by the quantum numbers (n,l,m) that describe the electron's state - see
 * SchrodingerQuantumNumbers. In this implementation, the orbital is rendered as a 2D NxN grid, where each cell in
 * the grid is filled with the electron color with varying alpha (opacity).
 *
 * In the Java implementation, this was inner classes AtomNode and GridNode in SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import CanvasNode from '../../../../scenery/js/nodes/CanvasNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import MOTHAColors from '../MOTHAColors.js';
import ZoomedInBoxNode from './ZoomedInBoxNode.js';
import schrodingerOpacityCache, { OpacityGrid } from './SchrodingerOpacityCache.js';

const QUADRANT_SIDE_LENGTH = ZoomedInBoxNode.SIDE_LENGTH / 2; // in view coordinates!

export default class SchrodingerOrbitalNode extends CanvasNode {

  private opacityGrid: OpacityGrid; // 2D grid of opacity values, in [row][column] order.
  private cellWidth: number;
  private cellHeight: number;

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      atomPosition: Vector2,
                      modelViewTransform: ModelViewTransform2 ) {

    super( {
      pickable: false,
      canvasBounds: new Bounds2( -QUADRANT_SIDE_LENGTH, -QUADRANT_SIDE_LENGTH, QUADRANT_SIDE_LENGTH, QUADRANT_SIDE_LENGTH ),
      translation: modelViewTransform.modelToViewPosition( atomPosition )
    } );

    // These values will be populated by update().
    this.opacityGrid = [];
    this.cellWidth = 0;
    this.cellHeight = 0;

    nlmProperty.link( nlm => this.update( nlm ) );

    // If the electron color changes, trigger a call to paintCanvas.
    MOTHAColors.electronBaseColorProperty.link( () => this.invalidatePaint() );
  }

  /**
   * Updates the fields that are used to render the orbital, then triggers a call to paintCanvas.
   */
  private update( nlm: SchrodingerQuantumNumbers ): void {

    // Get the 2D opacity grid that describe the orbital for the electron's state.
    this.opacityGrid = schrodingerOpacityCache.getOpacityGrid( nlm );

    // opacityGrid is for 1 quadrant, so use quadrant size to compute cell size.
    this.cellWidth = QUADRANT_SIDE_LENGTH / this.opacityGrid[ 0 ].length;
    this.cellHeight = QUADRANT_SIDE_LENGTH / this.opacityGrid.length;
    assert && assert( this.cellWidth === this.cellHeight, 'cells must be square.' );

    // This results in a call to paintCanvas.
    this.invalidatePaint();
  }

  /**
   * According to the documentation in superclass CanvasNode, paintCanvas should have no side effects other than
   * drawing to the context.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    // globalAlpha will be used to set the alpha component.
    context.fillStyle = MOTHAColors.electronBaseColorProperty.value.toCSS();

    // Values used for drawing each cell.
    let x: number;
    let z: number;
    const w = this.cellWidth;
    const h = this.cellHeight;

    // For each cell in the 2D grid...
    const numberOfRows = this.opacityGrid.length;
    for ( let row = 0; row < numberOfRows; row++ ) {
      const numberOfColumns = this.opacityGrid[ row ].length;
      for ( let column = 0; column < numberOfColumns; column++ ) {

        const opacity = this.opacityGrid[ row ][ column ];

        // Skip cells that contain no information.
        if ( opacity > 0 ) {

          // Coordinates in the right-bottom quadrant.
          x = ( column * this.cellWidth );
          z = ( row * this.cellHeight );

          // Fill a rectangle in each quadrant.
          // Use globalAlpha and fillRect because we're filling rectangles with different alpha values.
          context.globalAlpha = opacity;
          context.fillRect( x, z, w, h ); // right-bottom quadrant
          context.fillRect( -( x + this.cellWidth ), z, w, h ); // left-bottom quadrant
          context.fillRect( x, -( z + this.cellHeight ), w, h ); // right-top quadrant
          context.fillRect( -( x + this.cellWidth ), -( z + this.cellHeight ), w, h ); // left-top quadrant
        }
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerOrbitalNode', SchrodingerOrbitalNode );