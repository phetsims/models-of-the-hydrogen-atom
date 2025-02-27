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
import Tandem from '../../../../tandem/js/Tandem.js';
import QuantumElectron from './QuantumElectron.js';

export default class BohrElectron extends QuantumElectron {

  // n, the principal quantum number. The superclass has a read-only reference, which cannot be set or reset,
  // to accommodate other atomic models where nProperty is a DerivedProperty (see SchrodingerElectron).
  // So we need a reference that can be set and reset. And it must be named _nProperty so that it does not
  // shadow/override nProperty in the superclass.
  private readonly _nProperty: NumberProperty;

  public constructor( atomPosition: Vector2, tandem: Tandem ) {

    const nProperty = new NumberProperty( QuantumElectron.GROUND_STATE, {
      numberType: 'Integer',
      range: new Range( QuantumElectron.GROUND_STATE, QuantumElectron.MAX_STATE ),
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

  /**
   * Sets the value of n, the principal quantum number.
   */
  public override set_n( n: number ): void {
    this._nProperty.value = n;
  }
}

modelsOfTheHydrogenAtom.register( 'BohrElectron', BohrElectron );