// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieBrightnessNode show the 'brightness' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';

type SelfOptions = EmptyObjectType;

type DeBroglieBrightnessNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglieBrightnessNode extends Node {

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglieBrightnessNodeOptions ) {

    const options = optionize<DeBroglieBrightnessNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === 'brightness' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
        } )
    }, providedOptions );

    super( options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieBrightnessNode', DeBroglieBrightnessNode );