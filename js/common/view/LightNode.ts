// Copyright 2024, University of Colorado Boulder

/**
 * LightNode displays the light.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import Light from '../model/Light.js';
import BeamNode from './BeamNode.js';

export class LightNode extends Node {

  public constructor( light: Light, tandem: Tandem ) {

    const laserPointerNode = new LaserPointerNode( light.isOnProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonOptions: {
        radius: 19
      },
      rotation: -Light.DIRECTION, // +y is up in the model, down in the view

      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.lightSource.accessibleNameStringProperty,
      tandem: tandem.createTandem( 'laserPointerNode' ),
      phetioVisiblePropertyInstrumented: false
    } );

    // Beam of light
    const beamNode = new BeamNode( light, {
      centerX: laserPointerNode.centerX,
      bottom: laserPointerNode.top + 1
    } );

    super( {
      isDisposable: false,
      children: [ beamNode, laserPointerNode ],
      tandem: tandem,
      phetioVisiblePropertyInstrumented: false
    } );

    this.addLinkedElement( light );
  }
}

modelsOfTheHydrogenAtom.register( 'LightNode', LightNode );