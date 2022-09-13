// Copyright 2016-2022, University of Colorado Boulder

/**
 * HydrogenAtom is the abstract base class for all hydrogen-atom models.
 * Subclass names have a 'Model' suffix (e.g. PlumPuddingModel) to match the terminology used in the literature.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';
import ZoomedInBox from './ZoomedInBox.js';

//TODO move numberOfStates, groundState, hasTransitionWavelengths to another base class for those models
type SelfOptions = {
  displayNameProperty: TReadOnlyProperty<string>; // name of the model shown in the UI
  iconHTMLImageElement: HTMLImageElement; // icon used to represent the model in the UI
  position?: Vector2; // position in the model coordinate frame
  orientation?: number; // rotation angle, in radians
  numberOfStates?: number; // number of electron states, not relevant to all hydrogen atom models
  groundState?: number; // index of ground state, not relevant to all hydrogen atom models
  hasTransitionWavelengths: boolean; // does this model include the concept of transition wavelengths?
};

export type HydrogenAtomOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class HydrogenAtom extends PhetioObject {

  public readonly zoomedInBox: ZoomedInBox; //TODO do all hydrogen-atom models need this?
  public readonly displayNameProperty: TReadOnlyProperty<string>;
  public readonly iconHTMLImageElement: HTMLImageElement;
  public readonly position: Vector2;
  public readonly orientation: number;
  public readonly numberOfStates: number; //TODO unused
  public readonly groundState: number; //TODO unused
  public readonly hasTransitionWavelengths: boolean;

  // Notifies listeners by emitting when a photon is emitted (an unfortunate name)
  public readonly photonEmittedEmitter: TEmitter<[ Photon ]>;

  // Notifies listeners by emitting when a photon is absorbed
  public readonly photonAbsorbedEmitter: TEmitter<[ Photon ]>;

  /**
   * @param zoomedInBox - the zoomed-in part of the box of hydrogen, where animation takes place
   * @param providedOptions
   */
  protected constructor( zoomedInBox: ZoomedInBox, providedOptions: HydrogenAtomOptions ) {

    const options = optionize<HydrogenAtomOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: Vector2.ZERO,
      orientation: 0,
      numberOfStates: 0,
      groundState: 1,

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.zoomedInBox = zoomedInBox;
    this.displayNameProperty = options.displayNameProperty;
    this.iconHTMLImageElement = options.iconHTMLImageElement;
    this.position = options.position;
    this.orientation = options.orientation;
    this.numberOfStates = options.numberOfStates;
    this.groundState = options.groundState;
    this.hasTransitionWavelengths = options.hasTransitionWavelengths;

    this.photonEmittedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { valueType: Photon } ]
    } );

    this.photonAbsorbedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { valueType: Photon } ]
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    this.photonEmittedEmitter.removeAllListeners();
    this.photonAbsorbedEmitter.removeAllListeners();
  }

  /**
   * Called when time has advanced by some delta.
   * @param dt - time step, in seconds
   */
  public abstract step( dt: number ): void;

  /**
   * Moves a photon by the specified time step.
   */
  public abstract movePhoton( photon: Photon, dt: number ): void;

  /**
   * Gets the transition wavelengths for a specified state. The notion of 'transition wavelength' does not apply to all
   * hydrogen atom models, so the default implementation returns null.
   */
  public getTransitionWavelengths( state: number ): number[] | null {
    return null;
  }

  /**
   * Determines if two points collide.
   * Any distance between the points that is <= threshold is considered a collision.
   */
  protected pointsCollide( position1: Vector2, position2: Vector2, threshold: number ): boolean {
    return position1.distance( position2 ) <= threshold;
  }

  /**
   * Gets the number of electron states that the model supports.
   * The default is zero, since some models have no notion of "state".
   */
  public static getNumberOfStates(): number {
    return 0;
  }
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtom', HydrogenAtom );