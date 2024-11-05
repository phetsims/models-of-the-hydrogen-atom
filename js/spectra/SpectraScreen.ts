// Copyright 2016-2024, University of Colorado Boulder

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
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import { Node, Path, TColor } from '../../../scenery/js/imports.js';
import MOTHAColors from '../common/MOTHAColors.js';
import { Shape } from '../../../kite/js/imports.js';
import VisibleColor from '../../../scenery-phet/js/VisibleColor.js';
import BohrModel from '../common/model/BohrModel.js';

type SelfOptions = EmptySelfOptions;

type SpectraScreenOptions = SelfOptions & StrictOmit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class SpectraScreen extends MOTHAScreen<SpectraModel, SpectraScreenView> {

  public constructor( providedOptions: SpectraScreenOptions ) {

    const options = optionize<SpectraScreenOptions, SelfOptions, MOTHAScreenOptions>()( {

      // MOTHAScreenOptions
      isDisposable: false,
      name: ModelsOfTheHydrogenAtomStrings.screen.spectraStringProperty,
      homeScreenIcon: createScreenIcon(),
      screenButtonsHelpText: ModelsOfTheHydrogenAtomStrings.a11y.spectraScreenButtonsHelpTextStringProperty
    }, providedOptions );

    super(
      () => new SpectraModel( options.tandem.createTandem( 'model' ) ),
      model => new SpectraScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the ScreenIcon for this Screen.
 */
function createScreenIcon(): ScreenIcon {

  const photonRadius = 4;
  const absorptionWavelengths = BohrModel.getVisibleAbsorptionWavelengths();

  const photonColumns = absorptionWavelengths.map( wavelength => {
    const color = VisibleColor.wavelengthToColor( wavelength );
    const photonColumn = createPhotonColumn( photonRadius, color );
    photonColumn.centerX = ( wavelength - absorptionWavelengths[ 0 ] );
    return photonColumn;
  } );

  const iconNode = new Node( {
    children: photonColumns
  } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 0.85,
    maxIconHeightProportion: 0.85,
    fill: MOTHAColors.screenBackgroundColorProperty
  } );
}

function createPhotonColumn( photonRadius: number, fill: TColor, numberOfPhotons = 20 ): Node {
  const shape = new Shape();
  for ( let i = 0; i < numberOfPhotons; i++ ) {
    shape.circle( 0, i * 2 * photonRadius, photonRadius );
  }
  shape.close();
  return new Path( shape, {
    fill: fill
  } );
}

modelsOfTheHydrogenAtom.register( 'SpectraScreen', SpectraScreen );