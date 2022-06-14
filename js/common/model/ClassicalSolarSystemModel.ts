// Copyright 2019-2022, University of Colorado Boulder

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
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import classicalSolarSystemButton_png from '../../../images/classicalSolarSystemButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import MOTHAUtils from '../MOTHAUtils.js';
import Utils from '../../../../dot/js/Utils.js';
import Electron from './Electron.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import Proton from './Proton.js';

const ELECTRON_DISTANCE = 300; // initial distance from electron to proton
const ELECTRON_DISTANCE_DELTA = 100; // amount the distance between the proton and electron is reduced per second
const MIN_ELECTRON_DISTANCE = 5; // any distance smaller than this is effectively zero
const ELECTRON_ANGLE_DELTA = Utils.toRadians( 120 ); // initial change in electron's rotation angle per second
const ELECTRON_ACCELERATION = 1.008; // scaling of electronAngleDeltaProperty each time step is called

type SelfOptions = {};

type ClassicalSolarSystemModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

export default class ClassicalSolarSystemModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: Electron;

  // offset of the electron relative to the atom's position
  private readonly electronOffsetProperty: IReadOnlyProperty<Vector2>;

  // distance between electron and proton
  private readonly electronDistanceProperty: Property<number>;

  // in radians
  private readonly electronAngleProperty: Property<number>;

  // in radians
  private readonly electronAngleDeltaProperty: Property<number>;

  // Has the atom been destroyed?
  public readonly isDestroyedProperty: IReadOnlyProperty<boolean>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: ClassicalSolarSystemModelOptions ) {

    const options = optionize<ClassicalSolarSystemModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: false
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.classicalSolarSystem, classicalSolarSystemButton_png, zoomedInBox, options );

    this.proton = new Proton( {
      position: this.position,
      tandem: options.tandem.createTandem( 'proton' )
    } );

    this.electron = new Electron( {
      //TODO position is not properly initialized
      tandem: options.tandem.createTandem( 'electron' )
    } );

    this.electronDistanceProperty = new NumberProperty( ELECTRON_DISTANCE, {
      tandem: options.tandem.createTandem( 'electronDistanceProperty' )
    } );

    //TODO we want this to start at a different angle each time reset, but that conflicts with PhET-iO
    this.electronAngleProperty = new NumberProperty( MOTHAUtils.nextAngle(), {
      tandem: options.tandem.createTandem( 'electronAngleProperty' )
    } );

    //TODO make this go away, just set electron.positionProperty directly
    this.electronOffsetProperty = new DerivedProperty(
      [ this.electronDistanceProperty, this.electronAngleProperty ],
      ( distance, angle ) => MOTHAUtils.polarToCartesian( distance, angle )
    );

    this.electronOffsetProperty.link( electronOffset => {
      this.electron.positionProperty.value = this.position.plus( electronOffset );
    } );

    this.electronAngleDeltaProperty = new NumberProperty( ELECTRON_ANGLE_DELTA, {
      tandem: options.tandem.createTandem( 'electronAngleDeltaProperty' )
    } );

    // The atom is destroyed when the electron hits the proton.
    this.isDestroyedProperty = new DerivedProperty( [ this.electronDistanceProperty ],
      electronDistance => ( electronDistance === 0 ), {
        tandem: options.tandem.createTandem( 'isDestroyedProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
      } );
  }

  public override reset(): void {
    this.proton.reset();
    this.electron.reset();
    this.electronDistanceProperty.reset();
    this.electronAngleProperty.reset();
    this.electronAngleDeltaProperty.reset();

    super.reset();
  }

  public override step( dt: number ): void {
    if ( !this.isDestroyedProperty.value ) {

      // increment the orbit angle
      this.electronAngleProperty.value += ( this.electronAngleDeltaProperty.value * dt );

      // increase the rate of change of the orbit angle
      this.electronAngleDeltaProperty.value *= ELECTRON_ACCELERATION;

      // decrease the electron's distance from the proton
      let newElectronDistance = this.electronDistanceProperty.value - ( ELECTRON_DISTANCE_DELTA * dt );
      if ( newElectronDistance <= MIN_ELECTRON_DISTANCE ) {
        newElectronDistance = 0;
      }
      this.electronDistanceProperty.value = newElectronDistance;
      console.log( `step: electronDistanceProperty=${this.electronDistanceProperty.value}` );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemModel', ClassicalSolarSystemModel );