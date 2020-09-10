'use strict'
/// <reference path="../js13k2020.d.ts" />

class WallLevel extends Level {
    wall: Wall

    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        this.wall = new Wall(this, startingPoint.x + 256, (Settings.screenHeight - 256) * 0.5, 1, 9999)
    }
}
