// Copyright 2022, University of Colorado Boulder

//TODO should this Node be responsible for position?
/**
 * HydrogenAtomNode is the base class for all hydrogen-atom views.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = EmptySelfOptions;

export type HydrogenAtomNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> & PickOptional<NodeOptions, 'children'>;

export default class HydrogenAtomNode extends Node {

  /**
   * @param hydrogenAtom - the hydrogen atom associated with this Node
   * @param hydrogenAtomProperty - the hydrogen atom that is currently selected
   * @param providedOptions
   */
  protected constructor( hydrogenAtom: HydrogenAtom,
                         hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                         providedOptions: HydrogenAtomNodeOptions ) {

    const options = optionize<HydrogenAtomNodeOptions, SelfOptions, RectangleOptions>()( {
      //TODO default values for options
    }, providedOptions );

    options.visibleProperty = new DerivedProperty( [ hydrogenAtomProperty ],
      value => ( value === hydrogenAtom ), {
        tandem: options.tandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } );

    super( options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtomNode', HydrogenAtomNode );