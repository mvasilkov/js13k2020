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

// #region Autosize canvas.
const aspectRatio = 16 / 9

let uiScale = 1

let transformProperty: 'transform' | 'webkitTransform' = 'transform'
if (!(transformProperty in $box.style)) {
    transformProperty = 'webkitTransform'
}

function handleResize() {
    let w = innerWidth
    let h = innerHeight

    if (w / h > aspectRatio)
        w = h * aspectRatio
    else
        h = w / aspectRatio

    uiScale = Settings.screenWidth / w

    const k = w / Settings.screenWidth

    $box.style[transformProperty] = `scale3d(${k},${k},1)`
}

addEventListener('resize', handleResize)
addEventListener('orientationchange', handleResize)
// #endregion

const systemFont = `16px -apple-system, 'Segoe UI', system-ui, Roboto, sans-serif`
const systemFontHeading = systemFont.replace('16', 'bold 48')

$canvas.addEventListener('contextmenu', event => {
    event.preventDefault()
})
