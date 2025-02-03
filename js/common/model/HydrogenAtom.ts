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
import { Color, Node } from '../../../../scenery/js/imports.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';

type SelfOptions = {

  // Name of the model shown in the UI.
  displayNameProperty: TReadOnlyProperty<string>;

  tandemNamePrefix: string;

  // Icon used to represent the model in the UI.
  icon: Node;
};

export type HydrogenAtomOptions = SelfOptions &
  PickOptional<PhetioObjectOptions, 'phetioDocumentation'> &
  PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class HydrogenAtom extends PhetioObject {

  public readonly position: Vector2;
  public readonly displayNameProperty: TReadOnlyProperty<string>;
  public readonly icon: Node;

  // Notifies listeners by emitting when a photon is absorbed or emitted. Not all models absorb or emit photons,
  // and billiard ball does not even have an electron. But it simplifies programming for us and the PhET-iO client
  // if all models have these emitters. For example, the Spectrometer can be hooked up to any of the models,
  // regardless of whether they emit photons.
  public readonly photonAbsorbedEmitter: TEmitter<[ Photon ]>;
  public readonly photonEmittedEmitter: TEmitter<[ number, Vector2, number, Color ]>;

  public readonly tandemNamePrefix: string;

  protected constructor( position: Vector2, providedOptions: HydrogenAtomOptions ) {

    const options = optionize<HydrogenAtomOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false,
      phetioType: HydrogenAtom.HydrogenAtomIO
    }, providedOptions );

    super( options );

    this.position = position;
    this.displayNameProperty = options.displayNameProperty;
    this.icon = options.icon;
    this.tandemNamePrefix = options.tandemNamePrefix;

    this.photonAbsorbedEmitter = new Emitter<[ Photon ]>( {
      parameters: [
        { name: 'photon', valueType: Photon, phetioType: Photon.PhotonIO }
      ],
      tandem: options.tandem.createTandem( 'photonAbsorbedEmitter' ),
      phetioDocumentation: 'Register with this Emitter to be notified when a photon is absorbed. ' +
                           'Included for all hydrogen atom models, regardless of whether they absorb photons, ' +
                           'so that all models have the same API.',
      phetioReadOnly: true
    } );

    this.photonEmittedEmitter = new Emitter<[ number, Vector2, number, Color ]>( {
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
   * Process a photon based on the current state of the atom.
   */
  public abstract processPhoton( photon: Photon ): void;

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