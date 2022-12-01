// Copyright 2019-2022, University of Colorado Boulder

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

import bohrButton_png from '../../../images/bohrButton_png.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import ZoomedInBox from './ZoomedInBox.js';
import Utils from '../../../../dot/js/Utils.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import MOTHAUtils from '../MOTHAUtils.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Electron from './Electron.js';
import Proton from './Proton.js';
import Photon from './Photon.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import MOTHAConstants from '../MOTHAConstants.js';

// Radius of each electron orbit, ordered by increasing electron state number.
// These values are distorted to fit in zoomedInBox, and are specific to MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE.
const ORBIT_RADII = [ 15, 44, 81, 124, 174, 233 ];

// Probability that a photon will be absorbed, [0,1]
const PHOTON_ABSORPTION_PROBABILITY = 1.0;

// Probability that a photon will cause stimulated emission, [0,1]
const PHOTON_STIMULATED_EMISSION_PROBABILITY = PHOTON_ABSORPTION_PROBABILITY;

// Probability that a photon will be emitted, [0,1]
const PHOTON_SPONTANEOUS_EMISSION_PROBABILITY = 0.5;

// Wavelengths must be less than this close to be considered equal
const WAVELENGTH_CLOSENESS_THRESHOLD = 0.5;

// How close an emitted photon is placed to the photon that causes stimulated emission
const STIMULATED_EMISSION_X_OFFSET = 10;

type SelfOptions = EmptySelfOptions;

export type BohrModelOptions = SelfOptions &
  PickOptional<HydrogenAtomOptions, 'displayNameProperty' | 'iconHTMLImageElement'> &
  PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BohrModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: Electron;

  // electron state number
  private readonly electronStateProperty: NumberProperty;

  // time that the electron has been in its current state
  private readonly timeInStateProperty: Property<number>;

  // current angle of electron
  public readonly electronAngleProperty: Property<number>;

  // offset of the electron from the atom's center
  protected readonly electronOffsetProperty: TReadOnlyProperty<Vector2>;

  // minimum time (in sec) that electron stays in a state before emission can occur
  public static readonly MIN_TIME_IN_STATE = 1;

  // Change in orbit angle per dt for ground state orbit
  public static readonly ELECTRON_ANGLE_DELTA = Utils.toRadians( 480 );

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.bohrStringProperty,
      iconHTMLImageElement: bohrButton_png,
      hasTransitionWavelengths: true
    }, providedOptions );

    super( zoomedInBox, options );

    this.proton = new Proton( {
      position: this.position,
      tandem: options.tandem.createTandem( 'proton' )
    } );

    this.electron = new Electron( {
      //TODO position is not properly initialized
      tandem: options.tandem.createTandem( 'electron' )
    } );

    this.electronStateProperty = new NumberProperty( MOTHAConstants.GROUND_STATE, {
      numberType: 'Integer',
      range: new Range( MOTHAConstants.GROUND_STATE, MOTHAConstants.GROUND_STATE + ORBIT_RADII.length ),
      tandem: options.tandem.createTandem( 'electronStateProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'primary electron state (n)'
    } );

    this.timeInStateProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'timeInStateProperty' ),
      phetioReadOnly: true
    } );

    // When the electron changes state, reset timeInStateProperty.
    //TODO this is an ordering problem for restoring PhET-iO state
    this.electronStateProperty.link( electronState => {
      this.timeInStateProperty.value = 0;
    } );

    //TODO we want this to start at a different angle each time reset, but that conflicts with PhET-iO
    this.electronAngleProperty = new NumberProperty( MOTHAUtils.nextAngle(), {
      tandem: options.tandem.createTandem( 'electronAngleProperty' ),
      phetioReadOnly: true
    } );

    //TODO make this go away, just set electron.positionProperty directly
    this.electronOffsetProperty = new DerivedProperty(
      [ this.electronStateProperty, this.electronAngleProperty ],
      ( state, angle ) => {
        const radius = this.getElectronOrbitRadius( state );
        return MOTHAUtils.polarToCartesian( radius, angle );
      }, {
        tandem: options.tandem.createTandem( 'electronOffsetProperty' ),
        phetioValueType: Vector2.Vector2IO
      } );

    this.electronOffsetProperty.link( electronOffset => {
      this.electron.positionProperty.value = this.position.plus( electronOffset );
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override reset(): void {
    this.proton.reset();
    this.electron.reset();
    this.electronStateProperty.reset();
    this.timeInStateProperty.reset();
    this.electronAngleProperty.reset();
    super.reset();
  }

  public override step( dt: number ): void {

    // Keep track of how long the electron has been in its current state.
    this.timeInStateProperty.value += dt;

    // Advance the electron along its orbit
    this.electronAngleProperty.value = this.calculateNewElectronAngle( dt );

    // Attempt to emit a photon
    this.attemptSpontaneousEmission();
  }

  //TODO normalize the return value to [0,2*Math.PI]
  /**
   * Calculates the new electron angle for some time step.
   * Subclasses may override this to produce different oscillation behavior.
   */
  protected calculateNewElectronAngle( dt: number ): number {
    const electronState = this.electronStateProperty.value;
    const deltaAngle = dt * ( BohrModel.ELECTRON_ANGLE_DELTA / ( electronState * electronState ) );
    return this.electronAngleProperty.value - deltaAngle; //TODO clockwise
  }

  public override movePhoton( photon: Photon, dt: number ): void {
    const absorbed = this.attemptAbsorption( photon );
    if ( !absorbed ) {
      this.attemptStimulatedEmission( photon );
      photon.move( dt );
    }
  }

  /**
   * Gets the number of electron states that the model supports.
   * This is the same as the number of orbits.
   */
  public static override getNumberOfStates(): number {
    return ORBIT_RADII.length;
  }

  /**
   * Gets the maximum electron state number.
   */
  public static getMaxElectronState(): number {
    return MOTHAConstants.GROUND_STATE + BohrModel.getNumberOfStates() - 1;
  }

  protected setElectronState( n: number ): void {
    assert && assert( Number.isInteger( n ) );
    assert && assert( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.GROUND_STATE + BohrModel.getNumberOfStates() - 1 );

    if ( n !== this.electronStateProperty.value ) {
      this.electronStateProperty.value = n;
      this.timeInStateProperty.value = 0;
    }
  }

  public getElectronState(): number {
    return this.electronStateProperty.value;
  }

  public getElectronStateProperty(): TReadOnlyProperty<number> {
    return this.electronStateProperty;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Orbit methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the radius of the electron's orbit when it's in a specified state.
   */
  public getElectronOrbitRadius( state: number ): number {
    return ORBIT_RADII[ state - MOTHAConstants.GROUND_STATE ];
  }

  /**
   * Gets the maximum radius of the electron's orbit.
   */
  public getMaxElectronOrbitRadius(): number {
    return ORBIT_RADII[ ORBIT_RADII.length - 1 ];
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Wavelength methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the wavelength that must be absorbed for the electron to transition from state oldState to state newState,
   * where oldState < newState. This algorithm assumes that the ground state is 1.
   */
  public static getWavelengthAbsorbed( oldState: number, newState: number ): number {
    assert && assert( Number.isInteger( oldState ) && Number.isInteger( newState ) );
    assert && assert( MOTHAConstants.GROUND_STATE === 1 );
    assert && assert( oldState >= MOTHAConstants.GROUND_STATE, `oldState=${oldState}` );
    assert && assert( oldState < newState, `oldState=${oldState} newState=${newState}` );
    assert && assert( newState <= MOTHAConstants.GROUND_STATE + BohrModel.getNumberOfStates(), `newState=${newState}` );
    return 1240.0 / ( 13.6 * ( ( 1.0 / ( oldState * oldState ) ) - ( 1.0 / ( newState * newState ) ) ) );
  }

  /**
   * Gets the wavelength that is emitted when the electron transitions from oldState to newState,
   * where newNew < oldState.
   */
  public static getWavelengthEmitted( oldState: number, newState: number ): number {
    return BohrModel.getWavelengthAbsorbed( newState, oldState );
  }

  /**
   * Gets the wavelength that causes a transition between 2 specified states.
   */
  public static getTransitionWavelength( oldState: number, newState: number ): number {
    assert && assert( oldState !== newState );
    if ( newState < oldState ) {
      return this.getWavelengthEmitted( oldState, newState );
    }
    else {
      return this.getWavelengthAbsorbed( oldState, newState );
    }
  }

  /**
   * Determines if two wavelengths are "close enough" for the purposes of absorption and emission.
   */
  private closeEnough( wavelength1: number, wavelength2: number ): boolean {
    return ( Math.abs( wavelength1 - wavelength2 ) < WAVELENGTH_CLOSENESS_THRESHOLD );
  }

  /**
   * Gets the set of wavelengths that cause a state transition. With white light, the light prefers to fire
   * these wavelengths so that the probability of seeing a photon absorbed is higher.
   */
  public static getTransitionWavelengths( minWavelength: number, maxWavelength: number ): number[] {
    assert && assert( minWavelength < maxWavelength );

    // Create the set of wavelengths, include only those between min and max.
    const wavelengths = [];
    const n = BohrModel.getNumberOfStates();
    const g = MOTHAConstants.GROUND_STATE;
    for ( let i = g; i < g + n - 1; i++ ) {
      for ( let j = i + 1; j < g + n; j++ ) {
        const wavelength = this.getWavelengthAbsorbed( i, j );
        if ( wavelength >= minWavelength && wavelength <= maxWavelength ) {
          wavelengths.push( wavelength );
        }
      }
    }
    return wavelengths;
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
    const collisionCloseness = photon.radius + this.electron.radius;
    return this.pointsCollide( electronPosition, photonPosition, collisionCloseness );
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Absorption
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to absorb a specified photon.
   */
  private attemptAbsorption( photon: Photon ): boolean {

    let success = false;
    const currentState = this.electronStateProperty.value;

    // Has the electron been in this state long enough? And was this photon produced by the light?
    if ( this.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE && !photon.wasEmitted ) {

      // Do the photon and electron collide?
      const collide = this.collides( photon );
      if ( collide ) {

        // Is the photon absorbable, does it have a transition wavelength?
        let canAbsorb = false;
        let newState = 0;
        const maxState = MOTHAConstants.GROUND_STATE + BohrModel.getNumberOfStates() - 1;
        for ( let n = currentState + 1; n <= maxState && !canAbsorb; n++ ) {
          const transitionWavelength = BohrModel.getWavelengthAbsorbed( currentState, n );
          if ( this.closeEnough( photon.wavelength, transitionWavelength ) ) {
            canAbsorb = true;
            newState = n;
          }
        }

        // Is the transition that would occur allowed?
        if ( !this.absorptionIsAllowed( currentState, newState ) ) {
          return false;
        }

        // Absorb the photon with some probability...
        if ( canAbsorb && this.absorptionIsCertain() ) {

          // absorb photon
          success = true;
          this.photonAbsorbedEmitter.emit( photon );

          // move electron to new state
          this.electronStateProperty.value = newState;
          this.timeInStateProperty.value = 0;
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
  private absorptionIsAllowed( oldState: number, newState: number ): boolean {
    return true;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Stimulated Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to stimulate emission with a specified photon.
   *
   * Definition of stimulated emission, for state m < n:
   * If an electron in state n gets hit by a photon whose absorption
   * would cause a transition from state m to n, then the electron
   * should drop to state m and emit a photon.  The emitted photon
   * should be the same wavelength and be traveling alongside the
   * original photon.
   */
  private attemptStimulatedEmission( photon: Photon ): boolean {

    let success = false;
    const currentState = this.electronStateProperty.value;

    // Are we in some state other than the ground state?
    // Has the electron been in this state long enough?
    // Was this photon produced by the light?
    if ( currentState > MOTHAConstants.GROUND_STATE &&
         this.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE &&
         !photon.wasEmitted ) {

      // Do the photon and electron collide?
      const collide = this.collides( photon );
      if ( collide ) {

        // Can this photon stimulate emission, does it have a transition wavelength?
        let canStimulateEmission = false;
        let newState = 0;
        for ( let state = MOTHAConstants.GROUND_STATE; state < currentState && !canStimulateEmission; state++ ) {
          const transitionWavelength = BohrModel.getWavelengthAbsorbed( state, currentState );
          if ( this.closeEnough( photon.wavelength, transitionWavelength ) ) {
            canStimulateEmission = true;
            newState = state;
          }
        }

        // Is the transition that would occur allowed?
        if ( !this.stimulatedEmissionIsAllowed( currentState, newState ) ) {
          return false;
        }

        // Emit a photon with some probability...
        if ( canStimulateEmission && this.stimulatedEmissionIsCertain() ) {

          // This algorithm assumes that photons are moving vertically from bottom to top.
          assert && assert( photon.directionProperty.value === Math.PI / 2 );

          // Create and emit a photon
          success = true;
          this.photonEmittedEmitter.emit( new Photon( {
            wavelength: photon.wavelength,
            position: photon.positionProperty.value.plusXY( STIMULATED_EMISSION_X_OFFSET, 0 ),
            direction: photon.directionProperty.value,
            wasEmitted: true,
            tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
          } ) );

          // move electron to new state
          this.electronStateProperty.value = newState;
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
   * A Bohr transition is legal if the 2 states are different and newState >= ground state.
   */
  protected stimulatedEmissionIsAllowed( oldState: number, newState: number ): boolean {
    return ( ( oldState !== newState ) && ( newState >= MOTHAConstants.GROUND_STATE ) );
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Spontaneous Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Attempts to emit a photon from the electron's location, in a random direction.
   */
  private attemptSpontaneousEmission(): boolean {

    let success = false;
    const currentState = this.electronStateProperty.value;

    // Are we in some state other than the ground state?
    // Has the electron been in this state long enough?
    if ( currentState > MOTHAConstants.GROUND_STATE &&
         this.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE ) {

      //  Emit a photon with some probability...
      if ( this.spontaneousEmissionIsCertain() ) {

        const newState = this.chooseLowerElectronState();
        if ( newState === -1 ) {
          // For some subclasses, there may be no valid transition.
          return false;
        }

        // Create and emit a photon
        success = true;
        this.photonEmittedEmitter.emit( new Photon( {
          wavelength: BohrModel.getWavelengthEmitted( currentState, newState ),
          position: this.getSpontaneousEmissionPosition(),
          direction: MOTHAUtils.nextAngle(), // in a random direction
          wasEmitted: true,
          tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
        } ) );

        // move electron to new state
        this.electronStateProperty.value = newState;
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
   * Chooses a new state for the electron. The state chosen is a lower state. This is used when moving to
   * a lower state, during spontaneous emission. Each lower state has the same probability of being chosen.
   * @returns positive state number, -1 if there is no lower state
   */
  protected chooseLowerElectronState(): number {
    const currentState = this.electronStateProperty.value;
    if ( currentState === MOTHAConstants.GROUND_STATE ) {
      return -1;
    }
    else {
      return dotRandom.nextIntBetween( MOTHAConstants.GROUND_STATE, currentState - MOTHAConstants.GROUND_STATE );
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

modelsOfTheHydrogenAtom.register( 'BohrModel', BohrModel );