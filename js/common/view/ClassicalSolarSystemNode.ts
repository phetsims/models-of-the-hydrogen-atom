// Copyright 2022, University of Colorado Boulder

/**
 * ClassicalSolarSystemNode shows the "Classical Solar System" model of the hydrogen atom.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import HydrogenAtomNode, { HydrogenAtomNodeOptions } from './HydrogenAtomNode.js';
import ProtonNode from './ProtonNode.js';
import HydrogenAtom from '../model/HydrogenAtom.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import ClassicalSolarSystemModel from '../model/ClassicalSolarSystemModel.js';
import ElectronNode from './ElectronNode.js';
import kaboom_png from '../../../images/kaboom_png.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { Image } from '../../../../scenery/js/imports.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';

type SelfOptions = EmptySelfOptions;

type ClassicalSolarSystemNodeOptions = SelfOptions & StrictOmit<HydrogenAtomNodeOptions, 'children'>;

export default class ClassicalSolarSystemNode extends HydrogenAtomNode {

  public constructor( hydrogenAtom: ClassicalSolarSystemModel,
                      hydrogenAtomProperty: TReadOnlyProperty<HydrogenAtom>,
                      modelViewTransform: ModelViewTransform2,
                      providedOptions: ClassicalSolarSystemNodeOptions ) {

    const options = optionize<ClassicalSolarSystemNodeOptions, SelfOptions, HydrogenAtomNodeOptions>()( {
      //TODO default values for options
    }, providedOptions );

    const protonNodeTandem = options.tandem.createTandem( 'protonNode' );
    const protonNode = new ProtonNode( hydrogenAtom.proton, modelViewTransform, {
      visibleProperty: DerivedProperty.not( hydrogenAtom.isDestroyedProperty, {
        tandem: protonNodeTandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: protonNodeTandem
    } );

    const electronNodeTandem = options.tandem.createTandem( 'electronNode' );
    const electronNode = new ElectronNode( hydrogenAtom.electron, modelViewTransform, {
      visibleProperty: DerivedProperty.not( hydrogenAtom.isDestroyedProperty, {
        tandem: electronNodeTandem.createTandem( 'visibleProperty' ),
        phetioValueType: BooleanIO
      } ),
      tandem: electronNodeTandem
    } );

    const kaboomNode = new Image( kaboom_png, {
      visibleProperty: hydrogenAtom.isDestroyedProperty,
      center: protonNode.center,
      tandem: options.tandem.createTandem( 'kaboomNode' )
    } );

    options.children = [ kaboomNode, protonNode, electronNode ];

    super( hydrogenAtom, hydrogenAtomProperty, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'ClassicalSolarSystemNode', ClassicalSolarSystemNode );