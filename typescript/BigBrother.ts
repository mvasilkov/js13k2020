'use strict'
/// <reference path="js13k2020.d.ts" />

/* Traced using the Polar Bears tool:
 * https://codepen.io/mvasilkov/details/VwaMMPK
 */
const CHROME_YELLOW = [
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [2, 2, 1, 0],
    [3, 3, 1, 0],
    [4, 4, 1, 0],
    // [4, 5, 0.88, 0.12],
    [5, 5, 1, 0], // Intentional overlap.
    [1, 2, 0.31, 0.15],
    [12, 11, 0.44, 0.01],
    // [15, 14, 0.78, 0.22],
    [14, 14, 1, 0], // Intentional overlap.
    [15, 15, 1, 0],
]

const CHROME_GREEN = [
    [5, 5, 1, 0],
    [6, 6, 1, 0],
    [7, 7, 1, 0],
    [8, 8, 1, 0],
    [9, 9, 1, 0],
    // [9, 10, 0.56, 0.44],
    [10, 10, 1, 0], // Intentional overlap.
    [7, 6, 0.31, 0.15],
    [1, 2, 0.31, 0.15],
    [4, 5, 0.88, 0.12],
]

const CHROME_RED = [
    [10, 10, 1, 0],
    [11, 11, 1, 0],
    [12, 12, 1, 0],
    [13, 13, 1, 0],
    [14, 14, 1, 0],
    [15, 14, 0.78, 0.22],
    [12, 11, 0.44, 0.01],
    [7, 6, 0.31, 0.15],
    [9, 10, 0.56, 0.44],
]

const CHROME_BLUE = [
    [0, 1, 0.45, 0],
    [1, 0, 0.44, 0.01],
    [2, 3, 0.44, 0.01],
    [3, 4, 0.44, 0.01],
    [4, 3, 0.45, 0],
    [5, 6, 0.44, 0.01],
    [6, 7, 0.45, 0.01],
    [7, 8, 0.44, 0.01],
    [8, 9, 0.46, 0],
    [9, 10, 0.45, 0.01],
    [10, 11, 0.45, 0.01],
    [11, 10, 0.45, 0],
    [12, 11, 0.44, 0.01],
    [13, 12, 0.44, 0.01],
    [14, 13, 0.44, 0.01],
    [15, 14, 0.44, 0.01],
]

class BigBrother extends UserAgent {
    paint(canvas: CanvasRenderingContext2D, t: number) {
        this.interpolate(t)

        this.tracePath(canvas, CHROME_YELLOW)

        canvas.fillStyle = '#ffcd40'
        canvas.fill()

        this.tracePath(canvas, CHROME_GREEN)

        canvas.fillStyle = '#0f9d58'
        canvas.fill()

        this.tracePath(canvas, CHROME_RED)

        canvas.fillStyle = '#db4437'
        canvas.fill()

        this.tracePath(canvas, CHROME_BLUE)

        canvas.fillStyle = '#4285f4'
        canvas.fill()

        canvas.lineWidth = 2.5
        canvas.strokeStyle = '#f1f1f1'
        canvas.stroke()

        canvas.lineWidth = 1 // restore
    }
}
