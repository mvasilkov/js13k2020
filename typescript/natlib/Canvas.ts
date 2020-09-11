'use strict'
/// <reference path="natlib.d.ts" />

function setSize($can: HTMLCanvasElement, can: CanvasRenderingContext2D, width: number, height: number) {
    if (window.devicePixelRatio > 1.44) {
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

const systemFont = `16px -apple-system, 'Segoe UI', system-ui, Roboto, sans-serif`
const systemFontHeading = systemFont.replace('16', 'bold 48')
