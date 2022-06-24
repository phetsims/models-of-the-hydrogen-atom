// Copyright 2022, University of Colorado Boulder

/**
 * DeBroglieViewComboBox is the combo box for selecting which view of the de Broglie model show be displayed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ComboBox, { ComboBoxOptions } from '../../../../sun/js/ComboBox.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeTranslationOptions, Text, TextOptions } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import { DeBroglieView } from '../model/DeBroglieView.js';
import Property from '../../../../axon/js/Property.js';
import ComboBoxItem from '../../../../sun/js/ComboBoxItem.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import modelsOfTheHydrogenAtomStrings from '../../modelsOfTheHydrogenAtomStrings.js';
import EmptyObjectType from '../../../../phet-core/js/types/EmptyObjectType.js';

type SelfOptions = EmptyObjectType;

type DeBroglieViewComboBoxOptions = SelfOptions & NodeTranslationOptions & PickRequired<ComboBoxOptions, 'tandem'>;

export default class DeBroglieViewComboBox extends ComboBox<DeBroglieView> {

  public constructor( deBroglieViewProperty: Property<DeBroglieView>,
                      listboxParent: Node,
                      providedOptions: DeBroglieViewComboBoxOptions ) {

    const options = optionize<DeBroglieViewComboBoxOptions, SelfOptions, ComboBoxOptions>()( {

      // ComboBoxOptions
      xMargin: 10,
      yMargin: 6
    }, providedOptions );

    const textOptions = {
      font: new PhetFont( 14 ),
      maxWidth: 150
    };

    const radialViewText = new Text( modelsOfTheHydrogenAtomStrings.radialView,
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( 'radialViewText' )
      }, textOptions ) );

    // threeDViewText does not match '3DViewText' tandem name because JavaScript identifiers cannot begin with a number.
    const threeDViewText = new Text( modelsOfTheHydrogenAtomStrings[ '3DView' ],
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( '3DViewText' )
      }, textOptions ) );

    const brightnessViewText = new Text( modelsOfTheHydrogenAtomStrings.brightnessView,
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( 'brightnessViewText' )
      }, textOptions ) );

    const items: ComboBoxItem<DeBroglieView>[] = [
      new ComboBoxItem( radialViewText, 'radial', { tandemName: 'radialItem' } ),
      new ComboBoxItem( threeDViewText, '3D', { tandemName: '3DItem' } ),
      new ComboBoxItem( brightnessViewText, 'brightness', { tandemName: 'brightnessItem' } )
    ];

    super( deBroglieViewProperty, items, listboxParent, options );
  }

  public override dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
    super.dispose();
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieViewComboBox', DeBroglieViewComboBox );