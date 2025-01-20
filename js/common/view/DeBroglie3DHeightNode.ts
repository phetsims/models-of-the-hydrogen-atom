// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglie3DHeightNode displays the '3D Height' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import Wireframe3DNode from './Wireframe3DNode.js';
import ProtonNode from './ProtonNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';
import DeBroglie3DOrbitsNode from './DeBroglie3DOrbitsNode.js';
import DeBroglie3DWaveNode from './DeBroglie3DWaveNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

// The final pitch (rotation about the x-axis), after the model has rotated into place.
const FINAL_PITCH = Utils.toRadians( 70 );

// Angular speed of the rotation animation, in radians/s.
const ANGULAR_SPEED = Utils.toRadians( 100 );

export default class DeBroglie3DHeightNode extends Node {

  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;

  // Pitch, rotation about the x-axis
  private readonly pitchProperty: Property<number>;

  private readonly orbitsNode: Wireframe3DNode;
  private readonly waveNode: Wireframe3DNode;

  public constructor( deBroglieModel: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      tandem: Tandem ) {

    super( {
      isDisposable: false,
      tandem: tandem,

      // visible when the view choice is '3D Height'
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

    // 3D orbits
    this.orbitsNode = new DeBroglie3DOrbitsNode( modelViewTransform, this.pitchProperty, FINAL_PITCH );
    this.orbitsNode.translation = modelViewTransform.modelToViewPosition( deBroglieModel.position );
    this.addChild( this.orbitsNode );

    // proton
    const protonNode = new ProtonNode( deBroglieModel.proton, modelViewTransform );
    this.addChild( protonNode );

    // wave
    this.waveNode = new DeBroglie3DWaveNode( deBroglieModel, modelViewTransform, this.pitchProperty );
    this.waveNode.translation = modelViewTransform.modelToViewPosition( deBroglieModel.position );
    this.addChild( this.waveNode );

    deBroglieModel.deBroglieRepresentationProperty.lazyLink( deBroglieRepresentation => {
      if ( !isSettingPhetioStateProperty.value && deBroglieRepresentation === '3DHeight' ) {
        this.pitchProperty.reset();
      }
    } );

    this.orbitsNode.update();
    this.waveNode.update();
  }

  /**
   * Optimized to update only when the view representation is set to '3D Height'.
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