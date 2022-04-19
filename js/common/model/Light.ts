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
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { Color } from '../../../../scenery/js/imports.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

type LightOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class Light {

  // is the light on?
  public readonly onProperty: BooleanProperty;

  // whether the light is monochromatic (true) or full spectrum (false)
  public readonly monochromaticEnabledProperty: BooleanProperty;

  // wavelength in nm, relevant only for monochromatic mode
  public readonly wavelengthProperty: NumberProperty;

  // color displayed by the view
  public readonly colorProperty: IReadOnlyProperty<Color | string>;

  constructor( providedOptions: LightOptions ) {

    const options = optionize<LightOptions, SelfOptions>( {
      //TODO
    }, providedOptions );

    this.onProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'onProperty' )
    } );

    this.monochromaticEnabledProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'monochromaticEnabledProperty' )
    } );

    this.wavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH ),
      tandem: options.tandem.createTandem( 'wavelengthProperty' )
    } );

    this.colorProperty = new DerivedProperty(
      [ this.monochromaticEnabledProperty, this.wavelengthProperty ],
      ( monochromaticEnabled: boolean, wavelength: number ) => {
        return monochromaticEnabled ? VisibleColor.wavelengthToColor( wavelength ) : Color.WHITE;
      }, {
        tandem: options.tandem.createTandem( 'colorProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( Color.ColorIO )
      } );
  }

  public reset(): void {
    this.onProperty.reset();
    this.monochromaticEnabledProperty.reset();
    this.wavelengthProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Light', Light );