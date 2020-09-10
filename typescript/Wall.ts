'use strict'
/// <reference path="js13k2020.d.ts" />

class Wall extends NBody {
    constructor(scene: NScene, x: number, y: number, stiffness = 1, mass = 9) {
        super(scene, mass)

        // Create vertices.
        const v0 = new NStaticVertex(this, x, y)
        const v1 = new NStaticVertex(this, x + 64, y)
        const v2 = new NStaticVertex(this, x + 64, y + 256)
        const v3 = new NStaticVertex(this, x, y + 256)

        // Create edges.
        new NConstraint(this, v0, v1, true, stiffness)
        new NConstraint(this, v1, v2, true, stiffness)
        new NConstraint(this, v2, v3, true, stiffness)
        new NConstraint(this, v3, v0, true, stiffness)

        // Create constraints.
        new NConstraint(this, v0, v2, false, stiffness)
        new NConstraint(this, v1, v3, false, stiffness)

        this.center.set(x + 32, y + 128)
        this.halfExtents.set(32, 128)
    }

    rotate(angle: number) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        for (const vert of <NStaticVertex[]>this.vertices) {
            register0.setSubtract(vert.position, this.center)
            vert.set(
                this.center.x + register0.x * cos - register0.y * sin,
                this.center.y + register0.x * sin + register0.y * cos
            )
            vert.integrate()
        }
    }

    paint(canvas: CanvasRenderingContext2D, t: number) {
        // Interpolate vertices.
        for (const vert of this.vertices) vert.interpolate(t)

        // Trace path.
        canvas.beginPath()

        for (let n = 0; n < 4; ++n) {
            canvas.lineTo(this.vertices[n].interpolated.x, this.vertices[n].interpolated.y)
        }

        canvas.closePath()

        // Paint background.
        canvas.save()

        canvas.clip()

        canvas.drawImage(WALL_PICTURE, 0, 0, Settings.screenWidth, Settings.screenHeight)

        canvas.restore()

        // Paint edges.
        canvas.strokeStyle = FAILURE_BACK
        canvas.stroke()
    }
}
