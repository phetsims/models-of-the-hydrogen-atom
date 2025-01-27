// Copyright 2025, University of Colorado Boulder

/**
 * MOTHAKeyboardHelpContent is the content for the keyboard-help dialog in all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import TimeControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/TimeControlsKeyboardHelpSection.js';

export default class MOTHAKeyboardHelpContent extends TwoColumnKeyboardHelpContent {

  public constructor() {

    // Sections in the left column.
    const leftSections = [
      new TimeControlsKeyboardHelpSection(),
      new SliderControlsKeyboardHelpSection()
    ];

    // Sections in the right column.
    const rightSections = [
      new BasicActionsKeyboardHelpSection( {
        withCheckboxContent: true
      } )
    ];

    super( leftSections, rightSections, {
      isDisposable: false
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAKeyboardHelpContent', MOTHAKeyboardHelpContent );