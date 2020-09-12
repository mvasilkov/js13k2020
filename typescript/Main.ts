'use strict'
/// <reference path="js13k2020.d.ts" />

const Levels = [
    Level,
    TheWall,
    Opening,
    Breach,
    Banned,
    Reversal,
    Moving,
    Distancing,
    Hopeless,
    End,
]

let activeLevel: Level
let nextLevel: Level

(function () {
    const startingPoint = new NVec2(350, Settings.screenHeight * 0.5)
    const captureDistSquared = Settings.targetCaptureDist ** 2
    const releaseDistSquared = Settings.targetReleaseDist ** 2

    let updatesToRetractFiringPin: number
    let updatesToWin: number
    let panningCounter: number

    activeLevel = new Levels[0](startingPoint)

    function update() {
        activeLevel.integrate()
        activeLevel.solve()

        if (activeLevel.state === LevelState.FIRING) {
            if (--updatesToRetractFiringPin <= 0) {
                activeLevel.firingPin!.retract()
                activeLevel.firingPin = null
                activeLevel.state = LevelState.WAITING
                updatesToWin = 2
            }
        }

        else if (activeLevel.state === LevelState.WAITING) {
            if (++activeLevel.waited >= activeLevel.duration) {
                if (activeLevel.autoWin) {
                    activeLevel.state = LevelState.WINNING
                    nextLevel = new Levels[(activeLevel.getIndex() + 1) % Levels.length](startingPoint)
                    panningCounter = 0
                    // Reset pointer.
                    pointer.dragging = false
                    pointer.vertex = undefined
                    sound(sndWin)
                }
                else {
                    activeLevel.state = LevelState.FAILING
                    sound(sndFail)
                }
            }
            else if (activeLevel.website.contains(activeLevel.projectile.center)) {
                if (--updatesToWin <= 0) {
                    activeLevel.state = LevelState.WINNING
                    nextLevel = new Levels[(activeLevel.getIndex() + 1) % Levels.length](startingPoint)
                    panningCounter = 0
                    // Reset pointer.
                    pointer.dragging = false
                    pointer.vertex = undefined
                    sound(sndWin)
                }
            }
        }

        else if (activeLevel.state === LevelState.FAILING) {
            if (++activeLevel.curtain >= Settings.waitCurtain) {
                activeLevel = new Levels[activeLevel.getIndex()](startingPoint, Settings.waitCurtain)
                activeLevel.state = LevelState.RESTARTING
                // Reset pointer.
                pointer.dragging = false
                pointer.vertex = undefined
            }
        }

        else if (activeLevel.state === LevelState.RESTARTING) {
            if (--activeLevel.curtain <= 0) {
                activeLevel.state = LevelState.INITIAL
            }
        }

        else if (activeLevel.state === LevelState.WINNING) {
            if (++panningCounter > Settings.waitNextLevel) {
                activeLevel = nextLevel
            }
        }
    }

    function render(t: number) {
        // Panning variables.
        let tPan: number
        let sPan: number

        // Panning part 1.
        if (activeLevel.state === LevelState.WINNING) {
            canvas.fillStyle = EARTH_BACK
            canvas.fillRect(0, 0, Settings.screenWidth, Settings.screenHeight)

            canvas.save()

            tPan = (panningCounter - 1 + t) / Settings.waitNextLevel
            sPan = lerp(1, 0.5, easeInOutQuad(tPan))

            canvas.translate(Settings.screenWidth * 0.5, Settings.screenHeight * 0.5)
            canvas.scale(sPan, sPan)
            canvas.translate(-Settings.screenWidth * 0.5, -Settings.screenHeight * 0.5)

            canvas.translate(lerp(0, -Settings.screenWidth, easeInOutQuad(tPan)), 0)

            canvas.beginPath()

            canvas.rect(0, 0, Settings.screenWidth, Settings.screenHeight)

            canvas.clip()
        }

        // #region Pointer events.
        else if (pointer.dragging && activeLevel.state !== LevelState.RESTARTING) {
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

                activeLevel.updateTargeting(pos)
            }
        }
        else if (activeLevel.state === LevelState.AIMING) {
            if (activeLevel.launch()) {
                activeLevel.state = LevelState.FIRING
                updatesToRetractFiringPin = 4
                sound(sndLaunch)
            }
            else activeLevel.state = LevelState.INITIAL
        }
        // #endregion

        // #region Paint active level.
        paintBackground(canvas, t, activeLevel)

        activeLevel.website.paint(canvas, t)

        for (const b of activeLevel.bodies) {
            b.paint(canvas, t)
        }
        // #endregion

        paintCurtain(canvas, t, activeLevel)

        // Panning part 2.
        if (activeLevel.state === LevelState.WINNING) {
            canvas.restore()

            canvas.save()

            canvas.translate(lerp(Settings.screenWidth, 0, easeInOutQuad(tPan!)), 0)

            // #region Paint next level.
            paintBackground(canvas, t, nextLevel)

            nextLevel.website.paint(canvas, t)

            for (const b of nextLevel.bodies) {
                b.paint(canvas, t)
            }
            // #endregion

            canvas.restore()
        }
    }

    handleResize()

    startMainloop(update, render)
})()
