'use strict'
/// <reference path="js13k2020.d.ts" />

/* Traced using the Polar Bears tool:
 * https://codepen.io/mvasilkov/details/VwaMMPK
 */
const INTERNET_EXPLORER = [
    [1, 1, 1, 0],
    [2, 2, 1, 0],
    [3, 3, 1, 0],
    [4, 4, 1, 0],
    [5, 5, 1, 0],
    [6, 6, 1, 0],
    [7, 7, 1, 0],
    [8, 8, 1, 0],
    [9, 9, 1, 0],
    [10, 10, 1, 0],
    [11, 11, 1, 0],
    [12, 12, 1, 0],
    [13, 13, 1, 0],
    [14, 14, 1, 0],
    [15, 15, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 0.68, 0.33],
    [8, 7, 0.48, 0.33],
    [8, 9, 0.43, 0.38],
    [15, 0, 0.38, 0.08],
    [15, 14, 0.46, 0],
    [14, 13, 0.51, 0.01],
    [13, 12, 0.54, 0.01],
    [12, 11, 0.55, 0.01],
    [11, 12, 0.54, 0.01],
    [10, 11, 0.51, 0],
    [9, 8, 0.47, 0],
    [9, 8, 0.38, 0.09],
    [7, 8, 0.33, 0.14],
    [7, 8, 0.46, 0.01],
    [6, 7, 0.51, 0.01],
    [5, 6, 0.55, 0],
    [4, 5, 0.54, 0.01],
    [3, 4, 0.54, 0.01],
    [2, 1, 0.52, 0],
    [2, 1, 0.41, 0.11],
    [1, 0, 0.86, 0.14],
]

const INTERNET_EXPLORER_BACK = canvas.createRadialGradient(
    256, 256, 363, // Math.ceil(Math.sqrt(2 * 65536)),
    256, 128, 0
)
INTERNET_EXPLORER_BACK.addColorStop(1 - 1, '#0d79c8')
// INTERNET_EXPLORER_BACK.addColorStop(1 - 0.9544, '#1c87cf')
// INTERNET_EXPLORER_BACK.addColorStop(1 - 0.8397, '#3ea5dd')
// INTERNET_EXPLORER_BACK.addColorStop(1 - 0.7163, '#59bee9')
// INTERNET_EXPLORER_BACK.addColorStop(1 - 0.5832, '#6ed2f2')
// INTERNET_EXPLORER_BACK.addColorStop(1 - 0.4357, '#7ddff9')
INTERNET_EXPLORER_BACK.addColorStop(1 - 0.2624, '#86e8fd')
INTERNET_EXPLORER_BACK.addColorStop(1 - 0, '#89eafe')

class InternetExplorer extends UserAgent {
    paint(canvas: CanvasRenderingContext2D, t: number) {
        this.interpolate(t)

        this.tracePath(canvas, INTERNET_EXPLORER)

        canvas.save()
        enclose(this.center.x - this.halfExtents.x, this.center.y - this.halfExtents.y,
            this.center.x + this.halfExtents.x, this.center.y + this.halfExtents.y)

        canvas.fillStyle = INTERNET_EXPLORER_BACK // '#0078d7'
        canvas.fill()

        canvas.restore()
    }
}
