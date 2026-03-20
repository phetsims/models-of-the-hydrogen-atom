// Copyright 2025-2026, University of Colorado Boulder

/**
 * SpectraScreenSummaryContent is the description screen summary for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

export default class SpectraScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {
    super( {
      playAreaContent: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreen.screenSummary.interactionHintStringProperty
    } );
  }
}
