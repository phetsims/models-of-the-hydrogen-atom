// Copyright 2022, University of Colorado Boulder

//TODO should this Node be responsible for position?
/**
 * HydrogenAtomNode is the base class for all hydrogen-atom views.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, RectangleOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import IReadOnlyProperty from '../../../../axon/js/IReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = EmptyObjectType;

export type HydrogenAtomNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'> & PickOptional<NodeOptions, 'children'>;

export default class HydrogenAtomNode extends Node {

  /**
   * @param hydrogenAtom - the hydrogen atom associated with this Node
   * @param hydrogenAtomProperty - the hydrogen atom that is currently selected
   * @param providedOptions
   */
  protected constructor( hydrogenAtom: HydrogenAtom,
                         hydrogenAtomProperty: IReadOnlyProperty<HydrogenAtom>,
                         providedOptions: HydrogenAtomNodeOptions ) {

    const options = optionize<HydrogenAtomNodeOptions, SelfOptions, RectangleOptions>()( {
      //TODO
    }, providedOptions );

    options.visibleProperty = new DerivedProperty( [ hydrogenAtomProperty ],
      value => ( value === hydrogenAtom ), {
        tandem: options.tandem.createTandem( 'visibleProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
      } );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtomNode', HydrogenAtomNode );