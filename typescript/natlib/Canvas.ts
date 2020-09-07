'use strict'
/// <reference path="natlib.d.ts" />

/* Natural (100%)  devicePixelRatio == 2
 * Scaled to 90%   devicePixelRatio == 1.8182
 * Scaled to 80%   devicePixelRatio == 1.5789
 * Scaled to 67%   devicePixelRatio == 1.3333
 */
const highDPI = window.devicePixelRatio > 1.44

function setSize($can: HTMLCanvasElement, can: CanvasRenderingContext2D, width: number, height: number) {
    if (highDPI) {
        $can.height = 2 * height
        $can.width = 2 * width

        can.scale(2, 2)
    }
    else {
        $can.height = height
        $can.width = width
    }
}

const $canvas = <HTMLCanvasElement>$('.can')
const canvas = $canvas.getContext('2d')!

setSize($canvas, canvas, Settings.screenWidth, Settings.screenHeight)
