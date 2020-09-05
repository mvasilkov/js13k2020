'use strict'
/// <reference path="js13k2020.d.ts" />

let activeLevel: Level

(function () {
    const startingPoint = new NVec2(350, Settings.screenHeight * 0.5)
    const captureDistSquared = Settings.targetCaptureDist ** 2
    const releaseDistSquared = Settings.targetReleaseDist ** 2

    let updatesToRetractFiringPin: number

    activeLevel = new Level(startingPoint)

    function update() {
        activeLevel.integrate()
        activeLevel.solve()

        if (activeLevel.state === LevelState.FIRING) {
            if (--updatesToRetractFiringPin <= 0) {
                activeLevel.firingPin!.retract()
                activeLevel.firingPin = null
                activeLevel.state = LevelState.INITIAL
            }
        }
    }

    function render(t: number) {
        paintBackground(canvas)

        activeLevel.website.paint(canvas)

        for (const b of activeLevel.bodies) {
            b.paint(canvas, t)
        }

        // targeting vertex
        if (pointer.dragging) {
            if (!pointer.vertex && startingPoint.distanceSquared(pointer) <= captureDistSquared) {
                pointer.vertex = activeLevel.reticle.targetingVertex
                activeLevel.state = LevelState.AIMING
            }

            if (pointer.vertex) {
                const pos = activeLevel.reticle.targetingVertex.position
                pos.setTo(pointer)

                const dist = startingPoint.distanceSquared(pos)
                if (dist > releaseDistSquared) {
                    pos.subtract(startingPoint)
                    pos.scalarMult(Settings.targetReleaseDist / Math.sqrt(dist))
                    pos.add(startingPoint)
                }

                activeLevel.reticle.lastPosition.setTo(pos)
            }
        }
        else if (activeLevel.state === LevelState.AIMING) {
            if (activeLevel.launch()) {
                activeLevel.state = LevelState.FIRING
                updatesToRetractFiringPin = 4
            }
            else activeLevel.state = LevelState.INITIAL
        }
    }

    startMainloop(update, render)
})()
