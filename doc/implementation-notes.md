# Models of the Hydrogen Atom - Model Description

@author Chris Malley (PixelZoom, Inc.)

## Table of Contents

* [Introduction](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#introduction)
* [Legacy Version](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#legacy-version)
* [General Considerations](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#general-considerations)
    * [Coordinate Frames](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#coordinate-frames)
    * [Query Parameters](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#query-parameters)
    * [Memory Management](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#memory-management)
* [Model](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#model)
* [View](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#view)
* [PhET-iO](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#phet-io)

## Introduction

This document contains notes related to the implementation of **Models of the Hydrogen Atom**. This is not an
exhaustive description of the implementation. The intention is to provide a concise high-level overview, and 
to supplement the internal documentation (source code comments) and external documentation (design documents).

Before reading this document, please read:

* [model.md](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/model.md), a high-level
  description of the simulation model.

You are also encouraged to read:

* [PhET Development Overview](https://github.com/phetsims/phet-info/blob/main/doc/phet-development-overview.md)
* [PhET Software Design Patterns](https://github.com/phetsims/phet-info/blob/main/doc/phet-software-design-patterns.md)
* [Models of the Hydrogen Atom HTML5](https://docs.google.com/document/d/1fZT_vDD8sX8nkSpTxHOyoP6-XrAIJYo44dacLIbZO14/edit?pli=1&tab=t.0) (Parts of this are likely to be stale.)

## Legacy Version

This simulation was originally written in Java, and first published in March 2007.  The Java source code lives
[here](https://phet.unfuddle.com/a#/projects/9404/repositories/23262/browse?path=%2Ftrunk%2Fsimulations-java%2Fsimulations%2Fhydrogen-atom&commit=75234)
in Unfuddle SVN (login and password required.) While some of the code is a direct port, most of the code has been
rewritten to use modern PhET software patterns and practices. For the curious, TypeScript source files often mention
the Java file from which they were ported.  

## General Considerations

### Coordinate Frames

The zoomed-in box displays a magnified view of the hydrogen atom. All model-view transform operations take place in 
this box. The origin is at the center of the box. The model uses a right-handed coordinate system: +x right, +y up,
+angle counterclockwise. The view (scenery) uses a left-handed coordinate system: +x right, +y down, +angle clockwise.
A `ModelViewTransform2` instance is used to transform between model and view coordinate systems. See
`modelViewTransform` in ZoomedInBoxNode.ts for details.

For the deBroglie atomic model, the "3D Height" representation involves a pseudo-3D animation as the atom is rotated into
place. This involves animation the pitch component of 3D rotation (the other two components are roll and yaw, and 
they are not involved here). The view is then flattened to 2D, with ZoomedInBoxNode's `modelViewTransform` handling
the transform. See DeBroglie3DHeightNode.ts.

For the Schrodinger atomic model, +x is to the right, +z is up, and +y is perpendicular to the screen. The view is flattened
to 2D, with ZoomedInBoxNode's `modelViewTransform` handling the transform.

### Query Parameters

Query parameters are used to enable sim-specific features. Sim-specific query parameters
are documented in `MOTHAQueryParameters.ts`. Running with `?log` prints the complete set of query parameters 
(common-code, PhET-iO, and sim-specific) to the browser console.

### Memory Management

**Instantiation:** Most objects in this sim are instantiated at startup, and exist for the lifetime of the simulation.
The exceptions are:

* `Photon` instances (model elements) are created dynamically, when they are emitted from the light source or the
hydrogen atom. See `PhotonGroup` (a `PhetioGroup`) for details. `PhotonNode` instances (the corresponding view elements)
are created dynamically in response to the creation of `Photon` instances. Search for `photonGroup.elementCreatedEmitter`
and `photonGroup.elementDisposedEmitter` to see the specifics of how `PhotonNode` instances are instantiated and disposed.

* `SpectrometerSnapshot` instances (model elements) are created dynamically, but no `PhetioGroup` is involved. 
See `Spectrometer` method `takeSnapshot` for details. The corresponding view element, `SpectrometerSnapshot`,
is _not_ created dynamically. A fixed number of `SpectrometerSnapshot` instances are created at startup and mutated
as needed. See `SpectrometerSnapshotsDialog` for details.

**Listeners**: Unless otherwise noted in the code, uses of `link`, `addListener`, etc. do not require a corresponding
`unlink`, `removeListener`, etc. because most objects exist for the lifetime of the simulation.

**dispose**: All classes have a `dispose` method, possibly inherited from a super class. Sim-specific classes whose
instances exist for the lifetime of the sim are not intended to be disposed. They are created with `isDisposable: false`,
or have a `dispose` method that looks like this:

```ts
public dispose(): void {
  Disposable.assertNotDisposable();
}
```

## Model

Both screens use an identical model. The only thing that varies is which atomic models are available.

### Light Source

`LightSource` is the model of a simple light source that emits photons in the UV and visible spectrums, for white
light or monochromatic light. With white light, the algorithm for choosing a photon's wavelength is implemented
such that the probability of the photon interacting with the atom is increased. See method `getNextPhotonWavelength`
in LightSource.ts for details.

### Atomic Models

Atomic models are roughly divided into classical and quantum categories. The classical models are "Billiard Ball",
"Plum Pudding", and "Classical Solar System". The quantum models are "Bohr", "de Broglie", and "Schrödinger".

Atomic models that include the concept of photon absorption are the quantum models.

Atomic models that include the concept of photon emission are the quantum models, plus "Plum Pudding".
The quantum models include two types of emission: stimulated emission and spontaneous emission. See
the class documentation for details.

All atomic models except "Billiard Ball" include an electron.

### Class Hierarchies

This diagram shows the most important parts of the model class hierarchy. See the documentation of each class
for further details. 

```
// Top-level simulation model
MOTHAModel
  SpectraModel
  EnergyLevelsModel
  
// Atomic Models
HydrogrenAtom
  BilliardBallModel
  PlumPuddingModel
  ClassicalSolarSystemModel
  BohrModel
    DeBroglieBaseModel
      DeBroglieModel
    SchrodingerModel
      Experiment

// Electrons
Electron
  PlumPuddingElectron
  ClassicalSolarSystemElectron
  QuantumElectron
    BohrElectron
    SchrodingerElectron
    
 // Notes:
 // * BilliardBallModel does not involve an electron, so there is no BilliardBallElectron. 
 // * DeBrolieModel uses the same electron model as superclass BohrModel, so there is no DeBroglieElectron.
 ```

### Other Important Model Classes

For the quantum atomic models, these additional classes are critical. See their documentation for details.

* `PhotonAbsorptionModel`
* `SchrodingerQuantumNumbers`
* `SchrodingerBrightnessCache`
* `MetastableHandler`

## View

Both screens have a common view, which is implemented in base class `MOTHAScreenView`.  The "Energy Levels" screen
adds an "Electron Energy Levels" accordion box, and adjusts the user-interface layout accordingly; see 
`EnergyLevelsScreenView`.

Most of the view implementation is relatively straightforward, following typical PhET patterns for controls, etc.
The remainder of this section will highlight a few of the more interesting view elements.

### de Broglie representations

The de Broglie atomic model represents the electron as a wave. There are three such representations, which the 
user can choose from a combo box:
* Radial Distance - Distance of the wave from the electron's orbit is a function of amplitude. See DeBroglieRadialDistanceNode.ts.
* 3D Height - The 3D height of the wave is a function of amplitude. Selecting this view causes the atom to
rotate into place, so that we are viewing the atom in pseudo-3D. See DeBroglie3DHeightNode.ts, DeBroglie3DWaveNode.ts, and Wireframe3DNode.ts.
* Brightness - A ring is drawn that corresponds to the electron's orbit, and the brightness of the ring is a function
of amplitude. See DeBroglieBrightnessNode.ts.

For the amplitude computation involved in all of these representations, see `getAmplitude` in `DeBroglieModel`.

### Schrodinger orbitals

TODO

## PhET-iO

### IOTypes

To identify custom IOTypes, search for "new IOType". The documentation for custom IOTypes identifies the type 
of PhET-iO serialization that is implemented. To identify where these IOTypes are used, search for "phetioValueType".

### Dynamic PhET-iO Elements

`Photon` is the only dynamic PhET-iO Element, and is managed by PhetioGroup `PhotonGroup`.
