// Copyright 2019-2022, University of Colorado Boulder

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
 * the electron completes its current oscillation cycles, coming to rest at the atoms center.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2Property from '../../../../dot/js/Vector2Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import plumPuddingButton_png from '../../../images/plumPuddingButton_png.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Electron from './Electron.js';
import Photon from './Photon.js';
import ZoomedInBox from './ZoomedInBox.js';
import MOTHAUtils from '../MOTHAUtils.js';

const MAX_PHOTONS_ABSORBED = 1; // maximum number of photons that can be absorbed. WARNING: Untested with values !== 1
const PHOTON_EMISSION_WAVELENGTH = 150; // wavelength (in nm) of emitted photons
const PHOTON_EMISSION_PROBABILITY = 0.1; // probability [0,1] that a photon will be emitted
const PHOTON_ABSORPTION_PROBABILITY = 0.5; // probability [0,1] that a photon will be absorbed
const ELECTRON_LINE_SEGMENTS = 30; // number of discrete steps in the electron line

type SelfOptions = {};

type PlumPuddingModelOptions = SelfOptions & StrictOmit<HydrogenAtomOptions, 'hasTransitionWavelengths'>;

class PlumPuddingModel extends HydrogenAtom {

  public readonly radius = 50;

  // number of photons the atom has absorbed and is "holding"
  private readonly numberOfPhotonsAbsorbedProperty: Property<number>;

  public readonly electron: Electron;

  // Endpoints of the line on which the electron oscillates, relative to atom's position.
  // It would be preferable to use kite.Line, but there is no LineIO type for PhET-iO.
  private readonly electronLineEndpoint1Property: Property<Vector2>;
  private readonly electronLineEndpoint2Property: Property<Vector2>;

  // Is the electron moving?
  private readonly electronIsMovingProperty: Property<boolean>;

  // how many times the electron has crossed the atom's center since it started moving
  private readonly numberOfZeroCrossingsProperty: Property<number>;

  // the amplitude of the electron just before emitting its last photon
  private readonly previousAmplitudeProperty: Property<number>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: PlumPuddingModelOptions ) {

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

    this.electronLineEndpoint1Property = new Vector2Property( Vector2.ZERO, {
      tandem: options.tandem.createTandem( 'electronLineEndpoint1Property' ),
      phetioReadOnly: true
    } );

    this.electronLineEndpoint2Property = new Vector2Property( Vector2.ZERO, {
      tandem: options.tandem.createTandem( 'electronLineEndpoint2Property' ),
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
    this.electron.reset();
    this.numberOfPhotonsAbsorbedProperty.reset();
    this.electronLineEndpoint1Property.reset();
    this.electronLineEndpoint2Property.reset();
    this.electronIsMovingProperty.reset();
    this.numberOfZeroCrossingsProperty.reset();
    this.previousAmplitudeProperty.reset();
  }

  /**
   * Updates the line that determines the electron's oscillation path when the electron is moving at maximum amplitude.
   * The line is specified in coordinates relative to the atom (in the atom's local coordinate frame).
   */
  private updateElectronLine(): void {

    const angle = MOTHAUtils.nextAngle();
    const x = Math.abs( this.radius * Math.sin( angle ) );
    const y = MOTHAUtils.nextSign() * this.radius * Math.cos( angle );
    this.electronLineEndpoint1Property.value = new Vector2( -x, -y );
    this.electronLineEndpoint2Property.value = new Vector2( x, y );
    assert && assert( this.electronLineEndpoint1Property.value.x < this.electronLineEndpoint2Property.value.x,
      'required by moveElectron()' );

    // move electron back to center of the atom, set a random direction
    this.electron.positionProperty.value = this.position;
    this.electron.directionProperty.value *= MOTHAUtils.nextAngle();
  }

  /**
   * Changes the electron's direction.
   */
  private changeElectronDirection(): void {
    this.electron.directionProperty.value *= -1;
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

  /**
   * Emits a photon from the electron's location, at a random orientation.
   */
  private emitPhoton(): void {
    if ( this.numberOfPhotonsAbsorbedProperty.value > 0 ) {

      this.numberOfPhotonsAbsorbedProperty.value -= 1;

      // Create and emit a photon
      this.photonEmittedEmitter.emit( new Photon( {
        position: this.electron.positionProperty.value, // at the electron's position
        wavelength: PHOTON_EMISSION_WAVELENGTH,
        direction: MOTHAUtils.nextAngle(),
        wasEmitted: true
      } ) );
    }
  }

  //TODO Decouple interacting with photon from moving it. super.move() always seems to be the means of moving it,
  // which calls photon.move( dt ), so make that the responsibility of MOTHAModel.
  /**
   * Tries to absorb a photon. If it is not absorbed, the photon is moved.
   */
  public override movePhoton( photon: Photon, dt: number ): void {
    if ( !this.absorbPhoton( photon ) ) {
      super.movePhoton( photon, dt );
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
    const electronOffset = this.electron.positionProperty.value.minus( this.position );

    // Determine dx and dy
    const distanceDelta = dt * ( amplitude * ( 2 * this.radius ) / ELECTRON_LINE_SEGMENTS );
    let dx = Math.abs( endpoint1.x ) * ( distanceDelta / this.radius );
    let dy = Math.abs( endpoint1.y ) * ( distanceDelta / this.radius );

    // Adjust signs for electron's horizontal direction
    const xSign = Math.sign( MOTHAUtils.polarToCartesian( 1, this.electron.directionProperty.value ).x );
    assert && assert( xSign !== 0 );
    dx *= xSign;
    dy *= xSign; //TODO why are we adjusting dy using xSign?
    if ( endpoint1.y > endpoint2.y ) {
      dy *= -1;
    }

    // Electron's new offset
    let newXOffset = electronOffset.x + dx;
    let newYOffset = electronOffset.y + dy;

    // Is the new offset past the ends of the oscillation line?
    if ( Math.abs( newXOffset ) > Math.abs( endpoint1.x ) || Math.abs( newYOffset ) > Math.abs( endpoint1.y ) ) {
      if ( xSign === 1 ) {
        newXOffset = endpoint2.x;
        newYOffset = endpoint2.y;
      }
      else {
        newXOffset = endpoint1.x;
        newYOffset = endpoint1.y;
      }
      this.changeElectronDirection();
    }

    // Did we cross the origin?
    //TODO why is ( newXOffset === 0 && newYOffset === 0 ) considered a zero crossing?
    if ( ( newXOffset === 0 && newYOffset === 0 ) ||
         MOTHAUtils.signIsDifferent( newXOffset, electronOffset.x ) ||
         MOTHAUtils.signIsDifferent( newYOffset, electronOffset.y ) ) {
      this.numberOfZeroCrossingsProperty.value += 1;
    }

    this.electron.positionProperty.value = new Vector2( newXOffset, newYOffset ).plus( this.position );
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
        this.updateElectronLine();
        this.electron.positionProperty.value = this.position;
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );
export default PlumPuddingModel;