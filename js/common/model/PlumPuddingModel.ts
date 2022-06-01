// Copyright 2019-2022, University of Colorado Boulder

/**
 * PlumPudding is a predictive model that models the hydrogen atom as TODO
 *
 * Physical representation:
 * The proton is a blob of pudding (or "goo"), modeled as a circle. An electron oscillates inside the goo along a
 * straight line that passes through the center of the goo and has its end points on the circle.
 *
 * Collision behavior:
 * Photons collide with the electron when they are "close". Alpha particles collide with the goo and are deflected
 * using a Rutherford scattering algorithm.
 *
 * Absorption behavior:
 * The electron can absorb N photons. When any photon collides with the electron, it is absorbed with some probability,
 * and (if absorbed) causes the electron to start oscillating. Alpha particles are not absorbed.
 *
 * Emission behavior:
 * The electron can emit one UV photon for each photon absorbed. Photons are emitted at the electron's location.
 * No photons are emitted until the electron has completed one oscillation cycle, and after emitting its last photon,
 * the electron completes its current oscillation cycles, coming to rest at the atoms center. Alpha particles are not
 * emitted.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import plumPuddingButton_png from '../../../images/plumPuddingButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Electron from './Electron.js';
import Photon from './Photon.js';
import AlphaParticle from './AlphaParticle.js';
import RutherfordScattering from './RutherfordScattering.js';
import ZoomedInBox from './ZoomedInBox.js';

const MAX_PHOTONS_ABSORBED = 1; // maximum number of photons that can be absorbed. WARNING: Untested with values !== 1
const PHOTON_EMISSION_WAVELENGTH = 150; // wavelength (in nm) of emitted photons
const PHOTON_EMISSION_PROBABILITY = 0.1; // probability [0,1] that a photon will be emitted
const PHOTON_EMISSION_SPEED = 5; // initial speed of emitted photon
const PHOTON_ABSORPTION_PROBABILITY = 0.5; // probability [0,1] that a photon will be absorbed
const ELECTRON_LINE_SEGMENTS = 30; // number of discrete steps in the electron line

type SelfOptions = {};

type PlumPuddingModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

class PlumPuddingModel extends HydrogenAtom {

  public readonly radius = 50;

  // number of photons the atom has absorbed and is "holding"
  private readonly numberOfPhotonsAbsorbedProperty: Property<number>;

  public readonly electron: Electron;

  // offset of the electron relative to the atom's position
  private readonly electronOffsetProperty: Property<Vector2>;

  // the electron's position
  private readonly electronPositionProperty: IReadOnlyProperty<Vector2>;

  // Endpoints of the line on which the electron oscillates, relative to atom's center.
  // It would be preferable to use kite.Line, but there is no LineIO type for PhET-iO.
  private readonly electronLineEndpoint1Property: Property<Vector2>;
  private readonly electronLineEndpoint2Property: Property<Vector2>;

  // the electron's direction of motion, relative to the x (horizontal) axis: 1 is positive, -1 is negative
  private readonly electronDirectionProperty: Property<1 | -1>;

  // Is the electron moving?
  private readonly electronIsMovingProperty: Property<boolean>;

  // how many times the electron has crossed the atom's center since it started moving
  private readonly numberOfZeroCrossingsProperty: Property<number>;

  // the amplitude of the electron just before emitting its last photon
  private readonly previousAmplitudeProperty: Property<number>;

  constructor( zoomedInBox: ZoomedInBox, providedOptions: PlumPuddingModelOptions ) {

    const options = optionize<PlumPuddingModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      hasTransitionWavelengths: false
    }, providedOptions );

    super( modelsOfTheHydrogenAtomStrings.plumPudding, plumPuddingButton_png, zoomedInBox, options );

    this.numberOfPhotonsAbsorbedProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'numberOfPhotonsAbsorbedProperty' ),
      phetioReadOnly: true
    } );

    this.electron = new Electron();

    this.electronOffsetProperty = new Vector2Property( Vector2.ZERO, {
      tandem: options.tandem.createTandem( 'electronOffsetProperty' ),
      phetioReadOnly: true
    } );

    this.electronPositionProperty = new DerivedProperty( [ this.electronOffsetProperty ],
      electronOffset => this.position.plus( electronOffset ), {
        tandem: options.tandem.createTandem( 'electronPositionProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( Vector2.Vector2IO ),
        phetioReadOnly: true
      } );

    this.electronLineEndpoint1Property = new Vector2Property( Vector2.ZERO, {
      tandem: options.tandem.createTandem( 'electronLineEndpoint1Property' ),
      phetioReadOnly: true
    } );

    this.electronLineEndpoint2Property = new Vector2Property( Vector2.ZERO, {
      tandem: options.tandem.createTandem( 'electronLineEndpoint2Property' ),
      phetioReadOnly: true
    } );

    this.electronDirectionProperty = new Property( 1, {
      validValues: [ 1, -1 ],
      tandem: options.tandem.createTandem( 'electronDirectionProperty' ),
      phetioType: Property.PropertyIO( NumberIO ),
      phetioReadOnly: true
    } );

    this.electronIsMovingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'electronIsMovingProperty' ),
      phetioReadOnly: true
    } );

    this.numberOfZeroCrossingsProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'numberOfZeroCrossingsProperty' ),
      phetioReadOnly: true
    } );

    this.previousAmplitudeProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'previousAmplitudeProperty' ),
      phetioReadOnly: true
    } );

    this.updateElectronLine();
  }

  public override reset(): void {
    super.reset();
    this.numberOfPhotonsAbsorbedProperty.reset();
    this.electronOffsetProperty.reset();
    this.electronLineEndpoint1Property.reset();
    this.electronLineEndpoint2Property.reset();
    this.electronDirectionProperty.reset();
    this.electronIsMovingProperty.reset();
    this.numberOfZeroCrossingsProperty.reset();
    this.previousAmplitudeProperty.reset();
  }

  /**
   * Updates the line that determines the electron's oscillation path when the electron is moving at maximum amplitude.
   * The line is specified in coordinates relative to the atom (in the atom's local coordinate frame).
   */
  private updateElectronLine(): void {

    const angle = nextAngle();
    const x = Math.abs( this.radius * Math.sin( angle ) );
    const y = nextSign() * this.radius * Math.cos( angle );
    this.electronLineEndpoint1Property.value = new Vector2( -x, -y );
    this.electronLineEndpoint2Property.value = new Vector2( x, y );

    // required by moveElectron()
    assert && assert( this.electronLineEndpoint1Property.value.x < this.electronLineEndpoint2Property.value.x );

    this.electronDirectionProperty.value = nextSign();

    // move electron back to center
    this.electronOffsetProperty.value = new Vector2( 0, 0 );
  }

  /**
   * Changes the electron's direction.
   */
  private changeElectronDirection(): void {
    this.electronDirectionProperty.value *= -1;
  }

  /**
   * Gets the number of oscillations that the electron has completed since it started moving. This is a function of
   * the number of times the electron has crossed the center of the atom.
   */
  private getNumberOfElectronOscillations(): number {
    return ( this.numberOfZeroCrossingsProperty.value % 2 );
  }

  /**
   * Gets the electron's amplitude. This is ratio of the number of photons actually absorbed to the number of photons
   * the electron is capable of absorbing.
   */
  private getElectronAmplitude(): number {
    return ( this.numberOfPhotonsAbsorbedProperty.value / MAX_PHOTONS_ABSORBED );
  }

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
      const photonPosition = photon.positionProperty.value;
      const collisionCloseness = photon.radius + this.electron.radius;
      if ( this.pointsCollide( this.electronPositionProperty.value, photonPosition, collisionCloseness ) ) {
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

  /**
   * Emits a photon from the electron's location, at a random orientation.
   */
  private emitPhoton(): void {
    if ( this.numberOfPhotonsAbsorbedProperty.value > 0 ) {

      this.numberOfPhotonsAbsorbedProperty.value -= 1;

      // Create and emit a photon
      this.photonEmittedEmitter.emit( new Photon( {
        position: this.electronPositionProperty.value, // at the electron's position
        wavelength: PHOTON_EMISSION_WAVELENGTH,
        speed: PHOTON_EMISSION_SPEED,
        direction: nextAngle(),
        wasEmitted: true
      } ) );
    }
  }

  /**
   * Tries to absorb a photon. If it is not absorbed, the photon is moved.
   */
  public override movePhoton( photon: Photon, dt: number ): void {
    if ( !this.absorbPhoton( photon ) ) {
      super.movePhoton( photon, dt );
    }
  }

  /**
   * Moves an alpha particle using a Rutherford Scattering algorithm.
   *
   * WORKAROUND - If the particle is "close" to the atom's center, then it simply passes through at constant speed.
   * This is a workaround for a problem in Rutherford Scattering; particles get stuck at the center of the plum pudding
   * atom, or they seem to stick slightly and then accelerate off.  The value of "closeness" was set through trial and
   * error, to eliminate these problems while still making the motion look continuous. This workaround assumes that
   * alpha particles are moving vertically from bottom to top.
   */
  public override moveAlphaParticle( alphaParticle: AlphaParticle, dt: number ): void {
    const closeness = 10;
    if ( Math.abs( alphaParticle.positionProperty.value.x - this.position.x ) < closeness ) {
      super.moveAlphaParticle( alphaParticle, dt );
    }
    else {
      RutherfordScattering.moveParticle( this, alphaParticle, this.zoomedInBox, dt );
    }
  }

  /**
   * Moves the electron along its oscillation path with some amplitude.
   */
  private moveElectron( dt: number, amplitude: number ): void {

    const endpoint1 = this.electronLineEndpoint1Property.value;
    const endpoint2 = this.electronLineEndpoint2Property.value;

    // Assumptions about the electron's oscillation line
    assert && assert( endpoint1.x < endpoint2.x );
    assert && assert( Math.abs( endpoint1.x ) === Math.abs( endpoint2.x ) );
    assert && assert( Math.abs( endpoint1.y ) === Math.abs( endpoint2.y ) );

    // Remember the old offset
    const electronOffset = this.electronOffsetProperty.value;

    // Determine dx and dy
    const distanceDelta = dt * ( amplitude * ( 2 * this.radius ) / ELECTRON_LINE_SEGMENTS );
    let dx = Math.abs( endpoint1.x ) * ( distanceDelta / this.radius );
    let dy = Math.abs( endpoint1.y ) * ( distanceDelta / this.radius );

    // Adjust signs for electron's horizontal direction
    const sign = this.electronDirectionProperty.value;
    dx *= sign;
    dy *= sign;
    if ( endpoint1.y > endpoint2.y ) {
      dy *= -1;
    }

    // Electron's new offset
    let x = electronOffset.x + dx;
    let y = electronOffset.y + dy;

    // Is the new offset past the ends of the oscillation line?
    if ( Math.abs( x ) > Math.abs( endpoint1.x ) || Math.abs( y ) > Math.abs( endpoint1.y ) ) {
      if ( this.electronDirectionProperty.value === 1 ) {
        x = endpoint2.x;
        y = endpoint2.y;
      }
      else {
        x = endpoint1.x;
        y = endpoint1.y;
      }
      this.changeElectronDirection();
    }

    // Did we cross the origin?
    if ( ( x === 0 && y === 0 ) || signIsDifferent( x, electronOffset.x ) || signIsDifferent( y, electronOffset.y ) ) {
      this.numberOfZeroCrossingsProperty.value += 1;
    }

    this.electronOffsetProperty.value = new Vector2( x, y );
  }

  /**
   * Oscillates the electron inside the atom. Emits a photon at a random time.
   * After emitting its last photon, the electron completes its oscillation and returns to (0,0).
   */
  public override( dt: number ): void {

    if ( this.numberOfPhotonsAbsorbedProperty.value > 0 ) {

      this.electronIsMovingProperty.value = true;

      // Move the electron
      const amplitude = this.getElectronAmplitude();
      this.moveElectron( dt, amplitude );

      // Randomly emit a photon after completing an oscillation cycle
      if ( this.getNumberOfElectronOscillations() !== 0 ) {
        if ( dotRandom.nextDouble() < PHOTON_EMISSION_PROBABILITY ) {
          this.emitPhoton();
          if ( this.numberOfPhotonsAbsorbedProperty.value === 0 ) {
            // If we have not more photons, remember amplitude so we can complete oscillation.
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
        this.updateElectronLine();
        this.electronOffsetProperty.value = new Vector2( 0, 0 );
      }
    }
  }
}

/**
 * Gets the next random sign, +1 or -1.
 */
function nextSign(): 1 | -1 {
  return dotRandom.nextBoolean() ? 1 : -1;
}

/**
 * Gets the next random angle.
 */
function nextAngle() {
  return dotRandom.nextDoubleBetween( 0, 2 * Math.PI );
}

/**
 * Determines if the sign of two numbers is different.
 */
function signIsDifferent( n1: number, n2: number ): boolean {
  return Math.sign( n1 ) !== Math.sign( n2 );
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
export default PlumPuddingModel;