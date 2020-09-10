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
