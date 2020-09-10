'use strict'
/// <reference path="js13k2020.d.ts" />

class WebsiteBox extends NBody {
    constructor(scene: NScene, x: number, y: number, stiffness = 0.5, mass = 1) {
        super(scene, mass)

        // Create vertices.
        const v0 = new NVertex(this, x, y)
        const v1 = new NVertex(this, x + Settings.websiteWidth, y)
        const v2 = new NVertex(this, x + Settings.websiteWidth, y + Settings.websiteHeight)
        const v3 = new NVertex(this, x, y + Settings.websiteHeight)

        // Create edges.
        new NConstraint(this, v0, v1, true, stiffness)
        new NConstraint(this, v1, v2, true, stiffness)
        new NConstraint(this, v2, v3, true, stiffness)
        new NConstraint(this, v3, v0, true, stiffness)

        // Create constraints.
        new NConstraint(this, v0, v2, false, stiffness)
        new NConstraint(this, v1, v3, false, stiffness)

        this.center.set(x + 0.5 * Settings.websiteWidth, y + 0.5 * Settings.websiteHeight)
        this.halfExtents.set(0.5 * Settings.websiteWidth, 0.5 * Settings.websiteHeight)
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
        canvas.fillStyle = '#fff'
        canvas.fill()
    }
}
