// Copyright 2022-2024, University of Colorado Boulder

/**
 * PhotonNode is the visual representation of a photon. A round "orb" has an outer "halo" and a whimsical "sparkle"
 * in the middle. Origin is at center of the Node's bounding rectangle. The look is loosely based on examples that
 * Wendy Adams found on a Disney website at http://disney.go.com/fairies/meetfairies.html.
 *
 * By default, the colorscheme is as follows:
 * - visible wavelengths are mapped to visible colors.
 * - UV photons are rendered as gray orbs with violet crosshairs.
 * - IR photos are rendered as gray orbs with red crosshairs.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Circle, Color, Node, NodeOptions, Path, RadialGradient, TColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Light from '../model/Light.js';
import Photon from '../model/Photon.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';

type SelfOptions = EmptySelfOptions;

type PhotonNodeOptions = SelfOptions & PickOptional<NodeOptions, 'scale' | 'tandem'>;

export default class PhotonNode extends Node {

  public readonly photon: Photon;
  private readonly disposePhotonNode: () => void;

  public constructor( photon: Photon, modelViewTransform: ModelViewTransform2, providedOptions?: PhotonNodeOptions ) {

    const wavelength = photon.wavelength;

    const photonRadius = modelViewTransform.modelToViewDeltaX( photon.radius );

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

    // Draw a red circle around emitted photons, to make them easier to see.
    if ( MOTHAQueryParameters.debugEmission && photon.debugHaloColor ) {
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

    this.disposePhotonNode = () => {
      if ( photon.positionProperty.hasListener( positionListener ) ) {
        photon.positionProperty.unlink( positionListener );
      }
    };
  }

  public override dispose(): void {
    this.disposePhotonNode();
    super.dispose();
  }

  /**
   * Creates a photon icon, used in the legend.
   */
  public static createIcon( wavelength: number, scale = 1 ): Node {
    const photon = new Photon( {
      wavelength: wavelength,
      position: new Vector2( 0, 0 ),
      direction: 0
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
    const smallCrosshairs = new CrosshairsNode( 0.7 * radius, fill, Utils.toRadians( 45 ) );
    super( {
      children: [ bigCrosshairs, smallCrosshairs ],
      rotation: Utils.toRadians( 18 )
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
      rotation: Utils.toRadians( 90 )
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
  const outerColor = Light.wavelengthToColor( wavelength ).withAlpha( 0.5 );
  return new RadialGradient( 0, 0, 0, 0, 0, radius )
    .addColorStop( 0.25, innerColor )
    .addColorStop( 1, outerColor );
}

/**
 * Creates the color for the halo that surrounds the orb.
 */
function createHaloColor( wavelength: number, radius: number ): RadialGradient {
  const innerColor = Light.wavelengthToColor( wavelength );
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
    return MOTHAColors.UV_SPARKLE_COLOR;
  }
  else if ( wavelength > VisibleColor.MAX_WAVELENGTH ) {
    return MOTHAColors.IR_SPARKLE_COLOR;
  }
  else {
    return MOTHAColors.VISIBLE_SPARKLE_COLOR;
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonNode', PhotonNode );