// Copyright 2015-2016, University of Colorado Boulder

/**
 *
 * Visual representation of a neutron.
 *
 * @author Chris Malley (cmalley@pixelzoom.com)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  var DIAMETER = 11;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function NeutronNode( options ) {

    options = options || {};
    options.mainColor = 'rgb( 128, 128, 128 )';
    options.highlightColor = 'rgb( 175, 175, 175 )';

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  modelsOfTheHydrogenAtom.register( 'NeutronNode', NeutronNode );

  return inherit( ShadedSphereNode, NeutronNode );
} );