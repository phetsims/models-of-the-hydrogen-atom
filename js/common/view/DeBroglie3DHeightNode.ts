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
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import Wireframe3DNode from './Wireframe3DNode.js';
import ProtonNode from './ProtonNode.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { DeBroglieRepresentation } from '../model/DeBroglieRepresentation.js';
import DeBroglie3DOrbitsNode from './DeBroglie3DOrbitsNode.js';
import DeBroglie3DWaveNode from './DeBroglie3DWaveNode.js';

// The final pitch (rotation about the x-axis), after the model has rotated into place.
const FINAL_PITCH = Utils.toRadians( 70 );

// Angular speed of the rotation animation, in radians/s.
const ANGULAR_SPEED = Utils.toRadians( 100 );

type SelfOptions = EmptySelfOptions;

type DeBroglie3DNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglie3DHeightNode extends Node {

  private readonly deBroglieRepresentationProperty: TReadOnlyProperty<DeBroglieRepresentation>;

  // Pitch, rotation about the x-axis
  private readonly pitchProperty: Property<number>;

  private readonly orbitsNode: Wireframe3DNode;
  private readonly waveNode: Wireframe3DNode;

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

    this.deBroglieRepresentationProperty = hydrogenAtom.deBroglieRepresentationProperty;

    this.pitchProperty = new NumberProperty( 0, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'pitchProperty' ),
      phetioReadOnly: true
      //TODO phetioDocumentation
    } );

    // 3D orbits
    this.orbitsNode = new DeBroglie3DOrbitsNode( modelViewTransform, this.pitchProperty );
    this.orbitsNode.translation = modelViewTransform.modelToViewPosition( hydrogenAtom.position ); //TODO
    this.addChild( this.orbitsNode );

    // proton
    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );
    this.addChild( protonNode );

    // wave
    this.waveNode = new DeBroglie3DWaveNode( hydrogenAtom, modelViewTransform, this.pitchProperty );
    this.waveNode.translation = modelViewTransform.modelToViewPosition( hydrogenAtom.position ); //TODO
    this.addChild( this.waveNode );

    hydrogenAtom.deBroglieRepresentationProperty.lazyLink( deBroglieRepresentation => {
      if ( deBroglieRepresentation === '3DHeight' ) {
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