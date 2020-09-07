'use strict'
/// <reference path="js13k2020.d.ts" />

const G_BLUE = '#4285f4'
const G_RED = '#ea4335'
const G_YELLOW = '#fbbc05'
const G_GREEN = '#34a853'

class Website {
    x: number
    y: number
    cached: HTMLCanvasElement

    constructor() {
        this.x = Settings.screenWidth - Settings.websiteWidth
        this.y = (Settings.screenHeight - Settings.websiteHeight) * 0.5

        this.cached = prerender(Settings.websiteWidth, Settings.websiteHeight, canvas => {
            canvas.fillStyle = '#fff'
            canvas.fillRect(0, 0, Settings.websiteWidth, Settings.websiteHeight)
        })
    }

    paint(canvas: CanvasRenderingContext2D) {
        canvas.drawImage(this.cached, this.x, this.y, Settings.websiteWidth, Settings.websiteHeight)
    }
}
