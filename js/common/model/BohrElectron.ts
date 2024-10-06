// Copyright 2024, University of Colorado Boulder

/**
 * BohrElectron is the Electron specialized for the Bohr model. It adds Properties needed by that model, but the model
 * is still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Electron, { ElectronOptions } from './Electron.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Range from '../../../../dot/js/Range.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import MOTHAUtils from '../MOTHAUtils.js';
import BohrModel from './BohrModel.js';

type SelfOptions = EmptySelfOptions;

type BohrElectronOptions = SelfOptions & ElectronOptions;

export default class BohrElectron extends Electron {

  // n, the principal quantum number
  public readonly nProperty: NumberProperty;

  // Energy of the electron in its current state, in eV.
  public readonly energyProperty: TReadOnlyProperty<number>;

  // Time that the electron has been in its current state, in seconds.
  public readonly timeInStateProperty: Property<number>;

  // Direction of the electron, in radians.
  //TODO This is not the direction of the electron, it is the angle around the orbit.
  public readonly directionProperty: Property<number>;

  // Offset of the electron from the atom's center.
  public readonly offsetProperty: TReadOnlyProperty<Vector2>;

  public constructor( providedOptions: BohrElectronOptions ) {

    const options = optionize<BohrElectronOptions, SelfOptions, ElectronOptions>()( {
      //TODO options
    }, providedOptions );

    super( options );

    this.nProperty = new NumberProperty( MOTHAConstants.GROUND_STATE, {
      numberType: 'Integer',
      range: new Range( MOTHAConstants.GROUND_STATE, MOTHAConstants.MAX_STATE ),
      tandem: options.tandem.createTandem( 'nProperty' ),
      phetioReadOnly: true,
      phetioFeatured: true,
      phetioDocumentation: 'n, the principal quantum number.'
    } );
    phet.log && this.nProperty.lazyLink( ( nNew, nOld ) => phet.log( `BohrElectron: n ${nOld} -> ${nNew}` ) );

    //TODO This was discussed at 8/22/24 PhET-iO design meeting. Do we need it?
    this.energyProperty = new DerivedProperty( [ this.nProperty ], n => MOTHAConstants.E1 / ( n * n ), {
      units: 'eV',
      phetioValueType: NumberIO,
      tandem: options.tandem.createTandem( 'energyProperty' )
    } );

    this.timeInStateProperty = new NumberProperty( 0, {
      units: 's',
      tandem: options.tandem.createTandem( 'timeInStateProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'Time that the electron has been in its current state.'
    } );

    // When the electron changes state, reset timeInStateProperty.
    this.nProperty.link( () => {
      if ( !isSettingPhetioStateProperty.value ) {
        this.timeInStateProperty.value = 0;
      }
    } );

    //TODO we want this to start at a different angle each time reset, but that conflicts with PhET-iO
    this.directionProperty = new NumberProperty( MOTHAUtils.nextAngle(), {
      units: 'radians',
      tandem: options.tandem.createTandem( 'directionProperty' ),
      phetioReadOnly: true
    } );

    //TODO make this go away, just set electron.positionProperty directly
    this.offsetProperty = new DerivedProperty(
      [ this.nProperty, this.directionProperty ],
      ( n, direction ) => {
        const radius = BohrModel.getElectronOrbitRadius( n );
        return MOTHAUtils.polarToCartesian( radius, direction );
      }, {
        tandem: options.tandem.createTandem( 'offsetProperty' ),
        phetioValueType: Vector2.Vector2IO,
        phetioDocumentation: 'Offset of the electron from the center of the atom.'
      } );
  }

  public override reset(): void {
    this.nProperty.reset();
    this.timeInStateProperty.reset();
    this.directionProperty.reset();
    super.reset();
  }
}

modelsOfTheHydrogenAtom.register( 'BohrElectron', BohrElectron );