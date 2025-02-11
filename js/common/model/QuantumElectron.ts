// Copyright 2024-2025, University of Colorado Boulder

/**
 * QuantumElectron is a base class that specializes Electron for quantum models of the hydrogen atom
 * (Bohr, de Broglie, Schrodinger).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAUtils from '../MOTHAUtils.js';
import BohrModel from './BohrModel.js';
import Electron from './Electron.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// Electron energy in the ground state, in eV
const E1 = -13.6;

export default abstract class QuantumElectron extends Electron {

  // Values for n, which is often referred to as the 'electron state'.
  public static readonly GROUND_STATE = 1;
  public static readonly MAX_STATE = 6;
  public static readonly NUMBER_OF_STATES = QuantumElectron.MAX_STATE - QuantumElectron.GROUND_STATE + 1;

  // n, the principal quantum number.
  public readonly nProperty: TReadOnlyProperty<number>;

  // Energy of the electron in its current state, in eV.
  // This Property is private because it exists only as a PhET-iO convenience.
  private readonly energyProperty: TReadOnlyProperty<number>;

  // Time that the electron has been in its current state, in seconds.
  public readonly timeInStateProperty: Property<number>;

  // Angle of the electron along its orbit, in radians.
  public readonly angleProperty: Property<number>;

  // Offset of the electron from the atom's center, unitless.
  private readonly offsetProperty: TReadOnlyProperty<Vector2>;

  protected constructor( nProperty: TReadOnlyProperty<number>, atomPosition: Vector2, tandem: Tandem ) {

    // Compute the initial position of the electron.
    const initialAngle = 0;
    const initialPosition = atomPosition.plus( computeOffset( nProperty.value, initialAngle ) );

    super( {
      position: initialPosition,
      tandem: tandem
    } );

    this.nProperty = nProperty;

    this.energyProperty = new DerivedProperty( [ nProperty ], n => E1 / ( n * n ), {
      units: 'eV',
      tandem: tandem.createTandem( 'energyProperty' ),
      phetioFeatured: true,
      phetioValueType: NumberIO
    } );

    this.timeInStateProperty = new NumberProperty( 0, {
      units: 's',
      tandem: tandem.createTandem( 'timeInStateProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );

    // When the electron changes state, reset timeInStateProperty.
    nProperty.link( () => {
      if ( !isSettingPhetioStateProperty.value ) {
        this.timeInStateProperty.value = 0;
      }
    } );

    // The Java version started at a different angle each time reset, but that conflicts with PhET-iO.
    this.angleProperty = new NumberProperty( initialAngle, {
      units: 'radians',
      tandem: tandem.createTandem( 'angleProperty' ),
      phetioDocumentation: 'For internal use only.',
      phetioReadOnly: true
    } );

    this.offsetProperty = new DerivedProperty(
      [ nProperty, this.angleProperty ],
      ( n, angle ) => computeOffset( n, angle ), {
        tandem: tandem.createTandem( 'offsetProperty' ),
        phetioDocumentation: 'For internal use only.',
        phetioValueType: Vector2.Vector2IO
      } );

    this.offsetProperty.link( offset => {
      if ( !isSettingPhetioStateProperty.value ) {
        this.positionProperty.value = atomPosition.plus( offset );
      }
    } );
  }

  public override reset(): void {
    this.timeInStateProperty.reset();
    this.angleProperty.reset();
    super.reset();
  }

  /**
   * Sets the value of n, the principal quantum number.
   */
  public abstract set_n( n: number ): void;
}

/**
 * Computes the offset of the electron relative to the atom's position.
 */
function computeOffset( n: number, angle: number ): Vector2 {
  const radius = BohrModel.getElectronOrbitRadius( n );
  return MOTHAUtils.polarToCartesian( radius, angle );
}

assert && assert( QuantumElectron.GROUND_STATE === 1, 'A fundamental assumption of this sim is that n=1 is the ground state.' );

modelsOfTheHydrogenAtom.register( 'QuantumElectron', QuantumElectron );