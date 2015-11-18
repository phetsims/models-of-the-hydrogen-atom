// Copyright 2015, University of Colorado Boulder

/**
 * The spectrometer.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var CloseButton = require( 'SCENERY_PHET/buttons/CloseButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );

  /**
   * @param {Property.<boolean>} spectrometerVisibleProperty
   * @param {Object} [options]
   * @constructor
   */
  function SpectrometerNode( spectrometerVisibleProperty, options ) {

    options = options || {};

    var backgroundNode = new ShadedRectangle( new Bounds2( 0, 0, 350, 120 ), {
      baseColor: 'rgb( 90, 90, 126 )'
    } );

    var closeButton = new CloseButton( {
      iconLength: 8,
      xTouchExpansion: 8,
      yTouchExpansion: 8,
      listener: function() {
        spectrometerVisibleProperty.set( false );
      },
      right: backgroundNode.right - 10,
      top: backgroundNode.top + 6
    } );

    options.children = [ backgroundNode, closeButton ];

    Node.call( this, options );

    spectrometerVisibleProperty.linkAttribute( this, 'visible' );
  }

  modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );

  return inherit( ShadedRectangle, SpectrometerNode );
} );
