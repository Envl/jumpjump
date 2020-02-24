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
var _default = [[5439, 300, 'none'], [6453, 300, 'none'], [7400, 300, 'none'], [8448, 300, 'none'], [9463, 300, 'none'], [10449, 300, 'none'], [11466, 300, 'none'], [12427, 300, 'none'], [13469, 300, 'none'], [14439, 300, 'none'], [15442, 300, 'none'], [16428, 300, 'none'], [17442, 300, 'none'], [18433, 300, 'none'], [19448, 300, 'none'], [20392, 300, 'none'], [21439, 300, 'none'], [22440, 300, 'none'], [23437, 300, 'none'], [24426, 300, 'none'], [25425, 300, 'none'], [26444, 300, 'none'], [27460, 300, 'none'], [28462, 300, 'none'], [29429, 300, 'none'], [30443, 300, 'none'], [31441, 300, 'none'], [32426, 300, 'none'], [33443, 300, 'none'], [34429, 300, 'none'], [35465, 300, 'none'], [36434, 300, 'none'], [37437, 300, 'none'], [38443, 300, 'none'], [39459, 300, 'none'], [40446, 300, 'none'], [41456, 300, 'none'], [42464, 300, 'none'], [43508, 300, 'none'], [44442, 300, 'none'], [45435, 300, 'none'], [46466, 300, 'none'], [47451, 300, 'none'], [48428, 300, 'none'], [49408, 300, 'none'], [50443, 300, 'none'], [51496, 300, 'none'], [52454, 300, 'none'], [53466, 300, 'none'], [54766, 300, 'none'], [55435, 300, 'none'], [56451, 300, 'none'], [57450, 300, 'none'], [58420, 300, 'none'], [59436, 300, 'none'], [60450, 300, 'none'], [61449, 300, 'none'], [62455, 300, 'none'], [63422, 300, 'none'], [64450, 300, 'none'], [65460, 300, 'none'], [66441, 300, 'none'], [67463, 300, 'none'], [68406, 300, 'none'], [69427, 300, 'none'], [70442, 300, 'none'], [71459, 300, 'none'], [72430, 300, 'none'], [73424, 300, 'none'], [74413, 300, 'none'], [75471, 300, 'none'], [76455, 300, 'none'], [77462, 300, 'none'], [78455, 300, 'none'], [79437, 300, 'none'], [80438, 300, 'none'], [81463, 300, 'none'], [82419, 300, 'none'], [83450, 300, 'none'], [84440, 300, 'none'], [85426, 300, 'none'], [86453, 300, 'none'], [87432, 300, 'none'], [88443, 300, 'none'], [89420, 300, 'none'], [90434, 300, 'none'], [91450, 300, 'none'], [92444, 300, 'none'], [93422, 300, 'none'], [94438, 300, 'none'], [95435, 300, 'none'], [96427, 300, 'none'], [97427, 300, 'none'], [98403, 300, 'none'], [99490, 300, 'none'], [100441, 300, 'none'], [101435, 300, 'none'], [102443, 300, 'none'], [103443, 300, 'none'], [104435, 300, 'none'], [105445, 300, 'none'], [106401, 300, 'none'], [107370, 300, 'none'], [108466, 300, 'none'], [109436, 300, 'none'], [110416, 300, 'none'], [111337, 300, 'none'], [112424, 300, 'none'], [113400, 300, 'none'], [114379, 300, 'none'], [115421, 300, 'none'], [116428, 300, 'none'], [117426, 300, 'none'], [118440, 300, 'none'], [119437, 300, 'none'], [120418, 300, 'none'], [121440, 300, 'none'], [122401, 300, 'none'], [123436, 300, 'none'], [124369, 300, 'none'], [125462, 300, 'none'], [126375, 300, 'none'], [127386, 300, 'none'], [128380, 300, 'none'], [129391, 300, 'none'], [130409, 300, 'none'], [131378, 300, 'none'], [132395, 300, 'none'], [133369, 300, 'none'], [134453, 300, 'none'], [135446, 300, 'none'], [136419, 300, 'none'], [137388, 300, 'none'], [138451, 300, 'none'], [139455, 300, 'none'], [140400, 300, 'none'], [141400, 300, 'none'], [142400, 300, 'none'], [143419, 300, 'none'], [144405, 300, 'none'], [145400, 300, 'none'], [146410, 300, 'none'], [147450, 300, 'none'], [148467, 300, 'none'], [149412, 300, 'none'], [150453, 300, 'none'], [151403, 300, 'none'], [152415, 300, 'none'], [153400, 300, 'none'], [154392, 300, 'none'], [155477, 300, 'none'], [156400, 300, 'none'], [157426, 300, 'none'], [158420, 300, 'none'], [159459, 300, 'none'], [160450, 300, 'none'], [161443, 300, 'none'], [162441, 300, 'none'], [163483, 300, 'none'], [164441, 300, 'none'], [165439, 300, 'none'], [166453, 300, 'none'], [167443, 300, 'none'], [168400, 300, 'none'], [169400, 300, 'none'], [170443, 300, 'none'], [171471, 300, 'none'], [172412, 300, 'none'], [173470, 300, 'none'], [174400, 300, 'none'], [175425, 300, 'none'], [176451, 300, 'none'], [177400, 300, 'none'], [178410, 300, 'none'], [179463, 300, 'none'], [180227, 300, 'none'], [181437, 300, 'none'], [182440, 300, 'none'], [183437, 300, 'none'], [184451, 300, 'none'], [185462, 300, 'none'], [186433, 300, 'none'], [187445, 300, 'none'], [188460, 300, 'none'], [189405, 300, 'none'], [190469, 300, 'none'], [191390, 300, 'none'], [192450, 300, 'none'], [193429, 300, 'none'], [194441, 300, 'none'], [195458, 300, 'none'], [196449, 300, 'none'], [197400, 300, 'none'], [198400, 300, 'none'], [199400, 300, 'none'], [200420, 300, 'none'], [201450, 300, 'none'], [202450, 300, 'none'], [203427, 300, 'none'], [204479, 300, 'none'], [205425, 300, 'none'], [206405, 300, 'none'], [207427, 300, 'none'], [208415, 300, 'none'], [209400, 300, 'none'], [210400, 300, 'none'], [211425, 300, 'none'], [212441, 300, 'none'], [213414, 300, 'none'], [214453, 300, 'none'], [215400, 300, 'none'], [216400, 300, 'none'], [217459, 300, 'none'], [218430, 300, 'none'], [219450, 300, 'none'], [220444, 300, 'none'], [221390, 300, 'none'], [222454, 300, 'none'], [223434, 300, 'none'], [224375, 300, 'none'], [225429, 300, 'none'], [226400, 300, 'none'], [227443, 300, 'none'], [228400, 300, 'none'], [229400, 300, 'none'], [230412, 300, 'none'], [231400, 300, 'none'], [232420, 300, 'none'], [233456, 300, 'none'], [234431, 300, 'none'], [235420, 300, 'none'], [236442, 300, 'none'], [237416, 300, 'none'], [238400, 300, 'none'], [239410, 300, 'none'], [240405, 300, 'none'], [241400, 300, 'none'], [242400, 300, 'none'], [243448, 300, 'none'], [244428, 300, 'none'], [245429, 300, 'none'], [246453, 300, 'none'], [247400, 300, 'none'], [248457, 300, 'none'], [249410, 300, 'none'], [250400, 300, 'none'], [251460, 300, 'none'], [252444, 300, 'none'], [253442, 300, 'none'], [254454, 300, 'none'], [255432, 300, 'none'], [256450, 300, 'none'], [257443, 300, 'none'], [258400, 300, 'none'], [259450, 300, 'none'], [260400, 300, 'none'], [261408, 300, 'none'], [262400, 300, 'none'], [263414, 300, 'none'], [264400, 300, 'none'], [265400, 300, 'none'], [266413, 300, 'none'], [267443, 300, 'none'], [268442, 300, 'none'], [269400, 300, 'none'], [270455, 300, 'none'], [271458, 300, 'none'], [272451, 300, 'none'], [273450, 300, 'none'], [274451, 300, 'none'], [275450, 300, 'none'], [276400, 300, 'none'], [277450, 300, 'none'], [278420, 300, 'none'], [279400, 300, 'none'], [280400, 300, 'none'], [281400, 300, 'none'], [282400, 300, 'none'], [283445, 300, 'none'], [284444, 300, 'none'], [285400, 300, 'none'], [286400, 300, 'none'], [287419, 300, 'none'], [288400, 300, 'none'], [289450, 300, 'none'], [290441, 300, 'none'], [291461, 300, 'none'], [292400, 300, 'none'], [293404, 300, 'none'], [294400, 300, 'none'], [295446, 300, 'none'], [296450, 300, 'none'], [297413, 300, 'none'], [298443, 300, 'none']];
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

// console.log(music[0])
var Mode1Game =
/*#__PURE__*/
function () {
  function Mode1Game() {
    _classCallCheck(this, Mode1Game);

    this.player = document.querySelector('#Mode1Game > audio');
    this.player.onended = this.handleEnd.bind(this);
    this.info = document.querySelector('#Mode1Game .info');
    this.playGround = document.querySelector('#Mode1Game .playground');
    this.timeOut = 5;
    this.totalSteps = _music.default.length;
    this.step = 0;
    this.score = 0;
    this.grids = [];
    this.brickNow = document.querySelector('#step-cur');
    this.brickNext = document.querySelector('#step-next');
    this.nowPos = [900, 600];
    this.nexPos = this.genNextPos(this.nowPos[0], this.nowPos[1], 150, 1920, 1080);
  }

  _createClass(Mode1Game, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.info.className += ' info-show';
      this.ruleDom.className += ' dimming';
      this.intervalId = setInterval(function () {
        // this.info.style.display = 'flex'
        _this.info.innerText = _this.timeOut;
        _this.timeOut -= 1;

        if (_this.timeOut === -1) {
          clearInterval(_this.intervalId); // this.player.style.display = 'block'

          _this.player.play();

          _this.brickNow.style.visibility = 'visible';
          _this.info.className = 'vanish';
          _this.ruleDom.className = 'vanish';
          _this.musicLoopId = setInterval(_this.handleMusicLoop.bind(_this), 500);
        }
      }, 1000);
    }
  }, {
    key: "ready",
    value: function ready() {
      var _this2 = this;

      this.ruleDom = document.querySelector('#Mode1Rule');
      this.ruleDom.className = 'show-scene';

      this.ruleDom.querySelector('img').onclick = function (evt) {
        _this2.start();
      };
    }
  }, {
    key: "genNextPos",
    value: function genNextPos(x, y, r, scrW, scrH) {
      var w = scrW - 2 * r;
      var h = scrH - 2 * r;
      var newX, newY;
      if (x > w / 2) newX = Math.random() * (x - 2 * r);else newX = (w - x - 2 * r) * Math.random() + x + 2 * r;
      if (y > h / 2) newY = Math.random() * (y - 2 * r);else newY = (h - y - 2 * r) * Math.random() + y + 2 * r;
      if (newX > w) newX = w - 2 * r;
      if (newY > h) newY = h - 2 * r; // newX = Math.random() * w
      // newY = Math.random() * h

      return [newX, newY];
    }
  }, {
    key: "handleMusicLoop",
    value: function handleMusicLoop() {
      var _this3 = this;

      var currentTime = this.player.currentTime; // console.log(currentTime * 1000, music[this.step][0])

      if (currentTime * 1000 >= _music.default[this.step][0] && currentTime * 1000 < _music.default[this.step + 1][0] && !this.grids.length) {
        this.brickNext.className = ' visible';
        this.brickNow.className = ' visible'; // const active = document.createElement('div')
        // active.className = 'active'
        // active.innerText = 'I am active'
        // active.onclick = () => (this.score += 10)
        // // change coordinates here
        // this.grids.push(active)
        // const inactive = document.createElement('div')
        // inactive.className = 'inactive'
        // inactive.innerText = 'I am inactive'
        // this.grids.push(inactive)
        // this.playGround.appendChild(active)
        // this.playGround.appendChild(inactive)
        // setTimeout(() => {
        //   active.remove()
        //   inactive.remove()
        //   this.grids = []
        //   this.step += 1
        // }, music[this.step][1])

        setTimeout(function () {
          _this3.brickNext.className = 'invisible';
          _this3.brickNow.className = 'dimmed';
          _this3.nowPos = _this3.nexPos;
          _this3.nexPos = _this3.genNextPos(_this3.nowPos[0], _this3.nowPos[1], 150, 1280, 720);
          console.log(_this3.nowPos, _this3.nexPos);
          document.querySelector('#step-next').style.left = _this3.nexPos[0] + 'px';
          document.querySelector('#step-next').style.top = _this3.nexPos[1] + 'px';
          document.querySelector('#step-cur').style.left = _this3.nowPos[0] + 'px';
          document.querySelector('#step-cur').style.top = _this3.nowPos[1] + 'px'; // this.brickNext.style.left = `${this.nexPos[0]}px !important;`
          // this.brickNext.style.top = `${this.nexPos[1]}px !important;`
          // this.brickNow.style.left = `${this.nowPos[0]}px !important;`
          // this.brickNow.style.top = `${this.nowPos[1]}px !important;`

          _this3.step += 2;
        }, _music.default[this.step][1] * 1.3);
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
  question: 'What is the order of the colors of the French flag?',
  answer: [{
    value: 'Blue,Red,White',
    isCorrect: '0'
  }, {
    value: 'Red,Blue,White',
    isCorrect: '0'
  }, {
    value: 'Blue,White,Red',
    isCorrect: '1'
  }]
}, {
  question: '(30+20)/5=?',
  answer: [{
    value: '5',
    isCorrect: '0'
  }, {
    value: '10',
    isCorrect: '1'
  }, {
    value: '25',
    isCorrect: '0'
  }]
}, {
  question: 'The date of French National Day is?',
  answer: [{
    value: 'July 14',
    isCorrect: '1'
  }, {
    value: 'July 10',
    isCorrect: '0'
  }, {
    value: 'July 4',
    isCorrect: '0'
  }]
}, {
  question: 'How many countries are there in Europe?',
  answer: [{
    value: '44',
    isCorrect: '0'
  }, {
    value: '45',
    isCorrect: '1'
  }, {
    value: '46',
    isCorrect: '0'
  }]
}, {
  question: 'Which country is the westernmost point of mainland Europe?',
  answer: [{
    value: 'France',
    isCorrect: '0'
  }, {
    value: 'U.K.',
    isCorrect: '0'
  }, {
    value: 'Portugal',
    isCorrect: '1'
  }]
}, {
  question: 'Ireland is to the __??__ of Britain.',
  answer: [{
    value: 'West',
    isCorrect: '1'
  }, {
    value: 'East',
    isCorrect: '0'
  }, {
    value: 'North',
    isCorrect: '0'
  }]
}, {
  question: 'What is the national anthem of France?',
  answer: [{
    value: "L'Internationale",
    isCorrect: '0'
  }, {
    value: 'Le Chant des Partisans',
    isCorrect: '0'
  }, {
    value: 'La Marseillaise',
    isCorrect: '1'
  }]
}, {
  question: 'Which of the following numbers is prime?',
  answer: [{
    value: '12',
    isCorrect: '0'
  }, {
    value: '11',
    isCorrect: '1'
  }, {
    value: '21',
    isCorrect: '0'
  }]
}, {
  question: 'The three angles of a triangle add up to __?__ degrees',
  answer: [{
    value: '90',
    isCorrect: '0'
  }, {
    value: '180',
    isCorrect: '1'
  }, {
    value: '360',
    isCorrect: '0'
  }]
}, {
  question: 'What color are human eyes most sensitive to?',
  answer: [{
    value: 'Blue',
    isCorrect: '0'
  }, {
    value: 'Red',
    isCorrect: '0'
  }, {
    value: 'Green',
    isCorrect: '1'
  }]
}, {
  question: 'How to say thank you in French?',
  answer: [{
    value: 'Bonjour',
    isCorrect: '0'
  }, {
    value: 'Merci',
    isCorrect: '1'
  }, {
    value: 'Au revoir',
    isCorrect: '0'
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
var settings = {
  hideVidArea: false
};

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
    var game1 = new _mode.Mode1Game(); // document.querySelector('#Mode1Game').requestFullscreen()

    game1.ready();
    return game1;
  }
};

window.onkeypress = function (evt) {
  if (evt.key == 'h') {
    settings.hideVidArea = !settings.hideVidArea;
    document.querySelector('#vid-area').className = settings.hideVidArea ? 'fk-hidden' : '';
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
    // console.log('tick')
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "10122" + '/');

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