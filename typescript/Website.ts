'use strict'
/// <reference path="js13k2020.d.ts" />

const G_BLUE = '#4285f4'
const G_RED = '#ea4335'
const G_YELLOW = '#fbbc05'
const G_GREEN = '#34a853'

const WEBSITE_PICTURE = prerender(Settings.websitePicWidth, Settings.websitePicHeight, canvas => {
    canvas.fillStyle = '#f1f1f1'
    canvas.fillRect(0, 0, Settings.websitePicWidth, Settings.websitePicHeight)

    canvas.save()

    canvas.translate(1, 0)
    canvas.scale(5, 5)
    // 'G'
    canvas.fillStyle = G_BLUE
    canvas.fillRect(0, 0, 3, 3)
    // 'o'
    canvas.fillStyle = G_RED
    canvas.fillRect(4, 1, 2, 2)
    // 'o'
    canvas.fillStyle = G_YELLOW
    canvas.fillRect(7, 1, 2, 2)
    // 'g'
    canvas.fillStyle = G_BLUE
    canvas.fillRect(10, 1, 2, 3)
    // 'l'
    canvas.fillStyle = G_GREEN
    canvas.fillRect(13, 0, 1, 3)
    // 'e'
    canvas.fillStyle = G_RED
    canvas.fillRect(15, 1, 2, 2)

    canvas.restore()

    // Search bar and buttons.
    canvas.save()

    canvas.translate(0, 30)
    canvas.scale(3, 3)

    canvas.fillStyle = '#ddd'
    canvas.fillRect(0, 0, 29, 4)

    canvas.fillStyle = '#cdcdcd'
    canvas.fillRect(3, 7, 10, 4)
    canvas.fillRect(16, 7, 10, 4)

    canvas.restore()
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

    contains(p: IVec2): boolean {
        return (
            p.x >= this.x && p.x - this.x < this.width &&
            p.y >= this.y && p.y - this.y < this.height
        )
    }

    paint(canvas: CanvasRenderingContext2D, _t: number) {
        canvas.fillStyle = '#f1f1f1'
        canvas.fillRect(this.x, this.y, this.width, this.height)

        canvas.drawImage(WEBSITE_PICTURE,
            this.x + (Settings.websiteWidth - Settings.websitePicWidth) * 0.5,
            this.y + (Settings.websiteHeight - Settings.websitePicHeight) * 0.5,
            Settings.websitePicWidth, Settings.websitePicHeight)
    }
}
