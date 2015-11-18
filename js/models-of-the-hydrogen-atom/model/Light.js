// Copyright 2015, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var PropertySet = require( 'AXON/PropertySet' );
  var VisibleColor = require( 'SCENERY_PHET/VisibleColor' );

  /**
   * @constructor
   */
  function Light() {

    // @public
    PropertySet.call( this, {
      on: false, // {boolean} is the light on?
      mode: 'white', // {string} 'white'|'monochromatic'
      wavelength: 400 // {number} wavelength in nm
    } );

    // @public {Color}
    this.colorProperty = new DerivedProperty( [ this.wavelengthProperty ],
      function( wavelength ) {
        return VisibleColor.wavelengthToColor( wavelength );
      }
    );
  }

  modelsOfTheHydrogenAtom.register( 'Light', Light );

  return inherit( PropertySet, Light );
} );
