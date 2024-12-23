// Copyright 2024, University of Colorado Boulder

/**
 * SpectrometerNode is the spectrometer that is displayed in SpectrometerAccordionBox.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Node, NodeOptions, Rectangle } from '../../../../scenery/js/imports.js';
import modelsOfTheHydrogenAtom from '../../modelsOfTheHydrogenAtom.js';
import Spectrometer from '../model/Spectrometer.js';
import MOTHAColors from '../MOTHAColors.js';
import MOTHAConstants from '../MOTHAConstants.js';
import { IRAxisNode, UVAxisNode, VisibleAxisNode } from './WavelengthAxisNode.js';
import photonAbsorptionModel from '../model/PhotonAbsorptionModel.js';
import SpectrometerBarNode from './SpectrometerBarNode.js';
import PlumPuddingModel from '../model/PlumPuddingModel.js';
import SpectrometerDebugText from './SpectrometerDebugText.js';

const DISPLAY_HEIGHT = 135;
const X_MARGIN = 5;

type SelfOptions = EmptySelfOptions;

type SpectrometerNodeOptions = SelfOptions;

export default class SpectrometerNode extends Node {

  public constructor( spectrometer: Spectrometer, providedOptions?: SpectrometerNodeOptions ) {

    // Three segments for the x-axis, each with a different scale, so that values do not overlap.
    const uvWavelengths = [ ...photonAbsorptionModel.getUVWavelengths(), PlumPuddingModel.PHOTON_EMISSION_WAVELENGTH ];
    const visibleWavelengths = photonAbsorptionModel.getVisibleWavelengths();
    const irWavelengths = photonAbsorptionModel.getIRWavelengths();

    const uvAxisNode = new UVAxisNode( 400, uvWavelengths );
    const visibleAxisNode = new VisibleAxisNode( 145, visibleWavelengths );
    const irAxisNode = new IRAxisNode( 275, irWavelengths );

    const xAxisNode = new HBox( {
      children: [ uvAxisNode, visibleAxisNode, irAxisNode ],
      spacing: 10,
      align: 'top'
    } );

    const backgroundNode = new Rectangle( 0, 0, xAxisNode.width + 2 * X_MARGIN, DISPLAY_HEIGHT, {
      cornerRadius: MOTHAConstants.CORNER_RADIUS,
      fill: MOTHAColors.spectrometerFillProperty,
      stroke: MOTHAColors.spectrometerStrokeProperty
    } );

    xAxisNode.centerX = backgroundNode.centerX;
    xAxisNode.bottom = backgroundNode.bottom - 5;

    // A bar for each photon emission wavelength.
    const barNodes: SpectrometerBarNode[] = [];
    const wavelengths = [ ...uvWavelengths, ...visibleWavelengths, ...irWavelengths ];
    wavelengths.forEach( wavelength => {
      const barNode = new SpectrometerBarNode( wavelength );
      barNodes.push( barNode );
    } );
    const barsHBox = new HBox( {
      excludeInvisibleChildrenFromBounds: false,
      children: barNodes,
      spacing: 1,
      align: 'bottom'
    } );
    barsHBox.localBoundsProperty.link( () => {
      barsHBox.centerX = backgroundNode.centerX;
      barsHBox.bottom = xAxisNode.top - 1;
    } );

    // Update bars as the spectrometer data changes.
    spectrometer.dataPointsProperty.link( dataPoints => dataPoints.forEach( dataPoint => {
      const wavelength = dataPoint.wavelength;
      const barNode = _.find( barNodes, barNode => barNode.wavelength === wavelength )!;
      assert && assert( barNode );
      barNode.setNumberOfPhotons( dataPoint.numberOfPhotonsEmitted );
    } ) );

    const options = optionize<SpectrometerNodeOptions, SelfOptions, NodeOptions>()( {

      // NodeOptions
      children: [ backgroundNode, xAxisNode, barsHBox ]
    }, providedOptions );

    super( options );

    // A simple text-only display of the spectrometer data, for debugging.
    if ( phet.chipper.queryParameters.dev ) {
      const dataText = new SpectrometerDebugText( spectrometer.dataPointsProperty );
      dataText.localBoundsProperty.link( () => {
        dataText.right = backgroundNode.right - 5;
        dataText.top = backgroundNode.top + 5;
      } );
      this.addChild( dataText );
    }
  }
}

modelsOfTheHydrogenAtom.register( 'SpectrometerNode', SpectrometerNode );