// Copyright 2016-2024, University of Colorado Boulder

/**
 * Photon is the model of a photon. A photon has a wavelength, position, direction, and moves with constant speed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import TProperty from '../../../../axon/js/TProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Particle, { ParticleOptions } from './Particle.js';
import MOTHAConstants from '../MOTHAConstants.js';

type SelfOptions = {
  wavelength: number; // the photon's immutable wavelength
  wasEmitted?: boolean; // was this photon emitted by the atom?
  hasCollided?: boolean; // did this photon already collide with the atom?
};

type PhotonOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius' | 'speed'>;

export default class Photon extends Particle {

  public readonly wavelength: number;
  public readonly wasEmitted: boolean;
  public hasCollidedProperty: TProperty<boolean>;

  public constructor( providedOptions: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions, ParticleOptions>()( {

      // SelfOptions
      wasEmitted: false,
      hasCollided: false,

      // ParticleOptions
      radius: MOTHAConstants.PHOTON_RADIUS,
      speed: MOTHAConstants.PHOTON_INITIAL_SPEED

      //TODO phetioType: Photon.PhotonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );

    this.wavelength = options.wavelength;
    this.wasEmitted = options.wasEmitted;

    this.hasCollidedProperty = new BooleanProperty( options.hasCollided, {
      tandem: options.tandem.createTandem( 'hasCollidedProperty' ),
      phetioReadOnly: true
    } );
  }

  public override dispose(): void {
    this.hasCollidedProperty.dispose();
    super.dispose();
  }

  /**
   * For debugging and logging only. Do not rely on the format of this string!
   */
  public override toString(): string {
    return super.toString() + ` wavelength=${this.wavelength}`;
  }
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );