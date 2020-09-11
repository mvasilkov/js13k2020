/* This file is part of natlib.
 * natlib, a library for games, is planned to release in early 2021.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** A physical body. */
class NBody {
    scene: NScene
    vertices: NVertex[]
    positions: NVec2[]
    constraints: NConstraint[]
    edges: NConstraint[]
    center: NVec2
    halfExtents: NVec2
    pMin: number
    pMax: number
    mass: number

    /** Create a new body. */
    constructor(scene: NScene, mass = 1) {
        this.scene = scene
        this.vertices = []
        this.positions = []
        this.constraints = []
        this.edges = []
        this.center = new NVec2
        this.halfExtents = new NVec2
        this.pMin = 0
        this.pMax = 0
        this.mass = mass

        scene.bodies.push(this)
    }

    /** Compute the bounding box. */
    boundingBox() {
        let p = this.positions[0]
        let xMin = p.x
        let xMax = p.x
        let yMin = p.y
        let yMax = p.y

        for (let i = 1; i < this.positions.length; ++i) {
            p = this.positions[i]

            if (p.x < xMin) xMin = p.x
            else if (p.x > xMax) xMax = p.x

            if (p.y < yMin) yMin = p.y
            else if (p.y > yMax) yMax = p.y
        }

        this.center.set((xMin + xMax) * 0.5, (yMin + yMax) * 0.5)
        this.halfExtents.set((xMax - xMin) * 0.5, (yMax - yMin) * 0.5)
    }

    /** Project the vertices onto the axis `a`. */
    projectOn(a: NVec2) {
        let product = this.positions[0].dot(a)
        this.pMin = this.pMax = product

        for (let i = 1; i < this.positions.length; ++i) {
            product = this.positions[i].dot(a)

            if (product < this.pMin) this.pMin = product
            else if (product > this.pMax) this.pMax = product
        }
    }

    /** Paint the body. */
    paint(canvas: CanvasRenderingContext2D, t: number) {
        // Interpolate vertices.
        for (const vert of this.vertices) vert.interpolate(t)

        // Paint non-edges.
        canvas.beginPath()

        for (const cons of this.constraints) {
            if (cons.edge) continue
            canvas.moveTo(cons.v0.interpolated.x, cons.v0.interpolated.y)
            canvas.lineTo(cons.v1.interpolated.x, cons.v1.interpolated.y)
        }

        canvas.strokeStyle = '#ffac7f'
        canvas.stroke()

        // Paint edges.
        canvas.beginPath()

        for (const vert of this.vertices) {
            canvas.lineTo(vert.interpolated.x, vert.interpolated.y)
        }

        canvas.closePath()

        canvas.strokeStyle = '#99c2db'
        canvas.stroke()
    }
}
