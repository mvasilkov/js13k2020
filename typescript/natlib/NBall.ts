/* This file is part of natlib.
 * natlib, a library for games, is planned to release in early 2021.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** A ball. */
class NBall extends NBody {
    /** Create a new ball. */
    constructor(scene: NScene, x: number, y: number, r: number, nVertices = 9, stiffness = 0.5, mass = 1) {
        super(scene, mass)

        const theta = TWOPI / nVertices

        // Create vertices.
        for (let i = 0; i < nVertices; ++i) {
            const a = theta * i
            new NVertex(this, x + r * Math.cos(a), y + r * Math.sin(a))
        }

        // Create constraints.
        for (let i = 0; i < this.vertices.length - 1; ++i) {
            for (let j = i + 1; j < this.vertices.length; ++j) {
                new NConstraint(this, this.vertices[i], this.vertices[j], j === i + 1, stiffness)
            }
        }

        this.center.set(x, y)
        this.halfExtents.set(r, r)
    }
}
