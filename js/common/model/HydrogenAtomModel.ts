// Copyright 2016-2022, University of Colorado Boulder

/**
 * PredictiveModel is the base class for all hydrogen-atom models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import AlphaParticle from './AlphaParticle.js';
import Photon from './Photon.js';

type SelfOptions = {
  position?: Vector2; // position in the model coordinate frame
  orientation?: number; // rotation angle, in radians
  numberOfStates?: number; // number of electron states, not relevant to all hydrogen atom models
  groundState?: number; // index of ground state, not relevant to all hydrogen atom models
  hasTransitionWavelengths: boolean; // does this model include the concept of transition wavelengths?
};

export type HydrogenAtomModelOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class HydrogenAtomModel extends PhetioObject {

  public readonly displayName: string;
  public readonly icon: HTMLImageElement;
  public readonly position: Vector2;
  public readonly orientation: number;
  public readonly numberOfStates: number;
  public readonly groundState: number;
  public readonly hasTransitionWavelengths: boolean;

  // emits when a photon is absorbed
  public readonly photonAbsorbedEmitter: Emitter<[]>;

  // emits when a photon is emitted (an unfortunate name)
  public readonly photonEmittedEmitter: Emitter<[]>;

  // The notion of "ground state" does not apply to all hydrogen atom models, but it is convenient to have it here.
  public static readonly GROUND_STATE = 0;

  /**
   * @param displayName - name of the model shown in the UI
   * @param icon - icon used to represent the model in the UI
   * @param providedOptions
   */
  protected constructor( displayName: string, icon: HTMLImageElement, providedOptions: HydrogenAtomModelOptions ) {

    const options = optionize<HydrogenAtomModelOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      position: Vector2.ZERO,
      orientation: 0,
      numberOfStates: 0,
      groundState: 1,

      // PhetioObjectOptions
      phetioState: false
    }, providedOptions );

    super( options );

    this.displayName = displayName;
    this.icon = icon;
    this.position = options.position;
    this.orientation = options.orientation;
    this.numberOfStates = options.numberOfStates;
    this.groundState = options.groundState;
    this.hasTransitionWavelengths = options.hasTransitionWavelengths;

    this.photonAbsorbedEmitter = new Emitter( {
      tandem: options.tandem.createTandem( 'photonAbsorbedEmitter' )
    } );

    this.photonEmittedEmitter = new Emitter( {
      tandem: options.tandem.createTandem( 'photonEmittedEmitter' )
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public reset(): void {
    //TODO
  }

  /**
   * Called when time has advanced by some delta. The default implementation does nothing.
   */
  public step( dt: number ): void {}

  /**
   * Gets the transition wavelengths for a specified state. The notion of 'transition wavelength' does not apply to all
   * hydrogen atom models, so the default implementation returns null.
   */
  public getTransitionWavelengths( state: number ): number[] | null {
    return null;
  }

  /**
   * Moves a photon by the specified time step.
   * In this default implementation, the atom has no influence on the photon's movement.
   */
  public stepPhoton( photon: Photon, dt: number ): void {
    const distance = photon.speedProperty.value * dt;
    const dx = Math.cos( photon.directionProperty.value ) * distance;
    const dy = Math.sin( photon.directionProperty.value ) * distance;
    const x = photon.positionProperty.value.x + dx;
    const y = photon.positionProperty.value.y + dy;
    photon.positionProperty.value = new Vector2( x, y );
  }

  /**
   * Moves an alpha particle by the specified time step.
   * In this default implementation, the atom has no influence on the alpha particle's movement.
   */
  public stepAlphaParticle( alphaParticle: AlphaParticle, dt: number ): void {
    const distance = alphaParticle.speedProperty.value * dt;
    const dx = Math.cos( alphaParticle.directionProperty.value ) * distance;
    const dy = Math.sin( alphaParticle.directionProperty.value ) * distance;
    const x = alphaParticle.positionProperty.value.x + dx;
    const y = alphaParticle.positionProperty.value.y + dy;
    alphaParticle.positionProperty.value = new Vector2( x, y );
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

modelsOfTheHydrogenAtom.register( 'HydrogenAtomModel', HydrogenAtomModel );