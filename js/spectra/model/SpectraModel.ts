// Copyright 2015-2020, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import BilliardBallModel from '../../common/model/BilliardBallModel.js';
import BohrModel from '../../common/model/BohrModel.js';
import ClassicalSolarSystemModel from '../../common/model/ClassicalSolarSystemModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel, { MOTHAModelOptions } from '../../common/model/MOTHAModel.js';
import PlumPuddingModel from '../../common/model/PlumPuddingModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type SpectraModelOptions = SelfOptions & MOTHAModelOptions;

export default class SpectraModel extends MOTHAModel {

  constructor( providedOptions: SpectraModelOptions ) {

    const options = optionize<SpectraModelOptions, SelfOptions, MOTHAModelOptions>( {
      //TODO
    }, providedOptions );

    const initialModel = new PlumPuddingModel( {
      tandem: options.tandem.createTandem( 'plumPuddingModel' )
    } );

    // Predictive models supported by this screen, in the order that they will appear in the UI
    const predictiveModels = [
      new BilliardBallModel( {
        tandem: options.tandem.createTandem( 'billiardBallModel' )
      } ),
      initialModel,
      new ClassicalSolarSystemModel( {
        tandem: options.tandem.createTandem( 'classicalSolarSystemModel' )
      } ),
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

    super( predictiveModels, initialModel, options );
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );