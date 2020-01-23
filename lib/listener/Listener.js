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

/**
 * The number of times this listener function should be used before being destroyed automatically.
 * 
 * @property {number}
 */

/**
 * @param {Function} fn The function to run when this listener is called.
 * @param {boolean} [once=false] Indicates whether this listener should only be called once or not.
 * @param {number} [users=Infinity] Indicates how many times this listener can be called before being destoryed automatically.
 */
function Listener(fn) {
  var once = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var uses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

  _classCallCheck(this, Listener);

  _defineProperty(this, "fn", void 0);

  _defineProperty(this, "once", void 0);

  _defineProperty(this, "timesCalled", 0);

  _defineProperty(this, "uses", Infinity);

  this.fn = fn;
  this.once = once;
  this.uses = uses;
};

exports["default"] = Listener;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saXN0ZW5lci9MaXN0ZW5lci50cyJdLCJuYW1lcyI6WyJMaXN0ZW5lciIsImZuIiwib25jZSIsInVzZXMiLCJJbmZpbml0eSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7OztJQUdxQkEsUTtBQUNwQjs7Ozs7O0FBT0E7Ozs7OztBQU9DOzs7Ozs7QUFPRDs7Ozs7O0FBT0E7Ozs7O0FBS0Esa0JBQVlDLEVBQVosRUFBMEU7QUFBQSxNQUFoREMsSUFBZ0QsdUVBQWhDLEtBQWdDO0FBQUEsTUFBekJDLElBQXlCLHVFQUFWQyxRQUFVOztBQUFBOztBQUFBOztBQUFBOztBQUFBLHVDQWRwRCxDQWNvRDs7QUFBQSxnQ0FQM0RBLFFBTzJEOztBQUN6RSxPQUFLSCxFQUFMLEdBQVVBLEVBQVY7QUFFQSxPQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFFQSxPQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQyxDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogQSBsaXN0ZW5lciByZXByZXNlbnRzIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdGVuZXIge1xyXG5cdC8qKlxyXG5cdCAqIFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGxpc3RlbmVyIGlzIHByb2Nlc3NlZC5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge0Z1bmN0aW9ufVxyXG5cdCAqL1xyXG5cdGZuOiBhbnk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZXRoZXIgb3Igbm90IHRoaXMgbGlzdGVuZXIgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGRlc3Ryb3llZCBhZnRlciBiZWluZyBydW4gb25jZS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcblx0ICovXHJcbiAgb25jZTogYm9vbGVhbjtcclxuICBcclxuICAvKipcclxuICAgKiBLZWVwcyB0cmFjayBvZiB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoYXQgdGhpcyBsaXN0ZW5lciBoYXMgYmVlbiBjYWxsZWQuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IFxyXG4gICAqL1xyXG5cdHRpbWVzQ2FsbGVkOiBudW1iZXIgPSAwO1xyXG5cdFxyXG5cdC8qKlxyXG5cdCAqIFRoZSBudW1iZXIgb2YgdGltZXMgdGhpcyBsaXN0ZW5lciBmdW5jdGlvbiBzaG91bGQgYmUgdXNlZCBiZWZvcmUgYmVpbmcgZGVzdHJveWVkIGF1dG9tYXRpY2FsbHkuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICovXHJcblx0dXNlczogbnVtYmVyID0gSW5maW5pdHk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGlzIGxpc3RlbmVyIGlzIGNhbGxlZC5cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IFtvbmNlPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGxpc3RlbmVyIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlIG9yIG5vdC5cclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW3VzZXJzPUluZmluaXR5XSBJbmRpY2F0ZXMgaG93IG1hbnkgdGltZXMgdGhpcyBsaXN0ZW5lciBjYW4gYmUgY2FsbGVkIGJlZm9yZSBiZWluZyBkZXN0b3J5ZWQgYXV0b21hdGljYWxseS5cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihmbjogRnVuY3Rpb24sIG9uY2U6IGJvb2xlYW4gPSBmYWxzZSwgdXNlczogbnVtYmVyID0gSW5maW5pdHkpIHtcclxuXHRcdHRoaXMuZm4gPSBmbjtcclxuXHJcblx0XHR0aGlzLm9uY2UgPSBvbmNlO1xyXG5cclxuXHRcdHRoaXMudXNlcyA9IHVzZXM7XHJcbiAgfVxyXG59Il19