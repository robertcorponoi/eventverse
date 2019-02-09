'use strict';
/**
 * A listener represents a single event listener.
 * 
 * @since 0.1.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Listener =
/**
 * The function that will be called when the listener is processed.
 * 
 * @since 0.1.0
 * 
 * @property {Function}
 * @readonly
 */

/**
 * The context to use when calling this listener.
 * 
 * @since 0.1.0
 * 
 * @property {*}
 * @readonly
 */

/**
 * Whether or not this listener will be automatically destroyed after being run once.
 * 
 * @since 0.1.0
 * 
 * @property {boolean}
 * @readonly
 */
function Listener(fn, ctx, once) {
  _classCallCheck(this, Listener);

  _defineProperty(this, "_fn", void 0);

  _defineProperty(this, "_ctx", void 0);

  _defineProperty(this, "_once", void 0);

  this._fn = fn;
  this._ctx = ctx;
  this._once = once;
};

exports.default = Listener;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaXN0ZW5lci50cyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImZuIiwiY3R4Iiwib25jZSIsIl9mbiIsIl9jdHgiLCJfb25jZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSxRO0FBRXBCOzs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7O0FBVUEsa0JBQVlDLEVBQVosRUFBcUJDLEdBQXJCLEVBQStCQyxJQUEvQixFQUE4QztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUU3QyxPQUFLQyxHQUFMLEdBQVdILEVBQVg7QUFFQSxPQUFLSSxJQUFMLEdBQVlILEdBQVo7QUFFQSxPQUFLSSxLQUFMLEdBQWFILElBQWI7QUFFQSxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogQSBsaXN0ZW5lciByZXByZXNlbnRzIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxyXG4gKiBcclxuICogQHNpbmNlIDAuMS4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lciB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGxpc3RlbmVyIGlzIHByb2Nlc3NlZC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqL1xyXG5cdF9mbjogYW55O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgY29udGV4dCB0byB1c2Ugd2hlbiBjYWxsaW5nIHRoaXMgbGlzdGVuZXIuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHsqfVxyXG5cdCAqIEByZWFkb25seVxyXG5cdCAqL1xyXG5cdF9jdHg6IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciBvciBub3QgdGhpcyBsaXN0ZW5lciB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGVzdHJveWVkIGFmdGVyIGJlaW5nIHJ1biBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKi9cclxuXHRfb25jZTogYm9vbGVhbjtcclxuXHJcblx0Y29uc3RydWN0b3IoZm46IGFueSwgY3R4OiBhbnksIG9uY2U6IGJvb2xlYW4pIHtcclxuXHJcblx0XHR0aGlzLl9mbiA9IGZuO1xyXG5cclxuXHRcdHRoaXMuX2N0eCA9IGN0eDtcclxuXHJcblx0XHR0aGlzLl9vbmNlID0gb25jZTtcclxuXHJcblx0fVxyXG5cclxufSJdfQ==