// Copyright 2019-2024, University of Colorado Boulder

/**
 * BohrModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Electron orbiting a proton. Each orbit corresponds to a different electron state. See createOrbitRadii for details
 * on how orbit radii are calculated.
 *
 * Collision behavior:
 * Photons may be absorbed if they collide with the electron.
 *
 * Absorption behavior:
 * Photons that match the transition wavelength of the electron's state are absorbed with some probability. Other
 * photons are not absorbed or affected.
 *
 * Emission behavior:
 * Spontaneous emission of a photon takes the electron to a lower state, and the photon emitted has the transition
 * wavelength that corresponds to the current and new state. Transition to each lower state is equally likely.
 * Stimulated emission of a photon occurs when a photon hits the electron, and the photon's wavelength corresponds
 * to a wavelength that could have been absorbed in a lower state.  In this case, the colliding photon is not absorbed,
 * but a new photon is emitted with the same wavelength, and the electron moves to the lower state.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import BohrNode from '../view/BohrNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import Utils from '../../../../dot/js/Utils.js';
import MOTHAUtils from '../MOTHAUtils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Proton from './Proton.js';
import Photon from './Photon.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHASymbols from '../MOTHASymbols.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import BohrElectron from './BohrElectron.js';
import Light from './Light.js';

// Probability that a photon will be absorbed, [0,1]
const PHOTON_ABSORPTION_PROBABILITY = 1;

// Probability that a photon will cause stimulated emission, [0,1]
const PHOTON_STIMULATED_EMISSION_PROBABILITY = PHOTON_ABSORPTION_PROBABILITY;

// Probability that a photon will be emitted, [0,1]
const PHOTON_SPONTANEOUS_EMISSION_PROBABILITY = 0.5;

// How close an emitted photon is placed to the photon that causes stimulated emission.
const STIMULATED_EMISSION_X_OFFSET = 10;

type SelfOptions = EmptySelfOptions;

export type BohrModelOptions = SelfOptions &
  PickOptional<HydrogenAtomOptions, 'displayNameProperty' | 'icon'> &
  PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BohrModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: BohrElectron;

  // Radius of each electron orbit, ordered by increasing electron state number.
  // These values are distorted to fit in zoomedInBox, and are specific to MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE.
  public static readonly ORBIT_RADII = [ 15, 44, 81, 124, 174, 233 ];

  // Minimum time (in sec) that electron stays in a state before emission can occur.
  public static readonly MIN_TIME_IN_STATE = 1;

  // Change in orbit angle per dt for ground state orbit.
  public static readonly ELECTRON_ANGLE_DELTA = Utils.toRadians( 480 );

  // A map from absorption/emission wavelengths to electron state (n) transitions.
  public static readonly wavelengthToStateTransitionMap = createWavelengthToStateTransitionMap();

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.bohrStringProperty,
      icon: BohrNode.createIcon()
    }, providedOptions );

    super( zoomedInBox, options );

    this.proton = new Proton( {
      position: this.position
    } );

    this.electron = new BohrElectron( {
      //TODO position is not properly initialized
      tandem: options.tandem.createTandem( 'electron' )
    } );

    this.electron.offsetProperty.link( offset => {
      this.electron.positionProperty.value = this.position.plus( offset );
    } );
  }

  public override reset(): void {
    this.electron.reset();
    super.reset();
  }

  public override step( dt: number ): void {

    // Keep track of how long the electron has been in its current state.
    this.electron.timeInStateProperty.value += dt;

    // Advance the electron along its orbit.
    this.electron.directionProperty.value = this.calculateNewElectronDirection( dt );

    // Attempt to emit a photon.
    this.attemptSpontaneousEmission();
  }

  //TODO normalize the return value to [0,2*Math.PI]
  /**
   * Calculates the new electron direction for some time step. For Bohr, the direction changes at a different rate for
   * each electron state (n).
   */
  protected calculateNewElectronDirection( dt: number ): number {
    const n = this.electron.nProperty.value;
    const deltaAngle = dt * ( BohrModel.ELECTRON_ANGLE_DELTA / ( n * n ) );
    return this.electron.directionProperty.value - deltaAngle; //TODO clockwise
  }

  public override movePhoton( photon: Photon, dt: number ): void {
    const absorbed = this.attemptAbsorption( photon );
    if ( !absorbed ) {
      this.attemptStimulatedEmission( photon );
      photon.move( dt );
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Orbit methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the radius of the electron's orbit when it's in a specified state.
   */
  public static getElectronOrbitRadius( n: number ): number {
    return BohrModel.ORBIT_RADII[ n - MOTHAConstants.GROUND_STATE ];
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Wavelength methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the wavelength that is absorbed when the electron transitions from n1 to n2, where n2 > n1.
   */
  public static getAbsorptionWavelength( n1: number, n2: number ): number {
    //TODO Should this be a lookup in BohrModel.wavelengthToStateTransitionMap?
    return getAbsorptionWavelength( n1, n2 );
  }

  /**
   * Gets the wavelength that is emitted when the electron transitions from n2 to n1, where n1 < n2.
   */
  public static getEmissionWavelength( n2: number, n1: number ): number {
    //TODO Should this be a lookup in BohrModel.wavelengthToStateTransitionMap?
    return getAbsorptionWavelength( n1, n2 );
  }

  /**
   * Gets the wavelengths that can be absorbed in state n.
   */
  public static getAbsorptionWavelengths( n: number ): number[] {
    assert && assert( Number.isInteger( n ) );
    assert && assert( n >= MOTHAConstants.GROUND_STATE && n < MOTHAConstants.MAX_STATE, `bad n=${n}` );

    const wavelengths: number[] = [];
    for ( const [ wavelength, transition ] of BohrModel.wavelengthToStateTransitionMap ) {
      if ( n === transition.n1 ) {
        wavelengths.push( wavelength );
      }
    }

    assert && assert( wavelengths.length > 0 );
    assert && assert( _.every( wavelengths, wavelength => Number.isInteger( wavelength ) ) );
    return wavelengths;
  }

  /**
   * Gets the absorption wavelengths that are in the visible spectrum.
   */
  public static getVisibleAbsorptionWavelengths(): number[] {
    return Array.from( BohrModel.wavelengthToStateTransitionMap.keys() ).filter( wavelength => VisibleColor.isVisibleWavelength( wavelength ) );
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Collision detection
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Determines whether a photon collides with this atom. In this case, we treat the photon and electron as points,
   * and see if the points are close enough to cause a collision.
   */
  protected collides( photon: Photon ): boolean {
    const electronPosition = this.electron.positionProperty.value;
    const photonPosition = photon.positionProperty.value;
    const maxDistance = photon.radius + this.electron.radius;
    return MOTHAUtils.pointsCollide( electronPosition, photonPosition, maxDistance );
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Absorption
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to absorb a specified photon.
   */
  private attemptAbsorption( photon: Photon ): boolean {

    const electron = this.electron;

    let success = false;
    const nCurrent = electron.nProperty.value;

    // Has the electron been in this state long enough? And was this photon produced by the light?
    if ( electron.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE && !photon.wasEmitted ) {

      // Do the photon and electron collide?
      const collide = this.collides( photon );
      if ( collide ) {

        // Is the photon absorbable, does it have a transition wavelength?
        let canAbsorb = false;
        let nNew = 0;
        for ( let n = nCurrent + 1; n <= MOTHAConstants.MAX_STATE && !canAbsorb; n++ ) {
          const transitionWavelength = BohrModel.getAbsorptionWavelength( nCurrent, n );
          if ( photon.wavelength === transitionWavelength ) {
            canAbsorb = true;
            nNew = n;
          }
        }

        // Is the transition that would occur allowed?
        if ( !this.absorptionIsAllowed( nCurrent, nNew ) ) {
          return false;
        }

        // Absorb the photon with some probability...
        if ( canAbsorb && this.absorptionIsCertain() ) {

          // absorb photon
          success = true;
          phet.log && phet.log( `Bohr: absorbed ${MOTHASymbols.lambda}=${photon.wavelength}` );
          this.photonAbsorbedEmitter.emit( photon );

          // move electron to new state
          electron.nProperty.value = nNew;
        }
      }
    }

    return success;
  }

  /**
   * Probabilistically determines whether to absorb a photon.
   */
  protected absorptionIsCertain(): boolean {
    return dotRandom.nextDouble() < PHOTON_ABSORPTION_PROBABILITY;
  }

  /**
   * Determines if a proposed state transition caused by absorption is legal. Always true for Bohr.
   */
  private absorptionIsAllowed( nOld: number, nNew: number ): boolean {
    return true;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Stimulated Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to stimulate emission with a specified photon.
   *
   * Definition of stimulated emission, for states nOld > nNew:
   * If an electron in state nOld is hit by a photon whose absorption would cause a transition from state nOld to nNew,
   * then the electron should drop to state nNew and emit a photon. The emitted photon should be the same wavelength
   * and be traveling alongside the original photon.
   */
  private attemptStimulatedEmission( photon: Photon ): boolean {

    const electron = this.electron;

    let success = false;
    const nCurrent = electron.nProperty.value;

    // Are we in some state other than the ground state?
    // Has the electron been in this state long enough?
    // Was this photon produced by the light?
    if ( nCurrent > MOTHAConstants.GROUND_STATE &&
         electron.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE &&
         !photon.wasEmitted ) {

      // Do the photon and electron collide?
      const collide = this.collides( photon );
      if ( collide ) {

        // Can this photon stimulate emission, does it have a transition wavelength?
        //TODO Should this be a lookup in BohrModel.wavelengthToStateTransitionMap?
        let canStimulateEmission = false;
        let nNew = 0;
        for ( let n = MOTHAConstants.GROUND_STATE; n < nCurrent && !canStimulateEmission; n++ ) {
          const transitionWavelength = BohrModel.getAbsorptionWavelength( n, nCurrent );
          if ( photon.wavelength === transitionWavelength ) {
            canStimulateEmission = true;
            nNew = n;
          }
        }

        // Is the transition that would occur allowed?
        if ( !this.stimulatedEmissionIsAllowed( nCurrent, nNew ) ) {
          return false;
        }

        // Emit a photon with some probability.
        if ( canStimulateEmission && this.stimulatedEmissionIsCertain() ) {

          // The photon should be moving in the direction that the light source is pointed.
          assert && assert( photon.directionProperty.value === Light.DIRECTION );

          // Create and emit a photon
          success = true;
          const emittedPhoton = new Photon( {
            wavelength: photon.wavelength,
            position: photon.positionProperty.value.plusXY( STIMULATED_EMISSION_X_OFFSET, 0 ),
            direction: photon.directionProperty.value,
            wasEmitted: true
          } );
          phet.log && phet.log( `Bohr: stimulated emission ${MOTHASymbols.lambda}=${emittedPhoton.wavelength}` );
          assert && assert( BohrModel.wavelengthToStateTransitionMap.has( emittedPhoton.wavelength ),
            `not an emission wavelength: ${emittedPhoton.wavelength}` );
          this.photonEmittedEmitter.emit( emittedPhoton );

          // move electron to new state
          electron.nProperty.value = nNew;
        }
      }
    }

    return success;
  }

  /**
   * Probabilistically determines whether the atom will emit a photon via stimulated emission.
   */
  private stimulatedEmissionIsCertain(): boolean {
    return dotRandom.nextDouble() < PHOTON_STIMULATED_EMISSION_PROBABILITY;
  }

  /**
   * Determines if a proposed state transition caused by stimulated emission is legal.
   * A Bohr transition is legal if the 2 states are different and nNew is >= ground state.
   */
  //TODO Doc for attemptStimulatedEmission says that nOld must be > nNew. Which is correct?
  protected stimulatedEmissionIsAllowed( nOld: number, nNew: number ): boolean {
    return ( ( nOld !== nNew ) && ( nNew >= MOTHAConstants.GROUND_STATE ) );
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Spontaneous Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to emit a photon from the electron's location, in a random direction.
   */
  private attemptSpontaneousEmission(): boolean {

    const electron = this.electron;

    let success = false;
    const nCurrent = electron.nProperty.value;

    // Are we in some state other than the ground state?
    // Has the electron been in this state long enough?
    if ( nCurrent > MOTHAConstants.GROUND_STATE && electron.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE ) {

      //  Emit a photon with some probability...
      if ( this.spontaneousEmissionIsCertain() ) {

        const nNew = this.chooseLower_n();
        if ( nNew === -1 ) {
          // For some subclasses, there may be no valid transition.
          return false;
        }

        // Create and emit a photon
        success = true;
        const emittedPhoton = new Photon( {
          wavelength: BohrModel.getEmissionWavelength( nCurrent, nNew ),
          position: this.getSpontaneousEmissionPosition(),
          direction: MOTHAUtils.nextAngle(), // in a random direction
          wasEmitted: true
        } );
        phet.log && phet.log( `Bohr: spontaneous emission ${MOTHASymbols.lambda}=${emittedPhoton.wavelength}` );
        assert && assert( BohrModel.wavelengthToStateTransitionMap.has( emittedPhoton.wavelength ),
          `not an emission wavelength: ${emittedPhoton.wavelength}` );
        this.photonEmittedEmitter.emit( emittedPhoton );

        // move electron to new state
        electron.nProperty.value = nNew;
      }
    }

    return success;
  }

  /**
   * Probabilistically determines whether the atom will spontaneously emit a photon.
   */
  private spontaneousEmissionIsCertain(): boolean {
    return dotRandom.nextDouble() < PHOTON_SPONTANEOUS_EMISSION_PROBABILITY;
  }

  /**
   * Chooses a lower value for n. This is used during spontaneous emission. Each lower state has the same probability
   * of being chosen.
   * @returns n, -1 if there is no lower state
   */
  protected chooseLower_n(): number {
    const n = this.electron.nProperty.value;
    if ( n === MOTHAConstants.GROUND_STATE ) {
      return -1;
    }
    else {
      return dotRandom.nextIntBetween( MOTHAConstants.GROUND_STATE, n - MOTHAConstants.GROUND_STATE );
    }
  }

  /**
   * Gets the position of a photon created via spontaneous emission.
   * The default behavior is to create the photon at the electron's position.
   */
  protected getSpontaneousEmissionPosition(): Vector2 {
    return this.electron.positionProperty.value;
  }
}

assert && assert( BohrModel.ORBIT_RADII.length === MOTHAConstants.NUMBER_OF_STATES );

/**
 * Gets the wavelength that must be absorbed for the electron to transition from state n1 to state n2,
 * where n2 > n1. This algorithm assumes that the ground state is 1.
 */
function getAbsorptionWavelength( n1: number, n2: number ): number {
  assert && assert( Number.isInteger( n1 ) && Number.isInteger( n2 ) );
  assert && assert( MOTHAConstants.GROUND_STATE === 1 );
  assert && assert( n1 >= MOTHAConstants.GROUND_STATE, `bad n1=${n1}` );
  assert && assert( n1 < n2, `bad n1=${n1} n2=${n2}` );
  assert && assert( n2 <= MOTHAConstants.MAX_STATE, `bad n2=${n2}` );

  // Rydberg formula, see doc/java-version/hydrogen-atom.pdf page 20.
  const wavelength = 1240 / ( 13.6 * ( ( 1 / ( n1 * n1 ) ) - ( 1 / ( n2 * n2 ) ) ) );

  // As a simplification to benefit PhET-iO, convert to an integer value.
  // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53.
  return Utils.toFixedNumber( wavelength, 0 );
}

/**
 * Creates a map from absorption/emission wavelengths to electron state transitions, ordered by ascending wavelength.
 */
type StateTransition = {
  n1: number;
  n2: number; // n2 > n1
};

function createWavelengthToStateTransitionMap(): Map<number, StateTransition> {
  const map = new Map<number, StateTransition>();
  for ( let n1 = MOTHAConstants.GROUND_STATE; n1 < MOTHAConstants.MAX_STATE; n1++ ) {
    for ( let n2 = MOTHAConstants.MAX_STATE; n2 > n1; n2-- ) {
      const wavelength = Utils.toFixedNumber( getAbsorptionWavelength( n1, n2 ), 0 );
      map.set( wavelength, { n1: n1, n2: n2 } );
    }
  }
  return map;
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );