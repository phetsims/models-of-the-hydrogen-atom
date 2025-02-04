// Copyright 2015-2025, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import BohrModel from '../../common/model/BohrModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import LightSource from '../../common/model/LightSource.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class EnergyLevelsModel extends MOTHAModel {

  // Atomic models supported by this screen
  public readonly bohrModel: BohrModel;
  public readonly deBroglieModel: DeBroglieModel;
  public readonly schrodingerModel: SchrodingerModel;

  public constructor( tandem: Tandem ) {

    const zoomedInBox = new ZoomedInBox();

    const lightSource = new LightSource( zoomedInBox, tandem.createTandem( 'lightSource' ) );

    // Group all atomic models under this tandem.
    const atomicModelsTandem = tandem.createTandem( 'atomicModels' );

    const bohrModel = new BohrModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( MOTHAConstants.ATOM_POSITION, {
      tandem: atomicModelsTandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( MOTHAConstants.ATOM_POSITION, lightSource, {
      tandem: atomicModelsTandem.createTandem( 'schrodingerModel' )
    } );

    // Atomic models supported by this screen, in the order that they will appear in the UI.
    // NOTE: The Java version also included an Electron Energy Level diagram for the Classical Solar System model.
    // We decided to omit that model in the HTML5 version, because the idea of quantized energy levels is quantum
    // mechanical, and we see no value in displaying the diagram for any classical system.
    const atomicModels = [
      bohrModel,
      deBroglieModel,
      schrodingerModel
    ];
    assert && assert( _.every( atomicModels, atomicModel => atomicModel instanceof BohrModel ),
      'All atomic models in this screen must include the concept of electron energy level.' );

    super( zoomedInBox, lightSource, atomicModels, bohrModel, {
      isExperiment: false,
      tandem: tandem
    } );

    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );