// Copyright 2015-2019, University of Colorado Boulder

//TODO white beam is not visible on white background in projector mode
/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  class BeamNode extends Rectangle {

    /**
     * @param {Property.<boolean>} visibleProperty - is the beam visible?
     * @param {Property.<Color|string>} colorProperty - the beam's color
     * @param {Object} [options]
     */
    constructor( visibleProperty, colorProperty, options ) {

      options = _.extend( {
        beamSize: new Dimension2( 10, 50 )
      }, options );

      super( 0, 0, options.beamSize.width, options.beamSize.height, options );

      // no need to unlink, this instance exists for the lifetime of the sim
      visibleProperty.linkAttribute( this, 'visible' );
      colorProperty.linkAttribute( this, 'fill' );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'BeamNode', BeamNode );
} );