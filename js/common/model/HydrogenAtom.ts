// Copyright 2016-2025, University of Colorado Boulder

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
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';
import LightSource from './LightSource.js';
import MOTHAUtils from '../MOTHAUtils.js';

type SelfOptions = {

  // Whether the atom is a quantum atom.
  isQuantum?: boolean;

  // Atom's name as it appears in the user interface.
  displayNameProperty: TReadOnlyProperty<string>;

  // Atom's name used in log and assertion messages, not in the user interface.
  debugName: string;

  // Icon used to represent the atom in the user interface.
  icon: Node;

  // Prefix used for tandem names for PhET-iO Elements that are related to the atom.
  tandemNamePrefix: string;
};

export type HydrogenAtomOptions = SelfOptions &
  PickOptional<PhetioObjectOptions, 'phetioDocumentation'> &
  PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class HydrogenAtom extends PhetioObject {

  // Atom's position in unitless model coordinates.
  public readonly position: Vector2;

  // See SelfOptions for documentation of these fields.
  public readonly isQuantum: boolean;
  public readonly displayNameProperty: TReadOnlyProperty<string>;
  public readonly debugName: string;
  public readonly icon: Node;
  public readonly tandemNamePrefix: string;

  // Notifies listeners by emitting when a photon is absorbed or emitted. Not all models absorb or emit photons,
  // and billiard ball does not even have an electron. But it simplifies programming for us and the PhET-iO client
  // if all atomic models have these Emitters. For example, the Spectrometer can be hooked up to any of the atomic
  // models, regardless of whether they emit photons. See Emitter instantiation for parameter names.
  public readonly photonAbsorbedEmitter: TEmitter<[ Photon ]>;
  public readonly photonEmittedEmitter: TEmitter<[ number, Vector2, number, Color ]>;

  // When an atomic model is reset, we need to ignore some of the changes that occur in the atomic model. For example,
  // we do not want to validate an electron state transition caused by resetting, and we do not want to show an electron
  // state transition in the Energy Level diagram. We need both a flag and an Emitter because in some circumstances
  // we need to test whether we're doing a reset, and in other circumstances we need to be notified of a reset.
  private _isResetting: boolean;
  public readonly resetEmitter: Emitter;

  protected constructor( position: Vector2, providedOptions: HydrogenAtomOptions ) {

    const options = optionize<HydrogenAtomOptions, SelfOptions, PhetioObjectOptions>()( {

      // SelfOptions
      isQuantum: false,

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: HydrogenAtom.HydrogenAtomIO
    }, providedOptions );

    super( options );

    this.position = position;

    this.isQuantum = options.isQuantum;
    this.displayNameProperty = options.displayNameProperty;
    this.debugName = options.debugName;
    this.icon = options.icon;
    this.tandemNamePrefix = options.tandemNamePrefix;

    this.photonAbsorbedEmitter = new Emitter( {
      parameters: [
        { name: 'photon', valueType: Photon, phetioType: Photon.PhotonIO }
      ],
      tandem: options.tandem.createTandem( 'photonAbsorbedEmitter' ),
      phetioDocumentation: 'Register with this Emitter to be notified when a photon is absorbed. ' +
                           'Included for all hydrogen atom models, regardless of whether they absorb photons, ' +
                           'so that all models have the same API.',
      phetioReadOnly: true
    } );

    this.photonEmittedEmitter = new Emitter( {
      parameters: [
        { name: 'wavelength', valueType: 'number', phetioType: NumberIO },
        { name: 'position', valueType: Vector2, phetioType: Vector2.Vector2IO },
        { name: 'direction', valueType: 'number', phetioType: NumberIO },
        { name: 'debugHalo', valueType: Color || null, phetioType: NullableIO( Color.ColorIO ) }
      ],
      tandem: options.tandem.createTandem( 'photonEmittedEmitter' ),
      phetioDocumentation: 'Register with this Emitter to be notified when a photon is emitted. ' +
                           'Included for all hydrogen atom models, regardless of whether they emit photons ' +
                           'so that all models have the same API.',
      phetioReadOnly: true
    } );

    this._isResetting = false;
    this.resetEmitter = new Emitter();
  }

  /**
   * Subclasses should override resetProtected instead of reset, so that the value of isResetting is correct
   * throughout the execution of reset.
   */
  public reset(): void {
    this._isResetting = true;
    this.resetProtected();
    this._isResetting = false;
    this.resetEmitter.emit();
  }

  /**
   * Subclasses should override resetProtected instead of reset, so that the value of isResetting is correct
   * throughout the execution of reset.
   */
  protected resetProtected(): void {
    // Default behavior is to do nothing.
  }
  
  /**
   * Whether this atomic model is currently resetting. This is useful for situations where we need to ignore
   * some change in the atomic model that occurs during a reset.
   */
  public isResetting(): boolean {
    return this._isResetting;
  }

  /**
   * Steps the atomic model.
   * @param dt - time step, in seconds
   */
  public abstract step( dt: number ): void;

  /**
   * Processes a photon based on the current state of the atom.
   */
  public abstract processPhoton( photon: Photon ): void;

  /**
   * Adjusts a photon's direction so that it is noticeably different from the direction of the light source.
   * This ensures that emitted photons are easy to see, and will not be confused with photons from the light source.
   * This method is relevant for models that are capable of emitting photons.
   */
  public static adjustEmissionDirection( direction: number ): number {
    const threshold = Math.PI / 8; // How close we can be to the light direction.
    if ( Math.abs( direction - LightSource.DIRECTION ) < threshold ) {
      direction = LightSource.DIRECTION + MOTHAUtils.nextSign() * threshold;
    }
    return direction;
  }

  /**
   * HydrogenAtomIO handles PhET-iO serialization of HydrogenAtom. Since all HydrogenAtom instances are created at
   * startup, exist for the lifetime of the sim, and are phetioState: false, it implements 'Reference type serialization',
   * as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly HydrogenAtomIO = new IOType<HydrogenAtom, ReferenceIOState>( 'HydrogenAtomIO', {
    valueType: HydrogenAtom,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'A model of the hydrogen atom'
  } );
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtom', HydrogenAtom );