// Copyright 2015-2016, University of Colorado Boulder

/**
 *
 * Visual representation of a proton.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  var DIAMETER = 11;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ProtonNode( options ) {

    options = options || {};
    options.mainColor = PhetColorScheme.RED_COLORBLIND;
    options.highlightColor = 'rgb( 255, 130, 130 )'; // lighter red

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  modelsOfTheHydrogenAtom.register( 'ProtonNode', ProtonNode );

  return inherit( ShadedSphereNode, ProtonNode );
} );