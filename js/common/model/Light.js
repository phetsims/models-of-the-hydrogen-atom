// Copyright 2016, University of Colorado Boulder

/**
 * Model of a light that can be switched between 'white' and 'monochromatic' modes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  // constants
  var MODE_VALUES = [ 'white', 'monochromatic' ];

  /**
   * @constructor
   */
  function Light() {

    PropertySet.call( this, {

      // @public
      on: false, // {boolean} is the light on?
      mode: 'white', // {string} type of light being emitted, see MODE_VALUES
      wavelength: VisibleColor.MIN_WAVELENGTH // {number} wavelength in nm, relevant only for 'monochromatic' mode
    } );

    // validate mode Property
    this.modeProperty.link( function( mode ) {
      assert && assert( _.indexOf( MODE_VALUES, mode ) !== -1 );
    } );

    // @public {Color} color displayed by the view
    this.colorProperty = new DerivedProperty( [ this.modeProperty, this.wavelengthProperty ],
      function( mode, wavelength ) {
        return ( mode === 'white' ) ? 'white' : VisibleColor.wavelengthToColor( wavelength );
      }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Light', Light );

  return inherit( PropertySet, Light );
} );
