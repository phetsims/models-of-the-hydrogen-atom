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
import BohrNode from '../view/BohrNode.js'; // eslint-disable-line no-view-imported-from-model
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
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import MOTHASymbols from '../MOTHASymbols.js';

// Radius of each electron orbit, ordered by increasing electron state number.
// These values are distorted to fit in zoomedInBox, and are specific to MOTHAConstants.ZOOMED_IN_BOX_MODEL_SIZE.
const ORBIT_RADII = [ 15, 44, 81, 124, 174, 233 ];
assert && assert( ORBIT_RADII.length === MOTHAConstants.NUMBER_OF_STATES );

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
  PickOptional<HydrogenAtomOptions, 'displayNameProperty' | 'icon'> &
  PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class BohrModel extends HydrogenAtom {

  public readonly proton: Proton;
  public readonly electron: Electron;

  // electron state number (n)
  private readonly _electronStateProperty: NumberProperty;
  public readonly electronStateProperty: TReadOnlyProperty<number>;

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

  // A map from absorption/emission wavelengths to state transitions.
  public static readonly wavelengthToStateTransitionMap = createWavelengthToStateTransitionMap();

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: BohrModelOptions ) {

    const options = optionize<BohrModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.bohrStringProperty,
      icon: BohrNode.createIcon()
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

    this._electronStateProperty = new NumberProperty( MOTHAConstants.GROUND_STATE, {
      numberType: 'Integer',
      range: new Range( MOTHAConstants.GROUND_STATE, MOTHAConstants.GROUND_STATE + ORBIT_RADII.length ),
      tandem: options.tandem.createTandem( 'electronStateProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'primary electron state (n)'
    } );
    this.electronStateProperty = this._electronStateProperty;

    this.timeInStateProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'timeInStateProperty' ),
      phetioReadOnly: true
    } );

    // When the electron changes state, reset timeInStateProperty.
    this.electronStateProperty.link( electronState => {
      if ( !isSettingPhetioStateProperty.value ) {
        this.timeInStateProperty.value = 0;
      }
    } );

    //TODO we want this to start at a different angle each time reset, but that conflicts with PhET-iO
    this.electronAngleProperty = new NumberProperty( MOTHAUtils.nextAngle(), {
      tandem: options.tandem.createTandem( 'electronAngleProperty' ),
      phetioReadOnly: true
    } );

    //TODO make this go away, just set electron.positionProperty directly
    this.electronOffsetProperty = new DerivedProperty(
      [ this.electronStateProperty, this.electronAngleProperty ],
      ( electronState, angle ) => {
        const radius = this.getElectronOrbitRadius( electronState );
        return MOTHAUtils.polarToCartesian( radius, angle );
      }, {
        tandem: options.tandem.createTandem( 'electronOffsetProperty' ),
        phetioValueType: Vector2.Vector2IO
      } );

    this.electronOffsetProperty.link( electronOffset => {
      this.electron.positionProperty.value = this.position.plus( electronOffset );
    } );
  }

  public override reset(): void {
    this.proton.reset();
    this.electron.reset();
    this._electronStateProperty.reset();
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
   * Sets the electron's primary state (n). Use this method exclusively to n.
   * Subclasses with more complicated electron state, like Schrodinger's (n,l,m), should override this method.
   */
  protected setElectronState( n: number ): void {
    this._electronStateProperty.value = n;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Orbit methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the radius of the electron's orbit when it's in a specified state.
   */
  public getElectronOrbitRadius( n: number ): number {
    return ORBIT_RADII[ n - MOTHAConstants.GROUND_STATE ];
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Wavelength methods
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Gets the wavelength that is absorbed when the electron transitions from n1 to n2, where n2 > n1.
   */
  public static getAbsorptionWavelength( n1: number, n2: number ): number {
    return getAbsorptionWavelength( n1, n2 );
  }

  /**
   * Gets the wavelength that is emitted when the electron transitions from n2 to n1, where n1 < n2.
   */
  public static getEmissionWavelength( n2: number, n1: number ): number {
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
    return wavelengths;
  }

  /**
   * Determines if two wavelengths are "close enough" for the purposes of absorption and emission.
   */
  private closeEnough( wavelength1: number, wavelength2: number ): boolean {
    return ( Math.abs( wavelength1 - wavelength2 ) < WAVELENGTH_CLOSENESS_THRESHOLD );
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
        for ( let n = currentState + 1; n <= MOTHAConstants.MAX_STATE && !canAbsorb; n++ ) {
          const transitionWavelength = BohrModel.getAbsorptionWavelength( currentState, n );
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
          phet.log && phet.log( `Bohr: absorbed ${MOTHASymbols.lambda}=${photon.wavelength}` );
          this.photonAbsorbedEmitter.emit( photon );

          // move electron to new state
          this.setElectronState( newState );
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
    const currentElectronState = this.electronStateProperty.value;

    // Are we in some state other than the ground state?
    // Has the electron been in this state long enough?
    // Was this photon produced by the light?
    if ( currentElectronState > MOTHAConstants.GROUND_STATE &&
         this.timeInStateProperty.value >= BohrModel.MIN_TIME_IN_STATE &&
         !photon.wasEmitted ) {

      // Do the photon and electron collide?
      const collide = this.collides( photon );
      if ( collide ) {

        // Can this photon stimulate emission, does it have a transition wavelength?
        let canStimulateEmission = false;
        let newElectronState = 0;
        for ( let electronState = MOTHAConstants.GROUND_STATE; electronState < currentElectronState && !canStimulateEmission; electronState++ ) {
          const transitionWavelength = BohrModel.getAbsorptionWavelength( electronState, currentElectronState );
          if ( this.closeEnough( photon.wavelength, transitionWavelength ) ) {
            canStimulateEmission = true;
            newElectronState = electronState;
          }
        }

        // Is the transition that would occur allowed?
        if ( !this.stimulatedEmissionIsAllowed( currentElectronState, newElectronState ) ) {
          return false;
        }

        // Emit a photon with some probability...
        if ( canStimulateEmission && this.stimulatedEmissionIsCertain() ) {

          // This algorithm assumes that photons are moving vertically from bottom to top.
          assert && assert( photon.directionProperty.value === Math.PI / 2 );

          // Create and emit a photon
          success = true;
          const emittedPhoton = new Photon( {
            wavelength: photon.wavelength,
            position: photon.positionProperty.value.plusXY( STIMULATED_EMISSION_X_OFFSET, 0 ),
            direction: photon.directionProperty.value,
            wasEmitted: true,
            tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
          } );
          phet.log && phet.log( `Bohr: stimulated emission of ${MOTHASymbols.lambda}=${emittedPhoton.wavelength}` );
          this.photonEmittedEmitter.emit( emittedPhoton );

          // move electron to new state
          this.setElectronState( newElectronState );
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
   * A Bohr transition is legal if the 2 states are different and newElectronState >= ground state.
   */
  protected stimulatedEmissionIsAllowed( oldElectronState: number, newElectronState: number ): boolean {
    return ( ( oldElectronState !== newElectronState ) && ( newElectronState >= MOTHAConstants.GROUND_STATE ) );
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
        const emittedPhoton = new Photon( {
          wavelength: BohrModel.getEmissionWavelength( currentState, newState ),
          position: this.getSpontaneousEmissionPosition(),
          direction: MOTHAUtils.nextAngle(), // in a random direction
          wasEmitted: true,
          tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
        } );
        phet.log && phet.log( `Bohr: spontaneous emission of ${MOTHASymbols.lambda}=${emittedPhoton.wavelength}` );
        this.photonEmittedEmitter.emit( emittedPhoton );

        // move electron to new state
        this.setElectronState( newState );
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
  return 1240 / ( 13.6 * ( ( 1 / ( n1 * n1 ) ) - ( 1 / ( n2 * n2 ) ) ) );
}

/**
 * Creates a map from absorption/emission wavelengths to electron state transitions, ordered by ascending wavelength.
 */
type StateTransition = {
  n1: number;
  n2: number; // n2 > n1
};

//TODO We are populating this map with (and displaying) integer absorption/emission wavelengths.
//TODO But getAbsorptionWavelength uses the Rydberg formula, which produces non-integer values.
//TODO Should we use integers, or should we use Rydberg values? This is relevant for PhET-iO.
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