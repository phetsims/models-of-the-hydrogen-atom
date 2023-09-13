// Copyright 2022-2023, University of Colorado Boulder

/**
 * WireframeModel is a 3D wireframe model.
 * Ported from edu.colorado.phet.hydrogenatom.wireframe.Wireframe.java.
 * That code was distributed with JDK 1.4.2 in the Wireframe example applet.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color, RectangleOptions, TColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import WireframeMatrix from './WireframeMatrix.js';

type SelfOptions = {
  vertices?: Vector3[];
  frontColor?: TColor;
  backColor?: TColor;
  lineWidth?: number;
};

type WireframeModelOptions = SelfOptions;

export default class WireframeModel {

  private matrix: WireframeMatrix;
  private vertices: Vector3[];
  private frontColor: TColor;
  private backColor: TColor;
  private lineWidth: number;

  public constructor( providedOptions: WireframeModelOptions ) {

    const options = optionize<WireframeModelOptions, SelfOptions, RectangleOptions>()( {

      // SelfOptions
      vertices: [],
      frontColor: Color.BLACK,
      backColor: Color.BLACK,
      lineWidth: 1
    }, providedOptions );

    assert && assert( isFinite( options.lineWidth ) && options.lineWidth > 0 );

    this.matrix = new WireframeMatrix();
    this.vertices = options.vertices;
    this.frontColor = options.frontColor;
    this.backColor = options.backColor;
    this.lineWidth = options.lineWidth;
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    //TODO https://github.com/phetsims/tasks/issues/1129
  }

  public addVertices( vertices: Vector3[] ): void {
    //TODO https://github.com/phetsims/tasks/issues/1129
  }

  /**
   * Adds a line between 2 vertices.
   */
  public addLine( index1: number, index2: number ): void {
    //TODO https://github.com/phetsims/tasks/issues/1129
  }

  public getMatrix(): WireframeMatrix {
    return this.matrix;
  }

  public setMatrix( matrix: WireframeMatrix ): void {
    if ( this.matrix !== matrix ) {
      this.matrix = matrix;
      //TODO https://github.com/phetsims/tasks/issues/1129
    }
  }

  public getXMin(): number {
    //TODO https://github.com/phetsims/tasks/issues/1129
    return 0;
  }

  public getXMax(): number {
    //TODO https://github.com/phetsims/tasks/issues/1129
    return 0;
  }

  public getYMin(): number {
    //TODO https://github.com/phetsims/tasks/issues/1129
    return 0;
  }

  public getYMax(): number {
    //TODO https://github.com/phetsims/tasks/issues/1129
    return 0;
  }

  public getZMin(): number {
    //TODO https://github.com/phetsims/tasks/issues/1129
    return 0;
  }

  public getZMax(): number {
    //TODO https://github.com/phetsims/tasks/issues/1129
    return 0;
  }
}

modelsOfTheHydrogenAtom.register( 'WireframeModel', WireframeModel );