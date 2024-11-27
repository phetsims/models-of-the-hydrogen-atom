// Copyright 2022-2024, University of Colorado Boulder

//TODO replace with phet.dot.Matrix3
/**
 * Wireframe3DMatrix implements the features of a 3D matrix needed by this wireframe features in this simulation.
 * This is a partial port of Matrix3D.java from the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector3 from '../../../../dot/js/Vector3.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class Wireframe3DMatrix {

  private xx = 1;
  private xy = 0;
  private xz = 0;
  private xo = 0;

  private yx = 0;
  private yy = 1;
  private yz = 0;
  private yo = 0;

  private zx = 0;
  private zy = 0;
  private zz = 1;
  private zo = 0;

  public constructor() {
    // Defaults to the unit matrix.
  }

  /**
   * Sets this matrix to the unit matrix.
   */
  public unit(): void {
    this.xx = 1;
    this.xy = 0;
    this.xz = 0;
    this.xo = 0;

    this.yx = 0;
    this.yy = 1;
    this.yz = 0;
    this.yo = 0;

    this.zx = 0;
    this.zy = 0;
    this.zz = 1;
    this.zo = 0;
  }

  public translate( dx: number, dy: number, dz: number ): void {
    this.xo += dx;
    this.yo += dy;
    this.zo += dz;
  }

  public multiply( matrix: Wireframe3DMatrix ): void {

    const xx = ( this.xx * matrix.xx ) + ( this.yx * matrix.xy ) + ( this.zx * matrix.xz );
    const xy = ( this.xy * matrix.xx ) + ( this.yy * matrix.xy ) + ( this.zy * matrix.xz );
    const xz = ( this.xz * matrix.xx ) + ( this.yz * matrix.xy ) + ( this.zz * matrix.xz );
    const xo = ( this.xo * matrix.xx ) + ( this.yo * matrix.xy ) + ( this.zo * matrix.xz ) + matrix.xo;

    const yx = ( this.xx * matrix.yx ) + ( this.yx * matrix.yy ) + ( this.zx * matrix.yz );
    const yy = ( this.xy * matrix.yx ) + ( this.yy * matrix.yy ) + ( this.zy * matrix.yz );
    const yz = ( this.xz * matrix.yx ) + ( this.yz * matrix.yy ) + ( this.zz * matrix.yz );
    const yo = ( this.xo * matrix.yx ) + ( this.yo * matrix.yy ) + ( this.zo * matrix.yz ) + matrix.yo;

    const zx = ( this.xx * matrix.zx ) + ( this.yx * matrix.zy ) + ( this.zx * matrix.zz );
    const zy = ( this.xy * matrix.zx ) + ( this.yy * matrix.zy ) + ( this.zy * matrix.zz );
    const zz = ( this.xz * matrix.zx ) + ( this.yz * matrix.zy ) + ( this.zz * matrix.zz );
    const zo = ( this.xo * matrix.zx ) + ( this.yo * matrix.zy ) + ( this.zo * matrix.zz ) + matrix.zo;

    this.xx = xx;
    this.xy = xy;
    this.xz = xz;
    this.xo = xo;

    this.yx = yx;
    this.yy = yy;
    this.yz = yz;
    this.yo = yo;

    this.zx = zx;
    this.zy = zy;
    this.zz = zz;
    this.zo = zo;
  }

  /**
   * Rotate about the x-axis.
   * @param theta - in radians
   */
  public rotateX( theta: number ): void {

    const cosTheta = Math.cos( theta );
    const sinTheta = Math.sin( theta );

    const yx = this.yx * cosTheta + this.zx * sinTheta;
    const yy = this.yy * cosTheta + this.zy * sinTheta;
    const yz = this.yz * cosTheta + this.zz * sinTheta;
    const yo = this.yo * cosTheta + this.zo * sinTheta;

    const zx = this.zx * cosTheta - this.yx * sinTheta;
    const zy = this.zy * cosTheta - this.yy * sinTheta;
    const zz = this.zz * cosTheta - this.yz * sinTheta;
    const zo = this.zo * cosTheta - this.yo * sinTheta;

    this.yx = yx;
    this.yy = yy;
    this.yz = yz;
    this.yo = yo;

    this.zx = zx;
    this.zy = zy;
    this.zz = zz;
    this.zo = zo;
  }

  /**
   * Transforms a set of vertices. The returned vertices are in the same order as the provided vertices.
   */
  public transform( vertices: Vector3[] ): Vector3[] {
    const transformedVertices: Vector3[] = [];
    vertices.forEach( vertex => {
      const x = ( vertex.x * this.xx ) + ( vertex.y * this.xy ) + ( vertex.z * this.xz ) + this.xo;
      const y = ( vertex.x * this.yx ) + ( vertex.y * this.yy ) + ( vertex.z * this.yz ) + this.yo;
      const z = ( vertex.x * this.zx ) + ( vertex.y * this.zy ) + ( vertex.z * this.zz ) + this.zo;
      transformedVertices.push( new Vector3( x, y, z ) );
    } );
    return transformedVertices;
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3DMatrix', Wireframe3DMatrix );