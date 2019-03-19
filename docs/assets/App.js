/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CanvasManager_1 = __webpack_require__(1);
var App = /** @class */ (function () {
    function App() {
        this.CanvasManager = new CanvasManager_1.default();
    }
    return App;
}());
exports.default = App;
/**
 * IIFE for starting the app
 */
(function () {
    new App();
})();
//# sourceMappingURL=app.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var distance_1 = __webpack_require__(2);
var CanvasManager = /** @class */ (function () {
    function CanvasManager() {
        var _this = this;
        this.switchDrawingType = function (e) {
            var target = e.currentTarget;
            var newType = parseInt(target.getAttribute('data-type'));
            _this._drawingType = newType;
        };
        this.handleMouseDown = function (e) {
            _this._mouse.active = true;
            _this._mouse.prevX = _this._mouse.x,
                _this._mouse.prevY = _this._mouse.y;
            _this._mouse.x = e.x;
            _this._mouse.y = e.y;
        };
        this.handleMouseUp = function (e) {
            _this._mouse.active = false;
            _this._mouse.prevX = _this._mouse.x,
                _this._mouse.prevY = _this._mouse.y;
            _this._mouse.x = e.x;
            _this._mouse.y = e.y;
        };
        this.handleMouseMove = function (e) {
            _this._mouse.prevX = _this._mouse.x,
                _this._mouse.prevY = _this._mouse.y;
            _this._mouse.x = e.x;
            _this._mouse.y = e.y;
        };
        /**
         * Called on the DOMs reapaint using `requestAnimationFrame`.
         */
        this.loop = function () {
            var newTime = performance.now();
            var deltaTime = (newTime - _this._time) / 1000;
            _this._time = newTime;
            _this.update(deltaTime);
            _this.draw();
            requestAnimationFrame(_this.loop);
        };
        this.canvas = document.body.querySelector('.js-canvas');
        if (this.canvas === null) {
            console.log("%c[Canvas Manager] %ccouldn't find the canvas element", 'color:#f4f94f', 'color:#eee');
        }
        else {
            console.log("%c[Canvas Manager] %cfound the canvas element", 'color:#f4f94f', 'color:#eee');
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this._context = this.canvas.getContext('2d');
        console.log("%c[Canvas Manager] %csetting the context to 2d", 'color:#f4f94f', 'color:#eee');
        this._time = null;
        // Sets booklet image
        this._booklet = new Image();
        this._booklet.src = 'assets/booklet.png';
        this._booklet.width = 860;
        this._booklet.height = 660;
        // Mouse Tracking
        this._mouse = { x: 0, y: 0, prevX: 0, prevY: 0, active: false };
        // Drawing
        this._drawingType = 0;
        this._buttons = Array.from(document.body.querySelectorAll('.js-button'));
        this._highlightes = [];
        this._penMarks = [];
        this.init();
    }
    /**
     * Called when the `CanvasManager` is constructed.
     */
    CanvasManager.prototype.init = function () {
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].addEventListener('click', this.switchDrawingType);
        }
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    };
    CanvasManager.prototype.draw = function () {
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw booklet
        var position = {
            x: ((this.canvas.width - 860) / 2),
            y: ((this.canvas.height - 660) / 2)
        };
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 4;
        this._context.shadowColor = 'rgba(41,41,41,0.15)';
        this._context.shadowBlur = 8;
        this._context.drawImage(this._booklet, position.x, position.y, 860, 660);
        // Reset shadow
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowColor = 'none';
        this._context.shadowBlur = 0;
        // Draw highlights
        this._context.save();
        this._context.globalCompositeOperation = 'multiply';
        for (var i = 0; i < this._highlightes.length; i++) {
            this._context.beginPath();
            this._context.arc(this._highlightes[i].x, this._highlightes[i].y, this._highlightes[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = this._highlightes[i].color;
            this._context.fill();
            this._context.closePath();
        }
        this._context.restore();
        for (var i = 0; i < this._penMarks.length; i++) {
            this._context.beginPath();
            this._context.arc(this._penMarks[i].x, this._penMarks[i].y, this._penMarks[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = this._penMarks[i].color;
            this._context.fill();
            this._context.closePath();
        }
    };
    CanvasManager.prototype.update = function (deltaTime) {
        if (this._mouse.active) {
            var mouseMoveDistance = distance_1.default(this._mouse.x, this._mouse.y, this._mouse.prevX, this._mouse.prevY);
            var newCircle = null;
            if (this._drawingType === 0 && mouseMoveDistance >= 3) {
                newCircle = {
                    x: (this._mouse.x + 6),
                    y: (this._mouse.y + 6),
                    radius: 12,
                    color: 'rgb(251,255,48,1)'
                };
                this._highlightes.push(newCircle);
            }
            else if (this._drawingType === 1) {
                newCircle = {
                    x: (this._mouse.x + 1),
                    y: (this._mouse.y + 1),
                    radius: 2,
                    color: 'rgba(255,56,56,0.87)'
                };
                this._penMarks.push(newCircle);
            }
        }
    };
    return CanvasManager;
}());
exports.default = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the distance between two points.
 * @returns `distance`
 */
exports.default = (function (x1, y1, x2, y2) {
    var xDistance = (x2 - x1);
    var yDistance = (y2 - y1);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
});
//# sourceMappingURL=distance.js.map

/***/ })
/******/ ]);