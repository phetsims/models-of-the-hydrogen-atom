// Copyright 2016-2022, University of Colorado Boulder

/**
 * Photon is the model of a photon. A photon has a wavelength, position, direction, and moves with constant speed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import IProperty from '../../../../axon/js/IProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { IColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import Particle, { ParticleOptions } from './Particle.js';

let photonCounter = 0; //TODO delete this

type SelfOptions = {
  wavelength: number; // the photon's immutable wavelength
  wasEmitted?: boolean; // was this photon emitted by the atom?
  hasCollided?: boolean; // did this photon already collide with the atom?
};

type PhotonOptions = SelfOptions & StrictOmit<ParticleOptions, 'radius' | 'speed'>;

export default class Photon extends Particle {

  private readonly id: number;
  public readonly wavelength: number;
  public readonly wasEmitted: boolean;
  public hasCollidedProperty: IProperty<boolean>;

  public static INITIAL_SPEED = 400; // distance per second

  public constructor( providedOptions?: PhotonOptions ) {

    const options = optionize<PhotonOptions, SelfOptions, ParticleOptions>()( {

      // SelfOptions
      wasEmitted: false,
      hasCollided: false,

      // ParticleOptions
      radius: 15,
      speed: Photon.INITIAL_SPEED

      //TODO phetioType: Photon.PhotonIO,
      //TODO phetioDynamicElement: true
    }, providedOptions );

    super( options );

    this.id = photonCounter++;
    this.wavelength = options.wavelength;
    this.wasEmitted = options.wasEmitted;
    this.hasCollidedProperty = new BooleanProperty( options.hasCollided, {
      //TODO tandem: options.tandem.createTandem( 'hasCollidedProperty' )
    } );

    phet.log && this.positionProperty.lazyLink( position => phet.log( `photon ${this.id} moved: ${position}` ) );
  }

  public override dispose(): void {
    this.hasCollidedProperty.dispose();
    super.dispose();
  }

  /**
   * Gets the Color associated with the photon's wavelength.
   */
  public getColor(): IColor {
    return VisibleColor.wavelengthToColor( this.wavelength, {
      uvColor: MOTHAColors.UV_COLOR,
      irColor: MOTHAColors.IR_COLOR
    } );
  }

  /**
   * For debugging and logging only. Do not rely on the format of this string!
   */
  public override toString(): string {
    return super.toString() + ` wavelength=${this.wavelength}`;
  }
}

modelsOfTheHydrogenAtom.register( 'Photon', Photon );