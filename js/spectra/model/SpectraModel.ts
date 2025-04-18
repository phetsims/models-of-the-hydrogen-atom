// Copyright 2015-2025, University of Colorado Boulder

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
import LightSource from '../../common/model/LightSource.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import PlumPuddingModel from '../../common/model/PlumPuddingModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class SpectraModel extends MOTHAModel {

  // Atomic models supported by this screen
  public readonly billiardBallModel: BilliardBallModel;
  public readonly plumPuddingModel: PlumPuddingModel;
  public readonly classicalSolarSystemModel: ClassicalSolarSystemModel;
  public readonly bohrModel: BohrModel;
  public readonly deBroglieModel: DeBroglieModel;
  public readonly schrodingerModel: SchrodingerModel;

  public constructor( tandem: Tandem ) {

    const zoomedInBox = new ZoomedInBox();

    const lightSource = new LightSource( zoomedInBox, tandem.createTandem( 'lightSource' ) );

    // Group all atomic models under this tandem.
    const atomicModelsTandem = tandem.createTandem( 'atomicModels' );

    const billiardBallModel = new BilliardBallModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'billiardBallModel' )
    } );

    const plumPuddingModel = new PlumPuddingModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'plumPuddingModel' )
    } );

    const classicalSolarSystemModel = new ClassicalSolarSystemModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'classicalSolarSystemModel' )
    } );

    const bohrModel = new BohrModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( MOTHAConstants.ATOM_POSITION, lightSource, {
      tandem: atomicModelsTandem.createTandem( 'schrodingerModel' )
    } );

    // Atomic models supported by this screen, in the order that they will appear in the UI
    const atomicModels = [
      billiardBallModel,
      plumPuddingModel,
      classicalSolarSystemModel,
      bohrModel,
      deBroglieModel,
      schrodingerModel
    ];

    super( zoomedInBox, lightSource, atomicModels, billiardBallModel, tandem );

    this.billiardBallModel = billiardBallModel;
    this.plumPuddingModel = plumPuddingModel;
    this.classicalSolarSystemModel = classicalSolarSystemModel;
    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }
}

modelsOfTheHydrogenAtom.register( 'SpectraModel', SpectraModel );