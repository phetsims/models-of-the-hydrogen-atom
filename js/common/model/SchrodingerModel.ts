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

modelsOfTheHydrogenAtom.register( 'SchrodingerModel', SchrodingerModel );