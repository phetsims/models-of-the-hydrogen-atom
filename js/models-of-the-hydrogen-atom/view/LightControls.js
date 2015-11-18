// Copyright 2015, University of Colorado Boulder

/**
 * Controls for the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );

  /**
   * @param {Property.<string>} lightModeProperty - 'white'|'monochromatic'
   * @param {Property.<number>} wavelengthProperty
   * @param {Property.<boolean>} absorptionWavelengthsVisibleProperty
   * @param options
   * @constructor
   */
  function LightControls( lightModeProperty, wavelengthProperty, absorptionWavelengthsVisibleProperty, options ) {

    options = _.extend( {
      baseColor: 'rgb( 89, 93, 186 )'
    }, options );

    ShadedRectangle.call( this, new Bounds2( 0, 0, 325, 120 ), options );

    lightModeProperty.link( function( lightMode ) {
      //TODO
    } );

    wavelengthProperty.link( function( wavelength ) {
      //TODO
    } );

    absorptionWavelengthsVisibleProperty.link( function( visible ) {
      //TODO
    } );
  }

  modelsOfTheHydrogenAtom.register( 'LightControls', LightControls );

  return inherit( ShadedRectangle, LightControls );
} );
