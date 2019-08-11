// Copyright 2016-2018, University of Colorado Boulder

/**
 * Control for selecting the light's mode (white or monochromatic).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  const BEAM_SIZE = new Dimension2( 5, 10 );
  const LASER_POINTER_OPTIONS = {
    hasButton: false,
    rotation: -Math.PI / 2, // pointing up
    bodySize: new Dimension2( 18, 17 ), // height x width (due to rotation)
    nozzleSize: new Dimension2( 5, 13 ), // height x width (due to rotation)
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
      spacing: 8,
      buttonContentXMargin: 15,
      buttonContentYMargin: 6,
      baseColor: 'black',
      disabledBaseColor: 'black',
      selectedStroke: MOTHAColorProfile.radioButtonSelectedColorProperty,
      deselectedStroke: MOTHAColorProfile.radioButtonDeselectedColorProperty,
      selectedLineWidth: 2,
      deselectedLineWidth: 2
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
  const createModeIcon = function( beamColor ) {
    const laserNode = new LaserPointerNode( new BooleanProperty( true ), LASER_POINTER_OPTIONS );
    const beamNode = new Rectangle( 0, 0, BEAM_SIZE.width, BEAM_SIZE.height, {
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
