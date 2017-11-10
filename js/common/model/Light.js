// Copyright 2015-2017, University of Colorado Boulder

/**
 * Model of a light that can be switched between 'white' and 'monochromatic' modes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @constructor
   */
  function Light() {

    // @public {boolean} is the light on?
    this.onProperty = new BooleanProperty( false );

    // @public {string} type of light being emitted
    this.modeProperty = new Property( 'white', {
      validValues: [ 'white', 'monochromatic' ]
    } );

    // @public {number} wavelength in nm, relevant only for 'monochromatic' mode
    this.wavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      range: { min: VisibleColor.MIN_WAVELENGTH, max: VisibleColor.MAX_WAVELENGTH }
    } );

    // @public {Color} color displayed by the view
    this.colorProperty = new DerivedProperty( [ this.modeProperty, this.wavelengthProperty ],
      function( mode, wavelength ) {
        return ( mode === 'white' ) ? 'white' : VisibleColor.wavelengthToColor( wavelength );
      }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Light', Light );

  return inherit( Object, Light, {

    // @public
    reset: function() {
      this.onProperty.reset();
      this.modeProperty.reset();
      this.wavelengthProperty.reset();
    }
  } );
} );
