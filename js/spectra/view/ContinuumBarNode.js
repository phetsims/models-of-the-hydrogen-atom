// Copyright 2016-2019, University of Colorado Boulder

/**
 * ContinuumBarNode appears next to the radio buttons for choosing predicitive models, and shows whether
 * those models fall on the 'Classical' to 'Quantum' continuum.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const classicalString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classical' );
  const quantumString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/quantum' );

  class ContinuumBarNode extends Node {

    /**
     * @param {number} barHeight - height of the bar, width is computed based on text size
     * @param {Object} [options]
     */
    constructor( barHeight, options ) {

      options = _.extend( {
        xMargin: 5,
        yMargin: 6,
        font: new PhetFont( 14 ),
        barFill: MOTHAColorProfile.continuumBarFillProperty,
        textFill: MOTHAColorProfile.continuumBarTextFillProperty
      }, options );

      // labels
      const textOptions = {
        font: options.font,
        fill: options.textFill,
        rotation: Math.PI / 2,
        maxWidth: 0.4 * barHeight
      };
      const classicalText = new Text( classicalString, textOptions );
      const quantumText = new Text( quantumString, textOptions );

      const barWidth = Math.max( classicalText.width, quantumText.width ) + ( 2 * options.xMargin );
      const barNode = new Rectangle( 0, 0, barWidth, barHeight, {
        cornerRadius: 5,
        fill: options.barFill
      } );

      // 'Classical' at top
      classicalText.centerX = barNode.centerX;
      classicalText.top = barNode.top + options.yMargin;

      // 'Quantum' at bottom
      quantumText.centerX = barNode.centerX;
      quantumText.bottom = barNode.bottom - options.yMargin;

      assert && assert( !options.children, 'ContinuumBarNode sets children' );
      options.children = [ barNode, classicalText, quantumText ];

      super( options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );
} );
