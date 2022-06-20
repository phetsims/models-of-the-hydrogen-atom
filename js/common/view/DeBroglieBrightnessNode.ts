// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieBrightnessNode represents the de Broglie model as a standing wave. The amplitude [-1,+1] of the standing
 * wave is represented by the brightness of color in a ring that is positioned at the electron's orbit. The ring is
 * approximated using a set of polygons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Color, IColor, Node, NodeOptions, NodeTranslationOptions, Path } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';
import OrbitsNode from './OrbitsNode.js';
import Utils from '../../../../dot/js/Utils.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import MOTHAColors from '../MOTHAColors.js';
import Property from '../../../../axon/js/Property.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import Multilink from '../../../../axon/js/Multilink.js';
import { Shape } from '../../../../kite/js/imports.js';

// distance along the ring's circumference that each polygon occupies, in view coordinates
const POLYGON_SIZE = 3;

type SelfOptions = EmptyObjectType;

type DeBroglieBrightnessNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglieBrightnessNode extends Node {

  private readonly hydrogenAtom: DeBroglieModel;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly ringNode: Node; // parent node for all geometry that approximates the ring
  private readonly previousElectronStateProperty: Property<number | null>; // previous state of the atom's electron
  private readonly positiveAmplitudeColorProperty: IReadOnlyProperty<Color>;
  private readonly negativeAmplitudeColorProperty: IReadOnlyProperty<Color>;
  private readonly zeroAmplitudeColorProperty: IReadOnlyProperty<Color>;

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglieBrightnessNodeOptions ) {

    const options = optionize<DeBroglieBrightnessNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === 'brightness' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
        } )
    }, providedOptions );

    // Electron orbits
    const orbitsNode = new OrbitsNode( hydrogenAtom, modelViewTransform, {
      tandem: options.tandem.createTandem( 'orbitsNode' )
    } );

    // Ring whose brightness represents the standing wave
    const ringNode = new Node();

    options.children = [ orbitsNode, ringNode ];

    super( options );

    this.previousElectronStateProperty = new Property<number | null>( null, {
      //TODO isValidValue
      tandem: options.tandem.createTandem( 'previousElectronStateProperty' ),
      phetioReadOnly: true,
      phetioType: Property.PropertyIO( NullableIO( NumberIO ) )
    } );

    this.hydrogenAtom = hydrogenAtom;
    this.modelViewTransform = modelViewTransform;
    this.ringNode = ringNode;

    this.positiveAmplitudeColorProperty = MOTHAColors.electronBaseColorProperty;
    this.negativeAmplitudeColorProperty = MOTHAColors.deBroglieNegativeAmplitudeColorProperty;
    this.zeroAmplitudeColorProperty = new DerivedProperty(
      [ this.negativeAmplitudeColorProperty, this.positiveAmplitudeColorProperty ],
      ( negativeAmplitudeColor, positiveAmplitudeColor ) =>
        Color.interpolateRGBA( negativeAmplitudeColor, positiveAmplitudeColor, 0.5 )
    );

    //TODO are these dependencies correct?
    Multilink.multilink( [ this.hydrogenAtom.electronStateProperty, hydrogenAtom.electronAngleProperty, this.visibleProperty ],
      ( electronState, electronAngle, visible ) => {
        visible && this.update( electronState );
      }
    );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public step( dt: number ): void {
    //TODO implement step, or can this be deleted?
  }

  //TODO this is not displaying anything
  /**
   * Updates the ring's geometry and color to match the specified state.
   */
  private update( electronState: number ): void {
    assert && assert( this.visible );

    // Compute the number of polygons needed to represent this electron state.
    this.previousElectronStateProperty.value = electronState;
    const electronOrbitRadius = this.hydrogenAtom.getElectronOrbitRadius( electronState );
    const radius = this.modelViewTransform.modelToViewDeltaX( electronOrbitRadius );
    const numberOfPolygons = calculateNumberOfPolygons( radius );

    // Create the polygons, each with its own fill color that corresponds to amplitude.
    const polygonNodes: Node[] = [];
    for ( let i = 0; i < numberOfPolygons; i++ ) {

      const a1 = ( 2 * Math.PI ) * ( i / numberOfPolygons );
      const a2 = a1 + ( 2 * Math.PI / numberOfPolygons ) + 0.001; // add a tiny bit of overlap, to hide seams
      const r1 = radius - DeBroglieModel.BRIGHTNESS_RING_RADIUS;
      const r2 = radius + DeBroglieModel.BRIGHTNESS_RING_RADIUS;
      const cos1 = Math.cos( a1 );
      const sin1 = Math.sin( a1 );
      const cos2 = Math.cos( a2 );
      const sin2 = Math.sin( a2 );

      // Points that define the polygon
      const xAtom = this.hydrogenAtom.position.x;
      const yAtom = this.hydrogenAtom.position.y;
      const x1 = r1 * cos1 + xAtom;
      const y1 = r1 * sin1 + yAtom;
      const x2 = r2 * cos1 + xAtom;
      const y2 = r2 * sin1 + yAtom;
      const x3 = r2 * cos2 + xAtom;
      const y3 = r2 * sin2 + yAtom;
      const x4 = r1 * cos2 + xAtom;
      const y4 = r1 * sin2 + yAtom;

      // Shape for the polygon
      const shape = new Shape().moveTo( x1, y1 ).lineTo( x2, y2 ).lineTo( x3, y3 ).lineTo( x4, y4 ).close();

      // Fill color
      const angle = ( 2 * Math.PI ) * ( i / numberOfPolygons );
      const amplitude = this.hydrogenAtom.getAmplitude( angle, electronState );
      const polygonFill = this.amplitudeToColor( amplitude );

      polygonNodes.push( new Path( shape, {
        fill: polygonFill
      } ) );
    }

    this.ringNode.children = polygonNodes;
  }

  /**
   * Maps the specified amplitude to a color.
   */
  private amplitudeToColor( amplitude: number ): IColor {
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
 * Calculates the number of polygons required to approximate the ring.
 */
function calculateNumberOfPolygons( radius: number ) {
  const circumference = Math.PI * ( 2 * radius );
  return Utils.toFixedNumber( circumference / POLYGON_SIZE, 0 ) + 1;
}

modelsOfTheHydrogenAtom.register( 'DeBroglieBrightnessNode', DeBroglieBrightnessNode );