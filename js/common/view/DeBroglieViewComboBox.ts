// Copyright 2022, University of Colorado Boulder

/**
 * TODO
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

    const threeDViewText = new Text( modelsOfTheHydrogenAtomStrings.threeDView,
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( 'threeDViewText' )
      }, textOptions ) );

    const brightnessViewText = new Text( modelsOfTheHydrogenAtomStrings.brightnessView,
      optionize<TextOptions, EmptyObjectType, TextOptions>()( {
        tandem: options.tandem.createTandem( 'brightnessViewText' )
      }, textOptions ) );

    const items: ComboBoxItem<DeBroglieView>[] = [
      new ComboBoxItem( radialViewText, 'radial' ),
      new ComboBoxItem( threeDViewText, 'threeD' ),
      new ComboBoxItem( brightnessViewText, 'brightness' )
    ];

    super( items, deBroglieViewProperty, listboxParent, options );
  }
}

modelsOfTheHydrogenAtom.register( 'DeBroglieViewComboBox', DeBroglieViewComboBox );