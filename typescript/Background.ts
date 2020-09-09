'use strict'
/// <reference path="js13k2020.d.ts" />

const FAILURE_BACK = canvas.createLinearGradient(0, 0, Settings.screenWidth, 0)
// Colors: https://uigradients.com/#DayTripper
FAILURE_BACK.addColorStop(0, '#f857a6')
FAILURE_BACK.addColorStop(1, '#ff5858')

const FAILURE_PICTURE = prerender(Settings.screenWidth, Settings.screenHeight, canvas => {
    canvas.fillStyle = FAILURE_BACK
    canvas.fillRect(0, 0, Settings.screenWidth, Settings.screenHeight)

    canvas.font = systemFont
    canvas.textAlign = 'center'
    canvas.textBaseline = 'top'
    canvas.fillStyle = '#fff'

    for (let x = 80; x < Settings.screenWidth; x += 160) {
        for (let y = 15; y < Settings.screenHeight; y += 45) {
            canvas.fillText('404 Not Found', x, y)
        }
    }
})

const WALL_PICTURE = prerender(Settings.screenWidth, Settings.screenHeight, canvas => {
    canvas.beginPath()

    for (let x = 0; x < Settings.screenWidth + Settings.screenHeight; x += 20) {
        canvas.moveTo(x, 0)
        canvas.lineTo(x - Settings.screenHeight, Settings.screenHeight)
    }

    canvas.strokeStyle = FAILURE_BACK
    canvas.stroke()
})

function paintBackground(canvas: CanvasRenderingContext2D, t: number, level: Level) {
    canvas.clearRect(0, 0, Settings.screenWidth, Settings.screenHeight)
}

function paintCurtain(canvas: CanvasRenderingContext2D, t: number, level: Level) {
    let width: number

    if (level.state === LevelState.WAITING) {
        width = (level.waited - 1 + t) / Settings.waitLevel * Settings.screenWidth

        canvas.fillStyle = FAILURE_BACK
        canvas.fillRect(0, 0, width, 3)
    }

    else if (level.state === LevelState.FAILING) {
        width = easeOutQuad((level.curtain - 1 + t) / Settings.waitCurtain) * 0.5 * Settings.displaySize

        canvas.fillStyle = FAILURE_BACK
        canvas.fillRect(0, 0, Settings.screenWidth, 3)

        _paintCurtain(canvas, 0, Settings.screenHeight, width)
        _paintCurtain(canvas, Settings.screenWidth, 0, -width)
    }

    else if (level.state === LevelState.RESTARTING) {
        width = easeInQuad((level.curtain + 1 - t) / Settings.waitCurtain) * 0.5 * Settings.displaySize

        _paintCurtain(canvas, 0.5 * Settings.screenWidth, 0.5 * Settings.screenHeight, -width, width)
    }
}

function _paintCurtain(canvas: CanvasRenderingContext2D, x: number, y: number, width: number, start = 0) {
    canvas.save()

    canvas.translate(x, y)
    canvas.rotate(-0.5124) // Math.atan2(-540, 960)

    canvas.beginPath()
    canvas.lineTo(start, -500)
    canvas.lineTo(width, -500)
    canvas.lineTo(width, 1000)
    canvas.lineTo(start, 1000)
    canvas.closePath()

    canvas.restore()

    canvas.save()

    canvas.clip()

    // canvas.fillStyle = FAILURE_BACK
    // canvas.fillRect(0, 0, Settings.screenWidth, Settings.screenHeight)
    canvas.drawImage(FAILURE_PICTURE, 0, 0, Settings.screenWidth, Settings.screenHeight)

    canvas.restore()
}
