// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import BohrModel from '../../common/model/BohrModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel, { MOTHAModelOptions } from '../../common/model/MOTHAModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type EnergyLevelsModelOptions = SelfOptions & MOTHAModelOptions;

export default class EnergyLevelsModel extends MOTHAModel {

  constructor( providedOptions: EnergyLevelsModelOptions ) {

    const options = optionize<EnergyLevelsModelOptions, SelfOptions, MOTHAModelOptions>()( {
      //TODO
    }, providedOptions );

    // Predictive models supported by this screen, in the order that they will appear in the UI
    const predictiveModels = [
      new BohrModel( {
        tandem: options.tandem.createTandem( 'bohrModel' )
      } ),
      new DeBroglieModel( {
        tandem: options.tandem.createTandem( 'deBroglieModel' )
      } ),
      new SchrodingerModel( {
        tandem: options.tandem.createTandem( 'schrodingerModel' )
      } )
    ];

    //TODO address this with an interface?
    assert && assert( _.every( predictiveModels, model => model.hasTransitionWavelengths ),
      'all models in this screen must include the concept of transition wavelengths' );

    super( predictiveModels, predictiveModels[ 0 ], options );
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );