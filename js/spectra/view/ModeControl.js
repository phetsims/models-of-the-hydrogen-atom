// Copyright 2015-2016, University of Colorado Boulder

/**
 * Control for switching between 'Experiment' and 'Prediction' modes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ABSwitch = require( 'SUN/ABSwitch' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAColorProfile = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAColorProfile' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var experimentString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/experiment' );
  var modelString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/model' );

  /**
   * @param {Property.<string>} modeProperty
   * @param {Object} [options]
   * @constructor
   */
  function ModeControl( modeProperty, options ) {

    options = _.extend( {
      switchSize: new Dimension2( 60, 30 ),
      centerOnButton: true
    }, options );

    var labelOptions = {
      font: new MOTHAFont( { size: 16, weight: 'bold' } ),
      fill: MOTHAColorProfile.titleFillProperty,
      maxWidth: 100
    };

    ABSwitch.call( this, modeProperty,
      'experiment', new Text( experimentString, labelOptions ),
      'model', new Text( modelString, labelOptions ),
      options );
  }

  modelsOfTheHydrogenAtom.register( 'ModeControl', ModeControl );

  return inherit( Node, ModeControl );
} );
