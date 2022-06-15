// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAScreen is the base class for all Screens in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../../joist/js/Screen.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptyObjectType;

export type MOTHAScreenOptions = SelfOptions & ScreenOptions;

export default class MOTHAScreen<M, V extends ScreenView> extends Screen<M, V> {

  public constructor( createModel: () => M, createView: ( model: M ) => V, providedOptions: MOTHAScreenOptions ) {

    const options = optionize<MOTHAScreenOptions, SelfOptions, ScreenOptions>()( {

      // MOTHAScreenOptions
      backgroundColorProperty: MOTHAColors.screenBackgroundColorProperty,
      showUnselectedHomeScreenIconFrame: true,
      showScreenIconFrameForNavigationBarFill: 'black'
    }, providedOptions );

    super( createModel, createView, options );
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAScreen', MOTHAScreen );