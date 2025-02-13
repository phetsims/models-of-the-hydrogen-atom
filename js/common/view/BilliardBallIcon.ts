// Copyright 2025, University of Colorado Boulder

/**
 * BilliardBallIcon is the icon that represents the Billiard Ball atomic model in the user interface.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import MOTHAColors from '../MOTHAColors.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import MOTHAConstants from '../MOTHAConstants.js';

export default class BilliardBallIcon extends ShadedSphereNode {

  public constructor() {
    super( 15, combineOptions<ShadedSphereNodeOptions>( {}, MOTHAConstants.SHADED_SPHERE_NODE_OPTIONS, {
      mainColor: MOTHAColors.billiardBallColorProperty,
      highlightColor: MOTHAColors.billiardBallHighlightColorProperty
    } ) );
  }
}

modelsOfTheHydrogenAtom.register( 'BilliardBallIcon', BilliardBallIcon );