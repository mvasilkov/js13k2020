'use strict'
/// <reference path="js13k2020.d.ts" />

// https://uigradients.com/#DayTripper
const FAILURE_BACK = canvas.createLinearGradient(0, 0, Settings.screenWidth, 0)
FAILURE_BACK.addColorStop(0, '#f857a6')
FAILURE_BACK.addColorStop(1, '#ff5858')

function paintBackground(canvas: CanvasRenderingContext2D, t: number, level: Level) {
    canvas.clearRect(0, 0, Settings.screenWidth, Settings.screenHeight)
}

function paintCurtain(canvas: CanvasRenderingContext2D, t: number, level: Level) {
    let barWidth: number

    if (level.state === LevelState.WAITING) {
        barWidth = (level.waited - 1 + t) / Settings.waitLevel * Settings.screenWidth

        canvas.fillStyle = FAILURE_BACK
        canvas.fillRect(0, 0, barWidth, 3)
    }
    else if (level.state === LevelState.FAILING) {
        barWidth = (level.waited - 1 + t) / Settings.waitCurtain * Settings.displaySize

        canvas.fillStyle = FAILURE_BACK
        canvas.fillRect(0, 0, Settings.screenWidth, 3)

        canvas.save()

        canvas.translate(0, Settings.screenHeight)
        canvas.rotate(-0.5124) // Math.atan2(-540, 960)

        canvas.beginPath()
        canvas.lineTo(0, -500)
        canvas.lineTo(barWidth, -500)
        canvas.lineTo(barWidth, 1000)
        canvas.lineTo(0, 1000)
        canvas.closePath()

        canvas.restore()

        canvas.save()

        canvas.clip()

        canvas.fillRect(0, 0, Settings.screenWidth, Settings.screenHeight)

        canvas.restore()
    }
    else if (level.state === LevelState.RESTARTING) {
        barWidth = (level.waited + 1 - t) / Settings.waitCurtain * Settings.displaySize

        canvas.save()

        canvas.translate(Settings.screenWidth, 0)
        canvas.rotate(-0.5124) // Math.atan2(-540, 960)

        canvas.beginPath()
        canvas.lineTo(0, -500)
        canvas.lineTo(-barWidth, -500)
        canvas.lineTo(-barWidth, 1000)
        canvas.lineTo(0, 1000)
        canvas.closePath()

        canvas.restore()

        canvas.save()

        canvas.clip()

        canvas.fillStyle = FAILURE_BACK
        canvas.fillRect(0, 0, Settings.screenWidth, Settings.screenHeight)

        canvas.restore()
    }
}
