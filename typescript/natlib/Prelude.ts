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
    reticleStiffness = 0.1,
    targetCaptureDist = 64,
    targetReleaseDist = 256,
}

const register0 = new NVec2
const register1 = new NVec2

const $box = $('.box')
