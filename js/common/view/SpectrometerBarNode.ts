// Copyright 2024-2025, University of Colorado Boulder

/**
 * SpectrometerBarNode is a 'bar' in the spectrometer.  It displays a stack of photons, color by wavelength.
 * When the stack reaches its maximum height, an arrow is drawn at the top of the stack, to indicate that the
 * value is larger than we can display.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { Shape } from '../../../../kite/js/imports.js';
import { Path } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import LightSource from '../model/LightSource.js';

const MAX_NUMBER_OF_PHOTONS = 12;
const PHOTON_RADIUS = 3;
const ARROW_HEAD_WIDTH = 10;
const ARROW_HEAD_HEIGHT = 8;
const ARROW_TAIL_WIDTH = 2;
const ARROW_TAIL_LENGTH = 4;

export default class SpectrometerBarNode extends Path {

  public readonly wavelength: number;

  public constructor( wavelength: number ) {
    super( null, {
      fill: LightSource.wavelengthToColor( wavelength )
    } );
    this.wavelength = wavelength;
  }

  /**
   * Sets the number of photons to display in the stack.
   */
  public setNumberOfPhotons( numberOfPhotons: number ): void {
    assert && assert( Number.isInteger( numberOfPhotons ) && numberOfPhotons >= 0 );
    if ( numberOfPhotons === 0 ) {
      this.shape = null;
    }
    else {
      const shape = new Shape();

      const numberOfPhotonsToDraw = Math.min( numberOfPhotons, MAX_NUMBER_OF_PHOTONS );
      for ( let i = 0; i < numberOfPhotonsToDraw; i++ ) {
        const x = 0;
        const y = -( PHOTON_RADIUS + ( i * 2 * PHOTON_RADIUS ) ); // draw stack of photons from bottom up
        shape.circle( x, y, PHOTON_RADIUS );
        shape.newSubpath();
      }

      // Draw an arrow at the top of the stack to indicate that the number of photons is more than we can display.
      if ( numberOfPhotons > MAX_NUMBER_OF_PHOTONS ) {

        const x = 0;
        const yTail = -( MAX_NUMBER_OF_PHOTONS * 2 * PHOTON_RADIUS ) - 2;
        const yTip = yTail - ARROW_TAIL_LENGTH - ARROW_HEAD_HEIGHT;

        // Start at the tip and draw clockwise.
        shape.moveTo( x, yTip );
        shape.lineTo( x + ARROW_HEAD_WIDTH / 2, yTip + ARROW_HEAD_HEIGHT );
        shape.lineTo( x + ARROW_TAIL_WIDTH / 2, yTip + ARROW_HEAD_HEIGHT );
        shape.lineTo( x + ARROW_TAIL_WIDTH / 2, yTail );
        shape.lineTo( x - ARROW_TAIL_WIDTH / 2, yTail );
        shape.lineTo( x - ARROW_TAIL_WIDTH / 2, yTip + ARROW_HEAD_HEIGHT );
        shape.lineTo( x - ARROW_HEAD_WIDTH / 2, yTip + ARROW_HEAD_HEIGHT );
        shape.close();
      }
      this.shape = shape;
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerBarNode', SpectrometerBarNode );