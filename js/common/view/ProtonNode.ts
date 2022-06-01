// Copyright 2015-2022, University of Colorado Boulder

/**
 * ProtonNode is the visual representation of a proton.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import ShadedSphereNode, { ShadedSphereNodeOptions } from '../../../../scenery-phet/js/ShadedSphereNode.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';

// constants
const DIAMETER = 11;

type SelfOptions = {};

type ProtonNodeOptions = SelfOptions & StrictOmit<ShadedSphereNodeOptions, 'mainColor' | 'highlightColor'>;

export default class ProtonNode extends ShadedSphereNode {

  constructor( providedOptions?: ProtonNodeOptions ) {

    const options = optionize<ProtonNodeOptions, SelfOptions, ShadedSphereNodeOptions>()( {

      // ShadedSphereNodeOptions
      mainColor: PhetColorScheme.RED_COLORBLIND,
      highlightColor: 'rgb( 255, 130, 130 )' // lighter red
    }, providedOptions );

    super( DIAMETER, options );
  }
}

modelsOfTheHydrogenAtom.register( 'ProtonNode', ProtonNode );