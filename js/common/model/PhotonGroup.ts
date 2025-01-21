// Copyright 2025, University of Colorado Boulder

/**
 * PhotonGroup is a PhetioGroup that manages Photon instances as dynamic PhET-iO Elements.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Photon, { PhotonOptions } from './Photon.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ZoomedInBox from './ZoomedInBox.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import HydrogenAtom from './HydrogenAtom.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import { Color } from '../../../../scenery/js/imports.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetioGroup from '../../../../tandem/js/PhetioGroup.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAConstants from '../MOTHAConstants.js';

// tandem is omitted because photonGroup provides the tandem.
type PhotonGroupCreateElementOptions = StrictOmit<PhotonOptions, 'tandem'>;

// Arguments to createElement, other than tandem.
type PhotonGroupCreateElementArguments = [ PhotonGroupCreateElementOptions ];

export default class PhotonGroup extends PhetioGroup<Photon, PhotonGroupCreateElementArguments> {

  // the zoomed-in part of the box of hydrogen
  private readonly zoomedInBox: ZoomedInBox;

  // the hydrogen-atom model that is selected: either the experiment or a predictive model.
  private readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  public constructor( zoomedInBox: ZoomedInBox, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    const createPhoton = ( tandem: Tandem, photonOptions: PhotonGroupCreateElementOptions ) =>
      new Photon( combineOptions<PhotonOptions>( {
        tandem: tandem
      }, photonOptions ) );

    // defaultArguments, passed to createElement during API harvest
    const defaultArguments: PhotonGroupCreateElementArguments = [ {
      wavelength: MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.min //TODO Can we get rid of this? Or what should the default be?
    } ];

    super( createPhoton, defaultArguments, {
      isDisposable: false,
      phetioType: PhetioGroup.PhetioGroupIO( Photon.PhotonIO ),
      tandem: tandem
    } );

    this.zoomedInBox = zoomedInBox;
    this.hydrogenAtomProperty = hydrogenAtomProperty;
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
   * Adds a photon and notifies listeners.
   */
  private addPhoton( photonOptions: PhotonGroupCreateElementOptions ): Photon {
    return this.createNextElement( photonOptions );
  }

  /**
   * Removes a photon and notifies listeners.
   */
  public removePhoton( photon: Photon ): void {
    assert && assert( this.includes( photon ), 'Photon is not a member of photonGroup.' );
    this.disposeElement( photon );
  }

  /**
   * Removes all photons and notifies listeners.
   */
  public removeAllPhotons(): void {
    this.clear();
  }

  /**
   * Advances the state of all photons.
   * @param dt - the time step, in seconds
   */
  public step( dt: number ): void {

    // this.photonGroup may be changed, so iterate on a shallow copy.
    this.getArrayCopy().forEach( photon => {

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

modelsOfTheHydrogenAtom.register( 'PhotonGroup', PhotonGroup );