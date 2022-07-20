// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergyLevelsModel is the model for the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import BohrModel from '../../common/model/BohrModel.js';
import DeBroglieModel from '../../common/model/DeBroglieModel.js';
import MOTHAModel, { MOTHAModelOptions } from '../../common/model/MOTHAModel.js';
import SchrodingerModel from '../../common/model/SchrodingerModel.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ZoomedInBox from '../../common/model/ZoomedInBox.js';
import MOTHAConstants from '../../common/MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type EnergyLevelsModelOptions = SelfOptions & MOTHAModelOptions;

export default class EnergyLevelsModel extends MOTHAModel {

  // predictive models supported by this screen
  public readonly bohrModel: BohrModel;
  public readonly deBroglieModel: DeBroglieModel;
  public readonly schrodingerModel: SchrodingerModel;

  public constructor( providedOptions: EnergyLevelsModelOptions ) {

    const options = optionize<EnergyLevelsModelOptions, SelfOptions, MOTHAModelOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const zoomedInBox = new ZoomedInBox( MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE );

    const bohrModel = new BohrModel( zoomedInBox, {
      tandem: options.tandem.createTandem( 'bohrModel' )
    } );

    const deBroglieModel = new DeBroglieModel( zoomedInBox, {
      tandem: options.tandem.createTandem( 'deBroglieModel' )
    } );

    const schrodingerModel = new SchrodingerModel( zoomedInBox, {
      tandem: options.tandem.createTandem( 'schrodingerModel' )
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

    super( zoomedInBox, predictiveModels, bohrModel, options );

    this.bohrModel = bohrModel;
    this.deBroglieModel = deBroglieModel;
    this.schrodingerModel = schrodingerModel;
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsModel', EnergyLevelsModel );