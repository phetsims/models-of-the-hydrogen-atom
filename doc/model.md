# Models of the Hydrogen Atom - Model Description

@author Chris Malley (PixelZoom, Inc.)

This document is a high-level description of the model used in PhET's _Models of the Hydrogen Atom_ simulation.

It is assumed that the reader is familiar with atomic models and quantum mechanics.

## Symbols

These symbols appear in the user interface:

* n - principal quantum number, describes the energy of the electron (range is `[1,6]`)
* l - azimuthal quantum number, describes the shape of the electron's orbital (range is `[0,n-1]`)
* m - magnetic quantum number, describes the orientation of the electron's orbital (range is `[-l,l]`)
* (n,l,m) - quantum numbers that describe the state of the Schrödinger electron
* s,p,d,f - letters used to represent shapes of atomic orbitals

## Units

The following units are used in the simulation model:

* angle: radians
* angular speed: radians/s 
* distance: unitless
* energy: eV
* position: unitless
* time: s
* wavelength: nm

## Light Source

The light source emits photons in the UV and visible spectrums, for white light or monochromatic light. With white 
light, 40% of the photons emitted will correspond to a wavelength that transitions from n=1 to a higher n. This
increases the probability that a photon will interact with the atom.

## Atomic Models

The simulation supports 6 atomic models. For a brief introduction to each atomic model, read the documentation
at the top of the following source code files.

* Billiard Ball: [BilliardBallModel.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/BilliardBallModel.ts)
* Plum Pudding: [PlumPuddingModel.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/PlumPuddingModel.ts)
* Classical Solar System: [ClassicalSolarSystemModel.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/ClassicalSolarSystemModel.ts)
* Bohr: [BohrModel.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/BohrModel.ts)
* de Broglie: [DeBroglieModel.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/DeBroglieModel.ts)
* Schrödinger: [SchrodingerModel.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/SchrodingerModel.ts)

## Experiment

The Experiment is implemented as the Schrödinger model. So that we do not give this fact away to the student,
we do not display the electron state, and instead display a '?' in the zoomed-in box and the "Electron Energy Level"
accordion box.

## Schrödinger Transition Rules

The following rules are implemented for electron state transitions in the Schrödinger model:

* n, l, and m are integers.
* n = `[1,6]`
* l = `[0,n-1]`
* m = `[-l,+l]`
* |l-l'| = 1
* |m-m'| <= 1
* n transitions have varying transition strengths. (See `TRANSITION_STRENGTHS` in [SchrodingerQuantumNumbers.ts](https://github.com/phetsims/models-of-the-hydrogen-atom/blob/main/js/common/model/SchrodingerQuantumNumbers.ts).)
* Valid l and m transitions have equal probability.

## Transition Wavelengths

Transition wavelengths are shown in the "Transitions" dialog, opened by checking the "Transitions" checkbox.

## Simplifications

Wavelengths are limited to integer values, in nm.

Electron orbits are necessarily distorted. The 6 orbit radii used are `[ 15, 44, 81, 124, 174, 233 ]`.

The x-axis (nm) of the Spectrometer is necessarily distorted. The UV and IR spectrums are compressed so that
we can fit the data in the horizontal space available.

Spacing of electron energy levels is necessarily distorted in the "Electron Energy Levels" accordion box,
so that we can fit the diagrams in the vertical space available.

