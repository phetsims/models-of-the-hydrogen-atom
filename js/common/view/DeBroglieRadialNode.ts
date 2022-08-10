// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieRadialNodeOptions represents the de Broglie model as a standing wave. A ring is drawn that corresponds
 * to the electron's orbit. The radial offset of that ring from the electron's orbit is a function of the amplitude
 * of the standing wave.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions, Path, PathOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import OrbitsNode from './OrbitsNode.js';
import MOTHAColors from '../MOTHAColors.js';
import { Shape } from '../../../../kite/js/imports.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Multilink from '../../../../axon/js/Multilink.js';
import MOTHAConstants from '../MOTHAConstants.js';

// multiply the ground state orbit radius by this number to determine the radial offset at max amplitude
const RADIAL_OFFSET_FACTOR = 0.45;

// number of line segments used to approximate the ring, empirically tunes to make the ring look smooth
const NUMBER_OF_SEGMENTS = 200;

type SelfOptions = EmptySelfOptions;

type DeBroglieRadialNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglieRadialNode extends Node {

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglieRadialNodeOptions ) {

    const options = optionize<DeBroglieRadialNodeOptions, SelfOptions, NodeOptions>()( {

      // visible when the view choice is 'radial'
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === 'radial' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    // Electron orbits
    const orbitsNode = new OrbitsNode( hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );

    // Ring that represents the standing wave
    const ringNode = new RingNode( hydrogenAtom, modelViewTransform, {

      // Synchronize visibility with the parent Node, because RingNode is optimized to update only when visible.
      visibleProperty: options.visibleProperty,
      tandem: options.tandem.createTandem( 'ringNode' )
    } );

    options.children = [ orbitsNode, ringNode ];

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

type RingNodeSelfOptions = EmptySelfOptions;
type RingNodeOptions = RingNodeSelfOptions & PickRequired<PathOptions, 'visibleProperty' | 'tandem'>;

/**
 * RingNode is the ring that represents the standing wave.
 * It's radial distance from the electron's orbit is a function of amplitude.
 */
class RingNode extends Path {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;

  // position of the hydrogen atom, in view coordinates
  private readonly hydrogenAtomPosition: Vector2;

  // radius of the ground state orbit, in view coordinates
  private readonly groundStateOrbitRadius: number;

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: RingNodeOptions ) {

    const options = optionize<RingNodeOptions, RingNodeSelfOptions, PathOptions>()( {

      // PathOptions
      stroke: MOTHAColors.electronBaseColorProperty,
      lineWidth: 2
    }, providedOptions );

    super( null, options );

    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;
    this.hydrogenAtomPosition = this.modelViewTransform.modelToViewPosition( hydrogenAtom.position );
    this.groundStateOrbitRadius = this.modelViewTransform.modelToViewDeltaX( hydrogenAtom.getElectronOrbitRadius( MOTHAConstants.GROUND_STATE ) );

    Multilink.multilink( [ hydrogenAtom.electronAngleProperty, this.visibleProperty ],
      ( electronAngle, visible ) => {
        visible && this.update();
      } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Updates the shape of the ring.
   */
  private update(): void {
    assert && assert( this.visible );

    // Get the radius for the electron's current state.
    const electronState = this.hydrogenAtom.getElectronState();
    const electronOrbitRadius = this.modelViewTransform.modelToViewDeltaX( this.hydrogenAtom.getElectronOrbitRadius( electronState ) );

    const ringShape = new Shape();
    for ( let i = 0; i < NUMBER_OF_SEGMENTS; i++ ) {

      const angle = ( 2 * Math.PI ) * ( i / NUMBER_OF_SEGMENTS );
      const amplitude = this.hydrogenAtom.getAmplitude( angle, electronState );

      const maxRadialOffset = RADIAL_OFFSET_FACTOR * this.groundStateOrbitRadius;
      const radialOffset = maxRadialOffset * amplitude;
      const x = ( electronOrbitRadius + radialOffset ) * Math.cos( angle ) + this.hydrogenAtomPosition.x;
      const y = ( electronOrbitRadius + radialOffset ) * Math.sin( angle ) + this.hydrogenAtomPosition.y;
      if ( i === 0 ) {
        ringShape.moveTo( x, y );
      }
      else {
        ringShape.lineTo( x, y );
      }
    }
    ringShape.close();

    this.shape = ringShape;
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieRadialNode', DeBroglieRadialNode );