'use strict'
/// <reference path="js13k2020.d.ts" />

class Box extends NBody {
    constructor(scene: NScene, x: number, y: number, size: number, stiffness = 0.5, mass = 1) {
        super(scene, mass)

        this.center.set(x, y)
        this.halfExtents.set(size * 0.5, size * 0.5)

        const theta = HALFPI
        const r = this.halfExtents.length()

        // Create vertices.
        for (let i = 0; i < 4; ++i) {
            const a = theta * i + FOURTHPI
            new NVertex(this, x + r * Math.cos(a), y + r * Math.sin(a))
        }

        // Create constraints.
        for (let i = 0; i < this.vertices.length - 1; ++i) {
            for (let j = i + 1; j < this.vertices.length; ++j) {
                new NConstraint(this, this.vertices[i], this.vertices[j], j === i + 1, stiffness)
            }
        }
    }
}

Box.prototype.paint = Wall.prototype.paint
