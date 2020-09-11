'use strict'
/// <reference path="../js13k2020.d.ts" />

class Opening extends Level {
    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        new Wall(this, startingPoint.x + 256, (Settings.screenHeight - 256) * 0.5 - 140, 1, 9999)
            .rotate(EIGHTHPI)

        new Wall(this, startingPoint.x + 256, (Settings.screenHeight - 256) * 0.5 + 140, 1, 9999)
            .rotate(-EIGHTHPI)
    }

    getIndex() {
        return 2
    }
}
