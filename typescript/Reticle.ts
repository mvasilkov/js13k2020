'use strict'
/// <reference path="js13k2020.d.ts" />

class Reticle extends NBody {
    startingVertex: NVertex
    targetingVertex: NVertex
    lastPosition: NVec2

    constructor(scene: NScene, startingPoint: IVec2) {
        super(scene)
        this.startingVertex = new NStaticVertex(this, startingPoint.x, startingPoint.y)
        this.targetingVertex = new NVertex(this, startingPoint.x - 0.001, startingPoint.y)
        this.lastPosition = new NVec2(startingPoint.x, startingPoint.y)

        const cons = new NConstraint(this, this.startingVertex, this.targetingVertex,
            false, Settings.reticleStiffness)

        // Make the starting vertex stay in place.
        const originalSolve = cons.solve
        cons.solve = () => {
            if (pointer.vertex) return // Do nothing while dragging.
            originalSolve.call(cons)
            this.startingVertex.position.setTo(startingPoint)
        }
    }

    paint(canvas: CanvasRenderingContext2D, t: number) {
        // Interpolate vertices.
        this.targetingVertex.interpolate(t)

        const start = this.startingVertex.position
        const pos = this.targetingVertex.interpolated

        canvas.beginPath()
        canvas.moveTo(pos.x, pos.y)
        canvas.lineTo(start.x, start.y)
        canvas.strokeStyle = FAILURE_BACK
        canvas.stroke()

        canvas.beginPath()
        canvas.arc(pos.x, pos.y, 9, 0, TWOPI)
        canvas.arc(start.x, start.y, 4, 0, TWOPI)
        canvas.fillStyle = FAILURE_BACK
        canvas.fill()
    }
}
