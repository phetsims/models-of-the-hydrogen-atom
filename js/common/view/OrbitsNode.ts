// Copyright 2022-2024, University of Colorado Boulder

/**
 * OrbitsNode is the set of 2D orbits for a hydrogen atom's electron. It is used in the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Path, PathOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAColors from '../MOTHAColors.js';
import { Shape } from '../../../../kite/js/imports.js';

type SelfOptions = EmptySelfOptions;

type OrbitsNodeOptions = SelfOptions & PickRequired<PathOptions, 'tandem'>;

export default class OrbitsNode extends Path {

  public constructor( hydrogenAtomPosition: Vector2, modelViewTransform: ModelViewTransform2, providedOptions: OrbitsNodeOptions ) {

    const options = optionize<OrbitsNodeOptions, SelfOptions, PathOptions>()( {

      // NodeOptions
      isDisposable: false,
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ],
      center: modelViewTransform.modelToViewPosition( hydrogenAtomPosition )
    }, providedOptions );

    const shape = new Shape();
    for ( let n = MOTHAConstants.GROUND_STATE; n <= MOTHAConstants.MAX_STATE; n++ ) {
      const radius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );
      shape.circle( Vector2.ZERO, radius );
      shape.newSubpath();
    }

    super( shape, options );
  }
}

modelsOfTheHydrogenAtom.register( 'OrbitsNode', OrbitsNode );