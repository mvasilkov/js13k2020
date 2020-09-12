#!/bin/bash

rm -rf build
mkdir -p build

npx html-minifier --collapse-whitespace --remove-attribute-quotes \
    -o build/index.html app/index_build.html

npx cleancss -O1 -o build/app.css app/app.css

npx terser --enclose --compress --mangle -o build/app.js \
    sound/ZzFX/ZzFX.js out/audio/reverbgen.js out/audio/audio.js out/audio/oborona.js \
    out/natlib/NVec2.js out/natlib/Utils.js out/natlib/Prelude.js out/natlib/NVertex.js \
    out/natlib/NStaticVertex.js out/natlib/NConstraint.js out/natlib/NBody.js out/natlib/SAT.js \
    out/natlib/NBall.js out/natlib/NScene.js out/natlib/Canvas.js out/natlib/Pointer.js \
    out/natlib/Mainloop.js out/Reticle.js out/FiringPin.js out/UserAgent.js out/Firefox.js \
    out/InternetExplorer.js out/BigBrother.js out/Wall.js out/Box.js out/WebsiteBox.js out/Website.js \
    out/MovingWebsite.js out/NoWebsite.js out/Level.js out/levels/Level_02_TheWall.js \
    out/levels/Level_03_Opening.js out/levels/Level_04_Breach.js out/levels/Level_05_Banned.js \
    out/levels/Level_06_Reversal.js out/levels/Level_07_Moving.js out/levels/Level_08_Distancing.js \
    out/levels/Level_09_Hopeless.js out/levels/Level_10_End.js out/Background.js out/Main.js

python3 -c "import json; from pathlib import Path; "\
"obj = json.loads(Path('app/manifest.json').read_text(encoding='utf-8')); "\
"Path('build/manifest.json').write_text(json.dumps(obj, separators=(',', ':')), encoding='utf-8')"
