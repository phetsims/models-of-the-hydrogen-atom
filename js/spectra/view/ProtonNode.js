// Copyright 2015-2019, University of Colorado Boulder

/**
 * Visual representation of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  const DIAMETER = 11;

  class ProtonNode extends ShadedSphereNode {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = options || {};
      options.mainColor = PhetColorScheme.RED_COLORBLIND;
      options.highlightColor = 'rgb( 255, 130, 130 )'; // lighter red

      super( DIAMETER, options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ProtonNode', ProtonNode );
} );