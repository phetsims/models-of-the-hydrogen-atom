// Copyright 2016-2025, University of Colorado Boulder

/**
 * EnergyLevelsScreen is the 'Energy Levels' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import optionize, { EmptySelfOptions } from '../../../phet-core/js/optionize.js';
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';
import { Circle, Node } from '../../../scenery/js/imports.js';
import MOTHAColors from '../common/MOTHAColors.js';
import ElectronNode from '../common/view/ElectronNode.js';
import MOTHAScreen, { MOTHAScreenOptions } from '../common/view/MOTHAScreen.js';
import ProtonNode from '../common/view/ProtonNode.js';
import modelsOfTheHydrogenAtom from '../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../ModelsOfTheHydrogenAtomStrings.js';
import EnergyLevelsModel from './model/EnergyLevelsModel.js';
import EnergyLevelsScreenView from './view/EnergyLevelsScreenView.js';
import MOTHAConstants from '../common/MOTHAConstants.js';

type SelfOptions = EmptySelfOptions;

type EnergyLevelsScreenOptions = SelfOptions & StrictOmit<MOTHAScreenOptions, 'name' | 'homeScreenIcon'>;

export default class EnergyLevelsScreen extends MOTHAScreen<EnergyLevelsModel, EnergyLevelsScreenView> {

  public constructor( providedOptions: EnergyLevelsScreenOptions ) {

    const options = optionize<EnergyLevelsScreenOptions, SelfOptions, MOTHAScreenOptions>()( {

      // MOTHAScreenOptions
      isDisposable: false,
      name: ModelsOfTheHydrogenAtomStrings.screen.energyLevelsStringProperty,
      homeScreenIcon: createScreenIcon(),
      screenButtonsHelpText: ModelsOfTheHydrogenAtomStrings.a11y.energyLevelsScreen.screenButtonsHelpTextStringProperty
    }, providedOptions );

    super(
      () => new EnergyLevelsModel( options.tandem.createTandem( 'model' ) ),
      model => new EnergyLevelsScreenView( model, options.tandem.createTandem( 'view' ) ),
      options
    );
  }
}

/**
 * Creates the ScreenIcon for this Screen, a proton and electron with 2 orbits to represent 2 energy levels.
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