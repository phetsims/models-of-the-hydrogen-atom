// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerOrbitalNode renders the atomic orbital, a function describing the location and wave-like behavior of the
 * electron. The orbital is characterized by the quantum numbers (n,l,m) that describe the electron's state - see
 * SchrodingerQuantumNumbers. In this implementation, the orbital is rendered as a 2D NxN grid, where each cell in
 * the grid is filled with the electron color with varying alpha (transparency).
 *
 * In the Java implementation, this was inner classes AtomNode and GridNode in SchrodingerNode.java.
 *
 * Some useful references for orbital shapes:
 * https://upload.wikimedia.org/wikipedia/commons/e/e7/Hydrogen_Density_Plots.png
 * https://en.wikipedia.org/wiki/Atomic_orbital#Orbitals_table
 * https://www.falstad.com/qmatom/
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import SchrodingerBrightnessCache from './SchrodingerBrightnessCache.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';

export default class SchrodingerOrbitalNode extends CanvasNode {

  private readonly quadrantSideLength: number;
  private readonly brightnessCache: SchrodingerBrightnessCache;

  private brightnessValues: number[][]; // 2D grid of brightness values, in [row][column] order.
  private cellWidth: number;
  private cellHeight: number;

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      atomPosition: Vector2,
                      modelViewTransform: ModelViewTransform2,
                      zoomedInBoxBounds: Bounds2 ) {

    assert && assert( zoomedInBoxBounds.width === zoomedInBoxBounds.height, 'zoomedInBox must be square.' );
    const quadrantSideLength = zoomedInBoxBounds.width / 2;

    super( {
      pickable: false,
      canvasBounds: new Bounds2( -quadrantSideLength, -quadrantSideLength, quadrantSideLength, quadrantSideLength ),
      translation: modelViewTransform.modelToViewPosition( atomPosition )
    } );

    this.quadrantSideLength = quadrantSideLength;
    this.brightnessCache = new SchrodingerBrightnessCache( quadrantSideLength );

    // These values will be populated by update().
    this.brightnessValues = [];
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

    // Get the brightness values that describe the orbital for the electron's state.
    this.brightnessValues = this.brightnessCache.getBrightness( nlm );

    // brightnessValues is for 1 quadrant, so use quadrant size to compute cell size.
    this.cellWidth = this.quadrantSideLength / this.brightnessValues[ 0 ].length;
    this.cellHeight = this.quadrantSideLength / this.brightnessValues.length;
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
    const numberOfRows = this.brightnessValues.length;
    for ( let row = 0; row < numberOfRows; row++ ) {
      const numberOfColumns = this.brightnessValues[ row ].length;
      for ( let column = 0; column < numberOfColumns; column++ ) {

        const brightness = this.brightnessValues[ row ][ column ];

        // Skip cells that contain no information.
        if ( brightness > 0 ) {

          // Coordinates in the right-bottom quadrant.
          x = ( column * this.cellWidth );
          z = ( row * this.cellHeight );

          // Fill a rectangle in each quadrant.
          // Use globalAlpha and fillRect because we're filling rectangles with different alpha values.
          context.globalAlpha = brightness;
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