// Copyright 2024, University of Colorado Boulder

/**
 * LightNode displays the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { Node, NodeOptions } from '../../../../scenery/js/imports.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Light from '../model/Light.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BeamNode from './BeamNode.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';

type SelfOptions = EmptySelfOptions;

type LightNodeOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export class LightNode extends Node {

  public constructor( light: Light, providedOptions: LightNodeOptions ) {

    const options = optionize<LightNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      isDisposable: false,
      phetioVisiblePropertyInstrumented: false
    }, providedOptions );

    const laserPointerNode = new LaserPointerNode( light.isOnProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonRadius: 19,
      rotation: -Light.DIRECTION, // +y is up in the model, down in the view

      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.lightSourceStringProperty,
      tandem: options.tandem.createTandem( 'laserPointerNode' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // Beam of light
    const beamNode = new BeamNode( light, {
      centerX: laserPointerNode.centerX,
      bottom: laserPointerNode.top + 1
    } );

    options.children = [ beamNode, laserPointerNode ];

    super( options );

    this.addLinkedElement( light );
  }
}

modelsOfTheHydrogenAtom.register( 'LightNode', LightNode );