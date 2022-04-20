// Copyright 2019-2022, University of Colorado Boulder

/**
 * SpectraViewProperties defines Properties that are specific to the view in the 'Spectra' screen.
 * It adds no additional Properties to the base class, but is provided for symmetry in the model-view type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAViewProperties, { MOTHAViewPropertiesOptions } from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type SpectraViewPropertiesOptions = SelfOptions & MOTHAViewPropertiesOptions;

class SpectraViewProperties extends MOTHAViewProperties {

  constructor( providedOptions: SpectraViewPropertiesOptions ) {
    super( providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraViewProperties', SpectraViewProperties );
export default SpectraViewProperties;