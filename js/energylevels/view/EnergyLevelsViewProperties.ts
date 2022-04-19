// Copyright 2019-2020, University of Colorado Boulder

/**
 * EnergyLevelsViewProperties defines Properties that are specific to the view in the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import MOTHAViewProperties, { MOTHAViewPropertiesOptions } from '../../common/view/MOTHAViewProperties.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type EnergyLevelsViewPropertiesOptions = SelfOptions & MOTHAViewPropertiesOptions;

export default class EnergyLevelsViewProperties extends MOTHAViewProperties {

  constructor( providedOptions: EnergyLevelsViewPropertiesOptions ) {
    super( providedOptions );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsViewProperties', EnergyLevelsViewProperties );