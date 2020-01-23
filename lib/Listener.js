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
 * Whether or not this listener will be automatically destroyed after being run once.
 * 
 * @property {boolean}
 */

/**
 * Keeps track of the number of times that this listener has been called.
 * 
 * @property {number} 
 */
function Listener(fn, once) {
  _classCallCheck(this, Listener);

  _defineProperty(this, "fn", void 0);

  _defineProperty(this, "once", void 0);

  _defineProperty(this, "timesCalled", 0);

  this.fn = fn;
  this.once = once;
};

exports["default"] = Listener;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9MaXN0ZW5lci50cyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImZuIiwib25jZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7OztJQUdxQkEsUTtBQUNwQjs7Ozs7O0FBT0E7Ozs7OztBQU9DOzs7OztBQU9ELGtCQUFZQyxFQUFaLEVBQXFCQyxJQUFyQixFQUFvQztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQUZiLENBRWE7O0FBQ25DLE9BQUtELEVBQUwsR0FBVUEsRUFBVjtBQUVBLE9BQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNDLEMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbi8qKlxyXG4gKiBBIGxpc3RlbmVyIHJlcHJlc2VudHMgYSBzaW5nbGUgZXZlbnQgbGlzdGVuZXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0ZW5lciB7XHJcblx0LyoqXHJcblx0ICogVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgbGlzdGVuZXIgaXMgcHJvY2Vzc2VkLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259XHJcblx0ICovXHJcblx0Zm46IGFueTtcclxuXHJcblx0LyoqXHJcblx0ICogV2hldGhlciBvciBub3QgdGhpcyBsaXN0ZW5lciB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgZGVzdHJveWVkIGFmdGVyIGJlaW5nIHJ1biBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuXHQgKi9cclxuICBvbmNlOiBib29sZWFuO1xyXG4gIFxyXG4gIC8qKlxyXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBudW1iZXIgb2YgdGltZXMgdGhhdCB0aGlzIGxpc3RlbmVyIGhhcyBiZWVuIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn0gXHJcbiAgICovXHJcbiAgdGltZXNDYWxsZWQ6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGZuOiBhbnksIG9uY2U6IGJvb2xlYW4pIHtcclxuXHRcdHRoaXMuZm4gPSBmbjtcclxuXHJcblx0XHR0aGlzLm9uY2UgPSBvbmNlO1xyXG4gIH1cclxufSJdfQ==