// Copyright 2024-2025, University of Colorado Boulder

/**
 * SchrodingerOrbitalNode renders the atomic orbital, a function describing the location and wave-like behavior of the
 * electron. The orbital is characterized by the quantum numbers (n,l,m) that describe the electron's state - see
 * SchrodingerQuantumNumbers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import SchrodingerQuantumNumbers from '../model/SchrodingerQuantumNumbers.js';
import ZoomedInBoxNode from './ZoomedInBoxNode.js';
import MOTHAQueryParameters from '../MOTHAQueryParameters.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import SchrodingerImageCache from './SchrodingerImageCache.js';

// PNG image is 2x the sampling grid size, because we sample only for the rightBottom quadrant.
const PNG_IMAGE_SIDE_LENGTH = ( 2 * MOTHAQueryParameters.gridSize );

export default class SchrodingerOrbitalNode extends Image {

  public constructor( nlmProperty: TReadOnlyProperty<SchrodingerQuantumNumbers>,
                      atomPosition: Vector2,
                      modelViewTransform: ModelViewTransform2 ) {

    // Gets the PNG image for the orbital that corresponds to the current electron state (n,l,m).
    const imageProperty = new DerivedProperty( [ nlmProperty ], nlm => SchrodingerImageCache.instance.getDataURL( nlm ) );

    // If the cache changes, force imageProperty to be recomputed.
    SchrodingerImageCache.instance.cacheChangedEmitter.addListener( () => imageProperty.recomputeDerivation() );

    super( imageProperty, {
      isDisposable: false,
      pickable: false,
      
      // The PNG image obtained from schrodingerImageCache.getDataURL contains a pixel for each probability density
      // sample. By scaling this Image up, we'll automatically get a larger image with smooth interpolation. 
      scale: ZoomedInBoxNode.SIDE_LENGTH / PNG_IMAGE_SIDE_LENGTH
    } );

    // Center the image at the atom's position.
    const atomViewPosition = modelViewTransform.modelToViewPosition( atomPosition );
    this.localBoundsProperty.link( () => {
      this.center = atomViewPosition;
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'SchrodingerOrbitalNode', SchrodingerOrbitalNode );