// Copyright 2016-2022, University of Colorado Boulder

/**
 * SpectraScreen is the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';
import MOTHAScreen, { MOTHAScreenOptions } from '../common/view/MOTHAScreen.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';
import SpectraModel from './model/SpectraModel.js';
import SpectraScreenView from './view/SpectraScreenView.js';
import spectraScreenIcon_png from '../../images/spectraScreenIcon_png.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Image } from '../../../scenery/js/imports.js';

type SelfOptions = EmptySelfOptions;

type SpectraScreenOptions = SelfOptions & StrictOmit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class SpectraScreen extends MOTHAScreen<SpectraModel, SpectraScreenView> {

  public constructor( providedOptions: SpectraScreenOptions ) {

    const options = optionize<SpectraScreenOptions, SelfOptions, MOTHAScreenOptions>()( {
      name: ModelsOfTheHydrogenAtomStrings.screen.spectraStringProperty,
      homeScreenIcon: new ScreenIcon( new Image( spectraScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } )
    }, providedOptions );

    super(
      () => new SpectraModel( {
        tandem: options.tandem.createTandem( 'model' )
      } ),
      model => new SpectraScreenView( model, {
        tandem: options.tandem.createTandem( 'view' )
      } ),
      options
    );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );