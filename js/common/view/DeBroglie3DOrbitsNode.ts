// Copyright 2024, University of Colorado Boulder

/**
 * DeBroglie3DOrbitsNode displays the electron orbits in the '3D Height' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Wireframe3DNode from './Wireframe3DNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import MOTHAColors from '../MOTHAColors.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import MOTHAConstants from '../MOTHAConstants.js';
import BohrModel from '../model/BohrModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class DeBroglie3DOrbitsNode extends Wireframe3DNode {

  private readonly pitchProperty: TReadOnlyProperty<number>;

  public constructor( modelViewTransform: ModelViewTransform2, pitchProperty: TReadOnlyProperty<number> ) {
    super( {
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1
    } );

    this.pitchProperty = pitchProperty;

    const vertices: Vector3[] = [];
    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const orbitRadius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );

      // Number of vertices varies by radius, so that all lines have the same length.
      const orbitCircumference = 2 * Math.PI * orbitRadius;
      let numberOfVertices = Math.floor( orbitCircumference / MOTHAConstants.ORBIT_LINE_LENGTH );

      // Number of vertices must be even, so that we don't connect vertices from different orbits in the code below.
      if ( numberOfVertices % 2 !== 0 ) {
        numberOfVertices++;
      }
      vertices.push( ...DeBroglie3DOrbitsNode.getOrbitVertices( orbitRadius, numberOfVertices ) );
    }
    assert && assert( vertices.length % 2 === 0, 'Even number of vertices is required.' );
    this.setVertices( vertices );

    // Connect every-other pair of vertices to simulate a dashed line.
    for ( let i = 0; i < vertices.length - 1; i += 2 ) {
      this.addLine( i, i + 1 );
    }
  }

  public override update(): void {

    // Rotate to view angle.
    this.unit();
    this.rotateX( this.pitchProperty.value );

    super.update();
  }

  /**
   * Gets the vertices that approximate an electron orbit.
   */
  private static getOrbitVertices( orbitRadius: number, numberOfVertices: number ): Vector3[] {

    const deltaAngle = ( 2 * Math.PI ) / numberOfVertices;

    const vertices: Vector3[] = [];
    for ( let i = 0; i < numberOfVertices; i++ ) {
      const angle = i * deltaAngle;
      const x = orbitRadius * Math.cos( angle );
      const y = orbitRadius * Math.sin( angle );
      const z = 0;
      vertices.push( new Vector3( x, y, z ) );
    }
    return vertices;
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglie3DOrbitsNode', DeBroglie3DOrbitsNode );