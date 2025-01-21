// Copyright 2024-2025, University of Colorado Boulder

/**
 * LightSourceNode displays the light source. It consists of a lamp, with a beam of light coming out of the lamp
 * when the light source is on.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import { Node, NodeTranslationOptions, Rectangle, RectangleOptions } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import LightSource from '../model/LightSource.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Property from '../../../../axon/js/Property.js';

const BEAM_SIZE = new Dimension2( 30, 65 );

export class LightSourceNode extends Node {

  public constructor( lightSource: LightSource, tandem: Tandem ) {

    // Lamp that emits the light.
    const lampNode = new LampNode( lightSource.isOnProperty, tandem.createTandem( 'lampNode' ) );

    // Beam of light that comes out of the lamp.
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

class LampNode extends LaserPointerNode {

  public constructor( isOnProperty: Property<boolean>, tandem: Tandem ) {
    super( isOnProperty, {
      isDisposable: false,
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
  }
}

class BeamNode extends Rectangle {

  public constructor( lightSource: LightSource, providedOptions?: NodeTranslationOptions ) {
    super( 0, 0, BEAM_SIZE.width, BEAM_SIZE.height, combineOptions<RectangleOptions>( {
      isDisposable: false,
      visibleProperty: lightSource.isOnProperty,
      fill: lightSource.colorProperty,

      // When displaying a white beam on a white background, a stroke is needed.
      stroke: new DerivedProperty( [ lightSource.lightModeProperty ], lightMode => lightMode === 'white' ? 'black' : null ),
      lineWidth: 0.5
    }, providedOptions ) );
  }
}


modelsOfTheHydrogenAtom.register( 'LightSourceNode', LightSourceNode );