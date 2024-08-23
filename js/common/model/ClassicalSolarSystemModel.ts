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

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import ClassicalSolarSystemNode from '../view/ClassicalSolarSystemNode.js'; // eslint-disable-line no-view-imported-from-model
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Proton from './Proton.js';
import Photon from './Photon.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ClassicalSolarSystemElectron from './ClassicalSolarSystemElectron.js';

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

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );