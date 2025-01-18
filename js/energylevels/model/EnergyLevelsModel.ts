// Copyright 2015-2025, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import BohrModel from '../../common/model/BohrModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import Light from '../../common/model/Light.js';
import MOTHAModel from '../../common/model/MOTHAModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class EnergyLevelsModel extends MOTHAModel {

  // predictive models supported by this screen
  public readonly bohrModel: BohrModel;
  public readonly deBroglieModel: DeBroglieModel;
  public readonly schrodingerModel: SchrodingerModel;

  public constructor( tandem: Tandem ) {

    const zoomedInBox = new ZoomedInBox( MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE );

    const light = new Light( zoomedInBox, tandem.createTandem( 'light' ) );

    // Group all predictive models under this tandem.
    const hydrogenAtomsTandem = tandem.createTandem( 'hydrogenAtoms' );

    const bohrModel = new BohrModel( {
      tandem: hydrogenAtomsTandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( {
      tandem: hydrogenAtomsTandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( light, {
      tandem: hydrogenAtomsTandem.createTandem( 'schrodingerModel' )
    } );

    // Predictive models supported by this screen, in the order that they will appear in the UI.
    // NOTE: The Java version also included an Electron Energy Level diagram for the Classical Solar System model.
    // We decided to omit that model in the HTML5 version, because the idea of quantized energy levels is quantum
    // mechanical, and we see no value in displaying the diagram for any classical system.
    const predictiveModels = [
      bohrModel,
      deBroglieModel,
      schrodingerModel
    ];
    assert && assert( _.every( predictiveModels, model => model instanceof BohrModel ),
      'all models in this screen must include the concept of state transition wavelengths' );

    super( zoomedInBox, light, predictiveModels, bohrModel, hydrogenAtomsTandem, tandem );

    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );