/* This file is part of natlib.
 * natlib, a library for games, is planned to release in early 2021.
 * https://github.com/mvasilkov/natlib
 */
'use strict'
/// <reference path="natlib.d.ts" />

/** Separating Axis Theorem collision testing and resolution. */
const satResolve = (function () {
    const a = new NVec2
    let cDist: number
    let cEdge: NConstraint
    let cVert: NVertex

    /** Projected distance function. */
    function pDistance(b0: NBody, b1: NBody, edge: NConstraint): number {
        // Compute the normal to this edge.
        register0.setNormal(edge.p0, edge.p1)

        // Project both bodies onto the normal.
        b0.projectOn(register0)
        b1.projectOn(register0)

        // Compute the distance between the two intervals.
        return b0.pMin < b1.pMin ? b1.pMin - b0.pMax : b0.pMin - b1.pMax
    }

    /** Separating Axis Theorem collision detection. */
    function sat(b0: NBody, b1: NBody) {
        const b0EdgesLength = b0.edges.length
        const b1EdgesLength = b1.edges.length
        if (b0EdgesLength === 0 || b1EdgesLength === 0) return

        // aabb overlap test
        if (Math.abs(b1.center.x - b0.center.x) >= b0.halfExtents.x + b1.halfExtents.x ||
            Math.abs(b1.center.y - b0.center.y) >= b0.halfExtents.y + b1.halfExtents.y)
            // no aabb overlap
            return

        cDist = pDistance(b0, b1, cEdge = b0.edges[0])
        a.setTo(register0)

        for (let i = 1; i < b0EdgesLength; ++i) {
            const edge = b0.edges[i]
            // begin copypasta
            const dist = pDistance(b0, b1, edge)
            // If the intervals don't overlap, there is no collision.
            if (dist > 0) return
            if (dist > cDist) {
                cDist = dist
                cEdge = edge
                a.setTo(register0)
            }
            // end copypasta
        }

        for (let i = 0; i < b1EdgesLength; ++i) {
            const edge = b1.edges[i]
            // begin copypasta
            const dist = pDistance(b0, b1, edge)
            // If the intervals don't overlap, there is no collision.
            if (dist > 0) return
            if (dist > cDist) {
                cDist = dist
                cEdge = edge
                a.setTo(register0)
            }
            // end copypasta
        }

        // There is no separating axis.
        // Ensure collision edge in `b1` and collision vertex in `b0`.
        if (cEdge.parent !== b1) {
            const t = b0
            b0 = b1
            b1 = t
        }

        // Ensure that the collision normal is pointing at `b1`.
        register0.setSubtract(b0.center, b1.center)
        if (register0.dot(a) < 0) a.scalarMult(-1)

        // Find the collision vertex.
        register0.setSubtract(b0.positions[0], b1.center)
        let distMin = a.dot(register0)
        cVert = b0.vertices[0]

        for (let i = 1; i < b0.positions.length; ++i) {
            register0.setSubtract(b0.positions[i], b1.center)
            const dist = a.dot(register0)
            if (dist < distMin) {
                distMin = dist
                cVert = b0.vertices[i]
            }
        }

        // Resolve the collision.
        resolve()
    }

    /** Collision resolution. */
    function resolve() {
        const pos0 = cEdge.p0
        const pos1 = cEdge.p1
        const old0 = cEdge.v0.oldPosition
        const old1 = cEdge.v1.oldPosition
        const pos = cVert.position
        const old = cVert.oldPosition

        // response vector
        register0.setScalarMult(a, -cDist)

        // Find the position of the collision vertex on the edge.
        register1.setSubtract(pos1, pos0)
        const t = register1.x === 0 && register1.y === 0 ? 0.5 :
            Math.abs(register1.x) > Math.abs(register1.y) ?
                (pos.x - register0.x - pos0.x) / register1.x :
                (pos.y - register0.y - pos0.y) / register1.y

        // Mass coefficients.
        let c0 = cVert.parent.mass
        let c1 = cEdge.parent.mass
        const c = c0 + c1
        c0 /= c * 2
        c1 /= c

        const k = c0 / (t * t + (1 - t) * (1 - t))
        const k0 = (1 - t) * k
        const k1 = t * k

        // apply the collision response
        pos0.x -= register0.x * k0
        pos0.y -= register0.y * k0
        pos1.x -= register0.x * k1
        pos1.y -= register0.y * k1

        pos.x += register0.x * c1
        pos.y += register0.y * c1

        // collision friction
        if (Settings.kFriction) {
            // compute relative velocity
            register0.set(
                pos.x - old.x - (pos0.x + pos1.x - old0.x - old1.x) * 0.5,
                pos.y - old.y - (pos0.y + pos1.y - old0.y - old1.y) * 0.5
            )

            // project the relative velocity onto tangent
            register1.set(-a.y, a.x)
            register0.setScalarMult(register1, register0.dot(register1))

            // apply tangent friction
            old0.x -= register0.x * Settings.kFriction * k0
            old0.y -= register0.y * Settings.kFriction * k0
            old1.x -= register0.x * Settings.kFriction * k1
            old1.y -= register0.y * Settings.kFriction * k1

            old.x += register0.x * Settings.kFriction * c1
            old.y += register0.y * Settings.kFriction * c1
        }
    }

    return sat
})()
