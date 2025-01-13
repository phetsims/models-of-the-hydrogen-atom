// Copyright 2025, University of Colorado Boulder

/**
 * PhotonSystem is the system of photons that are displayed in the zoomed-in box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon from './Photon.js';
import createObservableArray, { ObservableArray } from '../../../../axon/js/createObservableArray.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ZoomedInBox from './ZoomedInBox.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from './HydrogenAtom.js';

export default class PhotonSystem extends PhetioObject {

  // the zoomed-in part of the box of hydrogen
  private readonly zoomedInBox: ZoomedInBox;

  // the hydrogen-atom model that is selected: either the experiment or a predictive model.
  private readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  // the collection of photons that appear in the zoomed-in box
  private readonly photons: ObservableArray<Photon>;

  public constructor( zoomedInBox: ZoomedInBox, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    super( {
      isDisposable: false,
      phetioState: false, //TODO
      phetioDocumentation: 'The system of photons shown inside the zoomed-in box.'
    } );

    this.zoomedInBox = zoomedInBox;
    this.hydrogenAtomProperty = hydrogenAtomProperty;

    //TODO https://github.com/phetsims/models-of-the-hydrogen-atom/issues/47 replace ObservableArray
    this.photons = createObservableArray<Photon>();
  }

  public reset(): void {
    this.removeAllPhotons();
  }

  public addPhoton( photon: Photon ): void {
    assert && assert( !this.photons.includes( photon ), 'Attempted to add photon more than once.' );
    this.photons.add( photon );
  }

  public removePhoton( photon: Photon ): void {
    assert && assert( this.photons.includes( photon ), 'Attempted to remove a photon that does not exist.' );
    this.photons.remove( photon );
  }

  public removeAllPhotons(): void {
    this.photons.clear();
  }

  public addPhotonAddedListener( listener: ( photon: Photon ) => void ): void {
    this.photons.addItemAddedListener( listener );
  }

  public addPhotonRemovedListener( listener: ( photon: Photon ) => void ): void {
    this.photons.addItemRemovedListener( listener );
  }

  /**
   * Advances the state of the photons.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {

    // This may change this.photons, so operate on a copy of the array.
    this.photons.getArrayCopy().forEach( photon => {

      // Move the photon before processing it, because this.hydrogenAtomProperty.value.step has been called.
      // If we move the photon after processing it, then the photon will be processed when it is 1 time step
      // behind the state of the atom.
      photon.move( dt );

      // If the photon leaves the zoomed-in box, remove it. Otherwise, allow the atom to process it.
      if ( !this.zoomedInBox.containsPhoton( photon ) ) {
        this.removePhoton( photon );
        photon.dispose(); //TODO delete this?
      }
      else {
        this.hydrogenAtomProperty.value.processPhoton( photon );
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonSystem', PhotonSystem );