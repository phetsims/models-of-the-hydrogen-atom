// Copyright 2019-2022, University of Colorado Boulder

/**
 * MOTHAScreen is the base class for all Screens in this sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TModel from '../../../../joist/js/TModel.js';
import Screen, { ScreenOptions } from '../../../../joist/js/Screen.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';

type SelfOptions = EmptySelfOptions;

export type MOTHAScreenOptions = SelfOptions & ScreenOptions;

export default class MOTHAScreen<M extends TModel, V extends ScreenView> extends Screen<M, V> {

  public constructor( createModel: () => M, createView: ( model: M ) => V, providedOptions: MOTHAScreenOptions ) {

    const options = optionize<MOTHAScreenOptions, SelfOptions, ScreenOptions>()( {

      // MOTHAScreenOptions
      backgroundColorProperty: MOTHAColors.screenBackgroundColorProperty,
      showUnselectedHomeScreenIconFrame: true,
      showScreenIconFrameForNavigationBarFill: 'black'
    }, providedOptions );

    super( createModel, createView, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAScreen', MOTHAScreen );