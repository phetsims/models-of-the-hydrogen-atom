// Copyright 2016, University of Colorado Boulder

/**
 * Continuum bar, 'Classical' to 'Quantum'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const classicalString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/classical' );
  const quantumString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/quantum' );
  
  /**
   * @param {number} barHeight - height of the bar, width is computed based on text size
   * @param {Object} [options]
   * @constructor
   */
  function ContinuumBarNode( barHeight, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 6,
      font: new MOTHAFont( 14 ),
      barFill: 'rgb( 220, 220, 220 )',
      textFill: 'black'
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

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ barNode, classicalText, quantumText ];

    Node.call( this, options );
  }

  modelsOfTheHydrogenAtom.register( 'ContinuumBarNode', ContinuumBarNode );

  return inherit( Node, ContinuumBarNode );
} );
