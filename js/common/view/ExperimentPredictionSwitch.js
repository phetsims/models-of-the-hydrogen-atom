// Copyright 2015-2020, University of Colorado Boulder

/**
 * ExperimentPredictionSwitch is an AB switch that determines whether we are viewing an experiment or a predictive model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ABSwitch = require( 'SUN/ABSwitch' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const merge = require( 'PHET_CORE/merge' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const experimentString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/experiment' );
  const predictionString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/prediction' );

  class ExperimentPredictionSwitch extends ABSwitch {

    /**
     * @param {BooleanProperty} experimentEnabledProperty
     * @param {Object} [options]
     */
    constructor( experimentEnabledProperty, options ) {

      options = merge( {
        centerOnButton: true,
        toggleSwitchOptions: { size: new Dimension2( 50, 25 ) }
      }, options );

      const labelOptions = {
        font: new PhetFont( { size: 16, weight: 'bold' } ),
        fill: MOTHAColorProfile.abSwitchTextFillProperty,
        maxWidth: 100
      };

      super( experimentEnabledProperty,
        true, new Text( experimentString, labelOptions ),
        false, new Text( predictionString, labelOptions ),
        options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ExperimentPredictionSwitch', ExperimentPredictionSwitch );
} );
