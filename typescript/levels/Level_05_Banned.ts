'use strict'
/// <reference path="../js13k2020.d.ts" />

class Banned extends TheWall {
    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        this.duration = 196
    }

    updateTargeting(pos: IVec2) {
        this.reticle.lastPosition.setTo(pos)

        // Place the wall.
        register0.setSubtract(this.startingPoint, pos)
        if (register0.length() < 16) return

        const a = Math.atan2(register0.y, register0.x)
        const cos64 = 64 * Math.cos(a)
        const sin64 = 64 * Math.sin(a)

        register0.scalarMult(256 / register0.length())
        register0.add(this.startingPoint)

        const v = <NStaticVertex[]>this.wall.vertices
        let x = register0.x + 128 * Math.cos(a - HALFPI)
        let y = register0.y + 128 * Math.sin(a - HALFPI)

        v[0].set(x, y)
        v[1].set(x + cos64, y + sin64)

        x = register0.x + 128 * Math.cos(a + HALFPI)
        y = register0.y + 128 * Math.sin(a + HALFPI)

        v[2].set(x + cos64, y + sin64)
        v[3].set(x, y)
    }

    getIndex() {
        return 4
    }
}
