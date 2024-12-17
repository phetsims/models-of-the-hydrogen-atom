// Copyright 2022-2024, University of Colorado Boulder

/**
 * HydrogenAtomNode is the base class for all hydrogen-atom views.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, RectangleOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import HydrogenAtom from '../model/HydrogenAtom.js';

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

      // NodeOptions
      isDisposable: false,
      visibleProperty: new DerivedProperty( [ hydrogenAtomProperty ],
        selectedHydrogenAtom => ( selectedHydrogenAtom === hydrogenAtom ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioValueType: BooleanIO
        } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'HydrogenAtomNode', HydrogenAtomNode );