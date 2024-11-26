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
import { Color, RectangleOptions, TColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Wireframe3DMatrix from '../model/Wireframe3DMatrix.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import Emitter from '../../../../axon/js/Emitter.js';

type WireframeLine = {
  vertexIndex1: number;
  vertexIndex2: number;
};

type SelfOptions = {
  frontColor?: TColor;
  backColor?: TColor;
  lineWidth?: number;
};

type WireframeModelOptions = SelfOptions;

export default class Wireframe3D {

  // If you modify this matrix, you are responsible for calling update.
  private readonly matrix: Wireframe3DMatrix;

  private vertices: Vector3[];
  private transformedVertices: Vector3[];
  private readonly lines: WireframeLine[];
  private untransformedBounds: Bounds3;
  private transformedBounds: Bounds3;

  private readonly frontColor: TColor;
  private readonly backColor: TColor;
  public readonly lineWidth: number;

  public readonly boundsChangedEmitter: Emitter; //TODO Is this needed?

  public constructor( providedOptions: WireframeModelOptions ) {

    const options = optionize<WireframeModelOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      frontColor: Color.BLACK,
      backColor: Color.BLACK,
      lineWidth: 1
    }, providedOptions );

    assert && assert( isFinite( options.lineWidth ) && options.lineWidth > 0 );

    this.frontColor = options.frontColor;
    this.backColor = options.backColor;
    this.lineWidth = options.lineWidth;

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

  public update(): void {
    this.transformedVertices = this.matrix.transform( this.vertices );
    this.transformedBounds = Wireframe3D.computeBounds( this.transformedVertices );
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
    this.untransformedBounds = Wireframe3D.computeBounds( this.vertices );
  }

  /**
   * Adds a line between 2 vertices.
   */
  public addLine( vertexIndex1: number, vertexIndex2: number ): void {
    assert && assert( vertexIndex1 !== vertexIndex2 );
    assert && assert( vertexIndex1 >= 0 && vertexIndex1 < this.vertices.length );
    assert && assert( vertexIndex2 >= 0 && vertexIndex2 < this.vertices.length );
    this.lines.push( {
      vertexIndex1: vertexIndex1,
      vertexIndex2: vertexIndex2
    } );
  }

  /**
   * Computes the 3D bounds for a set of 3D vertices.
   */
  private static computeBounds( vertices: Vector3[] ): Bounds3 {
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
}

modelsOfTheHydrogenAtom.register( 'Wireframe3D', Wireframe3D );