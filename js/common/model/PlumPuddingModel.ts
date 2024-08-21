// Copyright 2019-2024, University of Colorado Boulder

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
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import PlumPuddingNode from '../view/PlumPuddingNode.js'; // eslint-disable-line no-view-imported-from-model
import HydrogenAtom, { HydrogenAtomOptions } from './HydrogenAtom.js';
import Electron, { ElectronOptions } from './Electron.js';
import Photon from './Photon.js';
import ZoomedInBox from './ZoomedInBox.js';
import MOTHAUtils from '../MOTHAUtils.js';
import MOTHAConstants from '../MOTHAConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Utils from '../../../../dot/js/Utils.js';
import MOTHASymbols from '../MOTHASymbols.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';

const MAX_PHOTONS_ABSORBED = 1; // maximum number of photons that can be absorbed. WARNING: Untested with values !== 1
const PHOTON_EMISSION_WAVELENGTH = 150; // wavelength (in nm) of emitted photons
const PHOTON_EMISSION_PROBABILITY = 0.1; // probability [0,1] that a photon will be emitted
const PHOTON_ABSORPTION_PROBABILITY = 0.5; // probability [0,1] that a photon will be absorbed

type SelfOptions = EmptySelfOptions;

type PlumPuddingModelOptions = SelfOptions & PickRequired<HydrogenAtomOptions, 'tandem'>;

export default class PlumPuddingModel extends HydrogenAtom {

  public readonly radius = MOTHAConstants.PLUM_PUDDING_RADIUS;

  public readonly electron: PlumPuddingElectron;

  // The line on which the electron oscillates, in coordinates relative to the atom's position.
  private readonly electronLineProperty: Property<ElectronLine>;

  // The number of times the electron has crossed the atom's center since it started moving.
  private readonly numberOfZeroCrossingsProperty: Property<number>;

  // The amplitude of the electron just before emitting its last photon.
  private readonly previousAmplitudeProperty: Property<number>;

  // The number of photons the atom has absorbed and is "holding".
  private readonly numberOfPhotonsAbsorbedProperty: Property<number>;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: PlumPuddingModelOptions ) {

    const options = optionize<PlumPuddingModelOptions, SelfOptions, HydrogenAtomOptions>()( {

      // HydrogenAtomOptions
      displayNameProperty: ModelsOfTheHydrogenAtomStrings.plumPuddingStringProperty,
      icon: PlumPuddingNode.createIcon()
    }, providedOptions );

    super( zoomedInBox, options );

    this.electron = new PlumPuddingElectron( {
      position: this.position,
      tandem: options.tandem.createTandem( 'electron' )
    } );

    this.electronLineProperty = new Property<ElectronLine>( nextElectronLine( this.radius ), {
      //TODO tandem
      //TODO phetioType: ElectronLineIO
      //TODO phetioReadOnly: true
      //TODO phetioDocumentation: 'The line on which the electron oscillates, in coordinates relative to the atom\'s position.'
    } );

    this.numberOfZeroCrossingsProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'numberOfZeroCrossingsProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'The number of times the electron has crossed the atom\'s center since it started moving.'
    } );

    this.previousAmplitudeProperty = new NumberProperty( 0, {
      range: new Range( 0, 1 ),
      tandem: options.tandem.createTandem( 'previousAmplitudeProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'The amplitude of the electron just before emitting its last photon.'
    } );

    this.numberOfPhotonsAbsorbedProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      tandem: options.tandem.createTandem( 'numberOfPhotonsAbsorbedProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'The number of photons the atom has absorbed and is "holding".'
    } );
  }

  public override reset(): void {
    this.electron.reset();
    this.electronLineProperty.reset();
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

      this.electron.isMovingProperty.value = true;

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
    else if ( this.electron.isMovingProperty.value && this.numberOfPhotonsAbsorbedProperty.value === 0 ) {

      // Before moving the electron
      const before = this.getNumberOfElectronOscillations();

      // After moving the electron
      this.moveElectron( dt, this.previousAmplitudeProperty.value );
      const after = this.getNumberOfElectronOscillations();

      // Stop the electron when it completes its current oscillation
      if ( before !== after ) {
        this.electron.isMovingProperty.value = false;
        this.numberOfZeroCrossingsProperty.value = 0;
        this.previousAmplitudeProperty.value = 0;
        this.electronLineProperty.value = nextElectronLine( this.radius );
        this.electron.positionProperty.value = this.position;
        this.electron.directionProperty.value = dotRandom.nextBoolean() ? 'right' : 'left';
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
    const electronOffset = this.electron.positionProperty.value.minus( this.position );
    const x0 = electronOffset.x;
    const y0 = electronOffset.y;

    // Determine dx and dy
    const distanceDelta = dt * amplitude * ( 2 * this.radius );
    let dx = Math.abs( electronLine.x1 ) * ( distanceDelta / this.radius );
    let dy = Math.abs( electronLine.y1 ) * ( distanceDelta / this.radius );

    // Adjust signs for electron's horizontal direction
    const sign = ( this.electron.directionProperty.value === 'right' ? 1 : -1 );
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
      if ( this.electron.directionProperty.value === 'right' ) {
        x = electronLine.x2;
        y = electronLine.y2;
      }
      else {
        x = electronLine.x1;
        y = electronLine.y1;
      }

      // Change direction
      this.electron.directionProperty.value = ( this.electron.directionProperty.value === 'right' ) ? 'left' : 'right';
    }

    // Did we cross the origin?
    //TODO why is ( x === 0 && y === 0 ) considered a zero crossing?
    if ( ( x === 0 && y === 0 ) || signIsDifferent( x, x0 ) || signIsDifferent( y, y0 ) ) {
      this.numberOfZeroCrossingsProperty.value += 1;
    }

    this.electron.positionProperty.value = this.position.plusXY( x, y );
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
              ( this.numberOfPhotonsAbsorbedProperty.value === 0 && this.electron.isMovingProperty.value ) );
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
          phet.log && phet.log( `Plum Pudding: absorbed ${MOTHASymbols.lambda}=${Utils.toFixedNumber( photon.wavelength, 2 )}` );
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
      const photon = new Photon( {
        wavelength: PHOTON_EMISSION_WAVELENGTH,
        position: this.electron.positionProperty.value, // at the electron's position
        direction: MOTHAUtils.nextAngle(), // in a random direction
        wasEmitted: true
      } );
      phet.log && phet.log( `Plum Pudding: emitted \u03BB=${photon.wavelength}` );
      this.photonEmittedEmitter.emit( photon );
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
    assert && assert( x1 <= x2 );
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

/**
 * PlumPuddingElectron is a specialization of Electron for the Plum Pudding model.
 */
class PlumPuddingElectron extends Electron {

  // Is the electron moving?
  public readonly isMovingProperty: Property<boolean>;

  // Whether the electron's horizontal motion is to the left or right.
  public readonly directionProperty: StringUnionProperty<'left' | 'right'>;

  public constructor( providedOptions: ElectronOptions ) {

    const options = providedOptions;

    super( options );

    this.isMovingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isMovingProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    this.directionProperty = new StringUnionProperty( 'left', {
      validValues: [ 'left', 'right' ],
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether the electron\'s horizontal motion is to the left or right.'
    } );
  }

  public override reset(): void {
    this.isMovingProperty.reset();
    this.directionProperty.reset();
    super.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingModel', PlumPuddingModel );