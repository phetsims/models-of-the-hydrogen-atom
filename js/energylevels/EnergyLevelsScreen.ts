// Copyright 2016-2025, University of Colorado Boulder

/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Circle from '../../../scenery/js/nodes/Circle.js';
import Node from '../../../scenery/js/nodes/Node.js';
import Tandem from '../../../tandem/js/Tandem.js';
import MOTHAColors from '../common/MOTHAColors.js';
import MOTHAConstants from '../common/MOTHAConstants.js';
import ElectronNode from '../common/view/ElectronNode.js';
import MOTHAScreen from '../common/view/MOTHAScreen.js';
import ProtonNode from '../common/view/ProtonNode.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from './model/EnergyLevelsModel.js';
import EnergyLevelsScreenView from './view/EnergyLevelsScreenView.js';

export default class EnergyLevelsScreen extends MOTHAScreen<EnergyLevelsModel, EnergyLevelsScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: ModelsOfTheHydrogenAtomStrings.screen.energyLevelsStringProperty,
      homeScreenIcon: createScreenIcon(),
      screenButtonsHelpText: ModelsOfTheHydrogenAtomStrings.a11y.translatable.energyLevelsScreen.screenButtonsHelpTextStringProperty,
      tandem: tandem
    };

    super(
      () => new EnergyLevelsModel( options.tandem.createTandem( 'model' ) ),
      model => new EnergyLevelsScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the ScreenIcon for this Screen.
 * It looks like an abbreviated version of the Bohr model - a proton, an electron, and 2 orbits.
 */
function createScreenIcon(): ScreenIcon {

  const protonNode = ProtonNode.createIcon();
  const electronNode = ElectronNode.createIcon();

  const orbitOptions = {
    stroke: MOTHAColors.orbitStrokeProperty,
    lineWidth: 1,
    lineDash: [ MOTHAConstants.ORBIT_LINE_LENGTH, MOTHAConstants.ORBIT_LINE_LENGTH ]
  };
  const orbit1Radius = 1.5 * protonNode.height;
  const orbit1Node = new Circle( orbit1Radius, orbitOptions );
  const orbit2Node = new Circle( 2 * orbit1Radius, orbitOptions );

  orbit1Node.center = protonNode.center;
  orbit2Node.center = protonNode.center;
  electronNode.centerX = orbit1Node.centerX;
  electronNode.centerY = -orbit1Radius;

  const iconNode = new Node( {
    children: [ orbit1Node, orbit2Node, protonNode, electronNode ]
  } );

  return new ScreenIcon( iconNode, {
    maxIconWidthProportion: 1,
    maxIconHeightProportion: 0.85,
    fill: MOTHAColors.zoomedInBoxFillProperty
  } );
}

modelsOfTheHydrogenAtom.register( 'EnergyLevelsScreen', EnergyLevelsScreen );