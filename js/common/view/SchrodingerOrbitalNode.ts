// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerOrbitalNode renders the atomic orbital, a function describing the location and wave-like behavior of the
 * electron. The orbital is characterized by the quantum numbers (n,l,m) that describe the electron's state - see
 * SchrodingerQuantumNumbers.
 *
 * In the Java implementation, this was inner classes AtomNode and GridNode in SchrodingerNode.java.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Utils from '../../../../dot/js/Utils.js';
import { CanvasNode, Color } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import SchrodingerBrightnessCache from './SchrodingerBrightnessCache.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Vector2 from '../../../../dot/js/Vector2.js';

const PERCENT_CELL_OVERLAP = 0.1; // percent overlap of cells in the grid, 1.0 = 100%
const NUMBER_OF_COLORS = 100; // number of unique colors for the range of brightness values

export default class SchrodingerOrbitalNode extends CanvasNode {

  private readonly canvasWidth: number;
  private readonly canvasHeight: number;

  private brightnessValues: number[][]; // brightness values for 2D grid, [row][column]
  private cellWidth: number;
  private cellHeight: number;

  private readonly brightnessCache: SchrodingerBrightnessCache;

  // Caches the mapping of brightness [0,1] to CSS color string. The human eye can only differentiate between
  // a small number of different brightnesses of color, so this array can be relatively small.
  private readonly colorCache: string[];

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      atomPosition: Vector2,
                      modelViewTransform: ModelViewTransform2,
                      zoomedInBoxBounds: Bounds2 ) {

    const canvasWidth = zoomedInBoxBounds.width;
    const canvasHeight = zoomedInBoxBounds.height;

    super( {
      pickable: false,
      canvasBounds: new Bounds2( -canvasWidth / 2, -canvasHeight / 2, canvasWidth / 2, canvasHeight / 2 ),
      translation: modelViewTransform.modelToViewPosition( atomPosition )
    } );

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.brightnessValues = [];
    this.cellWidth = 0;
    this.cellHeight = 0;
    this.colorCache = [];

    this.brightnessCache = new SchrodingerBrightnessCache( zoomedInBoxBounds );

    nlmProperty.link( nlm => this.updateBrightness( nlm ) );

    // If the colors change, update the color cache and trigger a call to paintCanvas.
    //TODO Why are we interpolating between 2 opaque colors? Why not just use brightness as the alpha component for electronBaseColorProperty?
    Multilink.multilink( [ MOTHAColors.zoomedInBoxFillProperty, MOTHAColors.electronBaseColorProperty ],
      ( minColor, maxColor ) => {
        this.colorCache.length = 0;
        for ( let i = 0; i <= NUMBER_OF_COLORS; i++ ) {
          this.colorCache[ i ] = Color.interpolateRGBA( minColor, maxColor, i / NUMBER_OF_COLORS ).toCSS();
        }
        this.invalidatePaint();
      } );
  }

  /**
   * Sets the brightness values that are applied to the cells in the grid.
   * The dimensions of the brightness array determine the number of cells.
   */
  private updateBrightness( nlm: SchrodingerQuantumNumbers ): void {

    // Set fields used by paintCanvas.
    this.brightnessValues = this.brightnessCache.getBrightness( nlm );
    this.cellWidth = 0.5 * this.canvasWidth / this.brightnessValues[ 0 ].length;
    this.cellHeight = 0.5 * this.canvasHeight / this.brightnessValues.length;

    // This results in a call to paintCanvas.
    this.invalidatePaint();
  }

  /**
   * According to the documentation in superclass CanvasNode, paintCanvas should have no side effects other than
   * drawing to the context.
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    const enabled = false; //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/51 Not rendering correctly and causing a performance problem.
    if ( enabled ) {

      // Values used for drawing each cell.
      let x: number;
      let z: number;
      const w = ( 1 + PERCENT_CELL_OVERLAP ) * this.cellWidth;
      const h = ( 1 + PERCENT_CELL_OVERLAP ) * this.cellHeight;

      // For each cell in the 2D grid...
      const numberOfRows = this.brightnessValues.length;
      for ( let row = 0; row < numberOfRows; row++ ) {
        const numberOfColumns = this.brightnessValues[ row ].length;
        for ( let column = 0; column < numberOfColumns; column++ ) {

          const brightness = this.brightnessValues[ row ][ column ];

          // Skip cells that contain no information.
          if ( brightness > 0 ) {

            // Add a rectangle for the cell to each quadrant.
            x = ( column * this.cellWidth );
            z = ( row * this.cellHeight );
            context.rect( x, z, w, h );
            context.rect( -x, z, w, h );
            context.rect( x, -z, w, h );
            context.rect( -x, -z, w, h );

            // Fill the cell.
            const colorIndex = Utils.toFixedNumber( brightness * NUMBER_OF_COLORS, 0 );
            context.fillStyle = this.colorCache[ colorIndex ];
            context.fill();
          }
        }
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerOrbitalNode', SchrodingerOrbitalNode );