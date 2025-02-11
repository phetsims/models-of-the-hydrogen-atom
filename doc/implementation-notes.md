# Models of the Hydrogen Atom - Model Description

@author Chris Malley (PixelZoom, Inc.)

## Table of Contents

* [Introduction](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#introduction)
* [Legacy Version](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#legacy-version)
* [General Considerations](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#general-considerations)
    * [Coordinate Frames](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#coordinate-frames)
    * [Query Parameters](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#query-parameters)
    * [Memory Management](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#memory-management)
    * [Software Design Patterns](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#software-design-patterns)
* [Model](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#model)
* [View](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#view)
* [Sound](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#sound)
* [Alternative Input](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#alternative-input)
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
See `modelViewTransform` in ZoomedInBoxNode.ts for details.

For the Schrodinger model, +x is to the right, +z is up, and +y is perpendicular to the screen.

### Query Parameters

Query parameters are used to enable sim-specific features. Sim-specific query parameters
are documented in `MOTHAQueryParameters.ts`. Running with `?log` prints the complete set of query parameters 
(common-code, PhET-iO, and sim-specific) to the browser console.

### Memory Management

**Instantiation:** Most objects in this sim are instantiated at startup, and exist for the lifetime of the simulation.
The exceptions to this are as follows:

* `Photon`: Created dynamically, when they are emitted from the light source or the hydrogen atom. See `PhotonGroup`
(a `PhetioGroup`) for details.

* `PhotonNode`: Created dynamically in response to the creation of a `Photon` instance. Search for 
`photonGroup.elementCreatedEmitter` and `photonGroup.elementDisposedEmitter` to see the specifics
of how `PhotonNode` instances are instantiated and disposed.

`* SpectrometerSnapshot`: Created dynamically, but no `PhetioGroup` is involved. See `Spectrometer` method `takeSnapshot`
for details. (Note that the corresponding view element, `SpectrometerSnapshot`, is not created dynamically. A fixed
number of `SpectrometerSnapshot` instances is created at startup and mutated as needed.)

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

### Class hierarchy

This diagram shows the most important parts of the model class hierarchy.

```
// Atomic Models
HydrogrenAtom
  BilliardBallModel
  PlumPuddingModel
  ClassicalSolarSystemModel
  BohrModel
    DeBroglieBaseModel
      DeBrolieModel
    SchrodingerModel
      Experiment

// Electrons
Electron
  PlumPuddingElectron
  ClassicalSolarSystemElectron
  QuantumElectron
    BohrElectron
    SchrodingerElectron
 ```

## View

### de Broglie representations

## Schrodinger orbitals

## PhET-iO

### IOTypes

To identify custom IOTypes, search for "new IOType". The documentation for custom IOTypes identifies the type 
of PhET-iO serialization that is implemented.

### Dynamic PhET-iO Elements

Photon and PhotonGroup
SpectrometerSnapshot