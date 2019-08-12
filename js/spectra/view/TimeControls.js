// Copyright 2016-2019, University of Colorado Boulder

//TODO much in common with scenery-phet.TimeControl
/**
 * Controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ClockSpeeds = require( 'MODELS_OF_THE_HYDROGEN_ATOM/common/model/ClockSpeeds' );
  const ComboBox = require( 'SUN/ComboBox' );
  const ComboBoxItem = require( 'SUN/ComboBoxItem' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const modelsOfTheHydrogenAtom = require( 'MODELS_OF_THE_HYDROGEN_ATOM/modelsOfTheHydrogenAtom' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  const StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const fastString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/fast' );
  const normalString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/normal' );
  const slowString = require( 'string!MODELS_OF_THE_HYDROGEN_ATOM/slow' );

  class TimeControls extends HBox {

    /**
     * @param {Property.<boolean>} runningProperty - is the sim running?
     * @param {EnumerationProperty.<ClockSpeeds>} clockSpeedProperty
     * @param {Node} comboBoxListParent
     * @param {Object} [options]
     */
    constructor( runningProperty, clockSpeedProperty, comboBoxListParent, options ) {

      options = _.extend( {
        spacing: 7
      }, options );

      const playPauseButton = new PlayPauseButton( runningProperty, {
        radius: 22
      } );

      const stepForwardButton = new StepForwardButton( {
        radius: 16,
        touchAreaDilation: 6,
        listener: () => {
          //TODO advance the animation
        }
      } );

      const labelOptions = {
        font: new PhetFont( { size: 16 } ),
        maxWidth: 125 // i18n, determined empirically
      };
      const speedItems = [
        new ComboBoxItem( new Text( fastString, labelOptions ), ClockSpeeds.FAST ),
        new ComboBoxItem( new Text( normalString, labelOptions ), ClockSpeeds.NORMAL ),
        new ComboBoxItem( new Text( slowString, labelOptions ), ClockSpeeds.SLOW )
      ];
      const speedComboBox = new ComboBox( speedItems, clockSpeedProperty, comboBoxListParent, {
        cornerRadius: 8,
        listPosition: 'above',
        highlightFill: 'rgb( 153, 206, 255 )'
      } );

      assert && assert( !options.children, 'TimeControls sets children' );
      options.children = [ playPauseButton, stepForwardButton, new HStrut( 4 ), speedComboBox ];

      super( options );

      // enabled the step button when the sim is paused
      runningProperty.link( running => {
        stepForwardButton.enabled = !running;
      } );
    }
  }

  return modelsOfTheHydrogenAtom.register( 'TimeControls', TimeControls );
} );
