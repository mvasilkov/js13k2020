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

        let xx = 0
        let yy = 0

        for (let n = 0; n < 4; ++n) {
            const p = this.vertices[n].interpolated

            canvas.lineTo(p.x, p.y)

            xx += p.x
            yy += p.y
        }

        canvas.closePath()

        // Paint background.
        canvas.fillStyle = '#f1f1f1'
        canvas.fill()

        // Paint website logo.
        register0.setSubtract(this.vertices[1].interpolated, this.vertices[0].interpolated)
        register1.setSubtract(this.vertices[2].interpolated, this.vertices[3].interpolated)

        canvas.save()

        canvas.translate(0.25 * xx, 0.25 * yy)
        canvas.rotate(0.5 * (Math.atan2(register0.y, register0.x) + Math.atan2(register1.y, register1.x)))

        canvas.drawImage(WEBSITE_PICTURE,
            -0.5 * Settings.websitePicWidth,
            -0.5 * Settings.websitePicHeight,
            Settings.websitePicWidth, Settings.websitePicHeight)

        canvas.restore()
    }
}
