'use strict'
/// <reference path="js13k2020.d.ts" />

/* Traced using the Polar Bears tool:
 * https://codepen.io/mvasilkov/details/VwaMMPK
 */
const FIREFOX = [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [2, 2, 1, 0],
    [3, 3, 1, 0],
    [4, 4, 1, 0],
    [5, 5, 1, 0],
    [6, 6, 1, 0],
    [7, 7, 1, 0],
    [8, 8, 1, 0],
    [9, 9, 1, 0],
    [10, 9, 0.56, 0.44],
    [10, 11, 0.75, 0.21],
    [10, 9, 0.59, 0.18],
    [11, 10, 0.6, 0.16],
    [10, 11, 0.39, 0.16],
    [12, 11, 0.2, 0],
    [8, 7, 0.25, 0.22],
    [7, 8, 0.46, 0.01],
    [6, 7, 0.46, 0.01],
    [5, 6, 0.46, 0.01],
    [4, 3, 0.46, 0],
    [3, 4, 0.46, 0],
    [2, 1, 0.45, 0],
    [1, 0, 0.42, 0.01],
    [0, 15, 0.4, 0.01],
    [15, 14, 0.39, 0.01],
    [14, 13, 0.37, 0.01],
    [13, 14, 0.21, 0.17],
    [14, 13, 0.43, 0.01],
    [15, 14, 0.35, 0.17],
    [14, 13, 0.51, 0.01],
    [13, 12, 0.6, 0.01],
    [13, 12, 0.52, 0.34],
    [13, 12, 0.81, 0.31],
    [13, 12, 1, 0.01],
    [14, 15, 0.65, 0.25],
    [15, 0, 0.85, 0.04],
    [15, 14, 0.54, 0.4],
    [14, 15, 0.78, 0.19],
    [14, 15, 0.52, 0.48],
    [15, 15, 1, 0],
]

const FIREFOX_BACK = canvas.createRadialGradient(
    256, 512 + 64, 256,
    256, -256 + 64, 256
)
FIREFOX_BACK.addColorStop(1 - 0.7, '#e31587')
FIREFOX_BACK.addColorStop(1 - 0.53, '#ff3647')
FIREFOX_BACK.addColorStop(1 - 0.37, '#ff980e')
FIREFOX_BACK.addColorStop(1 - 0.05, '#fff44f')

const EARTH_BACK = canvas.createLinearGradient(
    0, Settings.screenHeight,
    Settings.screenWidth, 0
)
// Colors: https://webgradients.com/ '019 Malibu Beach'
EARTH_BACK.addColorStop(0, '#4facfe')
EARTH_BACK.addColorStop(1, '#00f2fe')

class Firefox extends UserAgent {
    paint(canvas: CanvasRenderingContext2D, t: number) {
        this.interpolate(t)

        // Paint the Earth.
        canvas.beginPath()

        for (const vert of this.vertices) {
            canvas.lineTo(vert.interpolated.x, vert.interpolated.y)
        }

        canvas.closePath()

        canvas.fillStyle = EARTH_BACK
        canvas.fill()

        // Paint the panda.
        this.tracePath(canvas, FIREFOX)

        canvas.save()
        enclose(this.center.x - this.halfExtents.x, this.center.y - this.halfExtents.y,
            this.center.x + this.halfExtents.x, this.center.y + this.halfExtents.y)

        canvas.fillStyle = FIREFOX_BACK
        canvas.fill()

        canvas.restore()
    }
}
