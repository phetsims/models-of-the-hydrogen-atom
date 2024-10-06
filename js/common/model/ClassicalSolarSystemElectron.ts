// Copyright 2024, University of Colorado Boulder

/**
 * ClassicalSolarSystemElectron is the Electron specialized for the Classical Solar System model.  It adds Properties
 * needed by that model, but the model is still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Electron, { ElectronOptions } from './Electron.js';
import Property from '../../../../axon/js/Property.js';
import MOTHAUtils from '../MOTHAUtils.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import optionize from '../../../../phet-core/js/optionize.js';
import Utils from '../../../../dot/js/Utils.js';

const ANGULAR_SPEED = Utils.toRadians( 600 ); // initial speed of the electron, in radians/s

type SelfOptions = {
  direction?: number;
};

type ClassicalSolarSystemElectronOptions = SelfOptions & ElectronOptions;

export default class ClassicalSolarSystemElectron extends Electron {

  //TODO This is not the direction of the electron, it is the angle around the orbit.
  public readonly directionProperty: Property<number>; // radians
  public readonly angularSpeedProperty: Property<number>; // radians/s

  public constructor( providedOptions: ClassicalSolarSystemElectronOptions ) {

    const options = optionize<ClassicalSolarSystemElectronOptions, SelfOptions, ElectronOptions>()( {

      // SelfOptions
      direction: 0
    }, providedOptions );

    super( options );

    this.directionProperty = new NumberProperty( options.direction, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true
    } );

    this.angularSpeedProperty = new NumberProperty( ANGULAR_SPEED, {
      units: 'radians/s',
      tandem: options.tandem.createTandem( 'angularSpeedProperty' ),
      phetioDocumentation: 'Angular speed of the electron.',
      phetioReadOnly: true
    } );
  }

  public override reset(): void {
    // TODO Does setting directionProperty to a different angle on reset conflict with PhET-iO?
    this.directionProperty.value = MOTHAUtils.nextAngle();
    this.angularSpeedProperty.reset();
    super.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemElectron', ClassicalSolarSystemElectron );