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
import MOTHAConstants from '../MOTHAConstants.js';

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

  // The maximum number of active photons that has occurred at runtime. This is used solely for debugging
  // NUMBER_OF_PHOTON_INSTANCES. The value is valid and is printed to the console only when running with ?log.
  private maxActivePhotons: number;

  // This is the number of static Photon instances that are created at startup, and the maximum number of Photons that
  // can therefore be visible in the zoomed-in box. If more Photons are needed at runtime, we cannot instantiate more
  // dynamically because they are PhET-iO Elements. With assertions enabled, the sim will fail an assertion if an
  // inactive photon cannot be found. With assertions disabled, a warning will be printed to the browser console, and
  // we attempt to continue gracefully by ignoring the request to add a photon. If you encounter this problem, increase
  // this value by running with ?log to inspect maxActivePhotons. Note that this value is a bit more than MAX_LIGHT_PHOTONS
  // (the maximum number of photons emitted by the light that appear in the zoomed-in box) to safely allow for photons
  // emitted by the atom. See also Photon.ts and https://github.com/phetsims/models-of-the-hydrogen-atom/issues/47.
  private static readonly NUMBER_OF_PHOTON_INSTANCES = MOTHAConstants.MAX_LIGHT_PHOTONS + 5;

  public constructor( zoomedInBox: ZoomedInBox, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      phetioState: false,
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
    this.maxActivePhotons = 0;
    for ( let i = 0; i < PhotonSystem.NUMBER_OF_PHOTON_INSTANCES; i++ ) {
      const photon = new Photon( {
        tandem: tandem.createTandem( `photon${i}` )
      } );
      this.photons.push( photon );
      photon.isActiveProperty.lazyLink( () => this.activationHandler( photon ) );
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
   * Adds a photon by mutating and activating an inactive Photon instance,
   */
  private addPhoton( photonOptions: StrictOmit<Required<PhotonOptions>, 'tandem'> ): void {
    const photon = _.find( this.photons, photon => !photon.isActiveProperty.value )!;
    assert && assert( photon, 'No inactive photons are available! See documentation for PhotonSystem.NUMBER_OF_PHOTON_INSTANCES.' );
    if ( photon ) {
      photon.activate( photonOptions );
    }
    else {
      // The sim will not crash, but will print a console warning.
      console.warn( 'No inactive photons are available! See documentation for PhotonSystem.NUMBER_OF_PHOTON_INSTANCES.' );
    }
  }

  /**
   * Removes a photon by deactivating an active Photon instance.
   */
  public removePhoton( photon: Photon ): void {
    assert && assert( photon.isActiveProperty.value, 'Attempted to remove a photon that is inactive.' );
    photon.isActiveProperty.value = false;
  }

  /**
   * Removes (deactivates) all Photon instances.
   */
  public removeAllPhotons(): void {

    // this.photons does not change, so it is safe to operate directly on this array.
    this.photons.forEach( photon => {
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

    // this.photons does not change, so it is safe to operate directly on this array.
    this.photons.forEach( photon => {
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

  /**
   * This method is called when a Photon's isActiveProperty value changes. It notifies listeners that the photon
   * was added (activated) or removed (deactivated).  In the view, this results in an associated PhotonNode being
   * created or disposed.
   *
   * This method also contains support for debugging problems with NUMBER_OF_PHOTON_INSTANCES. For details, see
   * the documentation for NUMBER_OF_PHOTON_INSTANCES.
   */
  private activationHandler( photon: Photon ): void {
    if ( photon.isActiveProperty.value ) {
      this.photonAddedEmitter.emit( photon );
    }
    else {
      this.photonRemovedEmitter.emit( photon );
    }

    // For debugging NUMBER_OF_PHOTON_INSTANCES.
    if ( phet.log ) {
      const numberOfActivePhotons = this.photons.filter( photon => photon.isActiveProperty.value ).length;
      if ( numberOfActivePhotons > this.maxActivePhotons ) {
        this.maxActivePhotons = numberOfActivePhotons;
        phet.log && phet.log( `NUMBER_OF_PHOTON_INSTANCES=${PhotonSystem.NUMBER_OF_PHOTON_INSTANCES}, maxActivePhotons=${this.maxActivePhotons}`, {
          color: 'red'
        } );
      }
    }
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonSystem', PhotonSystem );