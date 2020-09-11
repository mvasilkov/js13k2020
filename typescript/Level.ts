'use strict'
/// <reference path="js13k2020.d.ts" />

const enum LevelState {
    INITIAL = 0,
    AIMING,
    FIRING,
    WAITING,
    FAILING,
    RESTARTING,
    WINNING,
}

class Level extends NScene {
    startingPoint: NVec2
    reticle: Reticle
    projectile: UserAgent
    firingPin: FiringPin | null
    website: Website
    state: LevelState
    duration: number
    waited: number
    curtain: number
    curtainPicture: HTMLCanvasElement
    autoWin: boolean

    static getUserAgent() {
        if (location.search.match(/firefox=1/) !== null) return Firefox
        if (location.search.match(/piracy=1/) !== null) return BigBrother
        if (document.monetization && document.monetization.state === 'started') return BigBrother
        return Firefox
    }

    constructor(startingPoint: NVec2, curtain = 0) {
        super()
        this.startingPoint = startingPoint
        this.reticle = new Reticle(this, startingPoint)
        this.projectile = new ((<typeof Level>this.constructor).getUserAgent())
            (this, startingPoint.x, startingPoint.y) // 32, 16, 0.016
        this.firingPin = null
        this.website = new Website
        this.state = LevelState.INITIAL
        this.duration = Settings.waitLevel
        this.waited = 0
        this.curtain = curtain
        this.curtainPicture = FAILURE_PICTURE
        this.autoWin = false
    }

    updateTargeting(pos: IVec2) {
        this.reticle.lastPosition.setTo(pos)
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

    getIndex() {
        return 0
    }
}
