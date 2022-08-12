// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieBrightnessNode represents the de Broglie model as a standing wave. A ring is drawn that corresponds
 * to the electron's orbit. The color brightness of the ring is a function of the amplitude of the standing wave.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Color, TColor, Node, NodeOptions, Path } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import OrbitsNode from './OrbitsNode.js';
import Utils from '../../../../dot/js/Utils.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import MOTHAColors from '../MOTHAColors.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { Shape } from '../../../../kite/js/imports.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MOTHAConstants from '../MOTHAConstants.js';

// Distance along the ring's circumference that each polygon occupies, in view coordinates. This value was
// tuned empirically, so that the ring looks acceptably smooth. Since larger values result in creation of
// more polygons (Path nodes), it's important to keep this value as small as possible.
const POLYGON_SIZE = 3;

type SelfOptions = EmptySelfOptions;

type DeBroglieBrightnessNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglieBrightnessNode extends Node {

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglieBrightnessNodeOptions ) {

    const options = optionize<DeBroglieBrightnessNodeOptions, SelfOptions, NodeOptions>()( {

      // visible when the view choice is 'brightness'
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === 'brightness' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    // Electron orbits
    const orbitsNode = new OrbitsNode( hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );

    // Ring whose brightness represents the standing wave
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
type RingNodeOptions = RingNodeSelfOptions & PickRequired<NodeOptions, 'visibleProperty' | 'tandem'>;

/**
 * RingNode is the brightness ring that represents the standing wave.
 */
class RingNode extends Node {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly hydrogenAtomPosition: Vector2; // in view coordinates
  private readonly ringThickness: number; // radial width of the ring, in view coordinates
  private readonly polygonNodes: Path[]; // an ordered pool of polygons, used to approximate the ring

  // range of colors used for the ring, based on electron amplitude
  private readonly positiveAmplitudeColorProperty: TReadOnlyProperty<Color>;
  private readonly negativeAmplitudeColorProperty: TReadOnlyProperty<Color>;
  private readonly zeroAmplitudeColorProperty: TReadOnlyProperty<Color>;

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: RingNodeOptions ) {

    super( providedOptions );

    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;
    this.hydrogenAtomPosition = modelViewTransform.modelToViewPosition( hydrogenAtom.position );
    this.ringThickness = modelViewTransform.modelToViewDeltaX( DeBroglieModel.BRIGHTNESS_RING_THICKNESS );

    // Pre-allocate the maximum number of polygon (Path) nodes. Based on the radius of the electron's current orbit,
    // some subset of these polygons will actually be added to the scene graph.
    const maxState = MOTHAConstants.GROUND_STATE + DeBroglieModel.getNumberOfStates() - 1;
    const maxRadius = modelViewTransform.modelToViewDeltaX( hydrogenAtom.getElectronOrbitRadius( maxState ) );
    const maxPolygons = calculateNumberOfPolygons( maxRadius );
    this.polygonNodes = [];
    for ( let i = 0; i < maxPolygons; i++ ) {
      this.polygonNodes.push( new Path( null ) );
    }

    this.positiveAmplitudeColorProperty = MOTHAColors.electronBaseColorProperty;
    this.negativeAmplitudeColorProperty = MOTHAColors.deBroglieNegativeAmplitudeColorProperty;
    this.zeroAmplitudeColorProperty = new DerivedProperty(
      [ this.negativeAmplitudeColorProperty, this.positiveAmplitudeColorProperty ],
      ( negativeAmplitudeColor, positiveAmplitudeColor ) =>
        Color.interpolateRGBA( negativeAmplitudeColor, positiveAmplitudeColor, 0.5 )
    );

    Multilink.multilink( [ this.hydrogenAtom.getElectronStateProperty(), this.visibleProperty ],
      ( electronState, visible ) => {
        if ( visible ) {
          this.updateGeometry();
          this.updateColor();
        }
      } );

    this.hydrogenAtom.electronAngleProperty.link( electronAngle => {
      this.visible && this.updateColor();
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  /**
   * Updates the ring's geometry. Polygons (Paths) are reused, and new Shapes are computed.
   * This should be called only when the electron state changes, resulting in the electron moving
   * to a different orbit, and therefore requiring the ring to be revised to match that orbit.
   */
  private updateGeometry(): void {
    assert && assert( this.visible, 'should only be called when visible' );

    // Compute the number of polygons needed to represent this electron state.
    const electronState = this.hydrogenAtom.getElectronState();
    const modelRadius = this.hydrogenAtom.getElectronOrbitRadius( electronState );
    const viewRadius = this.modelViewTransform.modelToViewDeltaX( modelRadius );
    const numberOfPolygons = calculateNumberOfPolygons( viewRadius );
    assert && assert( numberOfPolygons <= this.polygonNodes.length );

    // Select polygons in order from the pool, and create their Shapes.
    const children = [];
    for ( let i = 0; i < numberOfPolygons; i++ ) {
      const polygonNode = this.polygonNodes[ i ];
      polygonNode.shape = new RingPolygonShape( i, numberOfPolygons, viewRadius, this.ringThickness, this.hydrogenAtomPosition );
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
    assert && assert( this.visible, 'should only be called when visible' );

    const electronState = this.hydrogenAtom.getElectronState();

    // the number of relevant polygons, NOT this.polygonNodes.length
    assert && assert( _.every( this.children, child => child instanceof Path ) );
    const numberOfPolygons = this.getChildrenCount();

    // Visit polygons in the same order as updateGeometry.
    for ( let i = 0; i < numberOfPolygons; i++ ) {
      const angle = ( 2 * Math.PI ) * ( i / numberOfPolygons );
      const amplitude = this.hydrogenAtom.getAmplitude( angle, electronState );
      this.polygonNodes[ i ].fill = this.amplitudeToColor( amplitude );
    }
  }

  /**
   * Maps the specified amplitude to a color.
   */
  private amplitudeToColor( amplitude: number ): TColor {
    assert && assert( amplitude >= -1 && amplitude <= 1, `amplitude=${amplitude}` );
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
 * RingPolygonShape is the Shape of one of the polygons used to approximate the ring.
 */
class RingPolygonShape extends Shape {

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
  return Utils.toFixedNumber( circumference / POLYGON_SIZE, 0 ) + 1;
}

modelsOfTheHydrogenAtom.register( 'DeBroglieBrightnessNode', DeBroglieBrightnessNode );