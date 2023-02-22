// Copyright 2019-2023, University of Colorado Boulder

/**
 * PlumPudding is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * The proton is a blob of pudding (or "goo"), modeled as a circle. An electron oscillates inside the goo along a
 * straight line that passes through the center of the goo and has its end points on the circle.
 *
 * Collision behavior:
 * Photons collide with the electron when they are "close".
 *
 * Absorption behavior:
 * The electron can absorb N photons. When any photon collides with the electron, it is absorbed with some probability,
 * and (if absorbed) causes the electron to start oscillating.
 *
 * Emission behavior:
 * The electron can emit one UV photon for each photon absorbed. Photons are emitted at the electron's location.
 * No photons are emitted until the electron has completed one oscillation cycle, and after emitting its last photon,
 * the electron completes its current oscillation cycles, coming to rest at the atom's center.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import plumPuddingButton_png from '../../../images/plumPuddingButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Electron from './Electron.js';
import Photon from './Photon.js';
import ZoomedInBox from './ZoomedInBox.js';
import MOTHAUtils from '../MOTHAUtils.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import MOTHAConstants from '../MOTHAConstants.js';

const MAX_PHOTONS_ABSORBED = 1; // maximum number of photons that can be absorbed. WARNING: Untested with values !== 1
const PHOTON_EMISSION_WAVELENGTH = 150; // wavelength (in nm) of emitted photons
const PHOTON_EMISSION_PROBABILITY = 0.1; // probability [0,1] that a photon will be emitted
const PHOTON_ABSORPTION_PROBABILITY = 0.5; // probability [0,1] that a photon will be absorbed

type SelfOptions = EmptySelfOptions;

type PlumPuddingModelOptions = SelfOptions &
  StrictOmit<HydrogenAtomOptions, 'displayNameProperty' | 'iconHTMLImageElement' | 'hasTransitionWavelengths'>;

export default class PlumPuddingModel extends HydrogenAtom {

  public readonly radius = MOTHAConstants.PLUM_PUDDING_RADIUS;

  public readonly electron: Electron;

  // the line on which the electron oscillates, in coordinates relative to the atom's position
  private readonly electronLineProperty: Property<ElectronLine>;

  // offset of the electron relative to the atom's position
  private readonly electronOffsetProperty: Property<Vector2>;

  // the electron's direction of motion, relative to the (horizontal) x-axis
  private readonly electronDirectionPositiveProperty: Property<boolean>;

  // Is the electron moving?
  private readonly electronIsMovingProperty: Property<boolean>;

  // how many times the electron has crossed the atom's center since it started moving
  private readonly numberOfZeroCrossingsProperty: Property<number>;

  // the amplitude of the electron just before emitting its last photon
  private readonly previousAmplitudeProperty: Property<number>;

  // the number of photons the atom has absorbed and is "holding"
  private readonly numberOfPhotonsAbsorbedProperty: Property<number>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: PlumPuddingModelOptions ) {

    const options = optionize<PlumPuddingModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.plumPuddingStringProperty,
      iconHTMLImageElement: plumPuddingButton_png,
      hasTransitionWavelengths: false
    }, providedOptions );

    super( zoomedInBox, options );

    this.electron = new Electron( {
      //TODO position is not properly initialized
      tandem: options.tandem.createTandem( 'electron' )
    } );

    //TODO make this go away, just set electron.positionProperty directly
    this.electronOffsetProperty = new Vector2Property( Vector2.ZERO, {
      tandem: options.tandem.createTandem( 'electronOffsetProperty' ),
      phetioReadOnly: true
    } );

    this.electronOffsetProperty.link( electronOffset => {
      this.electron.positionProperty.value = this.position.plus( electronOffset );
    } );

    this.electronLineProperty = new Property<ElectronLine>( nextElectronLine( this.radius ), {
      //TODO tandem
      //TODO phetioType: ElectronLineIO
      //TODO phetioReadOnly: true
    } );

    //TODO this.electron.directionProperty is unused
    this.electronDirectionPositiveProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'electronDirectionPositiveProperty' ),
      phetioReadOnly: true
    } );

    //TODO this.electron.speedProperty is unused
    this.electronIsMovingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'electronIsMovingProperty' ),
      phetioReadOnly: true
    } );

    this.numberOfZeroCrossingsProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'numberOfZeroCrossingsProperty' ),
      phetioReadOnly: true
    } );

    //TODO should this affect this.electron.speedProperty?
    this.previousAmplitudeProperty = new NumberProperty( 0, {
      range: new Range( 0, 1 ),
      tandem: options.tandem.createTandem( 'previousAmplitudeProperty' ),
      phetioReadOnly: true
    } );

    this.numberOfPhotonsAbsorbedProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'numberOfPhotonsAbsorbedProperty' ),
      phetioReadOnly: true
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override reset(): void {
    this.electron.reset();
    this.electronLineProperty.reset();
    this.electronOffsetProperty.reset();
    this.electronDirectionPositiveProperty.reset();
    this.electronIsMovingProperty.reset();
    this.numberOfZeroCrossingsProperty.reset();
    this.previousAmplitudeProperty.reset();
    this.numberOfPhotonsAbsorbedProperty.reset();
    super.reset();
  }

  /**
   * Oscillates the electron inside the atom. Emits a photon at a random time.
   * After emitting its last photon, the electron completes its oscillation and returns to (0,0).
   */
  public override step( dt: number ): void {

    if ( this.numberOfPhotonsAbsorbedProperty.value > 0 ) {

      this.electronIsMovingProperty.value = true;

      // Move the electron
      const amplitude = this.getElectronAmplitude();
      this.moveElectron( dt, amplitude );

      // Randomly emit a photon after completing an oscillation cycle
      if ( this.getNumberOfElectronOscillations() !== 0 ) {
        if ( dotRandom.nextDouble() < PHOTON_EMISSION_PROBABILITY ) {
          this.emitPhoton();

          // If we have not more photons, remember amplitude, so we can complete oscillation.
          if ( this.numberOfPhotonsAbsorbedProperty.value === 0 ) {
            this.previousAmplitudeProperty.value = amplitude;
          }
        }
      }
    }
    else if ( this.electronIsMovingProperty.value && this.numberOfPhotonsAbsorbedProperty.value === 0 ) {

      // Before moving the electron
      const before = this.getNumberOfElectronOscillations();

      // After moving the electron
      this.moveElectron( dt, this.previousAmplitudeProperty.value );
      const after = this.getNumberOfElectronOscillations();

      // Stop the electron when it completes its current oscillation
      if ( before !== after ) {
        this.electronIsMovingProperty.value = false;
        this.numberOfZeroCrossingsProperty.value = 0;
        this.previousAmplitudeProperty.value = 0;
        this.electronLineProperty.value = nextElectronLine( this.radius );
        this.electronOffsetProperty.value = Vector2.ZERO;
        this.electronDirectionPositiveProperty.value = dotRandom.nextBoolean();
      }
    }
  }

  /**
   * Moves the electron along its oscillation path with some amplitude.
   */
  private moveElectron( dt: number, amplitude: number ): void {

    const electronLine = this.electronLineProperty.value;

    // Assumptions about the electron's oscillation line
    assert && assert( electronLine.x1 < electronLine.x2 );
    assert && assert( Math.abs( electronLine.x1 ) === Math.abs( electronLine.x2 ) );
    assert && assert( Math.abs( electronLine.y1 ) === Math.abs( electronLine.y2 ) );

    // Remember the old offset
    const x0 = this.electronOffsetProperty.value.x;
    const y0 = this.electronOffsetProperty.value.y;

    // Determine dx and dy
    //TODO include electron speed?
    //TODO should electron move faster, to match the Java version?
    const distanceDelta = dt * amplitude * ( 2 * this.radius );
    let dx = Math.abs( electronLine.x1 ) * ( distanceDelta / this.radius );
    let dy = Math.abs( electronLine.y1 ) * ( distanceDelta / this.radius );

    // Adjust signs for electron's horizontal direction
    const sign = ( this.electronDirectionPositiveProperty.value ? 1 : -1 );
    dx *= sign;
    dy *= sign; //TODO why are we adjusting dy?
    if ( electronLine.y1 > electronLine.y2 ) {
      dy *= -1;
    }

    // Electron's new offset
    let x = x0 + dx;
    let y = y0 + dy;

    // If the new offset is past the end of the oscillation line, limit the electron position and change direction.
    if ( Math.abs( x ) > Math.abs( electronLine.x1 ) || Math.abs( y ) > Math.abs( electronLine.y1 ) ) {
      if ( this.electronDirectionPositiveProperty.value ) {
        x = electronLine.x2;
        y = electronLine.y2;
      }
      else {
        x = electronLine.x1;
        y = electronLine.y1;
      }

      // Change direction
      this.electronDirectionPositiveProperty.value = !this.electronDirectionPositiveProperty.value;
    }

    // Did we cross the origin?
    //TODO why is ( x === 0 && y === 0 ) considered a zero crossing?
    if ( ( x === 0 && y === 0 ) || signIsDifferent( x, x0 ) || signIsDifferent( y, y0 ) ) {
      this.numberOfZeroCrossingsProperty.value += 1;
    }

    this.electronOffsetProperty.value = new Vector2( x, y );
  }

  //TODO Decouple interacting with photon from moving it.
  /**
   * Tries to absorb a photon. If it is not absorbed, the photon is moved.
   */
  public override movePhoton( photon: Photon, dt: number ): void {
    if ( !this.absorbPhoton( photon ) ) {
      photon.move( dt );
    }
  }

  /**
   * Gets the electron's amplitude. This is ratio of the number of photons actually absorbed to the number of photons
   * the electron is capable of absorbing.
   */
  private getElectronAmplitude(): number {
    return ( this.numberOfPhotonsAbsorbedProperty.value / MAX_PHOTONS_ABSORBED );
  }

  /**
   * Gets the number of oscillations that the electron has completed since it started moving. This is a function of
   * the number of times the electron has crossed the center of the atom.
   */
  private getNumberOfElectronOscillations(): number {
    return ( this.numberOfZeroCrossingsProperty.value % 2 );
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Absorption
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Cannot absorb a photon if any of these are true:
   * - the photon was emitted by the atom
   * - we've already absorbed the max
   * - we've emitted out last photon and haven't completed oscillation.
   */
  private canAbsorb( photon: Photon ): boolean {
    return !( photon.wasEmitted ||
              this.numberOfPhotonsAbsorbedProperty.value === MAX_PHOTONS_ABSORBED ||
              ( this.numberOfPhotonsAbsorbedProperty.value === 0 && this.electronIsMovingProperty.value ) );
  }

  /**
   * Attempts to absorb the specified photon.
   * @param photon
   * @returns true if the photon was absorbed, false if it was not absorbed
   */
  private absorbPhoton( photon: Photon ): boolean {
    let absorbed = false;
    if ( this.canAbsorb( photon ) ) {

      const electronPosition = this.electron.positionProperty.value;
      const photonPosition = photon.positionProperty.value;
      const collisionCloseness = photon.radius + this.electron.radius;

      if ( this.pointsCollide( electronPosition, photonPosition, collisionCloseness ) ) {
        if ( dotRandom.nextDouble() < PHOTON_ABSORPTION_PROBABILITY ) {
          this.numberOfPhotonsAbsorbedProperty.value += 1;
          assert && assert( this.numberOfPhotonsAbsorbedProperty.value <= MAX_PHOTONS_ABSORBED );
          this.photonAbsorbedEmitter.emit( photon );
          absorbed = true;
        }
      }
    }
    return absorbed;
  }

  //--------------------------------------------------------------------------------------------------------------------
  // Photon Emission
  //--------------------------------------------------------------------------------------------------------------------

  /**
   * Emits a photon from the electron's location, at a random orientation.
   */
  private emitPhoton(): void {
    if ( this.numberOfPhotonsAbsorbedProperty.value > 0 ) {

      this.numberOfPhotonsAbsorbedProperty.value -= 1;

      // Create and emit a photon
      this.photonEmittedEmitter.emit( new Photon( {
        wavelength: PHOTON_EMISSION_WAVELENGTH,
        position: this.electron.positionProperty.value, // at the electron's position
        direction: MOTHAUtils.nextAngle(), // in a random direction
        wasEmitted: true,
        tandem: Tandem.OPT_OUT //TODO create via PhetioGroup
      } ) );
    }
  }
}

// Defines the straight-line path that the electron follows.
class ElectronLine {

  public readonly x1: number;
  public readonly y1: number;
  public readonly x2: number;
  public readonly y2: number;

  public constructor( x1: number, y1: number, x2: number, y2: number ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

/**
 * Gets the next random line that describes the electron's oscillation path.
 * The line is specified in coordinates relative to the atom (in the atom's local coordinate frame).
 */
function nextElectronLine( radius: number ): ElectronLine {
  const angle = MOTHAUtils.nextAngle();
  const x = Math.abs( radius * Math.sin( angle ) );
  const y = MOTHAUtils.nextSign() * radius * Math.cos( angle );
  return new ElectronLine( -x, -y, x, y );
}

/**
 * Determines if the sign of two numbers is different. False if either value is zero.
 */
function signIsDifferent( n1: number, n2: number ): boolean {
  return ( ( n1 > 0 && n2 < 0 ) || ( n1 < 0 && n2 > 0 ) );
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );