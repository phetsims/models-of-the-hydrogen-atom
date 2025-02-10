// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglieRadialNodeOptions represents the de Broglie model as a standing wave. A wave is drawn that corresponds
 * to the electron's orbit. The wave's offset from the electron's orbit is a function of amplitude.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import QuantumElectron from '../model/QuantumElectron.js';
import MOTHAColors from '../MOTHAColors.js';
import DeBroglie2DWaveNode from './DeBroglie2DWaveNode.js';

// Multiply the ground state orbit radius by this number to determine the radial offset at max amplitude.
const RADIAL_OFFSET_FACTOR = 0.45;

// Number of line segments used to approximate the wave, empirically tunes to make the wave look smooth.
const NUMBER_OF_SEGMENTS = 200;

export default class DeBroglieRadialDistanceNode extends DeBroglie2DWaveNode {

  public constructor( deBroglieModel: DeBroglieModel, modelViewTransform: ModelViewTransform2 ) {

    const waveNode = new RadialDistanceWaveNode( deBroglieModel, modelViewTransform );

    super( deBroglieModel, modelViewTransform, 'radialDistance', waveNode );
  }
}

/**
 * RadialDistanceWaveNode represents the wave as a ring whose radial distance from the electron's orbit
 * changes as a function of amplitude.
 */
class RadialDistanceWaveNode extends Path {

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
    this.groundStateOrbitRadius = this.modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( QuantumElectron.GROUND_STATE ) );

    // Optimized to update only when the view representation is set to 'Radial Distance'.
    const updateEnabledProperty = new DerivedProperty( [ deBroglieModel.deBroglieRepresentationProperty ],
      deBroglieRepresentation => deBroglieRepresentation === 'radialDistance' );

    Multilink.multilink( [ updateEnabledProperty, deBroglieModel.electron.nProperty, deBroglieModel.electron.angleProperty ],
      updateEnabled => {
        if ( !isSettingPhetioStateProperty.value && updateEnabled ) {
          this.update();
        }
      } );

    // Because the above Multilink is short-circuited when setting state, we need to call update after state has been set.
    phetioStateSetEmitter.addListener( () => this.update() );
  }

  /**
   * Updates the shape of the wave.
   */
  private update(): void {

    // Get the radius for the electron's current state.
    const n = this.deBroglieModel.electron.nProperty.value;
    const electronOrbitRadius = this.modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );

    const waveShape = new Shape();
    for ( let i = 0; i < NUMBER_OF_SEGMENTS; i++ ) {

      const angle = ( 2 * Math.PI ) * ( i / NUMBER_OF_SEGMENTS );
      const amplitude = this.deBroglieModel.getAmplitude( n, angle ); // getAmplitude uses this.deBroglieModel.electron.angleProperty

      const maxRadialOffset = RADIAL_OFFSET_FACTOR * this.groundStateOrbitRadius;
      const radialOffset = maxRadialOffset * amplitude;
      const x = ( electronOrbitRadius + radialOffset ) * Math.cos( angle ) + this.hydrogenAtomPosition.x;
      const y = ( electronOrbitRadius + radialOffset ) * Math.sin( angle ) + this.hydrogenAtomPosition.y;
      if ( i === 0 ) {
        waveShape.moveTo( x, y );
      }
      else {
        waveShape.lineTo( x, y );
      }
    }
    waveShape.close();

    this.shape = waveShape;
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieRadialDistanceNode', DeBroglieRadialDistanceNode );