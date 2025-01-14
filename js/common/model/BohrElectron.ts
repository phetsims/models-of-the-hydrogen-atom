// Copyright 2024, University of Colorado Boulder

/**
 * BohrElectron is the Electron specialized for the Bohr model. It adds Properties needed by that model, but the model
 * is still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAUtils from '../MOTHAUtils.js';
import BohrModel from './BohrModel.js';
import Electron from './Electron.js';
import Tandem from '../../../../tandem/js/Tandem.js';

export default class BohrElectron extends Electron {

  // n, the principal quantum number
  public readonly nProperty: NumberProperty;

  // Energy of the electron in its current state, in eV.
  public readonly energyProperty: TReadOnlyProperty<number>;

  // Time that the electron has been in its current state, in seconds.
  public readonly timeInStateProperty: Property<number>;

  // Angle of the electron along its orbit, in radians.
  public readonly angleProperty: Property<number>;

  // Offset of the electron from the atom's center.
  private readonly offsetProperty: TReadOnlyProperty<Vector2>;

  public constructor( atomPosition: Vector2, tandem: Tandem ) {

    const options = {
      position: atomPosition,
      tandem: tandem
    };

    super( options );

    this.nProperty = new NumberProperty( MOTHAConstants.GROUND_STATE, {
      numberType: 'Integer',
      range: new Range( MOTHAConstants.GROUND_STATE, MOTHAConstants.MAX_STATE ),
      tandem: options.tandem.createTandem( 'nProperty' ),
      phetioDocumentation: 'n, the principal quantum number.',
      phetioFeatured: true,
      phetioReadOnly: true
    } );
    phet.log && this.nProperty.lazyLink( ( nNew, nOld ) => phet.log( `BohrElectron: n ${nOld} -> ${nNew}` ) );

    this.energyProperty = new DerivedProperty( [ this.nProperty ], n => BohrElectron.getEnergy( n ), {
      units: 'eV',
      tandem: options.tandem.createTandem( 'energyProperty' ),
      phetioFeatured: true,
      phetioValueType: NumberIO
    } );

    this.timeInStateProperty = new NumberProperty( 0, {
      units: 's',
      tandem: options.tandem.createTandem( 'timeInStateProperty' ),
      phetioDocumentation: 'Time that the electron has been in its current state.',
      phetioReadOnly: true
    } );

    // When the electron changes state, reset timeInStateProperty.
    this.nProperty.link( () => {
      if ( !isSettingPhetioStateProperty.value ) {
        this.timeInStateProperty.value = 0;
      }
    } );

    // The Java version started at a different angle each time reset, but that conflicts with PhET-iO.
    this.angleProperty = new NumberProperty( 0, {
      units: 'radians',
      tandem: options.tandem.createTandem( 'angleProperty' ),
      phetioReadOnly: true
    } );

    this.offsetProperty = new DerivedProperty(
      [ this.nProperty, this.angleProperty ],
      ( n, angle ) => {
        const radius = BohrModel.getElectronOrbitRadius( n );
        return MOTHAUtils.polarToCartesian( radius, angle );
      }, {
        tandem: options.tandem.createTandem( 'offsetProperty' ),
        phetioDocumentation: 'Offset of the electron from the center of the atom.',
        phetioValueType: Vector2.Vector2IO
      } );

    this.offsetProperty.link( offset => {
      this.positionProperty.value = atomPosition.plus( offset );
    } );
  }

  public override reset(): void {
    this.nProperty.reset();
    this.timeInStateProperty.reset();
    this.angleProperty.reset();
    super.reset();
  }

  /**
   * Gets the electron's energy in state n, in eV.
   */
  public static getEnergy( n: number ): number {
    assert && assert( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.MAX_STATE );
    return MOTHAConstants.E1 / ( n * n );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrElectron', BohrElectron );