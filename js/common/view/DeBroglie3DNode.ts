// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglie3DNode show the '3D' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector3 from '../../../../dot/js/Vector3.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Color, Node, NodeOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import MOTHAColors from '../MOTHAColors.js';
import WireframeMatrix from './WireframeMatrix.js';
import WireframeModel from './WireframeModel.js';
import WireframeNode from './WireframeNode.js';
import MOTHAConstants from '../MOTHAConstants.js';

const MAX_WAVE_HEIGHT = 15; // max height of the standing wave, in view coordinates
const NUMBER_OF_ORBIT_VERTICES = 200;
const NUMBER_OF_WAVE_VERTICES = 200;

// The final view angle (rotation about the x-axis), after the model has rotated into place.
// If you change this value, you must also change DeBroglieModel.ORBIT_3D_Y_SCALE !! TODO why?
const FINAL_VIEW_ANGLE = Utils.toRadians( 70 );

// change is angle during view animation
const VIEW_ANGLE_DELTA = Utils.toRadians( 5 );

type SelfOptions = EmptySelfOptions;

type DeBroglie3DNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglie3DNode extends Node {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;

  //TODO viewMatrix needs to be a Property to save state, switch to Property<Matrix3>
  private readonly viewMatrix: WireframeMatrix; // matrix used to set the view angle

  //TODO can we get this from viewMatrix?
  private currentViewAngleProperty: Property<number>; // the current view angle

  private readonly orbitVertices: Vector3[]; // reusable vertices for orbits
  private waveVertices: Vector3[]; // reusable vertices for wave

  private readonly orbitFrontColorProperty: TReadOnlyProperty<Color>;
  private readonly orbitBackColorProperty: TReadOnlyProperty<Color>;
  private readonly waveFrontColorProperty: TReadOnlyProperty<Color>;
  private readonly waveBackColorProperty: TReadOnlyProperty<Color>;

  private readonly waveModel: WireframeModel; //TODO does this have PhET-iO state?
  private readonly waveNode: WireframeNode; //TODO does this have PhET-iO state?

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglie3DNodeOptions ) {

    const options = optionize<DeBroglie3DNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === '3D' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    super( options );

    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;

    this.viewMatrix = new WireframeMatrix();

    //TODO needs to be reset
    this.currentViewAngleProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'currentViewAngleProperty' )
    } );

    this.orbitVertices = [];
    for ( let i = 0; i < NUMBER_OF_ORBIT_VERTICES; i++ ) {
      this.orbitVertices.push( new Vector3( 0, 0, 0 ) );
    }

    this.waveVertices = [];
    for ( let i = 0; i < NUMBER_OF_WAVE_VERTICES; i++ ) {
      this.waveVertices.push( new Vector3( 0, 0, 0 ) );
    }

    this.orbitFrontColorProperty = MOTHAColors.orbitStrokeProperty;
    this.orbitBackColorProperty = new DerivedProperty( [ this.orbitFrontColorProperty ],
      orbitFrontColor => orbitFrontColor.darkerColor().darkerColor().darkerColor()
    );

    this.waveFrontColorProperty = MOTHAColors.electronBaseColorProperty;
    this.waveBackColorProperty = new DerivedProperty( [ this.waveFrontColorProperty ],
      waveFrontColor => waveFrontColor.darkerColor().darkerColor().darkerColor()
    );

    // 3D orbits
    const orbitNodes: WireframeNode[] = [];
    const groundState = MOTHAConstants.GROUND_STATE;
    const maxState = DeBroglieModel.getMaxElectronState();
    for ( let state = groundState; state < maxState; state++ ) {
      const radius = modelViewTransform.modelToViewDeltaX( hydrogenAtom.getElectronOrbitRadius( state ) );
      const orbitNode = this.createOrbitNode( radius, this.viewMatrix, this.orbitVertices );
      orbitNodes.push( orbitNode );
    }
    const orbitsNode = new Node( {
      children: orbitNodes,
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );
    this.addChild( orbitsNode );

    this.waveModel = new WireframeModel( {
      frontColor: this.waveFrontColorProperty,
      backColor: this.waveBackColorProperty,
      lineWidth: 2
    } );

    this.waveNode = new WireframeNode( this.waveModel, {
      tandem: options.tandem.createTandem( 'waveNode' )
    } );

    //TODO are these dependencies correct?
    Multilink.multilink( [ hydrogenAtom.getElectronStateProperty(), hydrogenAtom.electronAngleProperty, this.visibleProperty ],
      ( electronState, electronAngle, visible ) => {
        visible && this.update();
      } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public step( dt: number ): void {
    //TODO implement or delete step
  }

  private update(): void {
    this.updateWaveNode();
    if ( this.currentViewAngleProperty.value === FINAL_VIEW_ANGLE ) {
      this.updateViewMatrix();
    }
  }

  /**
   * Updates the wave.
   */
  private updateWaveNode(): void {

    // Update the vertices
    this.waveVertices = updateWaveVertices( this.hydrogenAtom, this.modelViewTransform, this.waveVertices );

    // Create the wireframe model
    this.waveModel.reset();
    this.waveModel.addVertices( this.waveVertices );
    for ( let i = 0; i < this.waveVertices.length - 1; i++ ) {
      this.waveModel.addLine( i, i + 1 );
    }
    this.waveModel.addLine( this.waveVertices.length - 1, 0 ); // close the path

    // Transform the model
    const matrix = this.waveModel.getMatrix();
    matrix.unit();
    const xt = -( this.waveModel.getXMin() + this.waveModel.getXMax() ) / 2;
    const yt = -( this.waveModel.getYMin() + this.waveModel.getYMax() ) / 2;
    const zt = -( this.waveModel.getZMin() + this.waveModel.getZMax() ) / 2;
    matrix.translate( xt, yt, zt );
    matrix.multiply( this.viewMatrix );
    this.waveModel.setMatrix( matrix );

    //TODO how does this.waveNode get notified to update?
  }

  /*
   * Updates the view matrix until the view is rotated into place.
   */
  private updateViewMatrix(): void {
    if ( this.currentViewAngleProperty.value !== FINAL_VIEW_ANGLE ) {
      this.currentViewAngleProperty.value = Math.min( FINAL_VIEW_ANGLE, this.currentViewAngleProperty.value + VIEW_ANGLE_DELTA );
      this.viewMatrix.unit();
      this.viewMatrix.rotateX( this.currentViewAngleProperty.value );

      //TODO what needs to be notified that the.viewMatrix has changed?
    }
  }

  //TODO convert this to: class OrbitNode extends WireframeNode
  /**
   * Creates a Node for an electron orbit.
   */
  private createOrbitNode( radius: number, viewMatrix: WireframeMatrix, vertices: Vector3[] ): WireframeNode {

    // Update the vertices
    vertices = updateOrbitVertices( radius, vertices );

    // Create the wireframe model
    const wireframeModel: WireframeModel = new WireframeModel( {
      vertices: vertices,
      frontColor: this.orbitFrontColorProperty,
      backColor: this.orbitBackColorProperty,
      lineWidth: 2
    } );

    // Connect every-other pair of vertices to simulate a dashed line.
    for ( let i = 0; i < vertices.length - 1; i += 2 ) {
      wireframeModel.addLine( i, i + 1 );
    }

    // Transform the model
    const matrix = wireframeModel.getMatrix();
    matrix.unit();
    const xt = -( wireframeModel.getXMin() + wireframeModel.getXMax() ) / 2;
    const yt = -( wireframeModel.getYMin() + wireframeModel.getYMax() ) / 2;
    const zt = -( wireframeModel.getZMin() + wireframeModel.getZMax() ) / 2;
    matrix.translate( xt, yt, zt );
    matrix.multiply( viewMatrix );
    wireframeModel.setMatrix( matrix );

    return new WireframeNode( wireframeModel );
  }
}

/**
 * Updates the vertices that approximate an electron orbit.
 */
function updateOrbitVertices( orbitRadius: number, vertices: Vector3[] ): Vector3[] {

  const numberOfVertices = vertices.length;
  const deltaAngle = ( 2 * Math.PI ) / numberOfVertices;

  for ( let i = 0; i < numberOfVertices; i++ ) {
    const angle = i * deltaAngle;
    const x = orbitRadius * Math.cos( angle );
    const y = orbitRadius * Math.sin( angle );
    const z = 0;
    vertices[ i ].setXYZ( x, y, z );
  }
  return vertices;
}

/**
 * Updates the vertices that approximate the standing wave.
 */
function updateWaveVertices( hydrogenAtom: DeBroglieModel,
                             modelViewTransform: ModelViewTransform2,
                             vertices: Vector3[] ): Vector3[] {

  const electronState = hydrogenAtom.getElectronState();
  const radius = modelViewTransform.modelToViewDeltaX( hydrogenAtom.getElectronOrbitRadius( electronState ) );

  const numberOfVertices = vertices.length;
  const deltaAngle = ( 2 * Math.PI ) / numberOfVertices;

  for ( let i = 0; i < numberOfVertices; i++ ) {
    const angle = i * deltaAngle;
    const x = radius * Math.cos( angle );
    const y = radius * Math.sin( angle );
    const z = MAX_WAVE_HEIGHT * hydrogenAtom.getAmplitude( angle, electronState );
    vertices[ i ].setXYZ( x, y, z );
  }
  return vertices;
}

modelsOfTheHydrogenAtom.register( 'DeBroglie3DNode', DeBroglie3DNode );