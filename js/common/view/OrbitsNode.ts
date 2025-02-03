// Copyright 2022-2025, University of Colorado Boulder

/**
 * OrbitsNode is the set of 2D orbits that are followed by the electron. It is used in the Bohr and de Broglie models.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Path } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import MOTHAConstants from '../MOTHAConstants.js';
import MOTHAColors from '../MOTHAColors.js';
import { Shape } from '../../../../kite/js/imports.js';
import QuantumElectron from '../model/QuantumElectron.js';

export default class OrbitsNode extends Path {

  public constructor( hydrogenAtomPosition: Vector2, modelViewTransform: ModelViewTransform2 ) {

    const shape = new Shape();
    for ( let n = QuantumElectron.GROUND_STATE; n <= QuantumElectron.MAX_STATE; n++ ) {
      const radius = modelViewTransform.modelToViewDeltaX( BohrModel.getElectronOrbitRadius( n ) );
      shape.circle( 0, 0, radius );
      shape.newSubpath();
    }

    super( shape, {
      isDisposable: false,
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ],
      center: modelViewTransform.modelToViewPosition( hydrogenAtomPosition )
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'OrbitsNode', OrbitsNode );