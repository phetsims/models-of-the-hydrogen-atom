// Copyright 2015-2024, University of Colorado Boulder

/**
 * MOTHAViewProperties is the base class that defines Properties that are common to all screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Disposable from '../../../../axon/js/Disposable.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';

type SelfOptions = EmptySelfOptions;

export type MOTHAViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MOTHAViewProperties {

  // is the Spectrometer accordion box expanded?
  public readonly spectrometerExpandedProperty: Property<boolean>;

  public constructor( providedOptions: MOTHAViewPropertiesOptions ) {

    const options = providedOptions;

    this.spectrometerExpandedProperty = new BooleanProperty( MOTHAQueryParameters.expandAll, {
      tandem: options.tandem.createTandem( 'spectrometerExpandedProperty' )
    } );
  }

  public reset(): void {
    this.spectrometerExpandedProperty.reset();
  }

  public dispose(): void {
    Disposable.assertNotDisposable();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );