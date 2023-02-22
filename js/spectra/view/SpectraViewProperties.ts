// Copyright 2019-2023, University of Colorado Boulder

/**
 * SpectraViewProperties defines Properties that are specific to the view in the 'Spectra' screen.
 * It adds no additional Properties to the base class, but is provided for symmetry in the model-view type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAViewProperties, { MOTHAViewPropertiesOptions } from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = EmptySelfOptions;

type SpectraViewPropertiesOptions = SelfOptions & MOTHAViewPropertiesOptions;

export default class SpectraViewProperties extends MOTHAViewProperties {

  public constructor( providedOptions: SpectraViewPropertiesOptions ) {
    super( providedOptions );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraViewProperties', SpectraViewProperties );