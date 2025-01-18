// Copyright 2024, University of Colorado Boulder

/**
 * ClassicalSolarSystemElectron is the Electron specialized for the Classical Solar System model.  It adds Properties
 * needed by that model, but the model is still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Electron, { ElectronOptions } from './Electron.js';

const ANGULAR_SPEED = Utils.toRadians( 600 ); // initial speed of the electron, in radians/s

type SelfOptions = {
  angle?: number;
};

type ClassicalSolarSystemElectronOptions = SelfOptions & ElectronOptions;

export default class ClassicalSolarSystemElectron extends Electron {

  // Angle of the electron along its orbit, in radians.
  public readonly angleProperty: Property<number>; // radians

  public readonly angularSpeedProperty: Property<number>; // radians/s

  public constructor( providedOptions: ClassicalSolarSystemElectronOptions ) {

    const options = optionize<ClassicalSolarSystemElectronOptions, SelfOptions, ElectronOptions>()( {

      // SelfOptions
      angle: 0
    }, providedOptions );

    super( options );

    // The Java version started at a different angle each time reset, but that conflicts with PhET-iO.
    this.angleProperty = new NumberProperty( options.angle, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'Angle of the electron along its orbit. For internal use only.',
      phetioReadOnly: true
    } );

    this.angularSpeedProperty = new NumberProperty( ANGULAR_SPEED, {
      units: 'radians/s',
      tandem: options.tandem.createTandem( 'angularSpeedProperty' ),
      phetioDocumentation: 'Angular speed of the electron. For internal use only.',
      phetioReadOnly: true
    } );
  }

  public override reset(): void {
    this.angleProperty.reset();
    this.angularSpeedProperty.reset();
    super.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemElectron', ClassicalSolarSystemElectron );