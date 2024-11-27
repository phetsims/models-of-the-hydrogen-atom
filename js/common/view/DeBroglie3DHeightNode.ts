// Copyright 2022-2024, University of Colorado Boulder

/**
 * DeBroglie3DHeightNode displays the '3D Height' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import UnderConstructionText from './UnderConstructionText.js';
import Wireframe3DMatrix from '../model/Wireframe3DMatrix.js';
import Wireframe3D from './Wireframe3D.js';
import Wireframe3DNode from './Wireframe3DNode.js';
import ProtonNode from './ProtonNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';

const MAX_WAVE_HEIGHT = 15; // max height of the standing wave, in view coordinates
const NUMBER_OF_ORBIT_VERTICES = 200;
const NUMBER_OF_WAVE_VERTICES = 200;

// The final view angle (rotation about the x-axis), after the model has rotated into place.
// If you change this value, you must also change DeBroglieModel.ORBIT_3D_Y_SCALE !! TODO why?
const FINAL_VIEW_ANGLE = Utils.toRadians( 70 );

// Angular speed of the rotation animation, in radians/s.
const ANGULAR_SPEED = Utils.toRadians( 100 );

const ORBIT_FRONT_COLOR_PROPERTY = MOTHAColors.orbitStrokeProperty;
const ORBIT_BACK_COLOR_PROPERTY = new DerivedProperty( [ ORBIT_FRONT_COLOR_PROPERTY ],
  orbitFrontColor => orbitFrontColor.darkerColor().darkerColor().darkerColor()
);

const WAVE_FRONT_COLOR_PROPERTY = MOTHAColors.electronBaseColorProperty;
const WAVE_BACK_COLOR_PROPERTY = new DerivedProperty( [ WAVE_FRONT_COLOR_PROPERTY ],
  waveFrontColor => waveFrontColor.darkerColor().darkerColor().darkerColor()
);

type SelfOptions = EmptySelfOptions;

type DeBroglie3DNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglie3DHeightNode extends Node {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;
  private readonly modelViewTransform: ModelViewTransform2;

  //TODO viewMatrix needs to be a Property to save state, switch to Property<Matrix3>
  private readonly viewMatrix: Wireframe3DMatrix; // matrix used to set the view angle

  private readonly currentViewAngleProperty: Property<number>; // the current view angle

  private readonly waveVertices: Vector3[]; // reusable vertices for wave

  private readonly orbitsNode: Wireframe3DNode;
  private readonly waveNode: Wireframe3DNode; //TODO does this have PhET-iO state?

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglie3DNodeOptions ) {

    const options = optionize<DeBroglie3DNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false,

      // visible when the view choice is '3D Height'
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieRepresentationProperty ],
        deBroglieView => ( deBroglieView === '3DHeight' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    super( options );

    this.hydrogenAtom = hydrogenAtom;
    this.deBroglieRepresentationProperty = hydrogenAtom.deBroglieRepresentationProperty;
    this.modelViewTransform = modelViewTransform;

    this.viewMatrix = new Wireframe3DMatrix();

    //TODO Should this be initialized to FINAL_VIEW_ANGLE if deBroglieRepresentationProperty === '3DHeight'? Would break PhET-iO.
    this.currentViewAngleProperty = new NumberProperty( 0, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'currentViewAngleProperty' ),
      phetioReadOnly: true
      //TODO phetioDocumentation
    } );

    this.waveVertices = [];
    for ( let i = 0; i < NUMBER_OF_WAVE_VERTICES; i++ ) {
      this.waveVertices.push( new Vector3( 0, 0, 0 ) );
    }

    // 3D orbits
    this.orbitsNode = createOrbitsNode( modelViewTransform );
    this.addChild( this.orbitsNode );
    this.orbitsNode.translation = modelViewTransform.modelToViewPosition( hydrogenAtom.position ); //TODO

    // proton
    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );
    this.addChild( protonNode );

    // wave
    this.waveNode = createWaveNode();
    this.waveNode.translation = modelViewTransform.modelToViewPosition( hydrogenAtom.position ); //TODO
    this.addChild( this.waveNode );

    //TODO Under Construction
    const underConstructionNode = new UnderConstructionText( {
      center: modelViewTransform.modelToViewPosition( hydrogenAtom.position ).minusXY( 0, 60 )
    } );
    this.addChild( underConstructionNode );

    hydrogenAtom.deBroglieRepresentationProperty.lazyLink( deBroglieRepresentation => {
      if ( deBroglieRepresentation === '3DHeight' ) {
        this.currentViewAngleProperty.reset();
      }
    } );

    this.updateOrbitsNode();
    this.updateWaveNode();
  }

  /**
   * Optimized to update only when the view representation is set to '3D Height'.
   */
  public step( dt: number ): void {
    if ( this.deBroglieRepresentationProperty.value === '3DHeight' ) {
      if ( this.currentViewAngleProperty.value !== FINAL_VIEW_ANGLE ) {
        this.stepViewMatrix( dt );
        this.updateOrbitsNode();
      }
      this.updateWaveNode();
    }
  }

  //TODO Move to Wave3DNode.
  private updateWaveNode(): void {

    const wireframeModel = this.waveNode.wireframeModel;

    // Update the vertices
    getWaveVertices( this.hydrogenAtom, this.modelViewTransform, this.waveVertices );
    assert && assert( this.waveVertices.length === NUMBER_OF_WAVE_VERTICES, `this.waveVertices.length=${this.waveVertices.length}` );

    // Update the wireframe model
    wireframeModel.setVertices( this.waveVertices );
    for ( let i = 0; i < this.waveVertices.length - 1; i++ ) {
      wireframeModel.addLine( i, i + 1 );
    }
    wireframeModel.addLine( this.waveVertices.length - 1, 0 ); // close the path

    // Transform the model
    //TODO This bit of code is duplicated in updateWaveNode and updateOrbitsNode.
    const xt = -( wireframeModel.minX + wireframeModel.maxX ) / 2;
    const yt = -( wireframeModel.minY + wireframeModel.maxY ) / 2;
    const zt = -( wireframeModel.minZ + wireframeModel.maxZ ) / 2;
    wireframeModel.unit();
    wireframeModel.translate( xt, yt, zt );
    wireframeModel.multiply( this.viewMatrix );
    wireframeModel.update();

    this.waveNode.update();
  }

  //TODO Move to Orbits3DNode.
  private updateOrbitsNode(): void {
    const wireframeModel = this.orbitsNode.wireframeModel;
    const xt = -( wireframeModel.minX + wireframeModel.maxX ) / 2;
    const yt = -( wireframeModel.minY + wireframeModel.maxY ) / 2;
    const zt = -( wireframeModel.minZ + wireframeModel.maxZ ) / 2;
    wireframeModel.unit();
    wireframeModel.translate( xt, yt, zt );
    wireframeModel.multiply( this.viewMatrix );
    wireframeModel.update();
    this.orbitsNode.update();
  }

  /*
   * Steps the view matrix until the view is rotated into place.
   */
  private stepViewMatrix( dt: number ): void {
    if ( this.currentViewAngleProperty.value !== FINAL_VIEW_ANGLE ) {
      const deltaAngle = dt * ANGULAR_SPEED;
      this.currentViewAngleProperty.value = Math.min( FINAL_VIEW_ANGLE, this.currentViewAngleProperty.value + deltaAngle );
      this.viewMatrix.unit();
      this.viewMatrix.rotateX( this.currentViewAngleProperty.value );
    }
  }
}

//TODO class Orbits3DNode extends Wireframe3DNode
//TODO numberOfVertices should be a function of orbitRadius, so that all lines have the same dash length.
/**
 * Creates a Node for the electron orbits.
 */
function createOrbitsNode( modelViewTransform: ModelViewTransform2 ): Wireframe3DNode {

  const vertices: Vector3[] = [];

  for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
    const orbitRadius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );
    vertices.push( ...getOrbitVertices( orbitRadius, NUMBER_OF_ORBIT_VERTICES ) );
  }

  // Create the wireframe model
  const wireframeModel = new Wireframe3D( {
    frontColorProperty: ORBIT_FRONT_COLOR_PROPERTY,
    backColorProperty: ORBIT_BACK_COLOR_PROPERTY,
    lineWidth: 1
  } );
  wireframeModel.setVertices( vertices );

  // Connect every-other pair of vertices to simulate a dashed line.
  for ( let i = 0; i < vertices.length - 1; i += 2 ) {
    wireframeModel.addLine( i, i + 1 );
  }

  return new Wireframe3DNode( wireframeModel );
}

//TODO class Wave3DNode extends Wireframe3DNode
function createWaveNode(): Wireframe3DNode {

  const waveModel = new Wireframe3D( {
    frontColorProperty: WAVE_FRONT_COLOR_PROPERTY,
    backColorProperty: WAVE_BACK_COLOR_PROPERTY,
    lineWidth: 2
  } );

  return new Wireframe3DNode( waveModel );
}

//TODO Move to Orbits3DNode.
/**
 * Gets the vertices that approximate an electron orbit. All orbits are in the xy plane, at z=0.
 */
function getOrbitVertices( orbitRadius: number, numberOfVertices: number ): Vector3[] {

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

//TODO Move to Wave3DNode.
/**
 * Gets the vertices that approximate the standing wave.
 */
function getWaveVertices( hydrogenAtom: DeBroglieModel,
                          modelViewTransform: ModelViewTransform2,
                          vertices: Vector3[] ): Vector3[] {
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

modelsOfTheHydrogenAtom.register( 'DeBroglie3DHeightNode', DeBroglie3DHeightNode );