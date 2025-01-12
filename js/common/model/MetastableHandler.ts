// Copyright 2024, University of Colorado Boulder

//TODO Is the Java version really using step, or just calling exciteAtom?
/**
 *  MetastableHandler handles a case where the Schrodinger model can get stuck in state (n,l,m) = (2,0,0). This state
 *  is known as a metastable state. The only way to get out of this state is to absorb a photon that 'excites' the
 *  atom (takes the electron to a higher state, a higher value of n). While the light is emitting white light and the
 *  atom is in state (2,0,0), we fire an absorbable photon at the atom's center every MAX_STUCK_TIME milliseconds.
 *
 *  Ported from MetastableHandler.java, with many changes.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PhetioObject, { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHASymbols from '../MOTHASymbols.js';
import Light from './Light.js';
import SchrodingerQuantumNumbers from './SchrodingerQuantumNumbers.js';
import photonAbsorptionModel from './PhotonAbsorptionModel.js';

const EXCITE_ATOM_INTERVAL = 2; // seconds TODO Java values was 100 (ms?)

type SelfOptions = EmptySelfOptions;

type MetastableHandlerOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class MetastableHandler extends PhetioObject {

  public static readonly METASTABLE_STATE = new SchrodingerQuantumNumbers( 2, 0, 0 );

  private readonly light: Light;

  // Whether the MetastableHandler is active, and will automatically attempt to excite the atom.
  private readonly isActiveProperty: TReadOnlyProperty<boolean>;

  // Elapsed time since attempting to excite the atom to a higher state, in seconds.
  private readonly elapsedTimeProperty: Property<number>;

  // Whether the atom in the metastable state (n,l,m) = (2,0,0)
  private readonly isMetastableStateProperty: TReadOnlyProperty<boolean>;

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      isMetastableStateProperty: TReadOnlyProperty<boolean>,
                      light: Light,
                      providedOptions: MetastableHandlerOptions ) {

    const options = optionize<MetastableHandlerOptions, SelfOptions, PhetioObjectOptions>()( {

      // PhetioObjectOptions
      phetioState: false,
      phetioDocumentation: 'Supports transitioning the atom to a higher state when in the metastable state (n,l,m) = (2,0,0)'
    }, providedOptions );

    super( options );

    this.isMetastableStateProperty = isMetastableStateProperty;
    this.light = light;

    this.isActiveProperty = new DerivedProperty(
      [ isMetastableStateProperty, light.isOnProperty, light.lightModeProperty ],
      ( isMetastableState, lightIsOn, lightMode ) => isMetastableState && lightIsOn && lightMode === 'white', {
        tandem: options.tandem.createTandem( 'isActiveProperty' ),
        phetioValueType: BooleanIO,
        phetioDocumentation: 'For internal use only.'
      } );

    this.elapsedTimeProperty = new NumberProperty( 0, {
      units: 's',
      tandem: options.tandem.createTandem( 'elapsedTimeProperty' ),
      phetioDocumentation: 'Elapsed time since attempting to excite the atom to a higher state.',
      phetioReadOnly: true
    } );

    this.isActiveProperty.lazyLink( isActive => {
      if ( !isActive ) {
        this.elapsedTimeProperty.value = 0;
      }
    } );
  }

  public reset(): void {
    this.elapsedTimeProperty.reset();
  }

  public step( dt: number ): void {
    if ( this.isActiveProperty.value ) {
      this.elapsedTimeProperty.value += dt;
      if ( this.elapsedTimeProperty.value >= EXCITE_ATOM_INTERVAL ) {
        this.exciteAtom();
        this.elapsedTimeProperty.value = 0;
      }
    }
  }

  /**
   * Attempts to excite the atom (take it to a higher state) by telling the light to emit one absorbable photon towards
   * the atom's center. The absorption wavelength that will take the electron to a higher state (n) is chosen at random.
   */
  public exciteAtom(): void {
    assert && assert( this.isMetastableStateProperty.value );

    // Randomly choose an absorption wavelength. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/55.
    const wavelengths = photonAbsorptionModel.getAbsorptionWavelengths( MetastableHandler.METASTABLE_STATE.n );
    const wavelength = wavelengths[ dotRandom.nextInt( wavelengths.length ) ];

    // Tell the light to emit a photon, and direct it towards the center of the atom.
    this.light.createPhotonAtCenter( wavelength );

    phet.log && phet.log( `MetastableHandler.exciteAtom ${MOTHASymbols.lambda}=${wavelength}` );
  }
}

modelsOfTheHydrogenAtom.register( 'MetastableHandler', MetastableHandler );