// Copyright 2024, University of Colorado Boulder

/**
 * PlumPuddingElectron is the Electron specialized for the Plum Pudding model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Electron, { ElectronOptions } from './Electron.js';
import Property from '../../../../axon/js/Property.js';
import StringUnionProperty from '../../../../axon/js/StringUnionProperty.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';

export default class PlumPuddingElectron extends Electron {

  // Is the electron moving?
  public readonly isMovingProperty: Property<boolean>;

  // Whether the electron's horizontal motion is to the left or right.
  public readonly directionProperty: StringUnionProperty<'left' | 'right'>;

  public constructor( providedOptions: ElectronOptions ) {

    const options = providedOptions;

    super( options );

    this.isMovingProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'isMovingProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true
    } );

    this.directionProperty = new StringUnionProperty( 'left', {
      validValues: [ 'left', 'right' ],
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Whether the electron\'s horizontal motion is to the left or right.'
    } );
  }

  public override reset(): void {
    this.isMovingProperty.reset();
    this.directionProperty.reset();
    super.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'PlumPuddingElectron', PlumPuddingElectron );