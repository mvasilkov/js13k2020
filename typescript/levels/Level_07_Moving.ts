'use strict'
/// <reference path="../js13k2020.d.ts" />

class Moving extends Level {
    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        this.website = new MovingWebsite
        this.curtainPicture = FAILURE_MOVED_PICTURE
    }

    solve() {
        super.solve()

        if (this.state >= LevelState.WAITING) {
            this.website.update()
        }
    }
}
