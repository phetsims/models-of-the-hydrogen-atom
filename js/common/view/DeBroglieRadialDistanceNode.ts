// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglieRadialNodeOptions represents the de Broglie model as a standing wave. A ring is drawn that corresponds
 * to the electron's orbit. The radial offset of that ring from the electron's orbit is a function of the amplitude
 * of the standing wave.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import OrbitsNode from './OrbitsNode.js';

// multiply the ground state orbit radius by this number to determine the radial offset at max amplitude
const RADIAL_OFFSET_FACTOR = 0.45;

// number of line segments used to approximate the ring, empirically tunes to make the ring look smooth
const NUMBER_OF_SEGMENTS = 200;

export default class DeBroglieRadialDistanceNode extends Node {

  public constructor( deBroglieModel: DeBroglieModel, modelViewTransform: ModelViewTransform2 ) {

    // Electron orbits
    const orbitsNode = new OrbitsNode( deBroglieModel.position, modelViewTransform );

    // Ring that represents the electron as a  standing wave
    const ringNode = new RingNode( deBroglieModel, modelViewTransform );

    super( {

      // NodeOptions
      isDisposable: false,
      children: [ orbitsNode, ringNode ],

      // visible when the view choice is 'Radial Distance'
      visibleProperty: new DerivedProperty( [ deBroglieModel.deBroglieRepresentationProperty ],
        deBroglieView => ( deBroglieView === 'radialDistance' ) )
    } );
  }
}

/**
 * RingNode is the ring that represents the standing wave.
 * It's radial distance from the electron's orbit is a function of amplitude.
 */
class RingNode extends Path {

  private readonly deBroglieModel: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;

  // position of the hydrogen atom, in view coordinates
  private readonly hydrogenAtomPosition: Vector2;

  // radius of the ground state orbit, in view coordinates
  private readonly groundStateOrbitRadius: number;

  public constructor( deBroglieModel: DeBroglieModel, modelViewTransform: ModelViewTransform2 ) {

    super( null, {
      isDisposable: false,
      stroke: MOTHAColors.electronBaseColorProperty,
      lineWidth: 2
    } );

    this.deBroglieModel = deBroglieModel;
    this.modelViewTransform = modelViewTransform;
    this.hydrogenAtomPosition = this.modelViewTransform.modelToViewPosition( deBroglieModel.position );
    this.groundStateOrbitRadius = this.modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( MOTHAConstants.GROUND_STATE ) );

    // Optimized to update only when the view representation is set to 'Radial Distance'.
    const updateEnabledProperty = new DerivedProperty( [ deBroglieModel.deBroglieRepresentationProperty ],
      deBroglieRepresentation => deBroglieRepresentation === 'radialDistance' );

    Multilink.multilink( [ deBroglieModel.electron.angleProperty, updateEnabledProperty ],
      ( electronAngle, updateEnabled ) => {
        updateEnabled && this.update();
      } );
  }

  /**
   * Updates the shape of the ring.
   */
  private update(): void {

    // Get the radius for the electron's current state.
    const n = this.deBroglieModel.electron.nProperty.value;
    const electronOrbitRadius = this.modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );

    const ringShape = new Shape();
    for ( let i = 0; i < NUMBER_OF_SEGMENTS; i++ ) {

      const angle = ( 2 * Math.PI ) * ( i / NUMBER_OF_SEGMENTS );
      const amplitude = this.deBroglieModel.getAmplitude( n, angle );

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

modelsOfTheHydrogenAtom.register( 'DeBroglieRadialDistanceNode', DeBroglieRadialDistanceNode );