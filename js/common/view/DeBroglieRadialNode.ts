// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieRadialNode show the 'radial' view for the de Broglie model. This view represents the deBroglie model
 * as a standing wave whose amplitude is proportional to the radial distance from the electron's orbit.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions, NodeTranslationOptions, Path } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import OrbitsNode from './OrbitsNode.js';
import MOTHAColors from '../MOTHAColors.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import { Shape } from '../../../../kite/js/imports.js';

// multiply the ground state orbit radius by this number to determine max amplitude
const RADIAL_OFFSET_FACTOR = 0.45;

// number of line segments used to approximate the ring
const NUMBER_OF_SEGMENTS = 200;

type SelfOptions = EmptyObjectType;

type DeBroglieRadialNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglieRadialNode extends Node {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly ringPath: Path;
  private readonly groundStateOrbitRadius: number;

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglieRadialNodeOptions ) {

    const options = optionize<DeBroglieRadialNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === 'radial' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
        } )
    }, providedOptions );

    // Electron orbits
    const orbitsNode = new OrbitsNode( hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );

    // Ring that represents the standing wave
    const ringPath = new Path( null, {
      stroke: MOTHAColors.electronBaseColorProperty
    } );

    options.children = [ orbitsNode, ringPath ];

    super( options );

    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;
    this.ringPath = ringPath;
    this.groundStateOrbitRadius = this.modelViewTransform.modelToViewDeltaX( this.hydrogenAtom.getElectronOrbitRadius( HydrogenAtom.GROUND_STATE ) );

    hydrogenAtom.electronAngleProperty.link( electronAngle => {
      this.updateRingPath();
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public step( dt: number ): void {
    //TODO implement step - is it needed for this view?
  }

  //TODO this is not behaving like the Java version
  /**
   * Updates the ring that represents the standing wave.
   */
  private updateRingPath(): void {

    // Get the radius for the electron's current state.
    const electronState = this.hydrogenAtom.electronStateProperty.value;
    const electronOrbitRadius = this.modelViewTransform.modelToViewDeltaX( this.hydrogenAtom.getElectronOrbitRadius( electronState ) );

    const ringShape = new Shape(); //TODO reuse one Shape instance?
    for ( let i = 0; i < NUMBER_OF_SEGMENTS; i++ ) {

      const angle = ( 2 * Math.PI ) * ( i / NUMBER_OF_SEGMENTS );
      const amplitude = this.hydrogenAtom.getAmplitude( angle, electronState );

      const maxRadialOffset = RADIAL_OFFSET_FACTOR * this.groundStateOrbitRadius;
      const radialOffset = maxRadialOffset * amplitude;
      const x = ( electronOrbitRadius + radialOffset ) * Math.cos( angle );
      const y = ( electronOrbitRadius + radialOffset ) * Math.sin( angle );
      if ( i === 0 ) {
        ringShape.moveTo( x, y );
      }
      else {
        ringShape.lineTo( x, y );
      }
    }
    ringShape.close();
    this.ringPath.shape = ringShape;

    // Center the ring at the atom's position.
    this.ringPath.center = this.modelViewTransform.modelToViewPosition( this.hydrogenAtom.position );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieRadialNode', DeBroglieRadialNode );