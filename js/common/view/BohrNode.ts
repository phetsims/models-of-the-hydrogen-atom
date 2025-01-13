// Copyright 2022-2025, University of Colorado Boulder

/**
 * BohrNode displays the Bohr model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ElectronNode from './ElectronNode.js';
import HydrogenAtomNode from './HydrogenAtomNode.js';
import OrbitsNode from './OrbitsNode.js';
import ProtonNode from './ProtonNode.js';
import MOTHAColors from '../MOTHAColors.js';

export default class BohrNode extends HydrogenAtomNode {

  public constructor( bohrModel: BohrModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2 ) {

    const orbitsNode = new OrbitsNode( bohrModel.position, modelViewTransform );

    const protonNode = new ProtonNode( bohrModel.proton, modelViewTransform );

    const electronNode = new ElectronNode( bohrModel.electron, modelViewTransform );

    super( bohrModel, hydrogenAtomProperty, {
      children: [ orbitsNode, protonNode, electronNode ]
    } );
  }

  /**
   * Creates the icon that represents this model in the user interface.
   */
  public static createIcon(): Node {

    // Proton
    const protonIcon = ProtonNode.createIcon();
    protonIcon.setScaleMagnitude( 0.5 );

    // Electron orbit
    const orbitRadius = 1.5 * protonIcon.height;
    const orbitNode = new Circle( orbitRadius, {
      stroke: MOTHAColors.orbitStrokeProperty,
      lineWidth: 1,
      lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ]
    } );

    // Electron particle
    const electronIcon = ElectronNode.createIcon();
    electronIcon.setScaleMagnitude( 0.5 );
    const electronAngle = 1.25 * Math.PI;
    electronIcon.centerX = orbitRadius * Math.sin( electronAngle );
    electronIcon.centerY = orbitRadius * Math.cos( electronAngle );
    return new Node( {
      children: [ orbitNode, protonIcon, electronIcon ]
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'BohrNode', BohrNode );