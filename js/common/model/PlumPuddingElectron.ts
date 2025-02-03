// Copyright 2024-2025, University of Colorado Boulder

/**
 * PlumPuddingElectron is the Electron specialized for the Plum Pudding model. It adds Properties needed by that
 * model, but the model is still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Electron, { ElectronOptions } from './Electron.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import dotRandom from '../../../../dot/js/dotRandom.js';

// Enumeration that describes the horizontal motion of the electron.
const XDirectionValues = [ 'left', 'right' ] as const;
type XDirection = ( typeof XDirectionValues )[number];

export default class PlumPuddingElectron extends Electron {

  // Is the electron moving?
  public readonly isMovingProperty: Property<boolean>;

  // Whether the electron's horizontal motion is to the left or right.
  private readonly xDirectionProperty: StringUnionProperty<XDirection>;

  // The amplitude of the electron just before the atom emitted its last photon and the electron stopped moving.
  public readonly previousAmplitudeProperty: Property<number>;

  public constructor( providedOptions: ElectronOptions ) {

    const options = providedOptions;

    super( options );

    this.isMovingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isMovingProperty' ),
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    this.xDirectionProperty = new StringUnionProperty<XDirection>( 'left', {
      validValues: XDirectionValues,
      tandem: options.tandem.createTandem( 'xDirectionProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );

    this.previousAmplitudeProperty = new NumberProperty( 0, {
      range: new Range( 0, 1 ),
      tandem: options.tandem.createTandem( 'previousAmplitudeProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );
  }

  public override reset(): void {
    this.isMovingProperty.reset();
    this.xDirectionProperty.reset();
    this.previousAmplitudeProperty.reset();
    super.reset();
  }

  /**
   * Gets the electron's current x direction.
   */
  public get xDirection(): XDirection {
    return this.xDirectionProperty.value;
  }

  /**
   * Sets a random x direction for the electron.
   */
  public setRandomXDirection(): void {
    this.xDirectionProperty.value = dotRandom.nextBoolean() ? 'right' : 'left';
  }

  /**
   * Reverses the x direction of the electron.
   */
  public reverseXDirection(): void {
    this.xDirectionProperty.value = ( this.xDirectionProperty.value === 'right' ) ? 'left' : 'right';
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingElectron', PlumPuddingElectron );