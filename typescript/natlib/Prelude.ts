'use strict'
/// <reference path="natlib.d.ts" />

const enum Settings {
    kFriction = 0,
    kFrictionGround = 0,
    kGravity = 0,
    kNumIterations = 10,
    kViscosity = 1,
    screenHeight = 540,
    screenWidth = 960,
    //
    displaySize = 1102, // Math.ceil(Math.sqrt(960 ** 2 + 540 ** 2))
    reticleStiffness = 0.1,
    targetCaptureDist = 64,
    targetReleaseDist = 256,
    waitCurtain = 24,
    waitLevel = 144,
    waitNextLevel = 69,
    websiteHeight = 196,
    websiteWidth = 110,
    websitePicHeight = 64,
    websitePicWidth = 88,
}

const register0 = new NVec2
const register1 = new NVec2

const $box = <HTMLElement>$('.box')
