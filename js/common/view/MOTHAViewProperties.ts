// Copyright 2015-2022, University of Colorado Boulder

/**
 * MOTHAViewProperties is the base class that defines Properties that are common to all screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationDeprecatedProperty from '../../../../axon/js/EnumerationDeprecatedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TimeSpeed from '../../../../scenery-phet/js/TimeSpeed.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

type SelfOptions = {};

export type MOTHAViewPropertiesOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MOTHAViewProperties {

  public readonly timeSpeedProperty: EnumerationDeprecatedProperty;

  //TODO should clock-related stuff be in model?
  // is the simulation running?
  public readonly runningProperty: BooleanProperty;

  //TODO should mode be in model?
  // whether we're viewing an experiment (true) or predictive (false) model
  public readonly experimentEnabledProperty: BooleanProperty;

  // are absorption wavelengths indicated on the wavelength slider?
  public readonly absorptionWavelengthsVisibleProperty: BooleanProperty;

  // is the Spectrometer accordion box expanded?
  public readonly spectrometerExpandedProperty: BooleanProperty;

  //  is the Electron Energy Level accordion box expanded?
  public readonly electronEnergyLevelExpandedProperty: BooleanProperty;

  //TODO for prototyping
  // number of spectrometer snapshots
  public readonly numberOfSnapshotsProperty: NumberProperty;

  constructor( providedOptions: MOTHAViewPropertiesOptions ) {

    const options = providedOptions;

    // @ts-ignore TODO port TimeSpeed to Enumeration
    this.timeSpeedProperty = new EnumerationDeprecatedProperty( TimeSpeed, TimeSpeed.NORMAL, {
      tandem: options.tandem.createTandem( 'timeSpeedProperty' )
    } );

    this.runningProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'runningProperty' )
    } );

    this.experimentEnabledProperty = new BooleanProperty( true, {
      tandem: options.tandem.createTandem( 'experimentEnabledProperty' )
    } );

    this.absorptionWavelengthsVisibleProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'absorptionWavelengthsVisibleProperty' )
    } );

    this.spectrometerExpandedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'spectrometerExpandedProperty' )
    } );

    this.electronEnergyLevelExpandedProperty = new BooleanProperty( false, {
      tandem: options.tandem.createTandem( 'electronEnergyLevelExpandedProperty' )
    } );

    this.numberOfSnapshotsProperty = new NumberProperty( 0, {
      tandem: options.tandem.createTandem( 'numberOfSnapshotsProperty' )
    } );
  }

  public reset(): void {
    this.timeSpeedProperty.reset();
    this.runningProperty.reset();
    this.experimentEnabledProperty.reset();
    this.absorptionWavelengthsVisibleProperty.reset();
    this.spectrometerExpandedProperty.reset();
    this.electronEnergyLevelExpandedProperty.reset();
    this.numberOfSnapshotsProperty.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'MOTHAViewProperties', MOTHAViewProperties );