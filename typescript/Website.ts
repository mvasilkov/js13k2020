'use strict'
/// <reference path="js13k2020.d.ts" />

class Website {
    static readonly width = 110
    static readonly height = 196

    x: number
    y: number

    constructor() {
        this.x = Settings.screenWidth - Website.width
        this.y = (Settings.screenHeight - Website.height) * 0.5
    }

    paint(canvas: CanvasRenderingContext2D) {
        canvas.fillStyle = '#fff'
        canvas.fillRect(this.x, this.y, Website.width, Website.height)
    }
}
