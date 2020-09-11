/* This file is part of natlib.
 * natlib, a library for games, is planned to release in early 2021.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** A scene. */
class NScene {
    vertices: NVertex[]
    constraints: NConstraint[]
    bodies: NBody[]

    /** Create a new scene. */
    constructor() {
        this.vertices = []
        this.constraints = []
        this.bodies = []
    }

    /** Verlet integration loop. */
    integrate() {
        for (let i = 0; i < this.vertices.length; ++i) {
            this.vertices[i].integrate()
        }
    }

    /** Solve constraints and collisions. */
    solve() {
        for (let n = 0; n < Settings.kNumIterations; ++n) {
            // Solve constraints.
            for (const c of this.constraints) {
                c.solve()
            }

            // Recalculate the bounding boxes.
            for (const b of this.bodies) {
                b.boundingBox()
            }

            // Collision detection.
            for (let i = 0; i < this.bodies.length - 1; ++i) {
                for (let j = i + 1; j < this.bodies.length; ++j) {
                    satResolve(this.bodies[i], this.bodies[j])
                }
            }
        }
    }
}
