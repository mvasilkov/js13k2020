'use strict'
/// <reference path="js13k2020.d.ts" />

class Wall extends NBody {
    constructor(scene: NScene, x: number, y: number, stiffness = 1, mass = 9) {
        super(scene, mass)

        let v0 = new NVertex(this, x, y)
        let v1 = new NVertex(this, x + 64, y)
        let v2: NVertex
        let v3: NVertex

        // top
        new NConstraint(this, v0, v1, true, stiffness)

        for (let n = 0; n < 4; ++n) {
            v2 = new NVertex(this, v0.position.x, v0.position.y + 64)
            v3 = new NVertex(this, v1.position.x, v1.position.y + 64)

            new NConstraint(this, v0, v2, true, stiffness)
            new NConstraint(this, v1, v3, true, stiffness)
            new NConstraint(this, v0, v3, false, stiffness)
            new NConstraint(this, v1, v2, false, stiffness)

            v0 = v2
            v1 = v3
        }

        // bottom
        new NConstraint(this, v0, v1, true, stiffness)
    }

    paint(canvas: CanvasRenderingContext2D, t: number) {
        // Interpolate vertices.
        for (const vert of this.vertices) vert.interpolate(t)

        const N = this.vertices.length

        canvas.beginPath()

        canvas.lineTo(this.vertices[0].interpolated.x, this.vertices[0].interpolated.y)
        canvas.lineTo(this.vertices[1].interpolated.x, this.vertices[1].interpolated.y)

        for (let n = 3; n < N; n += 2) {
            canvas.lineTo(this.vertices[n].interpolated.x, this.vertices[n].interpolated.y)
        }

        for (let n = N - 2; n >= 0; n -= 2) {
            canvas.lineTo(this.vertices[n].interpolated.x, this.vertices[n].interpolated.y)
        }

        canvas.save()

        canvas.clip()

        canvas.drawImage(WALL_PICTURE, 0, 0, Settings.screenWidth, Settings.screenHeight)

        canvas.restore()

        canvas.strokeStyle = FAILURE_BACK
        canvas.stroke()
    }
}
