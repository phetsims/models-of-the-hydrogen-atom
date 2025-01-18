// Copyright 2025, University of Colorado Boulder

/**
 * PhotonSystem is the system of photons that are displayed in the zoomed-in box.
 *
 * To encapsulate PhET-iO concerns, PhotonSystem owns and manages a static pool of Photon instances.
 * It provides a public API for adding and removing photons. But after instantiation of PhotonSystem at startup,
 * no instances of Photon are created or disposed.  "Adding" a photon means mutating and activating an inactive
 * Photon instance. "Removing" a photon means deactivating an active Photon instance, effectively returning it
 * to the free pool. See also Photon.ts and https://github.com/phetsims/models-of-the-hydrogen-atom/issues/47.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon, { PhotonOptions } from './Photon.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ZoomedInBox from './ZoomedInBox.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from './HydrogenAtom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Color } from '../../../../scenery/js/imports.js';
import Emitter from '../../../../axon/js/Emitter.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';

export default class PhotonSystem extends PhetioObject {

  // the zoomed-in part of the box of hydrogen
  private readonly zoomedInBox: ZoomedInBox;

  // the hydrogen-atom model that is selected: either the experiment or a predictive model.
  private readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // notify when a photon is added or removed
  public readonly photonAddedEmitter: Emitter<[ Photon ]>;
  public readonly photonRemovedEmitter: Emitter<[ Photon ]>;

  // A static set of Photons that will be reused, mutated, and activated as the sim runs.
  private readonly photons: Photon[];

  // This is the number of static Photon instances that are created at startup, and the maximum number of Photons that
  // can therefore be visible in the zoomed-in box. If more Photons are needed at runtime, we cannot instantiate more
  // dynamically because they are PhET-iO Elements. With assertions enabled, the sim will fail an assertion. With
  // assertions disabled, a warning will be printed to the browser console, and we try to continue gracefully. If you
  // see such a warning, increase this value. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/47.
  private static readonly NUMBER_OF_PHOTON_INSTANCES = 25;

  public constructor( zoomedInBox: ZoomedInBox, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      phetioState: false,
      phetioDocumentation: 'The system of photons shown inside the zoomed-in box.',
      tandem: tandem
    } );

    this.zoomedInBox = zoomedInBox;
    this.hydrogenAtomProperty = hydrogenAtomProperty;

    this.photonAddedEmitter = new Emitter<[ Photon ]>( {
      parameters: [
        { name: 'photon', valueType: Photon }
      ]
    } );
    this.photonRemovedEmitter = new Emitter<[ Photon ]>( {
      parameters: [
        { name: 'photon', valueType: Photon }
      ]
    } );

    // Create the static set of Photon elements.
    this.photons = [];
    for ( let i = 0; i < PhotonSystem.NUMBER_OF_PHOTON_INSTANCES; i++ ) {

      const photon = new Photon( {
        tandem: tandem.createTandem( `photon${i}` )
      } );
      this.photons.push( photon );

      // Toggling isActiveProperty causes PhotonNode to be created and disposed in the view.
      photon.isActiveProperty.lazyLink( isActive => {
        if ( isActive ) {
          this.photonAddedEmitter.emit( photon );
        }
        else {
          this.photonRemovedEmitter.emit( photon );
        }
      } );
    }
  }

  public reset(): void {
    this.removeAllPhotons();
  }

  /**
   * Emits a photon from the light source.
   */
  public emitPhotonFromLight( wavelength: number, position: Vector2, direction: number ): void {
    this.addPhoton( {
      wavelength: wavelength,
      position: position,
      direction: direction,
      wasEmittedByAtom: false,
      hasCollidedWithAtom: false,
      debugHaloColor: null
    } );
  }

  /**
   * Emits a photon from the hydrogen atom.
   */
  public emitPhotonFromAtom( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color ): void {
    this.addPhoton( {
      wavelength: wavelength,
      position: position,
      direction: direction,
      wasEmittedByAtom: true,
      hasCollidedWithAtom: false,
      debugHaloColor: debugHaloColor
    } );
  }

  /**
   * Adds a photon by mutating and inactive Photon instance,
   */
  private addPhoton( photonOptions: StrictOmit<Required<PhotonOptions>, 'tandem'> ): void {
    const photon = _.find( this.photons, photon => !photon.isActiveProperty.value )!;
    assert && assert( photon, 'No inactive photons are available, increase PhotonSystem.NUMBER_OF_PHOTON_INSTANCES.' );
    if ( photon ) {
      photon.activate( photonOptions );
    }
    else {
      // The sim will not crash, but will print a console warning.
      console.warn( 'No inactive photons are available, increase PhotonSystem.NUMBER_OF_PHOTON_INSTANCES.' );
    }
  }

  /**
   * Removes a photon by deactivating a Photon instance.
   */
  public removePhoton( photon: Photon ): void {
    assert && assert( photon.isActiveProperty.value, 'Attempted to remove a photon that is inactive.' );
    photon.isActiveProperty.value = false;
  }

  /**
   * Removes (deactivates) all Photon instances.
   */
  public removeAllPhotons(): void {
    Array.from( this.photons ).forEach( photon => {
      if ( photon.isActiveProperty.value ) {
        this.removePhoton( photon );
      }
    } );
  }

  /**
   * Advances the state of all active photons.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {

    // This may change this.photons, so operate on a shallow copy of the array.
    Array.from( this.photons ).forEach( photon => {
      if ( photon.isActiveProperty.value ) {

        // Move the photon before processing it, because this.hydrogenAtomProperty.value.step is called first by
        // MOTHAModel.step. If we move the photon after processing it, then the photon will be processed when it
        // is 1 time step behind the state of the atom.
        photon.move( dt );

        // If the photon leaves the zoomed-in box, remove it. Otherwise, allow the atom to process it.
        if ( !this.zoomedInBox.containsPhoton( photon ) ) {
          this.removePhoton( photon );
        }
        else {
          this.hydrogenAtomProperty.value.processPhoton( photon );
        }
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonSystem', PhotonSystem );