'use strict'
/// <reference path="../js13k2020.d.ts" />

class Moving extends Level {
    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        this.website = new MovingWebsite
        this.curtainPicture = FAILURE_MOVED_PICTURE
    }

    /** Solve constraints and collisions. */
    solve() {
        super.solve()

        if (this.state === LevelState.WAITING || this.state === LevelState.FAILING || this.state === LevelState.WINNING) {
            this.website.update()
        }
    }

    getIndex() {
        return 6
    }
}
