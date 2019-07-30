'use strict';
/**
 * A listener represents a single event listener.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Listener =
/**
 * The function that will be called when the listener is processed.
 * 
 * @property {Function}
 */

/**
 * The context to use when calling this listener.
 * 
 * @property {*}
 */

/**
 * Whether or not this listener will be automatically destroyed after being run once.
 * 
 * @property {boolean}
 */

/**
 * Keeps track of the number of times that this listener has been called.
 * 
 * @property {number} 
 */
function Listener(fn, ctx, once) {
  _classCallCheck(this, Listener);

  _defineProperty(this, "fn", void 0);

  _defineProperty(this, "ctx", void 0);

  _defineProperty(this, "once", void 0);

  _defineProperty(this, "timesCalled", 0);

  this.fn = fn;
  this.ctx = ctx;
  this.once = once;
};

exports["default"] = Listener;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaXN0ZW5lci50cyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImZuIiwiY3R4Iiwib25jZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7OztJQUdxQkEsUTtBQUVwQjs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQzs7Ozs7QUFPRCxrQkFBWUMsRUFBWixFQUFxQkMsR0FBckIsRUFBK0JDLElBQS9CLEVBQThDO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsdUNBRnZCLENBRXVCOztBQUU3QyxPQUFLRixFQUFMLEdBQVVBLEVBQVY7QUFFQSxPQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFFQSxPQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFFQyxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogQSBsaXN0ZW5lciByZXByZXNlbnRzIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBsaXN0ZW5lciBpcyBwcm9jZXNzZWQuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtGdW5jdGlvbn1cclxuXHQgKi9cclxuXHRmbjogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29udGV4dCB0byB1c2Ugd2hlbiBjYWxsaW5nIHRoaXMgbGlzdGVuZXIuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHsqfVxyXG5cdCAqL1xyXG5cdGN0eDogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIGxpc3RlbmVyIHdpbGwgYmUgYXV0b21hdGljYWxseSBkZXN0cm95ZWQgYWZ0ZXIgYmVpbmcgcnVuIG9uY2UuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtib29sZWFufVxyXG5cdCAqL1xyXG4gIG9uY2U6IGJvb2xlYW47XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogS2VlcHMgdHJhY2sgb2YgdGhlIG51bWJlciBvZiB0aW1lcyB0aGF0IHRoaXMgbGlzdGVuZXIgaGFzIGJlZW4gY2FsbGVkLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBcclxuICAgKi9cclxuICB0aW1lc0NhbGxlZDogbnVtYmVyID0gMDtcclxuXHJcblx0Y29uc3RydWN0b3IoZm46IGFueSwgY3R4OiBhbnksIG9uY2U6IGJvb2xlYW4pIHtcclxuXHJcblx0XHR0aGlzLmZuID0gZm47XHJcblxyXG5cdFx0dGhpcy5jdHggPSBjdHg7XHJcblxyXG5cdFx0dGhpcy5vbmNlID0gb25jZTtcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==