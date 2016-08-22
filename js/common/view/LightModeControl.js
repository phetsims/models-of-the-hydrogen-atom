// Copyright 2016, University of Colorado Boulder

/**
 * Control for selecting the light's mode (white or monochromatic).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var BEAM_SIZE = new Dimension2( 8, 15 );
  var LASER_POINTER_OPTIONS = {
    hasButton: false,
    rotation: -Math.PI / 2, // pointing up
    bodySize: new Dimension2( 20, 25 ), // height x width
    nozzleSize: new Dimension2( 7, 20 ), // height x width
    cornerRadius: 2,
    lineWidth: 0.5
  };

  /**
   * @param {Property.<string>} modeProperty - the light's mode, 'white'|'monochromatic'
   * @param options
   * @constructor
   */
  function LightModeControl( modeProperty, options ) {

    options = _.extend( {
      orientation: 'vertical',
      spacing: 10,
      buttonContentXMargin: 20,
      buttonContentYMargin: 5,
      baseColor: 'black',
      disabledBaseColor: 'black',
      selectedStroke: 'rgb( 206, 206, 126 )',
      deselectedStroke: 'rgb( 150, 150, 150 )',
      selectedLineWidth: 3,
      deselectedLineWidth: 3
    }, options );

    RadioButtonGroup.call( this, modeProperty, [
      { value: 'white', node: createModeIcon( 'white' ) },
      { value: 'monochromatic', node: createModeIcon( 'red' ) }
    ], options );
  }

  modelsOfTheHydrogenAtom.register( 'LightModeControl', LightModeControl );

  /**
   * Creates an icon for a mode.
   *
   * @param {Color|string} beamColor
   * @returns {Node}
   */
  var createModeIcon = function( beamColor ) {
    var laserNode = new LaserPointerNode( new Property( true ), LASER_POINTER_OPTIONS );
    var beamNode = new Rectangle( 0, 0, BEAM_SIZE.width, BEAM_SIZE.height, {
      fill: beamColor,
      centerX: laserNode.centerX,
      bottom: laserNode.top + 1
    } );
    return new Node( { children: [ beamNode, laserNode ] } );
  };

  return inherit( RadioButtonGroup, LightModeControl, {
    //TODO prototype functions
  } );
} );
