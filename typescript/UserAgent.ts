'use strict'
/// <reference path="js13k2020.d.ts" />

class UserAgent extends NBall {
    /** Interpolated vertices relative to center. */
    relInterp: NVec2[]

    constructor(scene: NScene, x: number, y: number) {
        super(scene, x, y, 32, 16, 0.016)

        this.relInterp = []
        for (let n = 0; n < 16; ++n) {
            this.relInterp.push(new NVec2)
        }
    }

    /** Interpolate vertices. */
    interpolate(t: number) {
        // Interpolate `center` and `halfExtents`.
        let vert = this.vertices[0]
        vert.interpolate(t)

        let p = vert.interpolated
        let xMin = p.x
        let xMax = p.x
        let yMin = p.y
        let yMax = p.y

        for (let n = 1; n < 16; ++n) {
            vert = this.vertices[n]
            vert.interpolate(t)
            p = vert.interpolated

            if (p.x < xMin) xMin = p.x
            else if (p.x > xMax) xMax = p.x

            if (p.y < yMin) yMin = p.y
            else if (p.y > yMax) yMax = p.y
        }

        this.center.set((xMin + xMax) * 0.5, (yMin + yMax) * 0.5)
        this.halfExtents.set((xMax - xMin) * 0.5, (yMax - yMin) * 0.5)

        // Center vertices.
        for (let n = 0; n < 16; ++n) {
            this.relInterp[n].setSubtract(this.vertices[n].interpolated, this.center)
        }
    }

    tracePath(canvas: CanvasRenderingContext2D, path: number[][]) {
        canvas.beginPath()

        for (const [v1, v2, a, b] of path) {
            register0.setScalarMult(this.relInterp[v1], a)
            register1.setScalarMult(this.relInterp[v2], b)
            register0.add(register1)
            register0.add(this.center)
            canvas.lineTo(register0.x, register0.y)
        }

        canvas.closePath()
    }
}
