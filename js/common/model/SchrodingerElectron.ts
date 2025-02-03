// Copyright 2025, University of Colorado Boulder

/**
 * SchrodingerElectron is the QuantumElectron specialized for the Schrodinger model of the hydrogen atom. It adds
 * Properties needed by that model, but the model is still responsible for all aspects of the electron's behavior.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import QuantumElectron from './QuantumElectron.js';
import SchrodingerQuantumNumbers from './SchrodingerQuantumNumbers.js';
import Property from '../../../../axon/js/Property.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

export default class SchrodingerElectron extends QuantumElectron {

  // Quantum numbers (n,l,m) that specify the wavefunction for the electron.
  private readonly _nlmProperty: Property<SchrodingerQuantumNumbers>;
  public readonly nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>;

  public constructor( atomPosition: Vector2, tandem: Tandem ) {

    const nlmProperty = new Property( new SchrodingerQuantumNumbers( 1, 0, 0 ), {
      phetioValueType: SchrodingerQuantumNumbers.SchrodingerQuantumNumbersIO,
      tandem: tandem.createTandem( 'nlmProperty' ),
      phetioDocumentation: 'The quantum numbers (n,l,m) that specify a wavefunction for the electron.',
      phetioFeatured: true,
      phetioReadOnly: true
    } );
    phet.log && nlmProperty.lazyLink( ( nlmNew, nlmOld ) =>
      phet.log( `SchrodingerElectron: (n,l,m) = ${nlmOld.toString()} -> ${nlmNew.toString()}` ) );

    const nProperty = new DerivedProperty( [ nlmProperty ], nlm => nlm.n );

    super( nProperty, atomPosition, tandem );

    this._nlmProperty = nlmProperty;
    this.nlmProperty = nlmProperty;
  }

  public override reset(): void {
    this._nlmProperty.reset();
    super.reset();
  }

  public override set_n( n: number ): void {
    this._nlmProperty.value = this.nlmProperty.value.getNextState( n );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerElectron', SchrodingerElectron );