// Copyright 2022-2024, University of Colorado Boulder

/**
 * Wireframe3DNode displays a 3D wireframe model. This was Wireframe3DNode.java and Wireframe3D.java in the Java version,
 * and has been simplified greatly.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { Path, PathOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';

// A line between 2 points, identified by their indices in this.vertices and this.transformedVertices.
type WireframeLine = {
  vertex1Index: number;
  vertex2Index: number;
};

type SelfOptions = EmptySelfOptions;

type Wireframe3DNodeOptions = SelfOptions & PathOptions;

export default class Wireframe3DNode extends Path {

  // Matrix used to transform vertices. We cannot name this matrix because it would shadow Node's matrix.
  private readonly vertexMatrix: Matrix3;

  // Untransformed vertices.
  private vertices: Vector3[];

  // Transformed vertices, with matrix applied, in the same order as this.vertices.
  // The implementation is optimized to reuse these vertices when possible.
  private readonly transformedVertices: Vector3[];

  // Lines between vertices.
  public readonly lines: WireframeLine[];

  // Indicates that transformedVertices are invalid. This saves your bacon if you forgot to call update.
  private isDirty: boolean;

  public constructor( providedOptions?: Wireframe3DNodeOptions ) {

    const options = optionize<Wireframe3DNodeOptions, SelfOptions, PathOptions>()( {

      // PathOptions
      isDisposable: false
    }, providedOptions );

    super( null, options );

    this.vertexMatrix = new Matrix3();
    this.vertices = [];
    this.transformedVertices = [];
    this.lines = [];
    this.isDirty = false;
  }

  /**
   * If you change this.vertexMatrix or this.vertices, then you are responsible for calling this.update.
   */
  public update(): void {
    this.transformVertices();

    const shape = new Shape();
    this.lines.forEach( line => {
      const vertex1 = this.getTransformedVertex( line.vertex1Index );
      const vertex2 = this.getTransformedVertex( line.vertex2Index );
      shape.moveTo( vertex1.x, vertex1.y );
      shape.lineTo( vertex2.x, vertex2.y );
    } );
    this.setShape( shape );
  }

  /**
   * Sets the transform matrix to rotation around the x-axis. You are responsible for calling this.update.
   * @param theta - in radians.
   */
  public setToRotationX( theta: number ): void {
    this.vertexMatrix.setToRotationX( theta );
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
  private getTransformedVertex( index: number ): Vector3 {
    assert && assert( !this.isDirty, 'Did you forget to call update?' );
    assert && assert( Number.isInteger( index ) && index >= 0 && index < this.transformedVertices.length, `invalid index: ${index}` );
    return this.transformedVertices[ index ];
  }

  /**
   * Adds a line between 2 vertices, identified by their indices in the array that was provided to setVertices.
   */
  public addLine( vertex1Index: number, vertex2Index: number ): void {
    assert && assert( Number.isInteger( vertex1Index ) && vertex1Index >= 0 && vertex1Index < this.vertices.length, `invalid vertex1Index: ${vertex1Index}` );
    assert && assert( Number.isInteger( vertex2Index ) && vertex2Index >= 0 && vertex2Index < this.vertices.length, `invalid vertex2Index: ${vertex2Index}` );
    assert && assert( vertex1Index !== vertex2Index, `vertex1Index and vertex2Index are the same: ${vertex1Index}` );
    this.lines.push( {
      vertex1Index: vertex1Index,
      vertex2Index: vertex2Index
    } );
  }

  /**
   * Transforms this Node's vertices. The transformed vertices are in the same order as this.vertices.
   */
  private transformVertices(): void {
    this.vertices.forEach( ( vertex, index ) => {
      const transformedVertex = this.transformedVertices[ index ];
      transformedVertex.set( vertex );
      this.vertexMatrix.multiplyVector3( transformedVertex );
    } );
    this.isDirty = false;
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3DNode', Wireframe3DNode );