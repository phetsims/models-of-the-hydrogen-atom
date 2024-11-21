// Copyright 2022-2024, University of Colorado Boulder

//TODO Merge this class into Wireframe3DNode.
/**
 * Wireframe3D draws a 3D wireframe model. This was Wireframe3D.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import optionize from '../../../../phet-core/js/optionize.js';
import { Color, RectangleOptions, TColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Wireframe3DMatrix from '../model/Wireframe3DMatrix.js';

type SelfOptions = {
  vertices?: Vector3[];
  frontColor?: TColor;
  backColor?: TColor;
  lineWidth?: number;
};

type WireframeModelOptions = SelfOptions;

export default class Wireframe3D {

  private matrix: Wireframe3DMatrix;
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

    this.matrix = new Wireframe3DMatrix();
    this.vertices = options.vertices;
    this.frontColor = options.frontColor;
    this.backColor = options.backColor;
    this.lineWidth = options.lineWidth;
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }

  public reset(): void {
    //TODO
  }

  public addVertices( vertices: Vector3[] ): void {
    //TODO
  }

  /**
   * Adds a line between 2 vertices.
   */
  public addLine( index1: number, index2: number ): void {
    //TODO
  }

  public getMatrix(): Wireframe3DMatrix {
    return this.matrix;
  }

  public setMatrix( matrix: Wireframe3DMatrix ): void {
    if ( this.matrix !== matrix ) {
      this.matrix = matrix;
      //TODO
    }
  }

  public getXMin(): number {
    //TODO
    return 0;
  }

  public getXMax(): number {
    //TODO
    return 0;
  }

  public getYMin(): number {
    //TODO
    return 0;
  }

  public getYMax(): number {
    //TODO
    return 0;
  }

  public getZMin(): number {
    //TODO
    return 0;
  }

  public getZMax(): number {
    //TODO
    return 0;
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3D', Wireframe3D );