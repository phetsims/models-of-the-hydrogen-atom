// Copyright 2015, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 * Allows us to quickly change font properties for the entire simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  /**
   * @param {Object|number} options {Object} font options or {number} font size
   * @constructor
   */
  function MOTHAFont( options ) {

    // convenience for specifying font size only, e.g. new RPALFont(24)
    if ( typeof options === 'number' ) {
      options = { size: options };
    }

    // font attributes, as specified in the design document
    options = _.extend( {
      family: 'Arial'
    }, options );

    PhetFont.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'MOTHAFont', MOTHAFont );

  return inherit( PhetFont, MOTHAFont );
} );
