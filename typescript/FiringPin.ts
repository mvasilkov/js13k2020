'use strict'
/// <reference path="js13k2020.d.ts" />

class FiringPin extends NBody {
    constructor(scene: NScene, x: number, y: number, r: number, angle = 0, stiffness = 1, mass = 9) {
        super(scene, mass)

        const theta = HALFPI

        // Create vertices.
        for (let i = 0; i < 4; ++i) {
            const a = theta * i + angle
            new NVertex(this, x + r * Math.cos(a), y + r * Math.sin(a))
        }

        // Create constraints.
        for (let i = 0; i < this.vertices.length - 1; ++i) {
            for (let j = i + 1; j < this.vertices.length; ++j) {
                new NConstraint(this, this.vertices[i], this.vertices[j], j === i + 1, stiffness)
            }
        }
    }

    retract() {
        // undo vertices
        this.scene.vertices.length -= this.vertices.length

        // undo constraints
        this.scene.constraints.length -= this.constraints.length

        // undo body
        this.scene.bodies.pop()
    }

    paint() {
    }
}
