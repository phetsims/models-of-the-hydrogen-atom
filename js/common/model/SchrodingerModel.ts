// Copyright 2019-2022, University of Colorado Boulder

/**
 * SchrodingerModel is a predictive model of the hydrogen atom.
 *
 * Physical representation:
 * Electron is a probability density field. Proton is at the center, visible only when the probability density
 * field strength is below a threshold value. The atom's state has 3 components (n,l,m). See transition rules below.
 *
 * Wavefunction:
 * This implementation solves the 3D Schrodinger wavefunction, used to compute probability density values in 3D space.
 *
 * Collision behavior:
 * Identical to the "brightness" views of de Broglie, which is why this class is an extension of DeBroglieModel.
 *
 * Absorption behavior:
 * Identical to Bohr and de Broglie.
 *
 * Emission behavior:
 * Both spontaneous and stimulated emission are similar to Bohr and de Broglie, but the rules for transitions (see below)
 * are more complicated.
 *
 * Transition rules:
 * All the following rules must be obeyed when choosing a transition. Note that transitions from state nlm=(2,0,0)
 * are a special case. The lower state (1,0,0) is not possible since it violates the abs(l-l')=1 rule. The only way to
 * get out of this state (2,0,0) is by going to a higher state.
 *
 *   n = [1...6] as in Bohr and de Broglie
 *   l = [0...n-1]
 *   m = [-l...+l]
 *   abs(l-l') = 1
 *   abs(m-m') < 1
 *   n transitions have varying transition strengths
 *   valid l and m transitions have equal probability
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import schrodingerButton_png from '../../../images/schrodingerButton_png.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import ZoomedInBox from './ZoomedInBox.js';
import Photon from './Photon.js';
import DeBroglieModel, { DeBroglieModelOptions } from './DeBroglieModel.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import BohrModel from './BohrModel.js';

/*
 * This table defines the transition strengths for the primary state component (n).
 * Some entries in this table are nonsensical, but their strengths are zero, and it helps to have a symmetrical table.
 * This table was taken from the Java simulation design document.
 *
 * Note that the table indexing is zero-indexed, while transitions are 1-based.
 * Here's an example that shows how the table is indexed:
 * TRANSITION_STRENGTH[5][0] is the transition strength from n=6 to n=1
 */
const TRANSITION_STRENGTH = [
  [ 0, 0, 0, 0, 0 ],
  [ 12.53, 0, 0, 0, 0 ],
  [ 3.34, 0.87, 0, 0, 0 ],
  [ 1.36, 0.24, 0.07, 0, 0 ],
  [ 0.69, 0.11, 0, 0.04, 0 ],
  [ 0.39, 0.06, 0.02, 0, 0 ]
];
assert && assert( TRANSITION_STRENGTH.length === BohrModel.getNumberOfStates() );

type SelfOptions = EmptyObjectType;

export type SchrodingerModelOptions = SelfOptions & DeBroglieModelOptions;

export default class SchrodingerModel extends DeBroglieModel {

  // secondary electron state number (l)
  public readonly secondaryElectronStateProperty: NumberProperty;

  // tertiary electron state number (m)
  public readonly tertiaryElectronStateProperty: NumberProperty;

  public constructor( zoomedInBox: ZoomedInBox, providedOptions: SchrodingerModelOptions ) {

    const options = optionize<SchrodingerModelOptions, SelfOptions, DeBroglieModelOptions>()( {

      // DeBroglieModelOptions
      displayName: modelsOfTheHydrogenAtomStrings.schrodinger,
      iconHTMLImageElement: schrodingerButton_png
    }, providedOptions );

    super( zoomedInBox, options );

    this.secondaryElectronStateProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      //TODO range is dynamic [0,n-1]
      tandem: options.tandem.createTandem( 'secondaryElectronStateProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'secondary electron state (l)'
    } );

    this.tertiaryElectronStateProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      //TODO range is dynamic [-l,+l]
      tandem: options.tandem.createTandem( 'tertiaryElectronStateProperty' ),
      phetioReadOnly: true,
      phetioDocumentation: 'tertiary electron state (m)'
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public override step( dt: number ): void {
    //TODO
  }

  public override movePhoton( photon: Photon, dt: number ): void {
    //TODO
    photon.move( dt );
  }
}

/*
 * Chooses a value for the secondary electron state (l) based on the primary state (n).
 * The new value l' must be in [0,...n-1], and l-l' must be in [-1,1].
 * This is a direct port from the Java version.
 *
 * @param nNew - the new primary state
 * @param lOld - the existing secondary state
 */
//TODO delete when this function is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getNewSecondaryElectronState( nNew: number, lOld: number ): number {
  assert && assert( Number.isInteger( nNew ) );
  assert && assert( Number.isInteger( lOld ) );

  let lNew = 0;

  if ( lOld === 0 ) {
    lNew = 1;
  }
  else if ( lOld === nNew ) {
    lNew = lOld - 1;
  }
  else if ( lOld === nNew - 1 ) {
    lNew = lOld - 1;
  }
  else {
    if ( dotRandom.nextBoolean() ) {
      lNew = lOld + 1;
    }
    else {
      lNew = lOld - 1;
    }
  }

  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Math.abs( lNew - lOld ) === 1 );
  return lNew;
}

/*
 * Chooses a value for the tertiary electron state (m) based on the primary state (l).
 * The new value m' must be in [-l,...,+l], and m-m' must be in [-1,0,1].
 * This is a direct port from the Java version.
 *
 * @param lNew - the new secondary state
 * @param mOld - the existing tertiary state
 */
//TODO delete when this function is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getNewTertiaryElectronState( lNew: number, mOld: number ) {
  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Number.isInteger( mOld ) );

  let mNew = 0;

  if ( lNew === 0 ) {
    mNew = 0;
  }
  else if ( mOld > lNew ) {
    mNew = lNew;
  }
  else if ( mOld < -lNew ) {
    mNew = -lNew;
  }
  else if ( mOld === lNew ) {
    const a = dotRandom.nextInt( 2 );
    if ( a === 0 ) {
      mNew = mOld;
    }
    else {
      mNew = mOld - 1;
    }
  }
  else if ( mOld === -lNew ) {
    const a = dotRandom.nextInt( 2 );
    if ( a === 0 ) {
      mNew = mOld;
    }
    else {
      mNew = mOld + 1;
    }
  }
  else {
    const a = dotRandom.nextInt( 3 );
    if ( a === 0 ) {
      mNew = mOld + 1;
    }
    else if ( a === 1 ) {
      mNew = mOld - 1;
    }
    else {
      mNew = mOld;
    }
  }

  assert && assert( Number.isInteger( mNew ) );
  assert && assert( mNew >= -lNew && mNew <= lNew );
  assert && assert( mNew === -1 || mNew === 0 || mNew === 1 );
  return mNew;
}

/**
 * Checks state transition rules to see if a proposed transition is valid.
 */
//TODO delete when this function is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isaValidTransition( nOld: number, lOld: number, mOld: number, nNew: number, lNew: number, mNew: number, numberOfStates: number ) {
  assert && assert( Number.isInteger( nOld ) );
  assert && assert( Number.isInteger( lOld ) );
  assert && assert( Number.isInteger( mOld ) );
  assert && assert( Number.isInteger( nNew ) );
  assert && assert( Number.isInteger( lNew ) );
  assert && assert( Number.isInteger( mNew ) );
  assert && assert( Number.isInteger( numberOfStates ) && numberOfStates > 0 );

  return isValidState( nNew, lNew, mNew, numberOfStates ) &&
         ( nOld !== nNew ) &&
         ( lNew >= 0 && lNew <= nNew - 1 ) &&
         ( Math.abs( lOld - lNew ) === 1 ) &&
         ( Math.abs( mOld - mNew ) <= 1 );
}

/**
 * Validates an electron state.
 */
function isValidState( n: number, l: number, m: number, numberOfStates: number ) {
  assert && assert( Number.isInteger( n ) );
  assert && assert( Number.isInteger( l ) );
  assert && assert( Number.isInteger( m ) );
  assert && assert( Number.isInteger( numberOfStates ) && numberOfStates > 0 );

  return ( n >= MOTHAConstants.GROUND_STATE && n <= MOTHAConstants.GROUND_STATE + numberOfStates ) &&
         ( l >= 0 && l <= n - 1 ) &&
         ( m >= -l && m <= l );
}

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );