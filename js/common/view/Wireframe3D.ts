// Copyright 2022-2024, University of Colorado Boulder

//TODO Merge this class into Wireframe3DNode.
/**
 * Wireframe3D draws a 3D wireframe model. This is a partial port of Wireframe3D.java from the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Wireframe3DMatrix from '../model/Wireframe3DMatrix.js';
import Vector3 from '../../../../dot/js/Vector3.js';

// A line between 2 points, identified by their indices in this.vertices and this.transformedVertices.
type WireframeLine = {
  vertex1Index: number;
  vertex2Index: number;
};

export default class Wireframe3D {

  // If you modify this matrix or call setVertices, you are responsible for calling update.
  private readonly matrix: Wireframe3DMatrix;

  private vertices: Vector3[];
  private transformedVertices: Vector3[];
  public readonly lines: WireframeLine[];

  public constructor() {
    this.matrix = new Wireframe3DMatrix();
    this.vertices = [];
    this.transformedVertices = [];
    this.lines = [];
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

  public rotateX( theta: number ): void {
    this.matrix.rotateX( theta );
  }

  /**
   * If you change the matrix or vertices, then you are responsible for calling this.update.
   */
  public update(): void {

    //TODO Reuse and mutate this.transformedVertices for performance.
    this.transformedVertices = this.matrix.transform( this.vertices );
    assert && assert( this.transformedVertices.length === this.vertices.length );
  }

  /**
   * Sets the vertices. Any lines that were previously added between vertices are deleted.
   * You are responsible for calling this.update.
   */
  public setVertices( vertices: Vector3[] ): void {
    this.lines.length = 0;
    this.vertices = vertices;
  }

  public getTransformedVertex( index: number ): Vector3 {
    assert && assert( Number.isInteger( index ) );
    assert && assert( index >= 0 && index < this.transformedVertices.length );
    return this.transformedVertices[ index ];
  }

  /**
   * Adds a line between 2 vertices.
   */
  public addLine( vertex1Index: number, vertex2Index: number ): void {
    assert && assert( Number.isInteger( vertex1Index ) );
    assert && assert( Number.isInteger( vertex2Index ) );
    assert && assert( vertex1Index !== vertex2Index );
    assert && assert( vertex1Index >= 0 && vertex1Index < this.vertices.length );
    assert && assert( vertex2Index >= 0 && vertex2Index < this.vertices.length );
    this.lines.push( {
      vertex1Index: vertex1Index,
      vertex2Index: vertex2Index
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3D', Wireframe3D );