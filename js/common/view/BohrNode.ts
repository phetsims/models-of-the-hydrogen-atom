// Copyright 2022-2024, University of Colorado Boulder

/**
 * BohrNode displays the Bohr model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { Circle, Node } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import BohrModel from '../model/BohrModel.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import MOTHAConstants from '../MOTHAConstants.js';
import ElectronNode from './ElectronNode.js';
import ElectronStateText from './ElectronStateText.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import OrbitsNode from './OrbitsNode.js';
import ProtonNode from './ProtonNode.js';
import MOTHAColors from '../MOTHAColors.js';
import ZoomedInBox from '../model/ZoomedInBox.js';

type SelfOptions = EmptySelfOptions;

type BohrNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class BohrNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: BohrModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      zoomedInBox: ZoomedInBox,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: BohrNodeOptions ) {

    const zoomedInBoxBounds = modelViewTransform.modelToViewBounds( zoomedInBox );

    // Electron orbits
    const orbitsNode = new OrbitsNode( hydrogenAtom.position, modelViewTransform );

    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform );

    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform );

    const electronStateText = new ElectronStateText( hydrogenAtom.electron.nProperty, {
      tandem: providedOptions.tandem.createTandem( 'electronStateText' )
    } );

    const options = optionize<BohrNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {

      // HydrogenAtomNodeOptions
      children: [ orbitsNode, protonNode, electronNode, electronStateText ]
    }, providedOptions );

    super( hydrogenAtom, hydrogenAtomProperty, options );

    // Keep the electron state positioned in the lower-right corner of the zoomed-in box.
    const electronStateTextRightBottom = zoomedInBoxBounds.erodedXY( 10, 10 ).rightBottom;
    electronStateText.localBoundsProperty.link( () => {
      electronStateText.rightBottom = electronStateTextRightBottom;
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