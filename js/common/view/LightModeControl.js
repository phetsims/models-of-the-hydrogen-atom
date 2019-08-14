// Copyright 2016-2019, University of Colorado Boulder

//TODO on mouseDown in projector mode, radio buttons go gray
/**
 * LightModeControl provides controls (radio buttons) for selecting between monochromatic and full spectrum (white) light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
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

  class LightModeControl extends RadioButtonGroup {

    /**
     * @param {BooleanProperty} monochromaticEnabledProperty
     * @param {Object} [options]
     */
    constructor( monochromaticEnabledProperty, options ) {

      options = _.extend( {
        orientation: 'vertical',
        spacing: 8,
        buttonContentXMargin: 15,
        buttonContentYMargin: 6,
        baseColor: MOTHAColorProfile.lightModeRadioButtonFillProperty,
        disabledBaseColor: MOTHAColorProfile.lightModeRadioButtonFillProperty,
        selectedStroke: MOTHAColorProfile.lightModeRadioButtonSelectedStrokeProperty,
        deselectedStroke: MOTHAColorProfile.lightModeRadioButtonDeselectedStrokeProperty,
        overFill: MOTHAColorProfile.lightModeRadioButtonFillProperty,
        overStroke: MOTHAColorProfile.lightModeRadioButtonDeselectedStrokeProperty,
        selectedLineWidth: 2,
        deselectedLineWidth: 2
      }, options );

      super( monochromaticEnabledProperty, [
        { value: false, node: createModeIcon( 'white' ) },
        { value: true, node: createModeIcon( 'red' ) }
      ], options );
    }
  }

  /**
   * Creates an icon for a mode.
   * @param {Color|string} beamColor
   * @returns {Node}
   */
  function createModeIcon( beamColor ) {
    const laserNode = new LaserPointerNode( new BooleanProperty( true ), LASER_POINTER_OPTIONS );
    const beamNode = new Rectangle( 0, 0, BEAM_SIZE.width, BEAM_SIZE.height, {
      fill: beamColor,
      stroke: 'black',
      lineWidth: 0.5,
      centerX: laserNode.centerX,
      bottom: laserNode.top + 1
    } );
    return new Node( { children: [ beamNode, laserNode ] } );
  }

  return modelsOfTheHydrogenAtom.register( 'LightModeControl', LightModeControl );
} );
