// Copyright 2024-2025, University of Colorado Boulder

/**
 *  MetastableHandler handles a case where the Schrodinger model can get stuck in state (n,l,m) = (2,0,0). This state
 *  is known as a metastable state. The only way to get out of this state is to absorb a photon that 'excites' the
 *  atom (takes the electron to a higher state, a higher value of n).
 *
 *  Automatic excitation occurs when the light is emitting white light and the atom is in state (2,0,0). In this case,
 *  the step method fires an absorbable photon at the atom's center every MAX_STUCK_TIME ms.
 *
 *  Manual excitation occurs when the light is emitting monochromatic light. In this case, the user must manually
 *  fire an absorbable photon at the atom's center by pressing the 'Excite Atom' button.
 *
 *  To get into the metastable state:
 *  1. Select the Schrodinger atomic model.
 *  2. Select 'Fast' time speed, so you don't have to wait as long.
 *  3. Set the light source to 'Monochromatic' and 94 nm.
 *  4. Turn on the light source.
 *  5. Wait for the electron to get into the metastable state.
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
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHASymbols from '../MOTHASymbols.js';
import LightSource from './LightSource.js';
import SchrodingerQuantumNumbers from './SchrodingerQuantumNumbers.js';
import photonAbsorptionModel from './PhotonAbsorptionModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';
import MOTHAColors from '../MOTHAColors.js';

// This is how often (in seconds) we automatically attempt to excite the atom when in the metastable state.
// This value was 100 ms in the Java version. But we decided that we want the electron to sit in the metastable state
// for enough time that the user can see it in the (n,l,m) readout and the Electron Energy Level diagram.
const EXCITE_ATOM_INTERVAL = 2;

export default class MetastableHandler extends PhetioObject {

  public static readonly METASTABLE_STATE = new SchrodingerQuantumNumbers( 2, 0, 0 );

  private readonly lightSource: LightSource;

  // Whether the MetastableHandler is active, and will automatically attempt to excite the atom.
  private readonly isActiveProperty: TReadOnlyProperty<boolean>;

  // Elapsed time since attempting to excite the atom to a higher state, in seconds.
  private readonly elapsedTimeProperty: Property<number>;

  // Whether the atom is in the metastable state (n,l,m) = (2,0,0)
  public readonly isMetastableStateProperty: TReadOnlyProperty<boolean>;

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>, lightSource: LightSource, tandem: Tandem ) {

    super( {
      tandem: tandem,
      phetioState: false,
      phetioDocumentation: 'Supports transitioning the atom to a higher state when in the metastable state (n,l,m) = (2,0,0).'
    } );

    this.isMetastableStateProperty = new DerivedProperty( [ nlmProperty ],
      nlm => nlm.equals( MetastableHandler.METASTABLE_STATE ), {
        tandem: tandem.createTandem( 'isMetastableStateProperty' ),
        phetioDocumentation: 'True when the atom is in the metastable state (n,l,m) = (2,0,0).',
        phetioFeatured: true,
        phetioValueType: BooleanIO
      } );

    this.lightSource = lightSource;

    // Active when the electron is in the metastable state, and the light source is on and emitting white light.
    this.isActiveProperty = new DerivedProperty(
      [ this.isMetastableStateProperty, lightSource.isOnProperty, lightSource.lightModeProperty ],
      ( isMetastableState, lightIsOn, lightMode ) => isMetastableState && lightIsOn && lightMode === 'white', {
        tandem: tandem.createTandem( 'isActiveProperty' ),
        phetioDocumentation: 'For internal use only.',
        phetioValueType: BooleanIO
      } );

    this.elapsedTimeProperty = new NumberProperty( 0, {
      units: 's',
      tandem: tandem.createTandem( 'elapsedTimeProperty' ),
      phetioDocumentation: 'Elapsed time since attempting to excite the atom to a higher state. For internal use only.',
      phetioReadOnly: true
    } );

    this.isActiveProperty.lazyLink( isActive => {
      if ( !isSettingPhetioStateProperty.value && !isActive ) {
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
   * This method is called from step() and from the 'Excite Atom' button listener.
   */
  public exciteAtom(): void {
    assert && assert( this.isMetastableStateProperty.value,
      'exciteAtom should only be called when the atom is in the metastable state.' );

    // Randomly choose an absorption wavelength. See https://github.com/phetsims/models-of-the-hydrogen-atom/issues/55.
    const wavelengths = photonAbsorptionModel.getAbsorptionWavelengths( MetastableHandler.METASTABLE_STATE.n );
    const wavelength = wavelengths[ dotRandom.nextInt( wavelengths.length ) ];

    // Tell the light to emit a photon, and direct it towards the center of the atom.
    // Running with ?showHalos, this photon will have a halo that makes it easier to see.
    this.lightSource.emitPhotonAtBottomCenter( wavelength, MOTHAColors.EXCITE_METASTABLE_HALO_COLOR );

    phet.log && phet.log( `MetastableHandler: exciteAtom ${MOTHASymbols.lambda}=${wavelength}`, {
      color: 'blue'
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'MetastableHandler', MetastableHandler );