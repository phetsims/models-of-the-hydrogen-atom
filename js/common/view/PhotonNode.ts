// Copyright 2022-2025, University of Colorado Boulder

/**
 * PhotonNode is the visual representation of a photon. A round "orb" has an outer "halo" and a whimsical "sparkle"
 * in the middle. Origin is at center of the Node's bounding rectangle.
 *
 * By default, the colorscheme is as follows:
 * - visible wavelengths are mapped to visible colors.
 * - UV photons are rendered as gray orbs with violet crosshairs.
 * - IR photos are rendered as gray orbs with red crosshairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Circle from '../../../../scenery/js/nodes/Circle.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Color from '../../../../scenery/js/util/Color.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
import TColor from '../../../../scenery/js/util/TColor.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import LightSource from '../model/LightSource.js';
import Photon from '../model/Photon.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import { toRadians } from '../../../../dot/js/util/toRadians.js';

type SelfOptions = EmptySelfOptions;

type PhotonNodeOptions = SelfOptions & PickOptional<NodeOptions, 'scale' | 'tandem'>;

export default class PhotonNode extends Node {

  public readonly photon: Photon;

  public constructor( photon: Photon, modelViewTransform: ModelViewTransform2, providedOptions?: PhotonNodeOptions ) {

    const wavelength = photon.wavelength;

    const photonRadius = modelViewTransform.modelToViewDeltaX( Photon.RADIUS );

    const haloRadius = photonRadius;
    const haloNode = new Circle( haloRadius, {
      fill: createHaloColor( wavelength, haloRadius )
    } );

    const orbRadius = 0.5 * photonRadius;
    const orbNode = new Circle( orbRadius, {
      fill: createOrbColor( wavelength, orbRadius )
    } );

    const sparkleRadius = 0.575 * photonRadius;
    const sparkleNode = new SparkleNode( wavelength, sparkleRadius );

    const options = optionize<PhotonNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      children: [ haloNode, orbNode, sparkleNode ]
    }, providedOptions );

    super( options );

    // Draw a halo around specific photons, to make them easier to see.
    if ( MOTHAQueryParameters.showHalos && photon.debugHaloColor ) {
      this.addChild( new Circle( {
        radius: 1.25 * haloRadius,
        stroke: photon.debugHaloColor,
        lineWidth: 6
      } ) );
    }

    const positionListener = ( position: Vector2 ) => {
      this.translation = modelViewTransform.modelToViewPosition( position );
    };
    photon.positionProperty.link( positionListener );

    this.photon = photon;

    // When this Node is disposed, remove the listener if it's still registered.
    this.disposeEmitter.addListener( () => {
      if ( photon.positionProperty.hasListener( positionListener ) ) {
        photon.positionProperty.unlink( positionListener );
      }
    } );
  }

  /**
   * Creates a photon icon.
   */
  public static createIcon( wavelength: number, scale = 1 ): Node {
    const photon = new Photon( {
      wavelength: wavelength,
      position: new Vector2( 0, 0 ),
      tandem: Tandem.OPT_OUT
    } );
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new PhotonNode( photon, modelViewTransform, {
      scale: scale
    } );
  }
}

/**
 * The sparkle in the middle of the photon, composed of a pair of crosshairs.
 */
class SparkleNode extends Node {
  public constructor( wavelength: number, radius: number ) {
    const fill = getSparkleColor( wavelength );
    const bigCrosshairs = new CrosshairsNode( radius, fill );
    const smallCrosshairs = new CrosshairsNode( 0.7 * radius, fill, toRadians( 45 ) );
    super( {
      children: [ bigCrosshairs, smallCrosshairs ],
      rotation: toRadians( 18 )
    } );
  }
}

class CrosshairsNode extends Node {
  public constructor( radius: number, fill: TColor, rotation = 0 ) {

    const crosshairShape = Shape.ellipse( 0, 0, radius, 0.1 * radius, 0 );

    const horizontalPart = new Path( crosshairShape, {
      fill: fill
    } );

    const verticalPart = new Path( crosshairShape, {
      fill: fill,
      rotation: toRadians( 90 )
    } );

    super( {
      children: [ horizontalPart, verticalPart ],
      rotation: rotation
    } );
  }
}

/**
 * Creates the color for the orb, the main body of the photon.
 */
function createOrbColor( wavelength: number, radius: number ): RadialGradient {
  const innerColor = new Color( 255, 255, 255, 0.7 );
  const outerColor = LightSource.wavelengthToColor( wavelength ).withAlpha( 0.5 );
  return new RadialGradient( 0, 0, 0, 0, 0, radius )
    .addColorStop( 0.25, innerColor )
    .addColorStop( 1, outerColor );
}

/**
 * Creates the color for the halo that surrounds the orb.
 */
function createHaloColor( wavelength: number, radius: number ): RadialGradient {
  const innerColor = LightSource.wavelengthToColor( wavelength );
  const outerColor = innerColor.withAlpha( 0 );
  return new RadialGradient( 0, 0, 0, 0, 0, radius )
    .addColorStop( 0.4, innerColor )
    .addColorStop( 1, outerColor );
}

/*
 * Gets the color for the 'sparkle' in the center of the photon.
 */
function getSparkleColor( wavelength: number ): TColor {
  if ( wavelength < VisibleColor.MIN_WAVELENGTH ) {
    return MOTHAColors.UV_PHOTON_SPARKLE_COLOR;
  }
  else if ( wavelength > VisibleColor.MAX_WAVELENGTH ) {
    return MOTHAColors.IR_PHOTON_SPARKLE_COLOR;
  }
  else {
    return MOTHAColors.VISIBLE_PHOTON_SPARKLE_COLOR;
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonNode', PhotonNode );