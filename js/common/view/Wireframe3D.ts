// Copyright 2022-2024, University of Colorado Boulder

//TODO Merge this class into Wireframe3DNode.
/**
 * Wireframe3D draws a 3D wireframe model. This is a partial port of Wireframe3D.java from the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Bounds3 from '../../../../dot/js/Bounds3.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Wireframe3DMatrix from '../model/Wireframe3DMatrix.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import Emitter from '../../../../axon/js/Emitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

// Describes a line in 3D space.
type WireframeLine = {
  vertex1Index: number;
  vertex2Index: number;
};

type SelfOptions = {
  lineWidth?: number;
  frontColorProperty: TReadOnlyProperty<Color>;
  backColorProperty: TReadOnlyProperty<Color>;
  numberOfColors?: number;
};

export type Wireframe3DOptions = SelfOptions;

export default class Wireframe3D {

  // If you modify this matrix, you are responsible for calling update.
  private readonly matrix: Wireframe3DMatrix;

  public vertices: Vector3[];
  public transformedVertices: Vector3[];

  public readonly lines: WireframeLine[];

  //TODO We do not need bounds for this sim, can set bounds to the entire zoom box.
  private untransformedBounds: Bounds3;
  private transformedBounds: Bounds3;

  public readonly lineWidth: number;

  public readonly frontColorProperty: TReadOnlyProperty<Color>;
  public readonly backColorProperty: TReadOnlyProperty<Color>;
  private readonly colorPalette: Color[];

  public readonly boundsChangedEmitter: Emitter; //TODO Is this needed, perhaps to change Canvas bounds?

  public constructor( providedOptions: Wireframe3DOptions ) {

    const options = optionize<Wireframe3DOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      lineWidth: 1,
      numberOfColors: 16
    }, providedOptions );

    assert && assert( isFinite( options.lineWidth ) && options.lineWidth > 0 );

    this.lineWidth = options.lineWidth;

    this.frontColorProperty = options.frontColorProperty;
    this.backColorProperty = options.backColorProperty;
    //TODO Update colorPalette and redraw when frontColorProperty or backColorProperty changes.
    this.colorPalette = createColorPalette( options.frontColorProperty.value, options.backColorProperty.value, options.numberOfColors );

    this.matrix = new Wireframe3DMatrix();
    this.vertices = [];
    this.transformedVertices = [];
    this.lines = [];
    this.transformedBounds = Bounds3.NOTHING;
    this.untransformedBounds = Bounds3.NOTHING;
    this.boundsChangedEmitter = new Emitter();
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public unit(): void {
    this.matrix.unit();
  }

  public translate( x: number, y: number, z: number ): void {
    this.matrix.translate( x, y, z );
  }

  public multiply( matrix: Wireframe3DMatrix ): void {
    this.matrix.multiply( matrix );
  }

  /**
   * If you change the matrix, vertices, or lines, then you are responsible for calling update.
   */
  public update(): void {

    //TODO Reuse and mutate this.transformedVertices for performance.
    this.transformedVertices = this.matrix.transform( this.vertices );
    assert && assert( this.transformedVertices.length === this.vertices.length );
    this.transformedBounds = computeBounds( this.transformedVertices );
    this.boundsChangedEmitter.emit();
  }

  public get minX(): number {
    return this.untransformedBounds.minX;
  }

  public get maxX(): number {
    return this.untransformedBounds.maxX;
  }

  public get minY(): number {
    return this.untransformedBounds.minY;
  }

  public get maxY(): number {
    return this.untransformedBounds.maxY;
  }

  public get minZ(): number {
    return this.untransformedBounds.minZ;
  }

  public get maxZ(): number {
    return this.untransformedBounds.maxZ;
  }

  /**
   * Sets the vertices. Any lines that were previously added between vertices are deleted.
   */
  public setVertices( vertices: Vector3[] ): void {
    this.lines.length = 0;
    this.transformedVertices.length = 0;
    this.vertices = vertices;
    this.untransformedBounds = computeBounds( this.vertices );
  }

  /**
   * Adds a line between 2 vertices.
   */
  public addLine( vertex1Index: number, vertex2Index: number ): void {
    assert && assert( vertex1Index !== vertex2Index );
    assert && assert( vertex1Index >= 0 && vertex1Index < this.vertices.length );
    assert && assert( vertex2Index >= 0 && vertex2Index < this.vertices.length );
    this.lines.push( {
      vertex1Index: vertex1Index,
      vertex2Index: vertex2Index
    } );
  }

  /**
   * Gets the color for a line, based on its z coordinate.
   */
  private getColor( line: WireframeLine ): Color {
    assert && assert( this.lines.includes( line ) );

    const vertex1 = this.transformedVertices[ line.vertex1Index ];
    const vertex2 = this.transformedVertices[ line.vertex2Index ];

    const minZ = this.transformedBounds.minZ;
    const maxZ = this.transformedBounds.maxZ;
    const zAverage = vertex1.z + ( vertex1.z - vertex2.z ) / 2;

    const colorIndex = Math.floor( ( this.colorPalette.length - 1 ) * ( ( zAverage - minZ ) / ( maxZ - minZ ) ) );
    assert && assert( colorIndex >= 0 && colorIndex < this.colorPalette.length );
    return this.colorPalette[ colorIndex ];
  }
}

/**
 * Computes the 3D bounds that fits a set of 3D vertices.
 */
function computeBounds( vertices: Vector3[] ): Bounds3 {
  if ( vertices.length === 0 ) {
    return Bounds3.NOTHING;
  }
  else {

    const vertex = vertices[ 0 ];
    let minX = vertex.x;
    let maxX = vertex.x;
    let minY = vertex.y;
    let maxY = vertex.y;
    let minZ = vertex.z;
    let maxZ = vertex.z;

    for ( let i = 1; i < vertices.length; i++ ) {

      const vertex = vertices[ i ];
      if ( vertex.x < minX ) {
        minX = vertex.x;
      }
      else if ( vertex.x > maxX ) {
        maxX = vertex.x;
      }

      if ( vertex.y < minY ) {
        minY = vertex.y;
      }
      else if ( vertex.y > maxY ) {
        maxY = vertex.y;
      }

      if ( vertex.z < minZ ) {
        minZ = vertex.z;
      }
      else if ( vertex.z > maxZ ) {
        maxZ = vertex.z;
      }
    }
    return new Bounds3( minX, minY, maxX, maxY, minZ, maxZ );
  }
}

/**
 * Creates a color palette consisting of RGBA interpolations between a front and back color.
 * This is used to give the impression of depth by coloring lines according to their z coordinate.
 */
function createColorPalette( frontColor: Color, backColor: Color, numberOfColors: number ): Color[] {
  const colorPalette: Color[] = [];
  for ( let i = 0; i < numberOfColors; i++ ) {
    const distance = i / ( numberOfColors - 1 );
    colorPalette.push( Color.interpolateRGBA( frontColor, backColor, distance ) );
  }
  return colorPalette;
}

modelsOfTheHydrogenAtom.register( 'Wireframe3D', Wireframe3D );