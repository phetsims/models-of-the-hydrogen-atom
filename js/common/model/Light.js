// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model of a light that can be switched between 'white' and 'monochromatic' modes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const EnumerationProperty = require( 'AXON/EnumerationProperty' );
  const LightMode = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/LightMode' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Range = require( 'DOT/Range' );
  const VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  class Light {

    constructor() {

      // @public is the light on?
      this.onProperty = new BooleanProperty( false );

      // @public type of light being emitted
      this.modeProperty = new EnumerationProperty( LightMode, LightMode.WHITE );

      // @public wavelength in nm, relevant only for monochromatic mode
      this.wavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
        range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH )
      } );

      // @public {Color} color displayed by the view
      this.colorProperty = new DerivedProperty(
        [ this.modeProperty, this.wavelengthProperty ],
        ( mode, wavelength ) => {
          return ( mode === LightMode.WHITE ) ? 'white' : VisibleColor.wavelengthToColor( wavelength );
        }
      );
    }

    // @public
    reset() {
      this.onProperty.reset();
      this.modeProperty.reset();
      this.wavelengthProperty.reset();
    }
  }

  return modelsOfTheHydrogenAtom.register( 'Light', Light );
} );
