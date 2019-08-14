// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control for switching between the model's modes (EXPERIMENTAL vs PREDICTIVE).
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

  class ModelModeControl extends ABSwitch {

    /**
     * @param {EnumerationProperty.<ModelModes>} modelModeProperty
     * @param {Object} [options]
     */
    constructor( modelModeProperty, options ) {

      options = _.extend( {
        switchSize: new Dimension2( 50, 25 ),
        centerOnButton: true
      }, options );

      const labelOptions = {
        font: new PhetFont( { size: 16, weight: 'bold' } ),
        fill: MOTHAColorProfile.abSwitchTextFillProperty,
        maxWidth: 100
      };

      super( modelModeProperty,
        ModelModes.EXPERIMENT, new Text( experimentString, labelOptions ),
        ModelModes.PREDICTIVE, new Text( modelString, labelOptions ),
        options );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'ModelModeControl', ModelModeControl );
} );
