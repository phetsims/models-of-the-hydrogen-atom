// Copyright 2019-2025, University of Colorado Boulder

/**
 * BohrModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Electron orbiting a proton. Each orbit corresponds to a different electron state.
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
 * to a wavelength that could have been absorbed in a lower state. In this case, the colliding photon is not absorbed,
 * but a new photon is emitted with the same wavelength, and the electron moves to the lower state. The new photon
 * moves alongside the original photon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';
import MOTHAUtils from '../MOTHAUtils.js';
import BohrElectron from './BohrElectron.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Photon from './Photon.js';
import Proton from './Proton.js';
import PhotonAbsorptionModel from './PhotonAbsorptionModel.js';
import MOTHAColors from '../MOTHAColors.js';
import QuantumElectron from './QuantumElectron.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import SchrodingerQuantumNumbers from './SchrodingerQuantumNumbers.js';
import BohrIcon from '../view/BohrIcon.js'; // eslint-disable-line phet/no-view-imported-from-model
import { toRadians } from '../../../../dot/js/util/toRadians.js';

// Probability that a photon will be absorbed, [0,1]
const PHOTON_ABSORPTION_PROBABILITY = 1;

// Probability that a photon will cause stimulated emission, [0,1]
const PHOTON_STIMULATED_EMISSION_PROBABILITY = PHOTON_ABSORPTION_PROBABILITY;

// Probability that a photon will be emitted, [0,1]
const PHOTON_SPONTANEOUS_EMISSION_PROBABILITY = 0.5;

// How close an emitted photon is placed to the photon that causes stimulated emission.
const STIMULATED_EMISSION_X_OFFSET = Photon.RADIUS;

// Minimum time (in sec) that the electron must be in a state before transitions can occur.
const MIN_TIME_IN_STATE_BEFORE_ABSORPTION = 0.75;
const MIN_TIME_IN_STATE_BEFORE_STIMULATED_EMISSION = 1;
const MIN_TIME_IN_STATE_BEFORE_SPONTANEOUS_EMISSION = 1;

// Radius of each electron orbit, ordered by increasing electron state number.
// These values are distorted to fit in zoomedInBox, and are specific to ZoomedInBox.SIDE_LENGTH.
const ORBIT_RADII = [ 15, 44, 81, 124, 174, 233 ];
assert && assert( ORBIT_RADII.length === QuantumElectron.NUMBER_OF_STATES, 'An orbit must exists for each electron state.' );

type SelfOptions = {

  // The atom's electron. For BohrModel, this is BohrElectron. But since BohrModel serves as a base class for other
  // quantum models, those other models may provide their own subclass of QuantumElectron.
  electron?: QuantumElectron;
};

export type BohrModelOptions = SelfOptions &
  PickOptional<HydrogenAtomOptions, 'displayNameProperty' | 'debugName' | 'icon' | 'tandemNamePrefix'> &
  PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BohrModel extends HydrogenAtom {

  // The atom's proton.
  public readonly proton: Proton;

  // The atom's electron.
  public readonly electron: QuantumElectron;

  // Change in orbit angle per dt for ground state orbit.
  protected static readonly ELECTRON_ANGLE_DELTA = toRadians( 480 );

  public constructor( position: Vector2, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, StrictOmit<SelfOptions, 'electron'>, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      isQuantum: true,
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.bohrStringProperty,
      debugName: 'Bohr',
      icon: new BohrIcon(),
      tandemNamePrefix: 'bohr'
    }, providedOptions );

    super( position, options );

    this.proton = new Proton( {
      position: this.position
    } );

    this.electron = options.electron || new BohrElectron( position, options.tandem.createTandem( 'electron' ) );
  }

  /**
   * Override resetProtected instead of reset, see HydrogenAtom reset.
   */
  protected override resetProtected(): void {
    this.electron.reset();
    super.resetProtected();
  }

  /**
   * Steps the atomic model.
   * @param dt - time step, in seconds
   */
  public override step( dt: number ): void {

    // Keep track of how long the electron has been in its current state.
    this.electron.timeInStateProperty.value += dt;

    // Advance the electron along its orbit.
    this.electron.angleProperty.value = this.calculateNewElectronDirection( dt );

    // Attempt to emit a photon.
    if ( this.electron.timeInStateProperty.value >= MIN_TIME_IN_STATE_BEFORE_ABSORPTION ) {
      this.attemptSpontaneousEmission();
    }
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
   * Processes a photon.
   */
  public override processPhoton( photon: Photon ): void {
    if ( this.collides( photon ) ) {
      if ( !this.absorbPhoton( photon ) ) {
        this.attemptStimulatedEmission( photon );
      }
    }
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Orbit methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the radius of the electron's orbit.
   * @param n - the principal quantum number that describes the electron's state
   */
  public static getElectronOrbitRadius( n: number ): number {
    return ORBIT_RADII[ n - QuantumElectron.GROUND_STATE ];
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Collision detection
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Determines whether a photon collides with this atom's electron.
   */
  protected collides( photon: Photon ): boolean {
    return photon.collidesWith( this.electron );
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

    if ( photon.wasEmittedByAtom ||
         nCurrent === QuantumElectron.MAX_STATE ||
         this.electron.timeInStateProperty.value < MIN_TIME_IN_STATE_BEFORE_ABSORPTION ) {
      return false;
    }

    // Determine if the photon has a wavelength that would excite the electron to a higher energy state.
    const nNew = PhotonAbsorptionModel.instance.getHigherStateForWavelength( nCurrent, photon.wavelength );
    if ( nNew === null ) {
      return false;
    }
    assert && assert( nNew > nCurrent, `nNew ${nNew} should be > nCurrent ${nCurrent}` );

    // Absorb with some probability.
    if ( !this.absorptionIsCertain() ) {
      return false;
    }

    // Absorb the photon.
    phet.log && phet.log( `${this.debugName}: absorbing ${MOTHASymbols.lambda}=${photon.wavelength}, n = ${nCurrent} -> ${nNew}` );
    this.photonAbsorbedEmitter.emit( photon );

    // Move the electron to the new higher state.
    this.electron.set_n( nNew );

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
   * to state nNew and emit a photon. The emitted photon will have the same wavelength and be traveling alongside
   * the original photon. See https://en.wikipedia.org/wiki/Stimulated_emission
   */
  private attemptStimulatedEmission( photon: Photon ): void {

    const nCurrent = this.electron.nProperty.value;

    if ( photon.wasEmittedByAtom ||
         this.electron.timeInStateProperty.value < MIN_TIME_IN_STATE_BEFORE_STIMULATED_EMISSION ||
         nCurrent === QuantumElectron.GROUND_STATE ) {
      return;
    }

    // Determine if the photon has a wavelength that would move the electron to a lower energy state.
    const nNew = PhotonAbsorptionModel.instance.getLowerStateForWavelength( nCurrent, photon.wavelength );
    if ( nNew === null || !this.stimulatedEmissionIsAllowed( nCurrent, nNew ) ) {
      return;
    }
    assert && assert( nNew < nCurrent, `nNew ${nNew} should be < nCurrent ${nCurrent}` );

    // Emit with some probability.
    if ( !this.stimulatedEmissionIsCertain() ) {
      return;
    }

    // Emit a photon.
    phet.log && phet.log( `${this.debugName}: stimulated emission of ${MOTHASymbols.lambda}=${photon.wavelength}, n = ${nCurrent} -> ${nNew}` );
    this.photonEmittedEmitter.emit(
      photon.wavelength,
      photon.positionProperty.value.plusXY( STIMULATED_EMISSION_X_OFFSET, 0 ),
      photon.direction,
      MOTHAColors.STIMULATED_EMISSION_HALO_COLOR
    );

    // Move the electron to the new lower state.
    this.electron.set_n( nNew );
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
    assert && assert( SchrodingerQuantumNumbers.isValid_n( nOld ), `invalid nOld: ${nOld}` );
    assert && assert( SchrodingerQuantumNumbers.isValid_n( nNew ), `invalid nNew: ${nNew}` );
    return nOld > nNew;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Spontaneous Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Spontaneous emission transitions from an excited energy state to a lower energy state, and emits a photon.
   * See https://en.wikipedia.org/wiki/Spontaneous_emission
   */
  private attemptSpontaneousEmission(): void {

    const nCurrent = this.electron.nProperty.value;

    if ( nCurrent === QuantumElectron.GROUND_STATE ||
         this.electron.timeInStateProperty.value < MIN_TIME_IN_STATE_BEFORE_SPONTANEOUS_EMISSION ) {
      return;
    }

    // Choose a new lower state. For some subclasses of BohrModel, there may be no valid transition.
    const nNew = this.chooseLower_n();
    if ( nNew === null ) {
      return;
    }
    assert && assert( nNew < nCurrent, `nNew ${nNew} should be < nCurrent ${nCurrent}` );

    // Emit with some probability.
    if ( !this.spontaneousEmissionIsCertain() ) {
      return;
    }

    // Emit a photon
    const wavelength = PhotonAbsorptionModel.instance.getEmissionWavelength( nCurrent, nNew );
    const position = this.getSpontaneousEmissionPosition();
    const direction = getSpontaneousEmissionDirection( nCurrent, this.electron.angleProperty.value );
    phet.log && phet.log( `${this.debugName}: spontaneous emission of ${MOTHASymbols.lambda}=${wavelength}, n = ${nCurrent} -> ${nNew}` );
    this.photonEmittedEmitter.emit( wavelength, position, direction, MOTHAColors.SPONTANEOUS_EMISSION_HALO_COLOR );

    // Move the electron to the new lower state.
    this.electron.set_n( nNew );
  }

  /**
   * Probabilistically determines whether the atom will spontaneously emit a photon.
   */
  private spontaneousEmissionIsCertain(): boolean {
    return dotRandom.nextDouble() < PHOTON_SPONTANEOUS_EMISSION_PROBABILITY;
  }

  /**
   * Chooses a lower value for n, a lower energy state for the electron. This is used during spontaneous emission.
   * Each lower state has the same probability of being chosen.
   * @returns n, null if there is no lower state
   */
  protected chooseLower_n(): number | null {
    const n = this.electron.nProperty.value;
    return ( n === QuantumElectron.GROUND_STATE ) ? null : dotRandom.nextIntBetween( QuantumElectron.GROUND_STATE, n - 1 );
  }

  /**
   * Gets the position of a photon created via spontaneous emission.
   * The default behavior is to create the photon at the electron's position.
   */
  protected getSpontaneousEmissionPosition(): Vector2 {
    return this.electron.positionProperty.value;
  }
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
  assert && assert( direction >= 0 && direction <= 2 * Math.PI, `invalid direction: ${direction}` );

  // Adjust the direction so that it is noticeably different from the direction of the light source.
  return HydrogenAtom.adjustEmissionDirection( direction );
}

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );