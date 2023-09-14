// Copyright 2015-2023, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BilliardBallModel from '../../common/model/BilliardBallModel.js';
import BohrModel from '../../common/model/BohrModel.js';
import ClassicalSolarSystemModel from '../../common/model/ClassicalSolarSystemModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import PlumPuddingModel from '../../common/model/PlumPuddingModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class SpectraModel extends MOTHAModel {

  // predictive models supported by this screen
  public readonly billiardBallModel: BilliardBallModel;
  public readonly plumPuddingModel: PlumPuddingModel;
  public readonly classicalSolarSystemModel: ClassicalSolarSystemModel;
  public readonly bohrModel: BohrModel;
  public readonly deBroglieModel: DeBroglieModel;
  public readonly schrodingerModel: SchrodingerModel;

  public constructor( tandem: Tandem ) {

    const zoomedInBox = new ZoomedInBox( MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE );

    const billiardBallModel = new BilliardBallModel( zoomedInBox, {
      tandem: tandem.createTandem( 'billiardBallModel' )
    } );

    const plumPuddingModel = new PlumPuddingModel( zoomedInBox, {
      tandem: tandem.createTandem( 'plumPuddingModel' )
    } );

    const classicalSolarSystemModel = new ClassicalSolarSystemModel( zoomedInBox, {
      tandem: tandem.createTandem( 'classicalSolarSystemModel' )
    } );

    const bohrModel = new BohrModel( zoomedInBox, {
      tandem: tandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( zoomedInBox, {
      tandem: tandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( zoomedInBox, {
      tandem: tandem.createTandem( 'schrodingerModel' )
    } );

    // Predictive models supported by this screen, in the order that they will appear in the UI
    const predictiveModels = [
      billiardBallModel,
      plumPuddingModel,
      classicalSolarSystemModel,
      bohrModel,
      deBroglieModel,
      schrodingerModel
    ];

    //TODO default should be billiardBallModel
    super( zoomedInBox, predictiveModels, schrodingerModel, tandem );

    this.billiardBallModel = billiardBallModel;
    this.plumPuddingModel = plumPuddingModel;
    this.classicalSolarSystemModel = classicalSolarSystemModel;
    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );