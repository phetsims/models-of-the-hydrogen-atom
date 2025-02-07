// Copyright 2022-2025, University of Colorado Boulder

/**
 * HydrogenAtomNode is the base class for all hydrogen-atom views.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';

type SelfOptions = EmptySelfOptions;

export type HydrogenAtomNodeOptions = SelfOptions & PickOptional<NodeOptions, 'children' | 'tandem'>;

export default class HydrogenAtomNode extends Node {

  /**
   * @param thisHydrogenAtom - the hydrogen atom associated with this Node
   * @param hydrogenAtomProperty - the hydrogen atom that is currently selected
   * @param providedOptions
   */
  protected constructor( thisHydrogenAtom: HydrogenAtom,
                         hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                         providedOptions?: HydrogenAtomNodeOptions ) {

    const options = optionize<HydrogenAtomNodeOptions, SelfOptions, RectangleOptions>()( {

      // NodeOptions
      isDisposable: false,
      visibleProperty: new DerivedProperty( [ hydrogenAtomProperty ], hydrogenAtom => ( hydrogenAtom === thisHydrogenAtom ) )
    }, providedOptions );

    super( options );
  }

  /**
   * Steps the view.
   * @param dt - time step, in seconds
   */
  public step( dt: number ): void {
    // Default is to do nothing.
  }
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtomNode', HydrogenAtomNode );