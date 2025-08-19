// Copyright 2019-2025, University of Colorado Boulder

/**
 * MOTHAScreen is the base class for all Screens in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../../joist/js/Screen.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import TModel from '../../../../joist/js/TModel.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAKeyboardHelpContent from './MOTHAKeyboardHelpContent.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';

type SelfOptions = EmptySelfOptions;

export type MOTHAScreenOptions = SelfOptions & PickRequired<ScreenOptions, 'name' | 'homeScreenIcon' | 'screenButtonsHelpText' | 'tandem'>;

export default class MOTHAScreen<M extends TModel, V extends ScreenView> extends Screen<M, V> {

  protected constructor( createModel: () => M, createView: ( model: M ) => V, providedOptions: MOTHAScreenOptions ) {

    const options = optionize<MOTHAScreenOptions, SelfOptions, ScreenOptions>()( {

      // ScreenOptions
      backgroundColorProperty: MOTHAColors.screenBackgroundColorProperty,
      showUnselectedHomeScreenIconFrame: true,
      showScreenIconFrameForNavigationBarFill: 'black',
      createKeyboardHelpNode: () => new MOTHAKeyboardHelpContent()
    }, providedOptions );

    super( createModel, createView, options );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAScreen', MOTHAScreen );