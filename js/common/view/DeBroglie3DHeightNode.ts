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
    const orbitsNode = new DeBroglie3DOrbitsNode( modelViewTransform, this.pitchProperty, FINAL_PITCH );
    orbitsNode.translation = atomPosition;
    this.addChild( orbitsNode );

    // proton
    const protonNode = new ProtonNode( deBroglieModel.proton, modelViewTransform );
    this.addChild( protonNode );

    // wave
    const waveNode = new DeBroglie3DWaveNode( deBroglieModel, modelViewTransform, this.pitchProperty );
    waveNode.translation = atomPosition;
    this.addChild( waveNode );

    // When switching to the '3D Height' view, reset the pitch so that we see the animation.
    deBroglieModel.deBroglieRepresentationProperty.lazyLink( deBroglieRepresentation => {
      if ( !isSettingPhetioStateProperty.value && deBroglieRepresentation === '3DHeight' ) {
        this.pitchProperty.reset();
      }
    } );
  }

  /**
   * Advances the rotation of the 3D Height view, optimized to update only when the representation is set to '3D Height'
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.deBroglieRepresentationProperty.value === '3DHeight' && this.pitchProperty.value !== FINAL_PITCH ) {
      this.pitchProperty.value = Math.min( FINAL_PITCH, this.pitchProperty.value + dt * ANGULAR_SPEED );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglie3DHeightNode', DeBroglie3DHeightNode );