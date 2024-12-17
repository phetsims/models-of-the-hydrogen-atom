// Copyright 2019-2024, University of Colorado Boulder

//TODO Collision detection is done twice, calling this.collides in both absorbPhoton and attemptStimulatedEmission.
//TODO this.electron.timeInStateProperty.value < BohrModel.MIN_TIME_IN_STATE is checked 3x: absorbPhoton, attemptStimulatedEmission, and attemptSpontaneousEmission.
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

import dotRandom from '../../../../dot/js/dotRandom.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHASymbols from '../MOTHASymbols.js';
import MOTHAUtils from '../MOTHAUtils.js';
import BohrNode from '../view/BohrNode.js'; // eslint-disable-line phet/no-view-imported-from-model
import BohrElectron from './BohrElectron.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Light from './Light.js';
import Photon from './Photon.js';
import Proton from './Proton.js';
import ZoomedInBox from './ZoomedInBox.js';

// Probability that a photon will be absorbed, [0,1]
const PHOTON_ABSORPTION_PROBABILITY = 1;

// Probability that a photon will cause stimulated emission, [0,1]
const PHOTON_STIMULATED_EMISSION_PROBABILITY = PHOTON_ABSORPTION_PROBABILITY;

// Probability that a photon will be emitted, [0,1]
const PHOTON_SPONTANEOUS_EMISSION_PROBABILITY = 0.5;

// How close an emitted photon is placed to the photon that causes stimulated emission.
const STIMULATED_EMISSION_X_OFFSET = MOTHAConstants.PHOTON_RADIUS;

type SelfOptions = EmptySelfOptions;

export type BohrModelOptions = SelfOptions &
  PickOptional<HydrogenAtomOptions, 'displayNameProperty' | 'icon' | 'tandemNamePrefix'> &
  PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BohrModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: BohrElectron;

  // Radius of each electron orbit, ordered by increasing electron state number.
  // These values are distorted to fit in zoomedInBox, and are specific to MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE.
  public static readonly ORBIT_RADII = [ 15, 44, 81, 124, 174, 233 ];

  // Minimum time (in sec) that the electron must be in a state before transitions can occur.
  public static readonly MIN_TIME_IN_STATE_BEFORE_ABSORPTION = 0.75;
  public static readonly MIN_TIME_IN_STATE_BEFORE_STIMULATED_EMISSION = 1;
  public static readonly MIN_TIME_IN_STATE_BEFORE_SPONTANEOUS_EMISSION = 1;

  // Change in orbit angle per dt for ground state orbit.
  public static readonly ELECTRON_ANGLE_DELTA = Utils.toRadians( 480 );

  // A map from absorption/emission wavelengths to electron state (n) transitions.
  public static readonly wavelengthToStateTransitionMap = createWavelengthToStateTransitionMap();

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.bohrStringProperty,
      icon: BohrNode.createIcon(),
      tandemNamePrefix: 'bohr'
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
    this.electron.angleProperty.value = this.calculateNewElectronDirection( dt );

    // Attempt to emit a photon.
    this.attemptSpontaneousEmission();
  }

  /**
   * Calculates the new electron direction for some time step. For Bohr, the direction changes at a different rate for
   * each electron state (n).
   */
  protected calculateNewElectronDirection( dt: number ): number {
    const n = this.electron.nProperty.value;
    const deltaAngle = dt * ( BohrModel.ELECTRON_ANGLE_DELTA / ( n * n ) );
    return MOTHAUtils.normalizeAngle( this.electron.angleProperty.value - deltaAngle ); // clockwise
  }

  /**
   * Photon may be absorbed or stimulate emission.
   */
  public override processPhoton( photon: Photon ): void {
    if ( !this.absorbPhoton( photon ) ) {
      this.attemptStimulatedEmission( photon );
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
   * Attempts to absorb a photon that would excite to a higher energy state.
   * @returns true if the photon was absorbed, false if it was not absorbed
   */
  private absorbPhoton( photon: Photon ): boolean {

    const nCurrent = this.electron.nProperty.value;

    if ( photon.wasEmitted ||
         nCurrent === MOTHAConstants.MAX_STATE ||
         this.electron.timeInStateProperty.value < BohrModel.MIN_TIME_IN_STATE_BEFORE_ABSORPTION ||
         !this.collides( photon ) ) {
      return false;
    }

    // Determine if the photon has a wavelength that would excite the electron to a higher energy state.
    const nNew = getHigherStateForWavelength( nCurrent, photon.wavelength );
    if ( nNew === null ) {
      return false;
    }
    assert && assert( nNew > nCurrent, `nNew ${nNew} should be > nCurrent ${nCurrent}` );

    // Absorb with some probability.
    if ( !this.absorptionIsCertain() ) {
      return false;
    }

    // Absorb the photon.
    phet.log && phet.log( `BohrModel: absorbed ${MOTHASymbols.lambda}=${photon.wavelength}, ${nCurrent} -> ${nNew}` );
    this.photonAbsorbedEmitter.emit( photon );

    // Move the electron to the new higher state.
    this.electron.nProperty.value = nNew;

    return true;
  }

  /**
   * Probabilistically determines whether to absorb a photon.
   */
  protected absorptionIsCertain(): boolean {
    return dotRandom.nextDouble() < PHOTON_ABSORPTION_PROBABILITY;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Stimulated Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to stimulate emission with a specified photon. If an electron in state nOld is hit by a photon whose
   * absorption would cause a transition from state nOld to nNew, where nNew < nOld, then the electron should drop
   * to state nNew and emit a photon. The emitted photon should be the same wavelength and be traveling alongside
   * the original photon. See https://en.wikipedia.org/wiki/Stimulated_emission
   *
   * @returns the photon emitted, null if no photon was emitted.
   */
  private attemptStimulatedEmission( photon: Photon ): Photon | null {

    const nCurrent = this.electron.nProperty.value;

    if ( photon.wasEmitted ||
         this.electron.timeInStateProperty.value < BohrModel.MIN_TIME_IN_STATE_BEFORE_STIMULATED_EMISSION ||
         nCurrent === MOTHAConstants.GROUND_STATE ||
         !this.collides( photon ) ) {
      return null;
    }

    // Determine if the photon has a wavelength that would move the electron to a lower energy state.
    const nNew = getLowerStateForWavelength( nCurrent, photon.wavelength );
    if ( nNew === null || !this.stimulatedEmissionIsAllowed( nCurrent, nNew ) ) {
      return null;
    }
    assert && assert( nNew < nCurrent, `nNew ${nNew} should be < nCurrent ${nCurrent}` );

    // Emit with some probability.
    if ( !this.stimulatedEmissionIsCertain() ) {
      return null;
    }

    // Emit a photon.
    const emittedPhoton = new Photon( {
      wavelength: photon.wavelength,
      position: photon.positionProperty.value.plusXY( STIMULATED_EMISSION_X_OFFSET, 0 ),
      direction: photon.directionProperty.value,
      wasEmitted: true,
      debugHaloColor: 'rgb( 75, 255, 7 )' // bright green
    } );
    this.photonEmittedEmitter.emit( emittedPhoton );
    phet.log && phet.log( `BohrModel: stimulated emission, ${MOTHASymbols.lambda}=${emittedPhoton.wavelength}, ${nCurrent} -> ${nNew}` );

    // Move the electron to the new lower state.
    this.electron.nProperty.value = nNew;

    return emittedPhoton;
  }

  /**
   * Probabilistically determines whether the atom will emit a photon via stimulated emission.
   */
  private stimulatedEmissionIsCertain(): boolean {
    return dotRandom.nextDouble() < PHOTON_STIMULATED_EMISSION_PROBABILITY;
  }

  /**
   * Determines if a proposed state transition caused by stimulated emission is legal.
   * Stimulated emission involves a transition to a lower energy state, so a lower value of n.
   */
  protected stimulatedEmissionIsAllowed( nOld: number, nNew: number ): boolean {
    assert && assert( nOld >= MOTHAConstants.GROUND_STATE && nOld <= MOTHAConstants.MAX_STATE, `invalid nOld: ${nOld}` );
    assert && assert( nNew >= MOTHAConstants.GROUND_STATE && nNew <= MOTHAConstants.MAX_STATE, `invalid nNew: ${nNew}` );
    return nOld > nNew;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Spontaneous Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Spontaneous emission transitions from an excited energy state to a lower energy state, and emits a photon.
   * See https://en.wikipedia.org/wiki/Spontaneous_emission
   *
   * @returns the photon emitted, null if no photon was emitted.
   */
  private attemptSpontaneousEmission(): Photon | null {

    const nCurrent = this.electron.nProperty.value;

    if ( nCurrent === MOTHAConstants.GROUND_STATE ||
         this.electron.timeInStateProperty.value < BohrModel.MIN_TIME_IN_STATE_BEFORE_SPONTANEOUS_EMISSION ) {
      return null;
    }

    // Choose a new lower state. For some subclasses of BohrModel, there may be no valid transition.
    const nNew = this.chooseLower_n();
    if ( nNew === null ) {
      return null;
    }
    assert && assert( nNew < nCurrent, `nNew ${nNew} should be < nCurrent ${nCurrent}` );

    // Emit with some probability.
    if ( !this.spontaneousEmissionIsCertain() ) {
      return null;
    }

    // Emit a photon
    const emittedPhoton = new Photon( {
      wavelength: getEmissionWavelength( nCurrent, nNew ),
      position: this.getSpontaneousEmissionPosition(),
      direction: getSpontaneousEmissionDirection( nCurrent, this.electron.angleProperty.value ),
      wasEmitted: true,
      debugHaloColor: 'red'
    } );
    this.photonEmittedEmitter.emit( emittedPhoton );
    phet.log && phet.log( `BohrModel: spontaneous emission, ${MOTHASymbols.lambda}=${emittedPhoton.wavelength}, ${nCurrent} -> ${nNew}` );

    // Move the electron to the new lower state.
    this.electron.nProperty.value = nNew;

    return emittedPhoton;
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
   * @returns n, null if there is no lower state
   */
  protected chooseLower_n(): number | null {
    const n = this.electron.nProperty.value;
    if ( n === MOTHAConstants.GROUND_STATE ) {
      return null;
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

  /**
   * Gets the wavelength (in nm) that results in a transition between 2 values of n.
   */
  public static getTransitionWavelength( n1: number, n2: number ): number {
    assert && assert( n1 !== n2 );
    if ( n2 > n1 ) {
      return getAbsorptionWavelength( n1, n2 );
    }
    else {
      return getEmissionWavelength( n1, n2 );
    }
  }
}

assert && assert( BohrModel.ORBIT_RADII.length === MOTHAConstants.NUMBER_OF_STATES );

/**
 * Gets the wavelength that is absorbed when the electron to transition from state n1 to state n2, where n2 > n1.
 */
function getAbsorptionWavelength( n1: number, n2: number ): number {
  assert && assert( MOTHAConstants.GROUND_STATE === 1 );
  assert && assert( Number.isInteger( n1 ) && n1 >= MOTHAConstants.GROUND_STATE, `bad n1=${n1}` );
  assert && assert( Number.isInteger( n2 ) && n2 <= MOTHAConstants.MAX_STATE, `bad n2=${n2}` );
  assert && assert( n1 < n2, `bad n1=${n1} n2=${n2}` );

  // Rydberg formula, see doc/java-version/hydrogen-atom.pdf page 20.
  const wavelength = 1240 / ( 13.6 * ( ( 1 / ( n1 * n1 ) ) - ( 1 / ( n2 * n2 ) ) ) );

  // As a simplification to benefit PhET-iO, convert to an integer value.
  // See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/53.
  return Utils.toFixedNumber( wavelength, 0 );
}

/**
 * Gets the wavelength that is emitted when the electron transitions from n1 to n2, where n2 < n1.
 */
function getEmissionWavelength( n1: number, n2: number ): number {
  return getAbsorptionWavelength( n2, n1 );
}

/**
 * Gets the lower energy state for a current state and transition wavelength.
 * Return null if there is no such state.
 */
function getLowerStateForWavelength( nCurrent: number, wavelength: number ): number | null {
  let nNew: number | null = null;
  for ( let n = MOTHAConstants.GROUND_STATE; n < nCurrent && nNew === null; n++ ) {
    if ( wavelength === getAbsorptionWavelength( n, nCurrent ) ) {
      nNew = n;
    }
  }
  return nNew;
}

/**
 * Gets the higher energy state for a current state and transition wavelength.
 * Return null if there is no such state.
 */
function getHigherStateForWavelength( nCurrent: number, wavelength: number ): number | null {
  let nNew: number | null = null;
  for ( let n = nCurrent + 1; n <= MOTHAConstants.MAX_STATE && nNew === null; n++ ) {
    const transitionWavelength = getAbsorptionWavelength( nCurrent, n );
    if ( wavelength === transitionWavelength ) {
      nNew = n;
    }
  }
  return nNew;
}

type StateTransition = {
  n1: number;
  n2: number; // n2 > n1
};

/**
 * Creates a map from absorption/emission wavelengths to electron state transitions, ordered by ascending wavelength.
 */
function createWavelengthToStateTransitionMap(): Map<number, StateTransition> {
  const map = new Map<number, StateTransition>();
  for ( let n1 = MOTHAConstants.GROUND_STATE; n1 < MOTHAConstants.MAX_STATE; n1++ ) {
    for ( let n2 = MOTHAConstants.MAX_STATE; n2 > n1; n2-- ) {
      const wavelength = getAbsorptionWavelength( n1, n2 );
      const transition = { n1: n1, n2: n2 };
      map.set( wavelength, transition );
    }
  }
  return map;
}

/**
 * Gets the direction (in radians) for a photon that is emitted via spontaneous emission.
 */
function getSpontaneousEmissionDirection( n: number, electronAngle: number ): number {

  let direction;
  if ( n < 5 ) {

    // For lower states, choose a random angle.
    direction = MOTHAUtils.nextAngle();
  }
  else {

    // For higher states, we do not want the photon to leave the view too quickly. So send it in a direction that is
    // towards the nucleus, but not intersecting the nucleus.
    direction = MOTHAUtils.normalizeAngle( electronAngle + Math.PI + MOTHAUtils.nextSign() * 0.1 * Math.PI );
  }
  assert && assert( direction >= 0 && direction <= 2 * Math.PI, `unexpected direction: ${direction}` );

  // Adjust the direction so that it is noticeably different from the direction of the light source. This ensures
  // that emitted photons are easy to see, and will not be confused with photons from the light source.
  const threshold = Math.PI / 8; // How close we can be to the light's direction.
  if ( Math.abs( direction - Light.DIRECTION ) < threshold ) {
    direction = Light.DIRECTION + MOTHAUtils.nextSign() * threshold;
  }

  return direction;
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );