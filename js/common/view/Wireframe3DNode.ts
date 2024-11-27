// Copyright 2022-2024, University of Colorado Boulder

//TODO Use Canvas for better performance, and to support colorPalette.
/**
 * Wireframe3DNode displays a 3D wireframe model. This was Wireframe3DNode.java in the Java version.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, NodeTranslationOptions, Path } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Wireframe3D from './Wireframe3D.js';

type SelfOptions = EmptySelfOptions;

type WireframeNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class Wireframe3DNode extends Node {

  public readonly wireframeModel: Wireframe3D;
  private readonly path: Path;

  public constructor( wireframeModel: Wireframe3D, providedOptions?: WireframeNodeOptions ) {

    const options = optionize<WireframeNodeOptions, SelfOptions, NodeOptions>()( {
      //TODO

      // NodeOptions
      isDisposable: false
    }, providedOptions );

    super( options );

    this.wireframeModel = wireframeModel;

    this.path = new Path( null, {
      stroke: this.wireframeModel.frontColorProperty, //TODO use color palette based on z coordinate
      lineWidth: this.wireframeModel.lineWidth
    } );
    this.addChild( this.path );
    this.update();//TODO should be called by step
  }

  public update(): void {
    this.wireframeModel.update();
    const shape = new Shape();
    this.wireframeModel.lines.forEach( line => {
      const vertex1 = this.wireframeModel.transformedVertices[ line.vertex1Index ];
      const vertex2 = this.wireframeModel.transformedVertices[ line.vertex2Index ];
      shape.moveTo( vertex1.x, vertex1.y );
      shape.lineTo( vertex2.x, vertex2.y );
    } );
    this.path.setShape( shape );
  }
}

modelsOfTheHydrogenAtom.register( 'Wireframe3DNode', Wireframe3DNode );