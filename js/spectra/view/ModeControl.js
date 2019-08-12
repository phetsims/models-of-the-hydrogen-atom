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
  const ModelModes = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ModelModes' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const experimentString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/experiment' );
  const modelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/model' );

  class ModeControl extends ABSwitch {

    /**
     * @param {EnumerationProperty.<ModelModes>} modeProperty
     * @param {Object} [options]
     */
    constructor( modeProperty, options ) {

      options = _.extend( {
        switchSize: new Dimension2( 60, 30 ),
        centerOnButton: true
      }, options );

      const labelOptions = {
        font: new PhetFont( { size: 16, weight: 'bold' } ),
        fill: MOTHAColorProfile.titleFillProperty,
        maxWidth: 100
      };

      super( modeProperty,
        ModelModes.EXPERIMENT, new Text( experimentString, labelOptions ),
        ModelModes.MODEL, new Text( modelString, labelOptions ),
        options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ModeControl', ModeControl );
} );
