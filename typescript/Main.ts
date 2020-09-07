'use strict'
/// <reference path="js13k2020.d.ts" />

const Levels = [Level]

let activeLevel: Level

(function () {
    const startingPoint = new NVec2(350, Settings.screenHeight * 0.5)
    const captureDistSquared = Settings.targetCaptureDist ** 2
    const releaseDistSquared = Settings.targetReleaseDist ** 2

    let updatesToRetractFiringPin: number

    activeLevel = new Levels[0](startingPoint)

    function update() {
        activeLevel.integrate()
        activeLevel.solve()

        if (activeLevel.state === LevelState.FIRING) {
            if (--updatesToRetractFiringPin <= 0) {
                activeLevel.firingPin!.retract()
                activeLevel.firingPin = null
                activeLevel.state = LevelState.WAITING
            }
        }

        else if (activeLevel.state === LevelState.WAITING) {
            if (++activeLevel.waited >= Settings.waitLevel) {
                activeLevel.state = LevelState.FAILING
            }
        }

        else if (activeLevel.state === LevelState.FAILING) {
            if (++activeLevel.curtain >= Settings.waitCurtain) {
                activeLevel = new Levels[0](startingPoint, Settings.waitCurtain)
                activeLevel.state = LevelState.RESTARTING
            }
        }

        else if (activeLevel.state === LevelState.RESTARTING) {
            if (--activeLevel.curtain <= 0) {
                activeLevel.state = LevelState.INITIAL
            }
        }
    }

    function render(t: number) {
        paintBackground(canvas, t, activeLevel)

        activeLevel.website.paint(canvas)

        for (const b of activeLevel.bodies) {
            b.paint(canvas, t)
        }

        paintCurtain(canvas, t, activeLevel)

        // targeting vertex
        if (pointer.dragging) {
            if (!pointer.vertex && startingPoint.distanceSquared(pointer) <= captureDistSquared) {
                pointer.vertex = activeLevel.reticle.targetingVertex
                if (activeLevel.state === LevelState.INITIAL)
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
