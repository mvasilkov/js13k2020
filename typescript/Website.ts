'use strict'
/// <reference path="js13k2020.d.ts" />

const G_BLUE = '#4285f4'
const G_RED = '#ea4335'
const G_YELLOW = '#fbbc05'
const G_GREEN = '#34a853'

const WEBSITE_PICTURE = prerender(Settings.websiteWidth, Settings.websiteHeight, canvas => {
    canvas.fillStyle = '#fff'
    canvas.fillRect(0, 0, Settings.websiteWidth, Settings.websiteHeight)
})

class Website {
    x: number
    y: number
    width: number
    height: number

    constructor() {
        this.x = Settings.screenWidth - Settings.websiteWidth
        this.y = (Settings.screenHeight - Settings.websiteHeight) * 0.5
        this.width = Settings.websiteWidth
        this.height = Settings.websiteHeight
    }

    update() {
    }

    paint(canvas: CanvasRenderingContext2D, _t: number) {
        // canvas.drawImage(WEBSITE_PICTURE, this.x, this.y, Settings.websiteWidth, Settings.websiteHeight)
        canvas.fillStyle = '#fff'
        canvas.fillRect(this.x, this.y, this.width, this.height)
    }
}
