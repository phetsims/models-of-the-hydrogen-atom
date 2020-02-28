// Copyright 2016-2020, University of Colorado Boulder

//TODO much in common with scenery-phet.TimeControl
/**
 * TimeControls provides the controls for simulation time.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import PlayPauseButton from '../../../../scenery-phet/js/buttons/PlayPauseButton.js';
import StepForwardButton from '../../../../scenery-phet/js/buttons/StepForwardButton.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import ComboBox from '../../../../sun/js/ComboBox.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import modelsOfTheHydrogenAtomStrings from '../../models-of-the-hydrogen-atom-strings.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ClockSpeeds from '../model/ClockSpeeds.js';

const fastString = modelsOfTheHydrogenAtomStrings.fast;
const normalString = modelsOfTheHydrogenAtomStrings.normal;
const slowString = modelsOfTheHydrogenAtomStrings.slow;

class TimeControls extends HBox {

  /**
   * @param {Property.<boolean>} runningProperty - is the sim running?
   * @param {EnumerationProperty.<ClockSpeeds>} clockSpeedProperty
   * @param {Node} comboBoxListParent
   * @param {Object} [options]
   */
  constructor( runningProperty, clockSpeedProperty, comboBoxListParent, options ) {

    options = merge( {
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

modelsOfTheHydrogenAtom.register( 'TimeControls', TimeControls );
export default TimeControls;