// Copyright 2025, University of Colorado Boulder

/**
 * EnergyLevelsScreenSummaryContent is the description screen summary for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

export default class EnergyLevelsScreenSummaryContent extends ScreenSummaryContent {

  public constructor() {
    super( {
      playAreaContent: ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenSummary.playAreaStringProperty,
      controlAreaContent: ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenSummary.controlAreaStringProperty,
      interactionHintContent: ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreenSummaryContent', EnergyLevelsScreenSummaryContent );