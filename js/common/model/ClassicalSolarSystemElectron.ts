// Copyright 2024, University of Colorado Boulder

/**
 * ClassicalSolarSystemElectron is the Electron specialized for the Classical Solar System model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Electron from './Electron.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAUtils from '../MOTHAUtils.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Utils from '../../../../dot/js/Utils.js';

const ELECTRON_TO_PROTON_DISTANCE = 150; // initial distance from electron to proton
const ELECTRON_DISTANCE_DELTA = 220; // amount the distance between the electron and proton is reduced per second
const MIN_ELECTRON_DISTANCE = 5; // any distance between the electron and proton that is smaller than this is effectively zero
const ELECTRON_ANGULAR_SPEED = Utils.toRadians( 600 ); // initial speed of the electron, in radians/s
const ELECTRON_ANGULAR_SPEED_SCALE = 1.008; // scaling of electron speed each time step is called

export default class ClassicalSolarSystemElectron extends Electron {

  private readonly directionProperty: Property<number>; // radians
  private readonly angularSpeedProperty: Property<number>; // radians/s
  private readonly protonPosition: Vector2;

  public constructor( protonPosition: Vector2, tandem: Tandem ) {

    const direction = MOTHAUtils.nextAngle();
    const electronOffset = MOTHAUtils.polarToCartesian( ELECTRON_TO_PROTON_DISTANCE, direction );
    const position = protonPosition.plus( electronOffset );

    super( {
      position: position,
      tandem: tandem
    } );

    this.directionProperty = new NumberProperty( direction, {
      units: 'radians',
      tandem: tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true
    } );

    this.angularSpeedProperty = new NumberProperty( ELECTRON_ANGULAR_SPEED, {
      units: 'radians/s',
      tandem: tandem.createTandem( 'angularSpeedProperty' ),
      phetioDocumentation: 'Angular speed of the electron.',
      phetioReadOnly: true
    } );

    this.protonPosition = protonPosition;
  }

  public override reset(): void {
    // TODO Does setting directionProperty to a different angle on reset conflict with PhET-iO?
    this.directionProperty.value = MOTHAUtils.nextAngle();
    this.angularSpeedProperty.reset();
    super.reset();
  }

  public step( dt: number ): void {

    // Move clockwise.
    this.directionProperty.value -= ( this.angularSpeedProperty.value * dt );

    // Move the electron closer to the proton.
    const distance = this.positionProperty.value.distance( this.protonPosition ) - ( ELECTRON_DISTANCE_DELTA * dt );
    if ( distance <= MIN_ELECTRON_DISTANCE ) {
      this.positionProperty.value = this.protonPosition;
    }
    else {
      const electronOffset = MOTHAUtils.polarToCartesian( distance, this.directionProperty.value );
      this.positionProperty.value = this.protonPosition.plus( electronOffset );
    }

    // Accelerate.
    this.angularSpeedProperty.value *= ELECTRON_ANGULAR_SPEED_SCALE;
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemElectron', ClassicalSolarSystemElectron );