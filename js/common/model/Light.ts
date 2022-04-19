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
import VisibleColor from '../../../../scenery-phet/js/VisibleColor.js';
import { IColor } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

export default class Light {

  // is the light on?
  public readonly onProperty: BooleanProperty;

  // whether the light is monochromatic (true) or full spectrum (false)
  public readonly monochromaticEnabledProperty: BooleanProperty;

  // wavelength in nm, relevant only for monochromatic mode
  public readonly wavelengthProperty: NumberProperty;

  // color displayed by the view
  public readonly colorProperty: IReadOnlyProperty<IColor>;

  constructor() {

    this.onProperty = new BooleanProperty( false );

    this.monochromaticEnabledProperty = new BooleanProperty( false );

    this.wavelengthProperty = new NumberProperty( VisibleColor.MIN_WAVELENGTH, {
      range: new Range( VisibleColor.MIN_WAVELENGTH, VisibleColor.MAX_WAVELENGTH )
    } );

    this.colorProperty = new DerivedProperty(
      [ this.monochromaticEnabledProperty, this.wavelengthProperty ],
      ( monochromaticEnabled: boolean, wavelength: number ) => {
        return monochromaticEnabled ? VisibleColor.wavelengthToColor( wavelength ) : 'white';
      }
    );
  }

  public reset(): void {
    this.onProperty.reset();
    this.monochromaticEnabledProperty.reset();
    this.wavelengthProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'Light', Light );