'use strict'
/// <reference path="js13k2020.d.ts" />

const enum MW {
    // start
    x0 = Settings.screenWidth - Settings.websiteWidth,
    y0 = (Settings.screenHeight - Settings.websiteHeight) * 0.5,
    width0 = Settings.websiteWidth,
    height0 = Settings.websiteHeight,
    // corner
    size1 = (Settings.websiteWidth + Settings.websiteHeight) * 0.5,
    x1 = Settings.screenWidth - size1,
    y1 = Settings.screenHeight - size1,
    width1 = size1,
    height1 = size1,
    // end
    x2 = 350 - Settings.websiteHeight * 0.5,
    y2 = Settings.screenHeight - Settings.websiteWidth,
    width2 = Settings.websiteHeight,
    height2 = Settings.websiteWidth,
}

class MovingWebsite extends Website {
    n: number
    old: {
        x: number
        y: number
        width: number
        height: number
    }

    constructor() {
        super()

        this.n = 0
        this.old = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
    }

    update() {
        if (this.n > 80) return
        ++this.n

        this.old.x = this.x
        this.old.y = this.y
        this.old.width = this.width
        this.old.height = this.height

        if (this.n <= 25) {
            const t = this.n * 0.04

            this.x = lerp(MW.x0, MW.x1, easeInQuad(t))
            this.y = lerp(MW.y0, MW.y1, easeInQuad(t))
            this.width = lerp(MW.width0, MW.width1, easeInQuad(t))
            this.height = lerp(MW.height0, MW.height1, easeInQuad(t))
        }
        else { // this.n <= 80
            const t = (this.n - 25) / 55

            this.x = lerp(MW.x1, MW.x2, easeOutQuad(t))
            this.y = lerp(MW.y1, MW.y2, easeOutQuad(t))
            this.width = lerp(MW.width1, MW.width2, easeOutQuad(t))
            this.height = lerp(MW.height1, MW.height2, easeOutQuad(t))
        }
    }

    paint(canvas: CanvasRenderingContext2D, t: number) {
        let x: number
        let y: number
        let width: number
        let height: number

        if (this.n > 80) {
            x = this.x
            y = this.y
            width = this.width
            height = this.height
        }
        else {
            x = lerp(this.old.x, this.x, t)
            y = lerp(this.old.y, this.y, t)
            width = lerp(this.old.width, this.width, t)
            height = lerp(this.old.height, this.height, t)
        }

        canvas.fillStyle = '#f1f1f1'
        canvas.fillRect(x, y, width, height)

        canvas.drawImage(WEBSITE_PICTURE,
            x + (width - Settings.websitePicWidth) * 0.5,
            y + (height - Settings.websitePicHeight) * 0.5,
            Settings.websitePicWidth, Settings.websitePicHeight)
    }
}
