// Copyright 2015-2023, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BohrModel from '../../common/model/BohrModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class EnergyLevelsModel extends MOTHAModel {

  // predictive models supported by this screen
  public readonly bohrModel: BohrModel;
  public readonly deBroglieModel: DeBroglieModel;
  public readonly schrodingerModel: SchrodingerModel;

  public constructor( tandem: Tandem ) {

    const zoomedInBox = new ZoomedInBox( MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE );

    const predictiveModelsTandem = tandem.createTandem( 'predictiveModels' );

    const bohrModel = new BohrModel( zoomedInBox, {
      tandem: predictiveModelsTandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( zoomedInBox, {
      tandem: predictiveModelsTandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( zoomedInBox, {
      tandem: predictiveModelsTandem.createTandem( 'schrodingerModel' )
    } );

    // Predictive models supported by this screen, in the order that they will appear in the UI
    const predictiveModels = [
      bohrModel,
      deBroglieModel,
      schrodingerModel
    ];

    //TODO address this with an interface?
    assert && assert( _.every( predictiveModels, model => model.hasTransitionWavelengths ),
      'all models in this screen must include the concept of transition wavelengths' );

    super( zoomedInBox, predictiveModels, bohrModel, tandem );

    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );