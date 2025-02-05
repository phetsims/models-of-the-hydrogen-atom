# Models of the Hydrogen Atom - Model Description

@author Chris Malley (PixelZoom, Inc.)

## Table of Contents

* [Introduction](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/doc/implementation-notes.md#introduction)
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

In addition to this document, you are encouraged to read:

* [PhET Development Overview](https://github.com/phetsims/phet-info/blob/main/doc/phet-development-overview.md)
* [PhET Software Design Patterns](https://github.com/phetsims/phet-info/blob/main/doc/phet-software-design-patterns.md)
* Faraday's Electromagnetic Lab HTML5 - TODO link
* Faraday's Electromagnetic Lab PhET-iO Design - TODO link

TODO Talk about legacy version, when published, link to Unfuddle, source code refers to Java files.

## General Considerations

### Coordinate Frames

Model-View transform in zoomed-in box

Schrodinger x,y,z

### Query Parameters

Query parameters are used to enable sim-specific features, and to initialize preferences. Sim-specific query parameters
are documented in `MOTHAQueryParameters.ts`. Running with `?log` will print the complete set of query parameters 
(common-code, PhET-iO, and sim-specific) to the browser console.

### Memory Management

**Instantiation:** Most objects in this sim are instantiated at startup, and exist for the lifetime of the simulation.
The exceptions to this are as follows:

TODO

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

This diagram shows the most important part of the model class hierarchy.

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