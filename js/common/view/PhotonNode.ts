// Copyright 2022, University of Colorado Boulder

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
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Circle, Color, TColor, Node, NodeOptions, Path, RadialGradient, Rectangle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from '../model/Photon.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';

// constants
const INVISIBLE_WAVELENGTH_COLOR = new Color( 160, 160, 160 );
const WAVELENGTH_TO_COLOR_OPTIONS = {
  uvColor: INVISIBLE_WAVELENGTH_COLOR,
  irColor: INVISIBLE_WAVELENGTH_COLOR
};

// Sparkle
const SPARKLE_COLOR = new Color( 255, 255, 255, 0.4 ); // sparkle color for visible wavelengths
const UV_SPARKLE_COLOR = VisibleColor.wavelengthToColor( 400, WAVELENGTH_TO_COLOR_OPTIONS );
const IR_SPARKLE_COLOR = VisibleColor.wavelengthToColor( 715, WAVELENGTH_TO_COLOR_OPTIONS );

type SelfOptions = EmptySelfOptions;

type PhotonNodeOptions = SelfOptions & PickOptional<NodeOptions, 'scale'> & PickRequired<NodeOptions, 'tandem'>;

export default class PhotonNode extends Node {

  public readonly photon: Photon;
  private readonly disposePhotonNode: () => void;

  public constructor( photon: Photon, modelViewTransform: ModelViewTransform2, providedOptions?: PhotonNodeOptions ) {

    const options = optionize<PhotonNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const wavelength = photon.wavelength;

    const photonRadius = modelViewTransform.modelToViewDeltaX( photon.radius );

    const haloRadius = photonRadius;
    const haloNode = new Circle( haloRadius, {
      fill: getHaloColor( wavelength, haloRadius )
    } );

    const orbRadius = 0.5 * photonRadius;
    const orbNode = new Circle( orbRadius, {
      fill: getOrbColor( wavelength, orbRadius )
    } );

    const sparkleRadius = 0.575 * photonRadius;
    const sparkleNode = new SparkleNode( wavelength, sparkleRadius );

    options.children = [ haloNode, orbNode, sparkleNode ];

    // Draw a red rectangle around emitted photons.
    if ( MOTHAQueryParameters.debugEmission && photon.wasEmitted ) {
      const size = 2 * haloRadius;
      options.children.push( new Rectangle( -size / 2, -size / 2, size, size, {
        stroke: 'red',
        lineWidth: 4
      } ) );
    }

    super( options );

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
   * Creates a photon icon, used in the Key.
   */
  public static createIcon( wavelength: number, scale = 1 ): Node {
    const photon = new Photon( {
      wavelength: wavelength,
      tandem: Tandem.OPT_OUT
    } );
    const modelViewTransform = ModelViewTransform2.createIdentity();
    return new PhotonNode( photon, modelViewTransform, {
      scale: scale,
      tandem: Tandem.OPT_OUT
    } );
  }
}

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

function getHaloColor( wavelength: number, radius: number ): RadialGradient {
  const innerColor = VisibleColor.wavelengthToColor( wavelength, WAVELENGTH_TO_COLOR_OPTIONS );
  const outerColor = innerColor.withAlpha( 0 );
  return new RadialGradient( 0, 0, 0, 0, 0, radius )
    .addColorStop( 0.4, innerColor )
    .addColorStop( 1, outerColor );
}

function getOrbColor( wavelength: number, radius: number ): RadialGradient {
  const innerColor = new Color( 255, 255, 255, 0.7 );
  const outerColor = VisibleColor.wavelengthToColor( wavelength, WAVELENGTH_TO_COLOR_OPTIONS ).withAlpha( 0.5 );
  return new RadialGradient( 0, 0, 0, 0, 0, radius )
    .addColorStop( 0.25, innerColor )
    .addColorStop( 1, outerColor );
}

/*
 * Returns the color for the 'sparkle' in the center of the photon.
 */
function getSparkleColor( wavelength: number ): Color {
  if ( wavelength < VisibleColor.MIN_WAVELENGTH ) {
    return UV_SPARKLE_COLOR;
  }
  else if ( wavelength > VisibleColor.MAX_WAVELENGTH ) {
    return IR_SPARKLE_COLOR;
  }
  else {
    return SPARKLE_COLOR;
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonNode', PhotonNode );