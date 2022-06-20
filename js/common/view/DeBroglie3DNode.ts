// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglie3DNode show the '3D' view for the de Broglie model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Multilink from '../../../../axon/js/Multilink.js';
import optionize from '../../../../phet-core/js/optionize.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Node, NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import DeBroglieModel from '../model/DeBroglieModel.js';

type SelfOptions = EmptyObjectType;

type DeBroglie3DNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class DeBroglie3DNode extends Node {

  public constructor( hydrogenAtom: DeBroglieModel,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: DeBroglie3DNodeOptions ) {

    const options = optionize<DeBroglie3DNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      visibleProperty: new DerivedProperty( [ hydrogenAtom.deBroglieViewProperty ],
        deBroglieView => ( deBroglieView === '3D' ), {
          tandem: providedOptions.tandem.createTandem( 'visibleProperty' ),
          phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
        } )
    }, providedOptions );

    super( options );

    //TODO add other dependencies
    Multilink.multilink( [ this.visibleProperty ], visible => {
      visible && this.update();
    } );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }

  public step( dt: number ): void {
    //TODO implement or delete step
  }

  private update(): void {
    //TODO
  }

}

modelsOfTheHydrogenAtom.register( 'DeBroglie3DNode', DeBroglie3DNode );