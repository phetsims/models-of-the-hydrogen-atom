// Copyright 2024, University of Colorado Boulder

/**
 * QuantumNumbersInfoDialog explains the quantum numbers that describe the electron state for the Schrodinger model.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import PatternStringProperty from '../../../../axon/js/PatternStringProperty.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { RichText, RichTextOptions, Text, VBox } from '../../../../scenery/js/imports.js';
import Dialog from '../../../../sun/js/Dialog.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import ModelsOfTheHydrogenAtomStrings from '../../ModelsOfTheHydrogenAtomStrings.js';
import MOTHASymbols from '../MOTHASymbols.js';

const CONTENT_TEXT_OPTIONS: RichTextOptions = {
  font: new PhetFont( 14 ),
  lineWrap: 575
};

export default class QuantumNumbersInfoDialog extends Dialog {

  public constructor( tandem: Tandem ) {

    const titleText = new Text( ModelsOfTheHydrogenAtomStrings.quantumNumbersStringProperty, {
      font: new PhetFont( {
        size: 16,
        weight: 'bold'
      } ),
      maxWidth: 300
    } );

    const nlmText = new RichText( new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nlmInfoStringProperty, {
      n: MOTHASymbols.nStringProperty,
      l: MOTHASymbols.lStringProperty,
      m: MOTHASymbols.mStringProperty
    } ), CONTENT_TEXT_OPTIONS );

    const nText = new RichText( new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.nInfoStringProperty, {
      n: MOTHASymbols.nStringProperty
    } ), CONTENT_TEXT_OPTIONS );

    const lText = new RichText( new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.lInfoStringProperty, {
      l: MOTHASymbols.lStringProperty,
      s: MOTHASymbols.sStringProperty,
      p: MOTHASymbols.pStringProperty,
      d: MOTHASymbols.dStringProperty
    } ), CONTENT_TEXT_OPTIONS );

    const mText = new RichText( new PatternStringProperty( ModelsOfTheHydrogenAtomStrings.mInfoStringProperty, {
      m: MOTHASymbols.mStringProperty
    } ), CONTENT_TEXT_OPTIONS );

    const spacing = new RichText( 'X', CONTENT_TEXT_OPTIONS ).height;

    const content = new VBox( {
      align: 'left',
      spacing: spacing,
      children: [ nlmText, nText, lText, mText ]
    } );

    super( content, {
      title: titleText,
      tandem: tandem
    } );
  }
}

modelsOfTheHydrogenAtom.register( 'QuantumNumbersInfoDialog', QuantumNumbersInfoDialog );