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

    const lxx = this.xx * matrix.xx + this.yx * matrix.xy + this.zx * matrix.xz;
    const lxy = this.xy * matrix.xx + this.yy * matrix.xy + this.zy * matrix.xz;
    const lxz = this.xz * matrix.xx + this.yz * matrix.xy + this.zz * matrix.xz;
    const lxo = this.xo * matrix.xx + this.yo * matrix.xy + this.zo * matrix.xz + matrix.xo;

    const lyx = this.xx * matrix.yx + this.yx * matrix.yy + this.zx * matrix.yz;
    const lyy = this.xy * matrix.yx + this.yy * matrix.yy + this.zy * matrix.yz;
    const lyz = this.xz * matrix.yx + this.yz * matrix.yy + this.zz * matrix.yz;
    const lyo = this.xo * matrix.yx + this.yo * matrix.yy + this.zo * matrix.yz + matrix.yo;

    const lzx = this.xx * matrix.zx + this.yx * matrix.zy + this.zx * matrix.zz;
    const lzy = this.xy * matrix.zx + this.yy * matrix.zy + this.zy * matrix.zz;
    const lzz = this.xz * matrix.zx + this.yz * matrix.zy + this.zz * matrix.zz;
    const lzo = this.xo * matrix.zx + this.yo * matrix.zy + this.zo * matrix.zz + matrix.zo;

    this.xx = lxx;
    this.xy = lxy;
    this.xz = lxz;
    this.xo = lxo;

    this.yx = lyx;
    this.yy = lyy;
    this.yz = lyz;
    this.yo = lyo;

    this.zx = lzx;
    this.zy = lzy;
    this.zz = lzz;
    this.zo = lzo;
  }

  /**
   * Rotate about the x-axis.
   * @param theta - in radians
   */
  public rotateX( theta: number ): void {

    const ct = Math.cos( theta );
    const st = Math.sin( theta );

    const nyx = this.yx * ct + this.zx * st;
    const nyy = this.yy * ct + this.zy * st;
    const nyz = this.yz * ct + this.zz * st;
    const nyo = this.yo * ct + this.zo * st;

    const nzx = this.zx * ct - this.yx * st;
    const nzy = this.zy * ct - this.yy * st;
    const nzz = this.zz * ct - this.yz * st;
    const nzo = this.zo * ct - this.yo * st;

    this.yo = nyo;
    this.yx = nyx;
    this.yy = nyy;
    this.yz = nyz;

    this.zo = nzo;
    this.zx = nzx;
    this.zy = nzy;
    this.zz = nzz;
  }

  /**
   * Transforms a set of vertices. The returned vertices are in the same order as the provided vertices.
   */
  public transform( vertices: Vector3[] ): Vector3[] {
    const tv: Vector3[] = [];
    vertices.forEach( vertex => {
      const tx = ( vertex.x * this.xx + vertex.y * this.xy + vertex.z * this.xz + this.xo );
      const ty = ( vertex.x * this.yx + vertex.y * this.yy + vertex.z * this.yz + this.yo );
      const tz = ( vertex.x * this.zx + vertex.y * this.zy + vertex.z * this.zz + this.zo );
      tv.push( new Vector3( tx, ty, tz ) );
    } );
    return tv;
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3DMatrix', Wireframe3DMatrix );