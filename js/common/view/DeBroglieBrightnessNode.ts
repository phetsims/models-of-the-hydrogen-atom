// Copyright 2022-2025, University of Colorado Boulder

/**
 * DeBroglieBrightnessNode represents the de Broglie model as a standing wave. A ring is drawn that corresponds
 * to the electron's orbit. The color brightness of the ring is a function of the amplitude of the standing wave.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Color from '../../../../scenery/js/util/Color.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import phetioStateSetEmitter from '../../../../tandem/js/phetioStateSetEmitter.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import QuantumElectron from '../model/QuantumElectron.js';
import MOTHAColors from '../MOTHAColors.js';
import DeBroglie2DWaveNode from './DeBroglie2DWaveNode.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

// Distance along the ring's circumference that each polygon occupies, in view coordinates. This value was
// adjusted so that the ring looks acceptably smooth. Since larger values result in creation of more polygons
// (Path nodes), it's important to keep this value as small as possible.
const POLYGON_SIZE = 3;

export default class DeBroglieBrightnessNode extends DeBroglie2DWaveNode {

  public constructor( deBroglieModel: DeBroglieModel, modelViewTransform: ModelViewTransform2 ) {

    // Brightness represents the standing wave
    const waveNode = new BrightnessWaveNode( deBroglieModel, modelViewTransform );

    super( deBroglieModel, modelViewTransform, 'brightness', waveNode );
  }
}

/**
 * BrightnessWaveNode represents the wave as a ring whose brightness changes.
 */
class BrightnessWaveNode extends Node {

  private readonly deBroglieModel: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly hydrogenAtomPosition: Vector2; // in view coordinates
  private readonly ringThickness: number; // radial width of the ring, in view coordinates
  private readonly polygonNodes: Path[]; // an ordered pool of polygons, used to approximate the wave

  // Range of colors used for the wave, based on electron amplitude.
  private readonly positiveAmplitudeColorProperty: TReadOnlyProperty<Color>;
  private readonly negativeAmplitudeColorProperty: TReadOnlyProperty<Color>;
  private readonly zeroAmplitudeColorProperty: TReadOnlyProperty<Color>;

  public constructor( deBroglieModel: DeBroglieModel, modelViewTransform: ModelViewTransform2 ) {

    super( {
      isDisposable: false
    } );

    this.deBroglieModel = deBroglieModel;
    this.modelViewTransform = modelViewTransform;
    this.hydrogenAtomPosition = modelViewTransform.modelToViewPosition( deBroglieModel.position );
    this.ringThickness = modelViewTransform.modelToViewDeltaX( DeBroglieModel.BRIGHTNESS_RING_THICKNESS );

    // Pre-allocate the maximum number of polygon (Path) nodes. Based on the radius of the electron's current orbit,
    // some subset of these polygons will actually be added to the scene graph.
    const maxRadius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( QuantumElectron.MAX_STATE ) );
    const maxPolygons = calculateNumberOfPolygons( maxRadius );
    this.polygonNodes = [];
    for ( let i = 0; i < maxPolygons; i++ ) {
      this.polygonNodes.push( new Path( null ) );
    }

    this.positiveAmplitudeColorProperty = MOTHAColors.electronBaseColorProperty;
    this.negativeAmplitudeColorProperty = MOTHAColors.screenBackgroundColorProperty;
    this.zeroAmplitudeColorProperty = new DerivedProperty(
      [ this.negativeAmplitudeColorProperty, this.positiveAmplitudeColorProperty ],
      ( negativeAmplitudeColor, positiveAmplitudeColor ) =>
        Color.interpolateRGBA( negativeAmplitudeColor, positiveAmplitudeColor, 0.5 )
    );

    // Optimized to update only when the view representation is set to 'Brightness'.
    const updateEnabledProperty = new DerivedProperty( [ deBroglieModel.deBroglieRepresentationProperty ],
      deBroglieRepresentation => deBroglieRepresentation === 'brightness' );

    Multilink.multilink( [
        updateEnabledProperty,
        this.deBroglieModel.electron.nProperty,
        this.deBroglieModel.electron.angleProperty,
        this.zeroAmplitudeColorProperty,
        this.positiveAmplitudeColorProperty,
        this.negativeAmplitudeColorProperty
      ],
      updateEnabled => {
        if ( !isSettingPhetioStateProperty.value && updateEnabled ) {
          this.update();
        }
      } );

    // Because the above Multilink is short-circuited when setting state, we need to call update after state has been set.
    phetioStateSetEmitter.addListener( () => this.update() );
  }

  private update(): void {
    this.updateGeometry();
    this.updateColor();
  }

  /**
   * Updates the ring's geometry. Polygons (Paths) are reused, and new Shapes are computed.
   * This should be called only when the electron state changes, resulting in the electron moving
   * to a different orbit, and therefore requiring the ring to be revised to match that orbit.
   */
  private updateGeometry(): void {

    // Compute the number of polygons needed to represent this electron state.
    const modelRadius = BohrModel.getElectronOrbitRadius( this.deBroglieModel.electron.nProperty.value );
    const viewRadius = this.modelViewTransform.modelToViewDeltaX( modelRadius );
    const numberOfPolygons = calculateNumberOfPolygons( viewRadius );
    assert && assert( numberOfPolygons <= this.polygonNodes.length, `invalid number of polygons: ${numberOfPolygons}` );

    // Select polygons in order from the pool, and create their Shapes.
    const children = [];
    for ( let i = 0; i < numberOfPolygons; i++ ) {
      const polygonNode = this.polygonNodes[ i ];
      polygonNode.shape = new BrightnessPolygonShape( i, numberOfPolygons, viewRadius, this.ringThickness, this.hydrogenAtomPosition );
      children.push( polygonNode );
    }

    this.children = children;
  }

  /**
   * Updates the ring color. The color for each polygon (Path) in the ring is computed based on the amplitude at
   * that polygon's position. This should be called when the electron's state or angle changes.
   * NOTE: This assumes that updateGeometry and updateColor use the same ordering for this.polygonNodes.
   */
  private updateColor(): void {

    const n = this.deBroglieModel.electron.nProperty.value;

    // The number of relevant polygons, NOT this.polygonNodes.length.
    assert && assert( _.every( this.children, child => child instanceof Path ), 'Every child should be an instance of Path.' );
    const numberOfPolygons = this.getChildrenCount();

    // Visit polygons in the same order as updateGeometry.
    for ( let i = 0; i < numberOfPolygons; i++ ) {
      const angle = ( 2 * Math.PI ) * ( i / numberOfPolygons );
      const amplitude = this.deBroglieModel.getAmplitude( n, angle ); // getAmplitude uses this.deBroglieModel.electron.angleProperty
      this.polygonNodes[ i ].fill = this.amplitudeToColor( amplitude );
    }
  }

  /**
   * Maps the specified amplitude to a color.
   */
  private amplitudeToColor( amplitude: number ): TColor {
    assert && assert( amplitude >= -1 && amplitude <= 1, `invalid amplitude=${amplitude}` );
    if ( amplitude === 0 ) {
      return this.zeroAmplitudeColorProperty.value;
    }
    else if ( amplitude > 0 ) {
      return Color.interpolateRGBA( this.zeroAmplitudeColorProperty.value, this.positiveAmplitudeColorProperty.value, amplitude );
    }
    else {
      return Color.interpolateRGBA( this.zeroAmplitudeColorProperty.value, this.negativeAmplitudeColorProperty.value, -amplitude );
    }
  }
}

/**
 * BrightnessPolygonShape is the Shape of one of the polygons used to approximate the ring.
 */
class BrightnessPolygonShape extends Shape {

  // All quantities are in view coordinates.
  public constructor( index: number, numberOfPolygons: number, radius: number, ringThickness: number, hydrogenAtomPosition: Vector2 ) {

    super();

    const a1 = ( 2 * Math.PI ) * ( index / numberOfPolygons );
    const a2 = a1 + ( 2 * Math.PI / numberOfPolygons ) + 0.001; // add a tiny bit of overlap, to hide seams
    const r1 = radius - ringThickness;
    const r2 = radius + ringThickness;
    const cos1 = Math.cos( a1 );
    const sin1 = Math.sin( a1 );
    const cos2 = Math.cos( a2 );
    const sin2 = Math.sin( a2 );

    // Points that define the polygon
    const xAtom = hydrogenAtomPosition.x;
    const yAtom = hydrogenAtomPosition.y;
    const x1 = r1 * cos1 + xAtom;
    const y1 = r1 * sin1 + yAtom;
    const x2 = r2 * cos1 + xAtom;
    const y2 = r2 * sin1 + yAtom;
    const x3 = r2 * cos2 + xAtom;
    const y3 = r2 * sin2 + yAtom;
    const x4 = r1 * cos2 + xAtom;
    const y4 = r1 * sin2 + yAtom;

    this.moveTo( x1, y1 ).lineTo( x2, y2 ).lineTo( x3, y3 ).lineTo( x4, y4 ).close();
  }
}

/**
 * Calculates the number of polygons required to approximate a ring with the specified radius.
 */
function calculateNumberOfPolygons( radius: number ): number {
  const circumference = Math.PI * ( 2 * radius );
  return toFixedNumber( circumference / POLYGON_SIZE, 0 ) + 1;
}

modelsOfTheHydrogenAtom.register( 'DeBroglieBrightnessNode', DeBroglieBrightnessNode );