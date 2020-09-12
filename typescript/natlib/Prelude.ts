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

// Sounds.

function sound(buffer: AudioBuffer) {
    const source = zzfxX.createBufferSource()
    source.buffer = buffer
    source.connect(zzfxX.destination)
    source.start()
}

const sndLaunch =
    // zzfxMicro(...[,,398,.02,.06,.4,2,0,2.4,,,,,,,,.03,.79,.01])
    zzfxMicro(...[,,132,,,.46,,.11,9.1,,,,,.1,,,.04,.56,.05])

const sndFail =
    zzfxMicro(...[,,382,,,.48,2,.35,-0.6,,,,,,,,.2,.72,.09])

const sndWin =
    // zzfxMicro(...[,,345,.01,.17,.87,2,1.05,.2,,67,.03,.02,,-0.2,,,.79,,.04])
    zzfxMicro(...[,,345,.01,.17,.87,1,1.05,.2,,67,.03,.02,,-0.2,,,.79,,.04])
