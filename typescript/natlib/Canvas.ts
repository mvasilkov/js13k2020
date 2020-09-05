'use strict'
/// <reference path="natlib.d.ts" />

const $canvas = <HTMLCanvasElement>$('.can')
const canvas = $canvas.getContext('2d')!

$canvas.height = Settings.screenHeight
$canvas.width = Settings.screenWidth
