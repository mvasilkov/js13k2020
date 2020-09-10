'use strict'
/// <reference path="js13k2020.d.ts" />

const enum LevelState {
    INITIAL = 0,
    AIMING,
    FIRING,
    WAITING,
    FAILING,
    RESTARTING,
}

class Level extends NScene {
    startingPoint: NVec2
    reticle: Reticle
    projectile: NBall
    firingPin: FiringPin | null
    website: Website
    state: LevelState
    waited: number
    curtain: number

    constructor(startingPoint: NVec2, curtain = 0) {
        super()
        this.startingPoint = startingPoint
        this.reticle = new Reticle(this, startingPoint)
        this.projectile = new Firefox(this, startingPoint.x, startingPoint.y) // 32, 16, 0.016
        this.firingPin = null
        this.website = new Website
        this.state = LevelState.INITIAL
        this.waited = 0
        this.curtain = curtain
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

    launch(): boolean {
        let start: IVec2
        let length: number

        register0.setSubtract(this.reticle.lastPosition,
            start = this.reticle.startingVertex.position)

        if ((length = register0.length()) < 16) return false

        register0.scalarMult(inverseRescale(length, 16,
            Settings.targetReleaseDist, 10, 30) / length)

        this.firingPin = new FiringPin(this, register0.x + start.x, register0.y + start.y,
            32, Math.atan2(register0.y, register0.x) + FOURTHPI, 1, 9999)

        return true
    }
}
