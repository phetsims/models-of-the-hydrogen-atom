// Copyright 2016, University of Colorado Boulder

/**
 * Controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ComboBox = require( 'SUN/ComboBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  var MOTHAFont = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/MOTHAFont' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var fastString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/fast' );
  var normalString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/normal' );
  var slowString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/slow' );

  /**
   * @param {Property.<boolean>} runningProperty - is the sim running?
   * @param {Property.<string>} clockSpeed
   * @param {Node} comboBoxListParent
   * @param {Object} [options]
   * @constructor
   */
  function TimeControls( runningProperty, clockSpeed, comboBoxListParent, options ) {

    options = _.extend( {
      spacing: 7
    }, options );

    var playPauseButton = new PlayPauseButton( runningProperty, {
      radius: 22
    } );

    var stepForwardButton = new StepForwardButton( {
      radius: 16,
      touchAreaDilation: 6,
      listener: function() {
        //TODO advance the animation
      }
    } );

    var labelOptions = {
      font: new MOTHAFont( { size: 16 } ),
      maxWidth: 125 // i18n, determined empirically
    };
    var speedItems = [
      ComboBox.createItem( new Text( fastString, labelOptions ), 'fast' ),
      ComboBox.createItem( new Text( normalString, labelOptions ), 'normal' ),
      ComboBox.createItem( new Text( slowString, labelOptions ), 'slow' )
    ];
    var speedComboBox = new ComboBox( speedItems, clockSpeed, comboBoxListParent, {
      listPosition: 'above',
      itemHighlightFill: 'rgb( 153, 206, 255 )',
      itemXMargin: 4,
      itemYMargin: 4
    } );

    assert && assert( !options.children, 'decoration not supported' );
    options.children = [ playPauseButton, stepForwardButton, new HStrut( 4 ), speedComboBox ];

    HBox.call( this, options );

    // enabled the step button when the sim is paused
    runningProperty.link( function( running ) {
      stepForwardButton.enabled = !running;
    } );
  }

  modelsOfTheHydrogenAtom.register( 'TimeControls', TimeControls );

  return inherit( HBox, TimeControls );
} );
