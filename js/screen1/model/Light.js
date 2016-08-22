// Copyright 2015-2016, University of Colorado Boulder

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

    // @public
    PropertySet.call( this, {
      on: false, // {boolean} is the light on?
      mode: 'white', // {string} type of light being emitted, see MODE_VALUES
      wavelength: VisibleColor.MIN_WAVELENGTH // {number} wavelength in nm
    } );

    // validate mode Property
    this.modeProperty.link( function( mode ) {
      assert && assert( _.indexOf( MODE_VALUES, mode ) !== -1 );
    } );

    // @public {Color}
    this.colorProperty = new DerivedProperty( [ this.modeProperty, this.wavelengthProperty ],
      function( mode, wavelength ) {
        return ( mode === 'white' ) ? 'white' : VisibleColor.wavelengthToColor( wavelength );
      }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Light', Light );

  return inherit( PropertySet, Light );
} );
