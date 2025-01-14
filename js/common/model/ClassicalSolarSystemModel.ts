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

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAUtils from '../MOTHAUtils.js';
import ClassicalSolarSystemNode from '../view/ClassicalSolarSystemNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import ClassicalSolarSystemElectron from './ClassicalSolarSystemElectron.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Photon from './Photon.js';
import Proton from './Proton.js';

const ELECTRON_TO_PROTON_DISTANCE = 150; // initial distance from electron to proton
const ELECTRON_DISTANCE_DELTA = 220; // amount the distance between the electron and proton is reduced per second
const MIN_ELECTRON_DISTANCE = 5; // any distance between the electron and proton that is smaller than this is effectively zero
const ELECTRON_ANGULAR_SPEED_SCALE = 1.008; // scaling of electron speed each time step is called

type SelfOptions = EmptySelfOptions;

type ClassicalSolarSystemModelOptions = SelfOptions & PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class ClassicalSolarSystemModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: ClassicalSolarSystemElectron;

  // Has the atom been destroyed?
  public readonly isDestroyedProperty: TReadOnlyProperty<boolean>;

  public constructor( providedOptions: ClassicalSolarSystemModelOptions ) {

    const options = optionize<ClassicalSolarSystemModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.classicalSolarSystemStringProperty,
      icon: ClassicalSolarSystemNode.createIcon(),
      tandemNamePrefix: 'classicalSolarSystem'
    }, providedOptions );

    super( options );

    this.proton = new Proton( {
      position: this.position
    } );

    const angle = 0;
    const electronOffset = MOTHAUtils.polarToCartesian( ELECTRON_TO_PROTON_DISTANCE, angle );
    this.electron = new ClassicalSolarSystemElectron( {
      position: this.proton.position.plus( electronOffset ),
      angle: angle,
      tandem: options.tandem.createTandem( 'electron' )
    } );

    // The atom is destroyed when the electron hits the proton.
    this.isDestroyedProperty = new DerivedProperty( [ this.electron.positionProperty ],
      electronPosition => ( electronPosition.distance( this.proton.position ) === 0 ), {
        tandem: options.tandem.createTandem( 'isDestroyedProperty' ),
        phetioFeatured: true,
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

      const protonPosition = this.proton.position;

      // Move the electron clockwise.
      this.electron.angleProperty.value -= ( this.electron.angularSpeedProperty.value * dt );

      // Move the electron closer to the proton.
      const distance = this.electron.positionProperty.value.distance( protonPosition ) - ( ELECTRON_DISTANCE_DELTA * dt );
      if ( distance <= MIN_ELECTRON_DISTANCE ) {
        this.electron.positionProperty.value = protonPosition;
      }
      else {
        const electronOffset = MOTHAUtils.polarToCartesian( distance, this.electron.angleProperty.value );
        this.electron.positionProperty.value = protonPosition.plus( electronOffset );
      }

      // Accelerate the electron.
      this.electron.angularSpeedProperty.value *= ELECTRON_ANGULAR_SPEED_SCALE;
    }
  }

  /**
   * This model does nothing with photons.
   */
  public override processPhoton( photon: Photon ): void {
    // Do nothing.
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );