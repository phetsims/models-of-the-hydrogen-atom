// Copyright 2024-2025, University of Colorado Boulder

/**
 * LightSourceNode displays the light source.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import { Node } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import LightSource from '../model/LightSource.js';
import BeamNode from './BeamNode.js';

export class LightSourceNode extends Node {

  public constructor( lightSource: LightSource, tandem: Tandem ) {

    // Lamp that emits the light
    const lampNode = new LaserPointerNode( lightSource.isOnProperty, {
      bodySize: new Dimension2( 88, 64 ),
      nozzleSize: new Dimension2( 18, 50 ),
      buttonOptions: {
        radius: 19
      },
      rotation: -LightSource.DIRECTION, // +y is up in the model, down in the view
      accessibleName: ModelsOfTheHydrogenAtomStrings.a11y.lightSource.accessibleNameStringProperty,
      tandem: tandem.createTandem( 'lampNode' ),
      tandemNameSuffix: 'Node',
      phetioVisiblePropertyInstrumented: false
    } );

    // Beam of light
    const beamNode = new BeamNode( lightSource, {
      centerX: lampNode.centerX,
      bottom: lampNode.top + 1
    } );

    super( {
      isDisposable: false,
      children: [ beamNode, lampNode ],
      tandem: tandem,
      phetioFeatured: true,
      phetioVisiblePropertyInstrumented: false
    } );

    this.addLinkedElement( lightSource );
  }
}

modelsOfTheHydrogenAtom.register( 'LightSourceNode', LightSourceNode );