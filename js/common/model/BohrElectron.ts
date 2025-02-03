// Copyright 2024-2025, University of Colorado Boulder

/**
 * BohrElectron is the QuantumElectron specialized for the Bohr and de Broglie models. It adds Properties needed by those
 * models, but the models are still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import QuantumElectron from './QuantumElectron.js';

export default class BohrElectron extends QuantumElectron {

  // n, the principal quantum number
  private readonly _nProperty: NumberProperty;

  public constructor( atomPosition: Vector2, tandem: Tandem ) {

    const nProperty = new NumberProperty( MOTHAConstants.GROUND_STATE, {
      numberType: 'Integer',
      range: new Range( MOTHAConstants.GROUND_STATE, MOTHAConstants.MAX_STATE ),
      tandem: tandem.createTandem( 'nProperty' ),
      phetioDocumentation: 'n, the principal quantum number.',
      phetioFeatured: true,
      phetioReadOnly: true
    } );

    super( nProperty, atomPosition, tandem );

    this._nProperty = nProperty;
  }

  public override reset(): void {
    this._nProperty.reset();
    super.reset();
  }

  public override set_n( n: number ): void {
    this._nProperty.value = n;
  }
}

modelsOfTheHydrogenAtom.register( 'BohrElectron', BohrElectron );