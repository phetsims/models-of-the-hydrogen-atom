// Copyright 2015-2024, University of Colorado Boulder

/**
 * SpectraModel is the model for the 'Spectra' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import BilliardBallModel from '../../common/model/BilliardBallModel.js';
import BohrModel from '../../common/model/BohrModel.js';
import ClassicalSolarSystemModel from '../../common/model/ClassicalSolarSystemModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import Light from '../../common/model/Light.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import PlumPuddingModel from '../../common/model/PlumPuddingModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

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

    const light = new Light( zoomedInBox, {
      tandem: tandem.createTandem( 'light' )
    } );

    // Group all predictive models under this tandem.
    const predictiveModelsTandem = tandem.createTandem( 'predictiveModels' );

    const billiardBallModel = new BilliardBallModel( {
      tandem: predictiveModelsTandem.createTandem( 'billiardBallModel' )
    } );

    const plumPuddingModel = new PlumPuddingModel( {
      tandem: predictiveModelsTandem.createTandem( 'plumPuddingModel' )
    } );

    const classicalSolarSystemModel = new ClassicalSolarSystemModel( {
      tandem: predictiveModelsTandem.createTandem( 'classicalSolarSystemModel' )
    } );

    const bohrModel = new BohrModel( {
      tandem: predictiveModelsTandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( {
      tandem: predictiveModelsTandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( light, {
      tandem: predictiveModelsTandem.createTandem( 'schrodingerModel' )
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

    super( zoomedInBox, light, predictiveModels, billiardBallModel, tandem );

    this.billiardBallModel = billiardBallModel;
    this.plumPuddingModel = plumPuddingModel;
    this.classicalSolarSystemModel = classicalSolarSystemModel;
    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );