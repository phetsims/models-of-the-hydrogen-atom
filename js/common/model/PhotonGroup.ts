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

// Options to createElement function. tandem is omitted because photonGroup provides the tandem.
type CreateElementOptions = StrictOmit<PhotonOptions, 'tandem'>;

// Arguments to createElement function, other than tandem.
type CreateElementArguments = [ CreateElementOptions ];

export default class PhotonGroup extends PhetioGroup<Photon, CreateElementArguments> {

  // the zoomed-in part of the box of hydrogen
  private readonly zoomedInBox: ZoomedInBox;

  // the hydrogen-atom model that is selected: either the experiment or a predictive model.
  private readonly hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>;

  public constructor( zoomedInBox: ZoomedInBox, hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>, tandem: Tandem ) {

    // Function that this group uses to create dynamic Photon elements.
    const createElement = ( tandem: Tandem, providedOptions: CreateElementOptions ) =>
      new Photon( combineOptions<PhotonOptions>( {
        tandem: tandem
      }, providedOptions ) );

    // defaultArguments, passed to createElement during API harvest. Any valid argument values will do here.
    const defaultArguments: CreateElementArguments = [ {
      wavelength: MOTHAConstants.MONOCHROMATIC_WAVELENGTH_RANGE.min
    } ];

    super( createElement, defaultArguments, {
      isDisposable: false,
      tandem: tandem,
      phetioType: PhetioGroup.PhetioGroupIO( Photon.PhotonIO )
    } );

    this.zoomedInBox = zoomedInBox;
    this.hydrogenAtomProperty = hydrogenAtomProperty;
  }

  /**
   * Emits a photon from the light source.
   */
  public emitPhotonFromLight( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color | null ): void {
    this.createNextElement( {
      wavelength: wavelength,
      position: position,
      direction: direction,
      wasEmittedByAtom: false,
      hasCollidedWithAtom: false,
      debugHaloColor: debugHaloColor
    } );
  }

  /**
   * Emits a photon from the hydrogen atom.
   */
  public emitPhotonFromAtom( wavelength: number, position: Vector2, direction: number, debugHaloColor: Color ): void {
    this.createNextElement( {
      wavelength: wavelength,
      position: position,
      direction: direction,
      wasEmittedByAtom: true,
      hasCollidedWithAtom: false,
      debugHaloColor: debugHaloColor
    } );
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
        this.disposeElement( photon );
      }
      else {
        this.hydrogenAtomProperty.value.processPhoton( photon );
      }
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'PhotonGroup', PhotonGroup );