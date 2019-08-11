// Copyright 2015-2016, University of Colorado Boulder

/**
 *
 * Visual representation of an electron.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  const DIAMETER = 9;

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ElectronNode( options ) {

    options = options || {};
    options.mainColor = 'rgb( 120, 120, 255 )';
    options.highlightColor = 'rgb( 140, 140, 255 )';

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  modelsOfTheHydrogenAtom.register( 'ElectronNode', ElectronNode );

  return inherit( ShadedSphereNode, ElectronNode );
} );