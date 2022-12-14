// Copyright 2022, University of Colorado Boulder

/**
 * TODO
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { CanvasNode, Color, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import SchrodingerModel from '../model/SchrodingerModel.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MOTHAColors from '../MOTHAColors.js';
import Multilink from '../../../../axon/js/Multilink.js';
import SchrodingerBrightness from './SchrodingerBrightness.js';

type SelfOptions = EmptySelfOptions;

type SchrodingerFieldNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

//TODO this was SchrodingerNode.AtomNode is Java
export default class SchrodingerFieldNode extends Node {

  private readonly upperLeftQuadrantNode: QuadrantNode;
  private readonly brightnessCache: SchrodingerBrightness;

  public constructor( hydrogenAtom: SchrodingerModel, modelViewTransform: ModelViewTransform2,
                      providedOptions: SchrodingerFieldNodeOptions ) {

    const options = optionize<SchrodingerFieldNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO
    }, providedOptions );

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( hydrogenAtom.zoomedInBox );

    const upperLeftQuadrantNode = new QuadrantNode( zoomedInBoxBounds.width / 2, zoomedInBoxBounds.height / 2 );
    //TODO wrap upperLeftQuadrantNode in 4 other Nodes, transformed for each quadrant

    options.children = [ upperLeftQuadrantNode ];

    super( options );

    this.upperLeftQuadrantNode = upperLeftQuadrantNode;
    this.brightnessCache = new SchrodingerBrightness( hydrogenAtom, zoomedInBoxBounds );

    Multilink.multilink( [ hydrogenAtom.getElectronStateProperty(), hydrogenAtom.secondaryElectronStateProperty, hydrogenAtom.tertiaryElectronStateProperty ],
      ( n, l, m ) => this.update( n, l, m ) );
  }

  private update( n: number, l: number, m: number ): void {
    const brightness = this.brightnessCache.getBrightness( n, l, Math.abs( m ) );
    this.upperLeftQuadrantNode.setBrightness( brightness );
  }
}

//TODO this was SchrodingerNode.GridNode is Java, one quadrant of the field
/**
 * QuadrantNode renders one quadrant of the 2D Schrodinger field.
 */
class QuadrantNode extends CanvasNode {

  private static readonly PERCENT_CELL_OVERLAP = 0.1; // 1.0 = 100%

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
    Multilink.lazyMultilink( [ MOTHAColors.zoomedInBoxFillProperty, MOTHAColors.electronBaseColorProperty ],
      () => this.invalidatePaint() );
  }

  /**
   * Sets the brightness values that are applied to the cells in the grid.
   * The dimensions of the brightness array determine the number of cells.
   */
  public setBrightness( brightness: number[][] ): void {
    this.brightness = brightness;
    this.cellWidth = this.quadrantWidth / brightness[ 0 ].length;
    this.cellHeight = this.quadrantHeight / brightness.length;
    this.invalidatePaint(); // results in a call to paintCanvas
  }

  //TODO Should this be protected in CanvasNode?
  public paintCanvas( context: CanvasRenderingContext2D ): void {

    let x: number;
    let z: number;
    const w = ( 1 + QuadrantNode.PERCENT_CELL_OVERLAP ) * this.cellWidth;
    const h = ( 1 + QuadrantNode.PERCENT_CELL_OVERLAP ) * this.cellHeight;
    const numberOfRows = this.brightness.length;

    const minColor = MOTHAColors.zoomedInBoxFillProperty.value;
    const maxColor = MOTHAColors.electronBaseColorProperty.value;

    for ( let row = 0; row < numberOfRows; row++ ) {
      const numberOfColumns = this.brightness[ row ].length;
      for ( let column = 0; column < numberOfColumns; column++ ) {
        const color = Color.interpolateRGBA( minColor, maxColor, this.brightness[ row ][ column ] );
        context.fillStyle = color.toCSS();
        x = ( column * this.cellWidth );
        z = ( row * this.cellHeight );
        context.rect( x, z, w, h );
        context.fill();
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerFieldNode', SchrodingerFieldNode );