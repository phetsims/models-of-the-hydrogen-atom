// Copyright 2019, University of Colorado Boulder

/**
 * SpectraViewProperties defines Properties that are specific to the view in the 'Spectra' screen.
 * It adds no additional Properties to the base class, but is provided for symmetry in the model-view type hierarchy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAViewProperties from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

class SpectraViewProperties extends MOTHAViewProperties {

  constructor() {
    super();
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraViewProperties', SpectraViewProperties );
export default SpectraViewProperties;