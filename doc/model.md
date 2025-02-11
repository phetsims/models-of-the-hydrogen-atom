# Models of the Hydrogen Atom - Model Description

@author Chris Malley (PixelZoom, Inc.)

This document is a high-level description of the model used in PhET's _Models of the Hydrogen Atom_ simulation.

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

The simulation supports 6 atomic models, briefly described herein.

### Billiard Ball:

Source code: BilliardBallModel.ts

Physical representation: The billiard ball is a sphere, with the atom's origin at the sphere's center. 

Collision behavior: When photons collide with the ball, they bounce off as if the ball were a rigid body.

Absorption behavior: Does not absorb photons.

Emission behavior: Does not emit photons.

### Plum Pudding:

Source code: PlumPuddingModel.ts

Physical representation: The proton is a blob of pudding (or "goo"), modeled as a circle. An electron oscillates
inside the goo along a straight line that passes through the center of the goo and has its end points on the circle.

Collision behavior: Photons collide with the electron when they intersect the circle.

Absorption behavior: The electron can absorb N photons. When any photon collides with the electron, it is absorbed
with some probability, and (if absorbed) causes the electron to start oscillating.

Emission behavior: The electron can emit one 150 nm photon for each photon absorbed. Photons are emitted at the electron's 
location. No photons are emitted until the electron has completed one oscillation cycle. After emitting its last photon,
the electron completes its current oscillation cycles, and comes to rest at the atom's center.

### Classical Solar System:

Source code: ClassicalSolarSystemModel.ts

Physical representation: Proton at the center, electron spirals towards the proton. The spiral is clockwise to be
consistent with all other orbits in this sim. The electron starts at a fixed distance from the proton.
The radius of the spiral decreases linearly and the electron accelerates as the electron moves closer to the proton.
The final state shows the electron on top of the proton. In this final state, the atom is considered "destroyed".

Collision behavior: Ideally, the spiraling behavior occurs fast enough that the atom is destroyed before any 
photons reach it. Therefore, there are no collisions.

Absorption behavior: The atom is destroyed, so it does not absorb photons.

Emission behavior: The atom is destroyed, so it does not emit photons.

### Bohr:

Source code: BohrModel.ts

Physical representation: Electron orbiting a proton. Each orbit corresponds to a different electron state.

Collision behavior: Photons are considered for absorption if they collide with the electron.

Absorption behavior: Photons that match the transition wavelength of the electron's state (n) are absorbed with
some probability. Other photons are not absorbed or affected.

Emission behavior: Spontaneous emission of a photon takes the electron to a lower state, and the photon emitted has
the transition wavelength that corresponds to the current and new state. Transition to each lower state is equally likely.
Stimulated emission of a photon occurs when a photon collides with the electron, and the photon's wavelength corresponds
to a wavelength that could have been absorbed in a lower state. In this case, the colliding photon is not absorbed,
but a new photon is emitted with the same wavelength, and the electron moves to the lower state. The emitted photon
travels alongside the original photon.

### de Broglie:

Source code: DeBroglieModel.ts

The de Broglie model is the same as Bohr, but the electron is represented as a wave in the view. There are three wave
representations that the user may choose from a combo box: "Radial Distance", "3D Height", or "Brightness". Briefly:

* Radial Distance - Distance of the wave from the electron's orbit is a function of amplitude.
* 3D Height - 3D height of the wave is a function of amplitude.
* Brightness - Brightness of the wave is a function of amplitude.

### Schrödinger:

Source code: SchrodingerModel.ts

Physical representation: The electron is a probability density field. A proton is at the center, visible only when the
probability density field strength is below a threshold value. The electron's state is specified by 3 quantum numbers 
(n,l,m).

Wavefunction: Probability density is computed by solving the 3D Schrödinger wave function, which in turn involves 
solving the generalized Laguerre Polynomial and the associated Legendre polynomial.

Collision behavior: Identical to Bohr and de Broglie.

Absorption behavior: Identical to Bohr and de Broglie.

Emission behavior: Both spontaneous and stimulated emission are similar to Bohr and de Broglie, but the rules for 
electron state transitions are more complicated. See "Schrodinger Transition Rules" below.

## Schrodinger Transition Rules

The following rules are implemented for electron state transitions in the Schrödinger model:

* n = `[1,6]` (also in Bohr and de Broglie)
* l = `[0,n-1]`
* m = `[-l,+l]`
* abs(l-l') = 1
* abs(m-m') < 1
* n transitions have varying transition strengths. (See `TRANSITION_STRENGTHS` in SchrodingerQuantumNumbers.ts.)
* Valid l and m transitions have equal probability.

## Transition Wavelengths

The supported transition wavelengths are shown in the "Transitions" dialog, opened by checking the "Transitions" checkbox.

## Simplifications

TODO: Orbits are distorted

TODO: electron energy levels are distorted

TODO: wavelengths are integer values
