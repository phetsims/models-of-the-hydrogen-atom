// Copyright 2015-2020, University of Colorado Boulder

// @ts-nocheck
/**
 * Light is the model of a light that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class Light {

  constructor() {

    // @public is the light on?
    this.onProperty = new BooleanProperty( false );

    // @public whether the light is monochromatic (true) or full spectrum (false)
    this.monochromaticEnabledProperty = new BooleanProperty( false );

    // @public wavelength in nm, relevant only for monochromatic mode
    this.wavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH )
    } );

    // @public {Color} color displayed by the view
    this.colorProperty = new DerivedProperty(
      [ this.monochromaticEnabledProperty, this.wavelengthProperty ],
      ( monochromaticEnabled, wavelength ) => {
        return monochromaticEnabled ? VisibleColor.wavelengthToColor( wavelength ) : 'white';
      }
    );
  }

  // @public
  reset() {
    this.onProperty.reset();
    this.monochromaticEnabledProperty.reset();
    this.wavelengthProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Light', Light );
export default Light;