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
})({"src/question.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mode2Game = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HIT_UNIT = 10;

var byId = function byId(id) {
  return document.getElementById(id);
};

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

        if (_this2.timeOut === 0 && _this2.stillQuestionLeft) {
          _this2.fail();
        }
      }, 1000);
    }
  }, {
    key: "renderQuestion",
    value: function renderQuestion() {
      if (this.step === this.questions.length) {
        this.complete();
        return;
      }

      var current = this.questions[this.step];
      this.question.innerText = current.question;
      var answers = Array.from(this.answers);
      answers.forEach(function (el, idx) {
        el.innerText = current.answers[idx].value;
        el.dataset.isCorrect = current.answers[idx].isCorrect; // change x and y here
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
    key: "complete",
    value: function complete() {
      clearInterval(this.intervalId);
      this.info.innerText = 'Game Completed!';
    }
  }, {
    key: "fail",
    value: function fail() {
      this.info.innerText = 'Game Over';
      clearInterval(this.intervalId);
    }
  }, {
    key: "status",
    get: function get() {
      return this.intervalId ? this.timeOut > 0 ? 'Playing' : 'Over' : 'Pending';
    }
  }, {
    key: "stillQuestionLeft",
    get: function get() {
      return this.step < this.questions.length;
    }
  }]);

  return Mode2Game;
}();

exports.Mode2Game = Mode2Game;
},{}],"src/music.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [[2107, 1000, 'none'], [11107, 400, 'none'], [13025, 200, 'none'], [13651, 100, 'none'], [14130, 300, 'none'], [15169, 300, 'none'], [16265, 200, 'none'], [16981, 400, 'none'], [18873, 200, 'none'], [19890, 400, 'none'], [21775, 300, 'none'], [22877, 400, 'none'], [24821, 100, 'none'], [25378, 100, 'none'], [25872, 300, 'none'], [27009, 300, 'none'], [28091, 200, 'none'], [28775, 400, 'none'], [30621, 300, 'none'], [31741, 400, 'none'], [33695, 300, 'none'], [34799, 400, 'none'], [36697, 200, 'none'], [37342, 100, 'none'], [37792, 300, 'none'], [38949, 300, 'none'], [39979, 200, 'none'], [40696, 400, 'none'], [42433, 300, 'none'], [43575, 400, 'none'], [45447, 300, 'none'], [46609, 400, 'none'], [48653, 100, 'none'], [49156, 100, 'none'], [49611, 300, 'none'], [50806, 300, 'none'], [51859, 200, 'none'], [52569, 400, 'none'], [54401, 300, 'none'], [55419, 400, 'none'], [57412, 300, 'none'], [58530, 400, 'none'], [60341, 200, 'none'], [60871, 100, 'none'], [61352, 300, 'none'], [62613, 300, 'none'], [63669, 200, 'none'], [64361, 400, 'none'], [66281, 300, 'none'], [67308, 400, 'none'], [69236, 300, 'none'], [70288, 400, 'none'], [72369, 100, 'none'], [72828, 100, 'none'], [73262, 300, 'none'], [74493, 300, 'none'], [75713, 100, 'none'], [76220, 400, 'none'], [78398, 200, 'none'], [79164, 300, 'none'], [80746, 300, 'none'], [82250, 400, 'none'], [84104, 200, 'none'], [84719, 100, 'none'], [85110, 300, 'none'], [86417, 400, 'none'], [88161, 400, 'none'], [90253, 200, 'none'], [91100, 300, 'none'], [92698, 300, 'none'], [94159, 400, 'none'], [96087, 200, 'none'], [96721, 100, 'none'], [97165, 300, 'none'], [98294, 300, 'none'], [99378, 200, 'none'], [100050, 400, 'none'], [101955, 200, 'none'], [102599, 100, 'none'], [103061, 300, 'none'], [104449, 200, 'none'], [105173, 200, 'none'], [106010, 500, 'none'], [108859, 400, 'none'], [110583, 300, 'none'], [111980, 300, 'none'], [113532, 300, 'none'], [114874, 400, 'none'], [116499, 300, 'none'], [118155, 300, 'lineOn'], [119396, 300, 'lineOn'], [120887, 300, 'lineOn'], [122264, 300, 'lineOn'], [123872, 300, 'lineOff'], [125277, 300, 'none'], [126834, 300, 'none'], [128244, 300, 'none'], [129841, 400, 'none'], [131210, 300, 'none'], [132718, 300, 'none'], [134096, 300, 'none'], [135620, 300, 'none'], [137113, 300, 'none'], [138686, 300, 'none'], [140097, 300, 'none'], [141545, 300, 'none'], [143003, 300, 'none'], [144576, 300, 'none'], [145926, 200, 'none'], [147511, 200, 'none'], [148952, 200, 'none'], [150518, 200, 'none'], [151270, 200, 'none'], [152020, 200, 'none'], [152715, 200, 'none'], [153489, 200, 'none'], [154179, 200, 'none'], [154923, 200, 'none'], [155681, 200, 'none'], [156423, 200, 'none'], [157198, 200, 'none'], [157889, 300, 'none'], [158800, 200, 'none'], [159457, 300, 'none'], [160874, 300, 'none'], [162450, 300, 'none'], [163828, 300, 'none'], [165367, 300, 'none'], [166715, 300, 'none'], [168291, 300, 'none'], [169757, 300, 'none'], [171286, 300, 'none'], [172698, 300, 'none'], [174281, 300, 'none'], [175745, 300, 'none'], [177208, 500, 'none'], [180408, 400, 'none'], [182246, 100, 'none'], [182736, 100, 'none'], [183162, 300, 'none'], [184393, 300, 'none'], [185600, 200, 'none'], [186143, 400, 'none'], [187990, 300, 'none'], [188971, 400, 'none'], [191022, 300, 'none'], [192063, 400, 'none'], [193911, 100, 'none'], [194496, 100, 'none'], [195041, 300, 'none'], [196137, 300, 'none'], [197217, 200, 'none'], [197972, 400, 'none'], [199934, 300, 'none'], [200867, 400, 'none'], [202722, 100, 'none'], [203233, 200, 'none'], [203988, 400, 'none'], [205933, 100, 'none'], [206451, 100, 'none'], [206894, 300, 'none'], [208037, 300, 'none'], [209133, 200, 'none'], [209809, 400, 'none'], [211657, 300, 'none'], [212720, 300, 'none'], [214127, 300, 'none'], [215772, 300, 'none'], [217749, 100, 'none'], [218266, 100, 'none'], [218751, 300, 'none'], [220330, 200, 'none'], [220987, 200, 'none'], [221721, 500, 'none'], [223729, 300, 'none'], [224610, 400, 'none'], [226317, 200, 'none'], [226955, 200, 'none'], [227737, 400, 'none'], [229588, 200, 'none'], [230169, 200, 'none'], [230627, 300, 'none'], [231878, 300, 'none'], [232772, 200, 'none'], [233455, 400, 'none'], [235369, 300, 'none'], [236410, 400, 'none'], [238111, 300, 'none'], [239393, 500, 'none'], [241407, 200, 'none'], [241893, 200, 'none'], [242444, 300, 'none'], [243704, 300, 'none'], [244688, 200, 'none'], [245374, 400, 'none'], [247216, 300, 'none'], [248380, 300, 'none'], [250053, 200, 'none'], [250816, 200, 'none'], [251371, 500, 'none']];
exports.default = _default;
},{}],"src/mode1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mode1Game = void 0;

var _music = _interopRequireDefault(require("./music"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.log(_music.default[0]);

var Mode1Game =
/*#__PURE__*/
function () {
  function Mode1Game() {
    _classCallCheck(this, Mode1Game);

    this.player = document.querySelector('#Mode1Game > audio');
    this.player.onended = this.handleEnd.bind(this);
    this.info = document.querySelector('#Mode1Game .info');
    this.playGround = document.querySelector('#Mode1Game .playground');
    this.timeOut = 3;
    this.totalSteps = _music.default.length;
    this.step = 0;
    this.score = 0;
    this.grids = [];
  }

  _createClass(Mode1Game, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.intervalId = setInterval(function () {
        _this.info.style.display = 'block';
        _this.info.innerText = _this.timeOut;
        _this.timeOut -= 1;

        if (_this.timeOut === -1) {
          clearInterval(_this.intervalId);
          _this.player.style.display = 'block';

          _this.player.play();

          _this.info.style.display = 'none';
          _this.musicLoopId = setInterval(_this.handleMusicLoop.bind(_this), 500);
        }
      }, 1000);
    }
  }, {
    key: "handleMusicLoop",
    value: function handleMusicLoop() {
      var _this2 = this;

      var currentTime = this.player.currentTime;
      console.log(currentTime * 1000, _music.default[this.step][0]);

      if (currentTime * 1000 >= _music.default[this.step][0] && currentTime * 1000 < _music.default[this.step + 1][0] && !this.grids.length) {
        var active = document.createElement('div');
        active.className = 'active';
        active.innerText = 'I am active';

        active.onclick = function () {
          return _this2.score += 10;
        }; // change coordinates here


        this.grids.push(active);
        var inactive = document.createElement('div');
        inactive.className = 'inactive';
        inactive.innerText = 'I am inactive';
        this.grids.push(inactive);
        this.playGround.appendChild(active);
        this.playGround.appendChild(inactive);
        setTimeout(function () {
          active.remove();
          inactive.remove();
          _this2.grids = [];
          _this2.step += 1;
        }, _music.default[this.step][1]);
      }
    }
  }, {
    key: "handleEnd",
    value: function handleEnd() {
      clearInterval(this.musicLoopId);
      this.info.innerText = this.score;
    }
  }, {
    key: "status",
    get: function get() {
      return this.step < this.totalSteps && this.step > 0 ? 'Playing' : 'Complete';
    }
  }]);

  return Mode1Game;
}();

exports.Mode1Game = Mode1Game;
},{"./music":"src/music.js"}],"src/mode2Questions.js":[function(require,module,exports) {
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
},{}],"src/index.js":[function(require,module,exports) {
"use strict";

var _question = require("./question");

var _mode = require("./mode1");

var _mode2Questions = _interopRequireDefault(require("./mode2Questions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var video = document.getElementById('video');
var startBtn = document.getElementById('button');
var select = document.getElementById('select');
var cap;
var src;
var dst;
var streaming = true;

var byId = function byId(id) {
  return document.getElementById(id);
};

var page = {
  selectMode: true,
  Mode1Rule: false,
  Mode2Rule: false,
  Mode1Game: false,
  Mode2Game: false
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
    var game2 = new _question.Mode2Game(15, _mode2Questions.default);
    game2.start();
    return game2;
  }

  if (pageName === 'Mode1Game') {
    var game1 = new _mode.Mode1Game();
    game1.start();
    return game1;
  }
};

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
},{"./question":"src/question.js","./mode1":"src/mode1.js","./mode2Questions":"src/mode2Questions.js"}],"../../../../../home/envl/.nvm/versions/node/v8.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "12079" + '/');

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
},{}]},{},["../../../../../home/envl/.nvm/versions/node/v8.11.1/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map