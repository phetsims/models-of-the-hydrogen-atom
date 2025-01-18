// Copyright 2025, University of Colorado Boulder

/**
 * PhotonSystem is the system of photons that are displayed in the zoomed-in box.
 *
 * To encapsulate PhET-iO concerns, PhotonSystem owns and manages all Photon instances.
 * See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/47.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ZoomedInBox from './ZoomedInBox.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from './HydrogenAtom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Color } from '../../../../scenery/js/imports.js';
import Emitter from '../../../../axon/js/Emitter.js';

export default class PhotonSystem extends PhetioObject {

  // the zoomed-in part of the box of hydrogen
  private readonly zoomedInBox: ZoomedInBox;

  // the hydrogen-atom model that is selected: either the experiment or a predictive model.
  private readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // the collection of photons that appear in the zoomed-in box
  private readonly photons: Photon[];

  // notify when a photon is added or removed
  public readonly photonAddedEmitter: Emitter<[ Photon ]>;
  public readonly photonRemovedEmitter: Emitter<[ Photon ]>;

  public constructor( zoomedInBox: ZoomedInBox, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      phetioState: false, //TODO
      phetioDocumentation: 'The system of photons shown inside the zoomed-in box.'
    } );

    this.zoomedInBox = zoomedInBox;
    this.hydrogenAtomProperty = hydrogenAtomProperty;

    this.photons = [];

    this.photonAddedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { name: 'photon', valueType: Photon } ]
    } );
    this.photonRemovedEmitter = new Emitter<[ Photon ]>( {
      parameters: [ { name: 'photon', valueType: Photon } ]
    } );
  }

  public reset(): void {
    this.removeAllPhotons();
  }

  /**
   * Emits a photon from the light source.
   */
  public emitPhotonFromLight( wavelength: number, position: Vector2, direction: number ): void {
    this.addPhoton( new Photon( {
      wavelength: wavelength,
      position: position,
      direction: direction
    } ) );
  }

  /**
   * Emits a photon from the hydrogen atom.
   */
  public emitPhotonFromAtom( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color ): void {
    this.addPhoton( new Photon( {
      wavelength: wavelength,
      position: position,
      direction: direction,
      wasEmittedByAtom: true,
      debugHaloColor: debugHaloColor
    } ) );
  }

  private addPhoton( photon: Photon ): void {
    this.photons.push( photon );
    this.photonAddedEmitter.emit( photon );
  }

  public removePhoton( photon: Photon ): void {
    assert && assert( this.photons.includes( photon ), 'Attempted to remove a photon that does not exist.' );
    const index = this.photons.indexOf( photon );
    this.photons.splice( index, 1 );
    photon.dispose();
    this.photonRemovedEmitter.emit( photon );
  }

  public removeAllPhotons(): void {
    while ( this.photons.length > 0 ) {
      const photon = this.photons.pop()!;
      photon.dispose();
      this.photonRemovedEmitter.emit( photon );
    }
  }

  /**
   * Advances the state of the photons.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {

    // This may change this.photons, so operate on a copy of the array.
    Array.from( this.photons ).forEach( photon => {

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
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonSystem', PhotonSystem );