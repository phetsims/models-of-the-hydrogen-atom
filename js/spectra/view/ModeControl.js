// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control for switching between 'Experiment' and 'Prediction' modes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSwitch = require( 'SUN/ABSwitch' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const experimentString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/experiment' );
  const modelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/model' );

  class ModeControl extends ABSwitch {
    /**
     * @param {Property.<string>} modeProperty
     * @param {Object} [options]
     */
    constructor( modeProperty, options ) {

      options = _.extend( {
        switchSize: new Dimension2( 60, 30 ),
        centerOnButton: true
      }, options );

      const labelOptions = {
        font: new MOTHAFont( { size: 16, weight: 'bold' } ),
        fill: MOTHAColorProfile.titleFillProperty,
        maxWidth: 100
      };

      super( modeProperty,
        'experiment', new Text( experimentString, labelOptions ),
        'model', new Text( modelString, labelOptions ),
        options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ModeControl', ModeControl );
} );
