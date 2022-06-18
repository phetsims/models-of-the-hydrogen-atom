// Copyright 2019-2022, University of Colorado Boulder

/**
 * SpectraViewProperties defines Properties that are specific to the view in the 'Spectra' screen.
 * It adds no additional Properties to the base class, but is provided for symmetry in the model-view type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import MOTHAViewProperties, { MOTHAViewPropertiesOptions } from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = EmptyObjectType;

type SpectraViewPropertiesOptions = SelfOptions & MOTHAViewPropertiesOptions;

class SpectraViewProperties extends MOTHAViewProperties {

  public constructor( providedOptions: SpectraViewPropertiesOptions ) {
    super( providedOptions );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraViewProperties', SpectraViewProperties );
export default SpectraViewProperties;