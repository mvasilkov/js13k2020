'use strict'
/// <reference path="../js13k2020.d.ts" />

class End extends Level {
    static getUserAgent() {
        return Firefox
    }

    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        this.website = new NoWebsite

        new InternetExplorer(this,
            Settings.screenWidth * 0.5,
            Settings.screenHeight * 0.5)

        new BigBrother(this,
            Settings.screenWidth - this.startingPoint.x,
            Settings.screenHeight * 0.5)

        for (let y = 1; y <= 3; ++y) {
            for (let x = 0; x < y; ++x) {
                new Box(this,
                    Settings.screenWidth - 64 * x - 32 * (3 - y) - 33,
                    Settings.screenHeight - 64 * (3 - y) - 33,
                    64, 0.5, 0.5)
            }
        }
    }

    /** Solve constraints and collisions. */
    solve() {
        super.solve()

        if (this.state === LevelState.WAITING) {
            this.state = LevelState.INITIAL
        }
    }

    getIndex() {
        return 9
    }
}
