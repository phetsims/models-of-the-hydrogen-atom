// Copyright 2015-2022, University of Colorado Boulder

/**
 * Light is the model of a light that shines into the box of hydrogen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Color } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { LightMode, LightModeValues } from './LightMode.js';

type SelfOptions = {};

type LightOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Light {

  // is the light on?
  public readonly onProperty: BooleanProperty;

  // whether the light is full spectrum (white) or monochromatic
  public readonly lightModeProperty: Property<LightMode>;

  // wavelength in nm, relevant only for monochromatic mode
  public readonly wavelengthProperty: NumberProperty;

  // color displayed by the view
  public readonly colorProperty: IReadOnlyProperty<Color | string>;

  constructor( providedOptions: LightOptions ) {

    const options = optionize<LightOptions, SelfOptions>()( {
      //TODO
    }, providedOptions );

    this.onProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'onProperty' )
    } );

    this.lightModeProperty = new Property<LightMode>( 'white', {
      validValues: LightModeValues,
      tandem: options.tandem.createTandem( 'lightModeProperty' ),
      phetioType: Property.PropertyIO( StringIO )
    } );

    this.wavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH ),
      tandem: options.tandem.createTandem( 'wavelengthProperty' )
    } );

    this.colorProperty = new DerivedProperty(
      [ this.lightModeProperty, this.wavelengthProperty ],
      ( lightMode, wavelength ) =>
        ( lightMode === 'white' ) ? Color.WHITE : VisibleColor.wavelengthToColor( wavelength ), {
        tandem: options.tandem.createTandem( 'colorProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( Color.ColorIO )
      } );
  }

  public reset(): void {
    this.onProperty.reset();
    this.lightModeProperty.reset();
    this.wavelengthProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Light', Light );