// Copyright 2024-2025, University of Colorado Boulder

/**
 * EnergySquiggle is the squiggle line shown in the energy diagrams, connecting the electrons previous and current
 * energy levels. A squiggle can be drawn between any 2 points. The color and period of the squiggle is determined
 * by the specified wavelength.
 *
 * This was EnergySquiggle.java in the Java version.
 *
 * // REVIEW: Is this the same Chris Malley from PixelZoom Inc?? https://github.com/phetsims/models-of-the-hydrogen-atom/issues/125
 * @author Chris Malley (cmalley@pixelzoom.com)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Shape from '../../../../kite/js/Shape.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import MOTHAColors from '../../common/MOTHAColors.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import distanceXY from '../../../../dot/js/util/distanceXY.js';

const MIN_SQUIGGLE_LENGTH = 5;
const ARROW_HEAD_SIZE = new Dimension2( 15, 12 );

// Amplitude of the squiggle sine wave, in pixels.
const SQUIGGLE_AMPLITUDE = 6;

// Length of 1 period of the squiggle, in pixels.
const UV_SQUIGGLE_PERIOD = 8;
const MIN_VISIBLE_SQUIGGLE_PERIOD = 10;
const MAX_VISIBLE_SQUIGGLE_PERIOD = 20;
const IR_SQUIGGLE_PERIOD = 22;

// Maximum time that the squiggle will be visible, in seconds.
const SQUIGGLE_LIFETIME = 1.5;

export default class EnergySquiggle extends Node {

  // Time since the update method was called, in seconds.
  private timeSinceLastUpdate: number;

  public constructor() {
    super();
    this.timeSinceLastUpdate = 0;
    this.visible = false;
  }

  /**
   * Updates the squiggle to connect 2 points, with color corresponding to wavelength.
   */
  public update( x1: number, y1: number, x2: number, y2: number, wavelength: number ): void {

    this.timeSinceLastUpdate = 0;
    this.visible = true;

    this.getChildren().forEach( child => child.dispose() );
    this.removeAllChildren();

    // Distance between the 2 points
    const distance = distanceXY( x1, y1, x2, y2 );

    // Color that corresponds to the wavelength
    const color = VisibleColor.wavelengthToColor( wavelength, {
      uvColor: MOTHAColors.UV_COLOR,
      irColor: MOTHAColors.IR_COLOR
    } );

    // We'll start by drawing all the geometry with this orientation: ---------------->
    // The left end of the line is at (0,0), the tip of the arrow is at (distance,0).

    // The arrow head is drawn only if the distance between the points is large enough to fit both the arrow head and
    // a minimum amount of squiggle. If the distance isn't sufficient, then the squiggle will have no arrow head.
    const hasArrow = ( distance > ARROW_HEAD_SIZE.height + MIN_SQUIGGLE_LENGTH );
    if ( hasArrow ) {
      const arrowHeadShape = new Shape()
        .moveTo( distance, 0 )
        .lineTo( distance - ARROW_HEAD_SIZE.height, ARROW_HEAD_SIZE.width / 2 )
        .lineTo( distance - ARROW_HEAD_SIZE.height, -ARROW_HEAD_SIZE.width / 2 )
        .close();
      const arrowHeadPath = new Path( arrowHeadShape, {
        fill: color
      } );
      this.addChild( arrowHeadPath );
    }

    // The squiggle is a sinusoidal line, with period and amplitude. If the 2 points are too close together,
    // the sinusoidal nature of the line won't be intelligible, so we simply draw a straight line.
    const period = wavelengthToPeriod( wavelength );
    const squiggleShape = new Shape().moveTo( 0, 0 );
    if ( distance < MIN_SQUIGGLE_LENGTH ) {

      // Points are too close together, so draw a straight line.
      squiggleShape.lineTo( distance, 0 );
    }
    else {

      // Draw a sinusoidal line, with period and amplitude.
      const maxX = ( hasArrow ) ? ( distance - ARROW_HEAD_SIZE.height ) : distance;
      for ( let x = 0; x < maxX; x++ ) {
        const angle = ( x % period ) * ( 2 * Math.PI / period );
        const y = SQUIGGLE_AMPLITUDE * Math.sin( angle );
        squiggleShape.lineTo( x, y );
      }
    }
    const squigglePath = new Path( squiggleShape, {
      lineWidth: 1,
      stroke: color
    } );
    this.addChild( squigglePath );

    // Since we drew our squiggle in the orientation described above, we now need to transform this node so that
    // the squiggle lines up with the specified points. This transformation involves a rotation and a translation.
    const phi = Math.atan2( y2 - y1, x2 - x1 ); // conversion to Polar coordinates
    this.setTranslation( x1, y1 );
    this.setRotation( phi );
  }

  /**
   * Hides the squiggle after it has been visible for SQUIGGLE_LIFETIME seconds.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    if ( this.visible ) {
      this.timeSinceLastUpdate += dt;
      if ( this.timeSinceLastUpdate > SQUIGGLE_LIFETIME ) {
        this.visible = false;
      }
    }
  }
}

/*
 * Converts wavelength to squiggle period.
 * All UV has the same period.
 * All IR has the same period.
 * Visible wavelengths have a calculated period.
 */
function wavelengthToPeriod( wavelength: number ): number {
  let period = 0;
  if ( VisibleColor.isUVWavelength( wavelength ) ) {
    period = UV_SQUIGGLE_PERIOD;
  }
  else if ( VisibleColor.isIRWavelength( wavelength ) ) {
    period = IR_SQUIGGLE_PERIOD;
  }
  else {
    const wavelengthRange = VisibleColor.MAX_WAVELENGTH - VisibleColor.MIN_WAVELENGTH;
    const periodRange = MAX_VISIBLE_SQUIGGLE_PERIOD - MIN_VISIBLE_SQUIGGLE_PERIOD;
    const factor = ( wavelength - VisibleColor.MIN_WAVELENGTH ) / wavelengthRange;
    period = MIN_VISIBLE_SQUIGGLE_PERIOD + ( factor * periodRange );
  }
  return period;
}

modelsOfTheHydrogenAtom.register( 'EnergySquiggle', EnergySquiggle );