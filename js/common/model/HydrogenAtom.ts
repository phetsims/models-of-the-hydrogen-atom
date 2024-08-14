// Copyright 2016-2024, University of Colorado Boulder

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
import IOType from '../../../../tandem/js/types/IOType.js';
import ReferenceIO, { ReferenceIOState } from '../../../../tandem/js/types/ReferenceIO.js';
import { Node } from '../../../../scenery/js/imports.js';

export type HydrogenAtomStateObject = ReferenceIOState;

type SelfOptions = {
  displayNameProperty: TReadOnlyProperty<string>; // name of the model shown in the UI
  icon: Node; // icon used to represent the model in the UI
  position?: Vector2; // position in the model coordinate frame
};

export type HydrogenAtomOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default abstract class HydrogenAtom extends PhetioObject {

  public readonly zoomedInBox: ZoomedInBox; //TODO do all hydrogen-atom models need this?
  public readonly displayNameProperty: TReadOnlyProperty<string>;
  public readonly icon: Node;
  public readonly position: Vector2;

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

      // PhetioObjectOptions
      isDisposable: false,
      phetioState: false
    }, providedOptions );

    super( options );

    this.zoomedInBox = zoomedInBox;
    this.displayNameProperty = options.displayNameProperty;
    this.icon = options.icon;
    this.position = options.position;

    this.photonEmittedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { valueType: Photon } ]
    } );

    this.photonAbsorbedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { valueType: Photon } ]
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
   * Moves a photon by the specified time step.
   */
  public abstract movePhoton( photon: Photon, dt: number ): void;

  /**
   * Determines if two points collide.
   * Any distance between the points that is <= threshold is considered a collision.
   */
  protected pointsCollide( position1: Vector2, position2: Vector2, threshold: number ): boolean {
    return position1.distance( position2 ) <= threshold;
  }

  /**
   * HydrogenAtomIO handles PhET-iO serialization of HydrogenAtom. Since all HydrogenAtom instances are created at
   * startup, exist for the lifetime of the sim, and are phetioState: false, it implements 'Reference type serialization',
   * as described in the Serialization section of
   * https://github.com/phetsims/phet-io/blob/main/doc/phet-io-instrumentation-technical-guide.md#serialization
   */
  public static readonly HydrogenAtomIO = new IOType<HydrogenAtom, HydrogenAtomStateObject>( 'HydrogenAtomIO', {
    valueType: HydrogenAtom,
    supertype: ReferenceIO( IOType.ObjectIO ),
    documentation: 'A model of the hydrogen atom'
  } );
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtom', HydrogenAtom );