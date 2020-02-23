// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/mode2Questions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  question: 'What is the weather tomorrow?',
  answers: [{
    value: 'Sunny',
    isCorrect: 1
  }, {
    value: 'Rainy',
    isCorrect: 0
  }, {
    value: 'Windy',
    isCorrect: 0
  }]
}, {
  question: 'What is the weather the day after tomorrow?',
  answers: [{
    value: 'Sunny',
    isCorrect: 1
  }, {
    value: 'Rainy',
    isCorrect: 0
  }, {
    value: 'Windy',
    isCorrect: 0
  }]
}];
exports.default = _default;
},{}],"src/question.js":[function(require,module,exports) {
"use strict";

var _mode2Questions = _interopRequireDefault(require("./mode2Questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log(12345);

var byId = function byId(id) {
  return document.getElementById(id);
};

var page = {
  selectMode: true,
  Mode1Rule: false,
  Mode2Rule: false,
  Mode1Game: false,
  Mode2Game: true
};

byId('mode1').onclick = function () {
  return changePageTo('Mode1Game');
};

byId('mode2').onclick = function () {
  return changePageTo('Mode2Game');
};

var changePageTo = function changePageTo(pageName) {
  var allPages = Object.keys(page);
  allPages.forEach(function (pn) {
    byId(pn).style.display = 'none';
    page[pn] = false;
  });
  page[pageName] = true;
  byId(pageName).style.display = 'block';

  if (pageName === 'Mode2Game') {
    var game2 = new Mode2Game(15, _mode2Questions.default);
    game2.start();
    return game2;
  }
};

var HIT_UNIT = 10;

var Mode2Game =
/*#__PURE__*/
function () {
  function Mode2Game() {
    var _this = this;

    var timeOut = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var questions = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, Mode2Game);

    this.timeOut = timeOut;
    this.root = byId('Mode2Game');
    this.questions = questions;
    this.counter = document.querySelector('#Mode2Game .timer');
    this.question = document.querySelector('#Mode2Game .question');
    this.answers = document.querySelectorAll('#Mode2Game .answer');
    this.answers.forEach(function (el) {
      return el.onclick = _this.handleClick.bind(_this);
    });
    this.step = 0;
    this.info = document.querySelector('#Mode2Game .info');
  }

  _createClass(Mode2Game, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.renderQuestion();
      this.intervalId = setInterval(function () {
        _this2.timeOut -= 1;
        _this2.counter.innerText = _this2.timeOut;

        if (_this2.timeOut === 0) {
          clearInterval(_this2.intervalId);
        }

        console.log(_this2.status);
      }, 1000);
    }
  }, {
    key: "renderQuestion",
    value: function renderQuestion() {
      if (this.step === this.questions.length) {
        this.end();
        return;
      }

      var current = this.questions[this.step];
      this.question.innerText = current.question;
      var answers = Array.from(this.answers);
      answers.forEach(function (el, idx) {
        el.innerText = current.answers[idx].value;
        el.dataset.isCorrect = current.answers[idx].isCorrect;
      });
      this.step += 1;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var isCorrect = event.target.dataset.isCorrect;

      if (isCorrect == 1) {
        console.log(isCorrect);
        this.hit();
      } else {
        this.miss();
      }

      this.renderQuestion();
    }
  }, {
    key: "hit",
    value: function hit() {
      this.timeOut += HIT_UNIT;
    }
  }, {
    key: "miss",
    value: function miss() {
      this.timeOut -= HIT_UNIT;
    }
  }, {
    key: "end",
    value: function end() {
      clearInterval(this.intervalId);
      this.info.innerText = 'Game Completed!';
    }
  }, {
    key: "status",
    get: function get() {
      return this.intervalId ? this.timeOut > 0 ? 'Playing' : 'Over' : 'Pending';
    }
  }]);

  return Mode2Game;
}();
},{"./mode2Questions":"src/mode2Questions.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _question = _interopRequireDefault(require("./question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var video = document.getElementById('video');
var startBtn = document.getElementById('button');
var select = document.getElementById('select');
var cap;
var src;
var dst;
var streaming = true;

function gotDevices(mediaDevices) {
  select.innerHTML = '';
  select.appendChild(document.createElement('option'));
  var count = 1;
  mediaDevices.forEach(function (mediaDevice) {
    if (mediaDevice.kind === 'videoinput') {
      var option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      var label = mediaDevice.label || "Camera ".concat(count++);
      var textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}

function stopMediaTracks(stream) {
  stream.getTracks().forEach(function (track) {
    track.stop();
  });
}

var currentStream;

startBtn.onclick = function (event) {
  videoStarted = true;

  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
    console.log('stop');
  }

  var videoConstraints = {};

  if (select.value === '') {
    videoConstraints.facingMode = 'environment';
  } else {
    videoConstraints.deviceId = {
      exact: select.value
    };
  }

  var constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
    document.querySelector('video').srcObject = mediaStream;
    currentStream = mediaStream;
    return navigator.mediaDevices.enumerateDevices();
  }).then(gotDevices).catch(function (error) {
    console.error(error);
  });
};

navigator.mediaDevices.enumerateDevices().then(gotDevices);

document.querySelector('.stop').onclick = function (evt) {
  streaming = false;
};

var videoStarted = false; // do all your cv work here, after loading cv.js

cv['onRuntimeInitialized'] = function () {
  // function waiter() {
  //   console.log('tick')
  //   if (videoStarted) task()
  //   else setTimeout(waiter, 500)
  // }()
  ;

  (function tick() {
    console.log('tick');
    if (videoStarted) setTimeout(task, 2000);else setTimeout(tick, 500);
  })();

  function task() {
    cap = new cv.VideoCapture(video);
    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    dst = new cv.Mat(video.height, video.width, cv.CV_8UC4); // cv processing

    setTimeout(function () {
      try {
        if (!streaming) {
          // clean and stop.
          console.log('cleaning up');
          src.delete();
          dst.delete();
          gray.delete();
          faces.delete();
          classifier.delete();
          return;
        }

        var begin = Date.now(); // start processing.

        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0); // detect faces.

        classifier.detectMultiScale(gray, faces, 1.1, 3, 0); // draw faces.

        for (var i = 0; i < faces.size(); ++i) {
          var face = faces.get(i);
          var point1 = new cv.Point(face.x, face.y);
          var point2 = new cv.Point(face.x + face.width, face.y + face.height);
          cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
        }

        cv.imshow('canvasOutput', dst); // schedule the next one.

        var delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      } catch (err) {
        console.error(err);
      }
    }, 0);
  }
};
},{"./question":"src/question.js"}],"../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59653" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v10.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map