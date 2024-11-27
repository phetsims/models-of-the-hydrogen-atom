// Copyright 2024, University of Colorado Boulder

/**
 * DeBroglie3DWaveNode displays the electron as a wave in the '3D Height' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Wireframe3DNode from './Wireframe3DNode.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import MOTHAColors from '../MOTHAColors.js';
import BohrModel from '../model/BohrModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

const MAX_WAVE_HEIGHT = 15; // max height of the standing wave, in view coordinates
const NUMBER_OF_WAVE_VERTICES = 200; //TODO Make this a function of wave radius?

export default class DeBroglie3DWaveNode extends Wireframe3DNode {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly pitchProperty: TReadOnlyProperty<number>;

  // Reusable vertices.
  private readonly waveVertices: Vector3[];

  public constructor( hydrogenAtom: DeBroglieModel, modelViewTransform: ModelViewTransform2, pitchProperty: TReadOnlyProperty<number> ) {

    super( {
      stroke: MOTHAColors.electronBaseColorProperty,
      lineWidth: 2
    } );

    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;
    this.pitchProperty = pitchProperty;

    this.waveVertices = [];
    for ( let i = 0; i < NUMBER_OF_WAVE_VERTICES; i++ ) {
      this.waveVertices.push( new Vector3( 0, 0, 0 ) );
    }
  }

  public override update(): void {

    // Update the vertices
    getWaveVertices( this.hydrogenAtom, this.modelViewTransform, this.waveVertices );
    assert && assert( this.waveVertices.length === NUMBER_OF_WAVE_VERTICES, `this.waveVertices.length=${this.waveVertices.length}` );
    this.setVertices( this.waveVertices );

    // Connect adjacent vertices.
    for ( let i = 0; i < this.waveVertices.length - 1; i++ ) {
      this.addLine( i, i + 1 );
    }
    this.addLine( this.waveVertices.length - 1, 0 ); // close the path

    // Rotate to view angle.
    this.unit();
    this.rotateX( this.pitchProperty.value );

    super.update();
  }
}

/**
 * Gets the vertices that approximate the standing wave.
 */
function getWaveVertices( hydrogenAtom: DeBroglieModel, modelViewTransform: ModelViewTransform2, vertices: Vector3[] ): Vector3[] {
  const n = hydrogenAtom.electron.nProperty.value;
  const radius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );

  const numberOfVertices = vertices.length;
  const deltaAngle = ( 2 * Math.PI ) / numberOfVertices;

  for ( let i = 0; i < numberOfVertices; i++ ) {
    const angle = i * deltaAngle;
    const x = radius * Math.cos( angle );
    const y = radius * Math.sin( angle );
    const z = MAX_WAVE_HEIGHT * hydrogenAtom.getAmplitude( n, angle );
    vertices[ i ].setXYZ( x, y, z );
  }
  return vertices;
}

modelsOfTheHydrogenAtom.register( 'DeBroglie3DWaveNode', DeBroglie3DWaveNode );