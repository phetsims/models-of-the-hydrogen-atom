// Copyright 2019-2024, University of Colorado Boulder

/**
 * ClassicalSolarSystemModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Proton at the center, electron spirals towards the proton. Our spiral is clockwise to be consistent with all other
 * orbits in this sim. The electron starts at a fixed distance and random angle from the proton. The radius of the
 * spiral decreases linearly and the electron accelerates as the electron moves closer to the proton. The final state
 * shows the electron on top of the proton. In this final state, the atom is considered "destroyed".
 *
 * Collision behavior:
 * The spiraling behavior should occur fast enough so that the atom is  destroyed before any photons reach it.
 * Therefore, there are no collisions.
 *
 * Absorption behavior:
 * Atom is destroyed, so it does not absorb photons.
 *
 * Emission behavior:
 * Atom is destroyed, so it does not emit photons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import ClassicalSolarSystemNode from '../view/ClassicalSolarSystemNode.js'; // eslint-disable-line no-view-imported-from-model
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import MOTHAUtils from '../MOTHAUtils.js';
import Utils from '../../../../dot/js/Utils.js';
import Electron from './Electron.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Proton from './Proton.js';
import Photon from './Photon.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Tandem from '../../../../tandem/js/Tandem.js';

const ELECTRON_TO_PROTON_DISTANCE = 150; // initial distance from electron to proton
const ELECTRON_DISTANCE_DELTA = 220; // amount the distance between the electron and proton is reduced per second
const MIN_ELECTRON_DISTANCE = 5; // any distance between the electron and proton that is smaller than this is effectively zero
const ELECTRON_ANGULAR_SPEED = Utils.toRadians( 600 ); // initial speed of the electron, in radians/s
const ELECTRON_ANGULAR_SPEED_SCALE = 1.008; // scaling of electron speed each time step is called

type SelfOptions = EmptySelfOptions;

type ClassicalSolarSystemModelOptions = SelfOptions & PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class ClassicalSolarSystemModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: ClassicalSolarSystemElectron;

  // Has the atom been destroyed?
  public readonly isDestroyedProperty: TReadOnlyProperty<boolean>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: ClassicalSolarSystemModelOptions ) {

    const options = optionize<ClassicalSolarSystemModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.classicalSolarSystemStringProperty,
      icon: ClassicalSolarSystemNode.createIcon(),
      photonEmittedEmitterInstrumented: false,
      photonAbsorbedEmitterInstrumented: false
    }, providedOptions );

    super( zoomedInBox, options );

    this.proton = new Proton( {
      position: this.position
    } );

    this.electron = new ClassicalSolarSystemElectron( this.proton.position, options.tandem.createTandem( 'electron' ) );

    // The atom is destroyed when the electron hits the proton.
    this.isDestroyedProperty = new DerivedProperty( [ this.electron.positionProperty ],
      electronPosition => ( electronPosition.distance( this.proton.position ) === 0 ), {  //TODO epsilon?
        tandem: options.tandem.createTandem( 'isDestroyedProperty' ),
        phetioValueType: BooleanIO,
        phetioDocumentation: 'Whether the atom has been destroyed.'
      } );
  }

  public override reset(): void {
    this.electron.reset();
    super.reset();
  }

  public override step( dt: number ): void {
    if ( !this.isDestroyedProperty.value ) {
      this.electron.step( dt );
    }
  }

  public override movePhoton( photon: Photon, dt: number ): void {
    photon.move( dt );
  }
}

/**
 * ClassicalSolarSystemElectron is a specialization of Electron for the Classical Solar System model.
 */
class ClassicalSolarSystemElectron extends Electron {

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

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );