// Copyright 2015-2019, University of Colorado Boulder

/**
 * Light is the model of a light that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Range = require( 'DOT/Range' );
  const VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

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

  return modelsOfTheHydrogenAtom.register( 'Light', Light );
} );
