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

  // Matrix used to transform vertices.
  private readonly matrix: Wireframe3DMatrix;

  // Untransformed vertices.
  private vertices: Vector3[];

  // Transformed vertices, with matrix applied, in the same order as this.vertices.
  // The implementation is optimized to reuse these vertices when possible.
  private readonly transformedVertices: Vector3[];

  // Lines between vertices.
  public readonly lines: WireframeLine[];

  // Indicates that transformedVertices are invalid. This saves your bacon if you forgot to call update.
  private isDirty: boolean;

  public constructor() {
    this.matrix = new Wireframe3DMatrix();
    this.vertices = [];
    this.transformedVertices = [];
    this.lines = [];
    this.isDirty = false;
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  /**
   * If you change this.matrix or this.vertices, then you are responsible for calling this.update.
   */
  public update(): void {
    this.matrix.transform( this.vertices, this.transformedVertices );
    this.isDirty = false;
  }

  /**
   * Sets the matrix to the unit matrix. You are responsible for calling this.update.
   */
  public unit(): void {
    this.matrix.unit();
    this.isDirty = true;
  }

  /**
   * Translates a distance in 3D space. You are responsible for calling this.update.
   */
  public translate( dx: number, dy: number, dz: number ): void {
    this.matrix.translate( dx, dy, dz );
    this.isDirty = true;
  }

  /**
   * Rotates around the x-axis. You are responsible for calling this.update.
   * @param theta - in radians.
   */
  public rotateX( theta: number ): void {
    this.matrix.rotateX( theta );
    this.isDirty = true;
  }

  /**
   * Sets the untransformed vertices. Any lines that were previously added between vertices are deleted.
   * You are responsible for calling this.update.
   */
  public setVertices( vertices: Vector3[] ): void {

    // Delete lines.
    this.lines.length = 0;

    this.vertices = vertices;

    // Ensure that this.vertices and this.transformedVertices have the same number of vertices.
    if ( this.transformedVertices.length > this.vertices.length ) {
      this.transformedVertices.length = this.vertices.length;
    }
    else if ( this.transformedVertices.length < this.vertices.length ) {
      const numberToAdd = this.vertices.length - this.transformedVertices.length;
      _.times( numberToAdd, () => this.transformedVertices.push( new Vector3( 0, 0, 0 ) ) );
    }

    this.isDirty = true;
  }

  /**
   * Gets a transformed vertex, specified by its index in the array that was provided to setVertices.
   */
  public getTransformedVertex( index: number ): Vector3 {
    assert && assert( !this.isDirty, 'Did you forget to call update?' );
    assert && assert( Number.isInteger( index ) );
    assert && assert( index >= 0 && index < this.transformedVertices.length );
    return this.transformedVertices[ index ];
  }

  /**
   * Adds a line between 2 vertices, identified by their indices in the array that was provided to setVertices.
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