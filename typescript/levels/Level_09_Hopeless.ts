'use strict'
/// <reference path="../js13k2020.d.ts" />

class Hopeless extends Level {
    static getUserAgent() {
        return InternetExplorer
    }

    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        this.website = new NoWebsite
        this.duration = 196
        this.autoWin = true

        new WebsiteBox(this,
            Settings.screenWidth - Settings.websiteWidth - 1,
            (Settings.screenHeight - Settings.websiteHeight) * 0.5)
    }

    /** Verlet integration loop. */
    integrate() {
        let gravity: number
        let fg: number

        if (this.state === LevelState.WAITING || this.state === LevelState.FAILING || this.state === LevelState.WINNING) {
            gravity = 0.9
            fg = 0.5
        }
        else {
            gravity = Settings.kGravity
            fg = Settings.kFrictionGround
        }

        for (let i = 0; i < this.vertices.length; ++i) {
            this.vertices[i].integrate(gravity, fg)
        }
    }

    getIndex() {
        return 8
    }
}
