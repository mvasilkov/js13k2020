'use strict'
/// <reference path="../js13k2020.d.ts" />

class FlingWallLevel extends Level {
    constructor(startingPoint: NVec2, curtain = 0) {
        super(startingPoint, curtain)

        const offset = new NVec2(
            (Settings.screenWidth - Settings.websiteWidth - startingPoint.x) * 0.5,
            -Settings.screenHeight * 0.125
        )

        // Move the projectile.
        for (const vert of this.projectile.vertices) {
            vert.position.add(offset)
            vert.oldPosition.add(offset)
        }
        this.projectile.center.add(offset)

        // This is our new projectile.
        new Box(this, startingPoint.x, startingPoint.y, 64, 0.5, 4)
    }
}
