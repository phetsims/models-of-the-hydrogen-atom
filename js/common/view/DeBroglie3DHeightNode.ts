// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglie3DHeightNode displays the '3D Height' view for the de Broglie model. In this view, the 3D height of the wave
 * is a function of the electron amplitude. Selecting this view causes the atom to rotate into place, so that we are
 * viewing the atom in pseudo-3D.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { toRadians } from '../../../../dot/js/util/toRadians.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';
import DeBroglie3DOrbitsNode from './DeBroglie3DOrbitsNode.js';
import DeBroglie3DWaveNode from './DeBroglie3DWaveNode.js';
import ProtonNode from './ProtonNode.js';
import Wireframe3DNode from './Wireframe3DNode.js';

// The final pitch (rotation about the x-axis), after the model has rotated into place.
const FINAL_PITCH = toRadians( 70 );

// Angular speed of the rotation animation, in radians/s.
const ANGULAR_SPEED = toRadians( 100 );

export default class DeBroglie3DHeightNode extends Node {

  // Selected view representation of the de Broglie model.
  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;

  // Pitch, rotation about the x-axis.
  // In case you're not familiar with 3D rotation, it is typically specified as pitch, roll, and yaw angles.
  private readonly pitchProperty: Property<number>;

  // Wireframe renderings of the orbits and wave.
  private readonly orbitsNode: Wireframe3DNode;
  private readonly waveNode: Wireframe3DNode;

  public constructor( deBroglieModel: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,

      // Visible when the view choice is '3D Height'.
      visibleProperty: new DerivedProperty( [ deBroglieModel.deBroglieRepresentationProperty ],
        deBroglieView => ( deBroglieView === '3DHeight' ) )
    } );

    this.deBroglieRepresentationProperty = deBroglieModel.deBroglieRepresentationProperty;

    this.pitchProperty = new NumberProperty( 0, {
      units: 'radians',
      tandem: tandem.createTandem( 'pitchProperty' ),
      phetioDocumentation: 'Pitch rotation angle of the "3D Height" view for the de Broglie model. For internal use only.',
      phetioReadOnly: true
    } );

    const atomPosition = modelViewTransform.modelToViewPosition( deBroglieModel.position );

    // 3D orbits
    this.orbitsNode = new DeBroglie3DOrbitsNode( modelViewTransform, this.pitchProperty, FINAL_PITCH );
    this.orbitsNode.translation = atomPosition;
    this.addChild( this.orbitsNode );

    // proton
    const protonNode = new ProtonNode( deBroglieModel.proton, modelViewTransform );
    this.addChild( protonNode );

    // wave
    this.waveNode = new DeBroglie3DWaveNode( deBroglieModel, modelViewTransform, this.pitchProperty );
    this.waveNode.translation = atomPosition;
    this.addChild( this.waveNode );

    deBroglieModel.deBroglieRepresentationProperty.lazyLink( deBroglieRepresentation => {
      if ( !isSettingPhetioStateProperty.value && deBroglieRepresentation === '3DHeight' ) {
        this.pitchProperty.reset();
        this.update();
      }
    } );

    this.update();

    // When resetting PhET-iO state, restoring pitchProperty needs to trigger an update.
    // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/141.
    this.pitchProperty.lazyLink( () => {
      if ( isSettingPhetioStateProperty.value ) {
        this.update();
      }
    } );
  }

  private update(): void {
    this.orbitsNode.update();
    this.waveNode.update();
  }

  /**
   * Advances the rotation of the 3D Height view, optimized to update only when the view representation is set to '3D Height'
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.deBroglieRepresentationProperty.value === '3DHeight' ) {
      if ( this.pitchProperty.value !== FINAL_PITCH ) {
        this.stepRotation( dt );
        this.orbitsNode.update();
      }
      this.waveNode.update();
    }
  }

  /*
   * Steps the rotation of the camera.
   */
  private stepRotation( dt: number ): void {
    if ( this.pitchProperty.value !== FINAL_PITCH ) {
      this.pitchProperty.value = Math.min( FINAL_PITCH, this.pitchProperty.value + dt * ANGULAR_SPEED );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglie3DHeightNode', DeBroglie3DHeightNode );