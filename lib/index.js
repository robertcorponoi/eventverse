'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Listener = _interopRequireDefault(require("./listener/Listener"));

var _compareFunctions = _interopRequireDefault(require("./utils/compare-functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Eventverse is a higly performant and easy to use event emitter for Nodejs and the browser.
 */
var Eventverse =
/*#__PURE__*/
function () {
  /**
   * The maximum amount of listeners each event can have at one time.
    * 
    * @private
   * 
   * @property {number}
   * 
   * @default 10
   */

  /**
   * A collection of all of the listeners created for this instance of Eventverse.
   * 
   * @property {Object}
   */

  /**
   * @param {number} [maxListenerCount=10] The maximum amount of listeners each event can have at one time. 
   */
  function Eventverse() {
    var maxListenerCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, Eventverse);

    _defineProperty(this, "_maxListenerCount", void 0);

    _defineProperty(this, "events", Object.create(null));

    this._maxListenerCount = maxListenerCount;
  }
  /**
   * Returns the number of max listeners each event can have at one time.
   * 
   * @returns {number}
   */


  _createClass(Eventverse, [{
    key: "listenerCount",

    /**
     * Returns the number of listeners for a given event.
     * 
     * @param {string} event The name of the event.
     * 
     * @returns {number}
     */
    value: function listenerCount(event) {
      return this.events[event].length;
    }
    /**
     * Returns the number of times a listener was called.
     * 
     * @param {string} event The name of the event to get the times called for.
     * 
     * @returns {number} Returns the number of times the event was called.
     */

  }, {
    key: "timesCalled",
    value: function timesCalled(event) {
      return this.events[event][0].timesCalled;
    }
    /**
     * Runs all of the listeners attached to this Eventverse with the event name and with the supplied arguments.
     * 
     * @param {string} event The name of the event to emit.
     * @param {...*} args The arguments to pass to the listeners.
     */

  }, {
    key: "emit",
    value: function emit(event) {
      if (!this._exists(event)) return;
      var listeners = this.events[event];

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _listener$fn;

          var listener = _step.value;

          (_listener$fn = listener.fn).call.apply(_listener$fn, [this].concat(args));

          listener.timesCalled++;
          if (listener.once || listener.timesCalled === listener.uses) this.removeListener(event, listener.fn);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    /**
     * Removes a listener function for the given event.
     * 
     * @param {string} event The name of the event to remove the listener on.
     * @param {Function} listener The listener to remove from the event.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      var _this = this;

      if (!this._exists(event)) {
        console.warn('[Eventverse][removeListener]: Unable to remove listener for an event that doesnt exist.');
        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var eventListener = _step2.value;

          if ((0, _compareFunctions["default"])(eventListener.fn, listener)) {
            _this.events[event] = _this.events[event].filter(function (evListener) {
              return evListener != eventListener;
            });
            return "break";
          }
        };

        for (var _iterator2 = this.events[event][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
    /**
     * Removes all listeners from a given event.
     * 
     * @param {string} event The name of the event to remove all listeners from.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(event) {
      if (!this._exists(event)) {
        console.warn('[Eventverse][removeAllListeners]: Unable to remove listener for an event that doesnt exist.');
        return;
      }

      this.events[event] = [];
      return this;
    }
    /**
     * Add a listener function that will only run once.
     * 
     * @param {string} event The name of the event to add a listener for.
     * @param {Function} fn The function to run when the event is emitted.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "once",
    value: function once(event, fn) {
      this._addListener(event, fn, true);

      return this;
    }
    /**
     * Adds a listener function for the given event.
     * 
     * @param {string} event The name of the event to add a listener for.
     * @param {Function} fn The function to run when the event is emitted.
      * @param {number} [uses] Specify this to limit the number of times a listener function is used before being destroyed automatically.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "on",
    value: function on(event, fn, uses) {
      this._addListener(event, fn, false, uses);

      return this;
    }
    /**
    * Adds a listener function for the given event.
    * 
     * @private
    * 
    * @param {string} event The name of the event to add a listener for.
    * @param {Function} fn The function to run when the event is emitted.
    * @param {boolean} once Indicates whether this listener should only be called once.
    * 
    * @returns {Eventverse} Returns this for chaining.
    */

  }, {
    key: "_addListener",
    value: function _addListener(event, fn) {
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var uses = arguments.length > 3 ? arguments[3] : undefined;
      var listener = new _Listener["default"](fn, once, uses);

      if (!this._exists(event)) {
        this.events[event] = [];
      } else if (this.events[event].length === this.maxListenerCount) {
        console.warn("[Eventverse][addListener]: The event ".concat(event, " already has the max amount of listeners."));
        return;
      }

      this.events[event].push(listener);
      return this;
    }
    /**
     * Checks if an event exists.
      * 
     * @private
     * 
     * @param {string} event The name of the event.
     * 
     * @returns {boolean} Returns true if the event exists or false otherwise.
     */

  }, {
    key: "_exists",
    value: function _exists(event) {
      if (this.events[event]) return true;
      return false;
    }
  }, {
    key: "maxListenerCount",
    get: function get() {
      return this._maxListenerCount;
    }
  }]);

  return Eventverse;
}();

exports["default"] = Eventverse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsIl9tYXhMaXN0ZW5lckNvdW50IiwiZXZlbnQiLCJldmVudHMiLCJsZW5ndGgiLCJ0aW1lc0NhbGxlZCIsIl9leGlzdHMiLCJsaXN0ZW5lcnMiLCJhcmdzIiwibGlzdGVuZXIiLCJmbiIsImNhbGwiLCJvbmNlIiwidXNlcyIsInJlbW92ZUxpc3RlbmVyIiwiY29uc29sZSIsIndhcm4iLCJldmVudExpc3RlbmVyIiwiZmlsdGVyIiwiZXZMaXN0ZW5lciIsIl9hZGRMaXN0ZW5lciIsIkxpc3RlbmVyIiwicHVzaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7OztJQUdxQkEsVTs7O0FBQ3BCOzs7Ozs7Ozs7O0FBV0E7Ozs7OztBQU9BOzs7QUFHQyx3QkFBMkM7QUFBQSxRQUEvQkMsZ0JBQStCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUE7O0FBQUEsb0NBTDdCQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBSzZCOztBQUN6QyxTQUFLQyxpQkFBTCxHQUF5QkgsZ0JBQXpCO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQU9EOzs7Ozs7O2tDQU9lSSxLLEVBQXVCO0FBQ25DLGFBQU8sS0FBS0MsTUFBTCxDQUFZRCxLQUFaLEVBQW1CRSxNQUExQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Z0NBT1lGLEssRUFBdUI7QUFDakMsYUFBTyxLQUFLQyxNQUFMLENBQVlELEtBQVosRUFBbUIsQ0FBbkIsRUFBc0JHLFdBQTdCO0FBQ0Q7QUFFRjs7Ozs7Ozs7O3lCQU1NSCxLLEVBQXVDO0FBQzFDLFVBQUksQ0FBQyxLQUFLSSxPQUFMLENBQWFKLEtBQWIsQ0FBTCxFQUEwQjtBQUUxQixVQUFNSyxTQUEwQixHQUFHLEtBQUtKLE1BQUwsQ0FBWUQsS0FBWixDQUFuQzs7QUFIMEMsd0NBQXJCTSxJQUFxQjtB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S0FBckQ7QUFFQTtBQUNEOztBQUVELFdBQUtDLE1BQUwsQ0FBWUQsS0FBWixFQUFtQm9CLElBQW5CLENBQXdCYixRQUF4QjtBQUVBLGFBQU8sSUFBUDtBQUNEO0FBRUY7Ozs7Ozs7Ozs7Ozs0QkFTaUJQLEssRUFBZTtBQUM3QixVQUFJLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixDQUFKLEVBQXdCLE9BQU8sSUFBUDtBQUV4QixhQUFPLEtBQVA7QUFDRDs7O3dCQS9KOEI7QUFBRSxhQUFPLEtBQUtELGlCQUFaO0FBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9saXN0ZW5lci9MaXN0ZW5lcic7XHJcbmltcG9ydCBjb21wYXJlRnVuY3Rpb25zIGZyb20gJy4vdXRpbHMvY29tcGFyZS1mdW5jdGlvbnMnXHJcblxyXG4vKipcclxuICogRXZlbnR2ZXJzZSBpcyBhIGhpZ2x5IHBlcmZvcm1hbnQgYW5kIGVhc3kgdG8gdXNlIGV2ZW50IGVtaXR0ZXIgZm9yIE5vZGVqcyBhbmQgdGhlIGJyb3dzZXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHZlcnNlIHtcclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlzdGVuZXJzIGVhY2ggZXZlbnQgY2FuIGhhdmUgYXQgb25lIHRpbWUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAxMFxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX21heExpc3RlbmVyQ291bnQ6IG51bWJlcjtcclxuXHJcblx0LyoqXHJcblx0ICogQSBjb2xsZWN0aW9uIG9mIGFsbCBvZiB0aGUgbGlzdGVuZXJzIGNyZWF0ZWQgZm9yIHRoaXMgaW5zdGFuY2Ugb2YgRXZlbnR2ZXJzZS5cclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge09iamVjdH1cclxuXHQgKi9cclxuICBldmVudHM6IGFueSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBbbWF4TGlzdGVuZXJDb3VudD0xMF0gVGhlIG1heGltdW0gYW1vdW50IG9mIGxpc3RlbmVycyBlYWNoIGV2ZW50IGNhbiBoYXZlIGF0IG9uZSB0aW1lLiBcclxuXHQgKi9cclxuICBjb25zdHJ1Y3RvcihtYXhMaXN0ZW5lckNvdW50OiBudW1iZXIgPSAxMCkge1xyXG4gICAgdGhpcy5fbWF4TGlzdGVuZXJDb3VudCA9IG1heExpc3RlbmVyQ291bnQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWF4IGxpc3RlbmVycyBlYWNoIGV2ZW50IGNhbiBoYXZlIGF0IG9uZSB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IG1heExpc3RlbmVyQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heExpc3RlbmVyQ291bnQ7IH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBmb3IgYSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcbiAgbGlzdGVuZXJDb3VudChldmVudDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmV2ZW50c1tldmVudF0ubGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHRpbWVzIGEgbGlzdGVuZXIgd2FzIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGdldCB0aGUgdGltZXMgY2FsbGVkIGZvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGV2ZW50IHdhcyBjYWxsZWQuXHJcbiAgICovXHJcbiAgdGltZXNDYWxsZWQoZXZlbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdWzBdLnRpbWVzQ2FsbGVkO1xyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUnVucyBhbGwgb2YgdGhlIGxpc3RlbmVycyBhdHRhY2hlZCB0byB0aGlzIEV2ZW50dmVyc2Ugd2l0aCB0aGUgZXZlbnQgbmFtZSBhbmQgd2l0aCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdC5cclxuXHQgKiBAcGFyYW0gey4uLip9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBsaXN0ZW5lcnMuXHJcblx0ICovXHJcbiAgZW1pdChldmVudDogc3RyaW5nLCAuLi5hcmdzOiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICBpZiAoIXRoaXMuX2V4aXN0cyhldmVudCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lcnM6IEFycmF5PExpc3RlbmVyPiA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG4gICAgICBsaXN0ZW5lci5mbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgbGlzdGVuZXIudGltZXNDYWxsZWQrKztcclxuXHJcbiAgICAgIGlmIChsaXN0ZW5lci5vbmNlIHx8IGxpc3RlbmVyLnRpbWVzQ2FsbGVkID09PSBsaXN0ZW5lci51c2VzKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lci5mbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgb24uXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuXHQgKi9cclxuICByZW1vdmVMaXN0ZW5lcihldmVudDogc3RyaW5nLCBsaXN0ZW5lcjogYW55KTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICghdGhpcy5fZXhpc3RzKGV2ZW50KSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1tFdmVudHZlcnNlXVtyZW1vdmVMaXN0ZW5lcl06IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgZXZlbnRMaXN0ZW5lciBvZiB0aGlzLmV2ZW50c1tldmVudF0pIHtcclxuICAgICAgaWYgKGNvbXBhcmVGdW5jdGlvbnMoZXZlbnRMaXN0ZW5lci5mbiwgbGlzdGVuZXIpKSB7XHJcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gdGhpcy5ldmVudHNbZXZlbnRdLmZpbHRlcigoZXZMaXN0ZW5lcjogYW55KSA9PiBldkxpc3RlbmVyICE9IGV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20uXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50OiBzdHJpbmcpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG4gICAgaWYgKCF0aGlzLl9leGlzdHMoZXZlbnQpKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignW0V2ZW50dmVyc2VdW3JlbW92ZUFsbExpc3RlbmVyc106IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgcnVuIG9uY2UuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhZGQgYSBsaXN0ZW5lciBmb3IuXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG4gIG9uY2UoZXZlbnQ6IHN0cmluZywgZm46IGFueSk6IEV2ZW50dmVyc2Uge1xyXG4gICAgdGhpcy5fYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3VzZXNdIFNwZWNpZnkgdGhpcyB0byBsaW1pdCB0aGUgbnVtYmVyIG9mIHRpbWVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gaXMgdXNlZCBiZWZvcmUgYmVpbmcgZGVzdHJveWVkIGF1dG9tYXRpY2FsbHkuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcbiAgb24oZXZlbnQ6IHN0cmluZywgZm46IGFueSwgdXNlcz86IG51bWJlcik6IEV2ZW50dmVyc2Uge1xyXG4gICAgdGhpcy5fYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCBmYWxzZSwgdXNlcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuXHQgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9uY2UgSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBsaXN0ZW5lciBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuXHQgKi9cclxuICBwcml2YXRlIF9hZGRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBmbjogYW55LCBvbmNlOiBib29sZWFuID0gZmFsc2UsIHVzZXM/OiBudW1iZXIpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG4gICAgY29uc3QgbGlzdGVuZXIgPSBuZXcgTGlzdGVuZXIoZm4sIG9uY2UsIHVzZXMpO1xyXG5cclxuICAgIGlmICghdGhpcy5fZXhpc3RzKGV2ZW50KSkge1xyXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGggPT09IHRoaXMubWF4TGlzdGVuZXJDb3VudCkge1xyXG4gICAgICBjb25zb2xlLndhcm4oYFtFdmVudHZlcnNlXVthZGRMaXN0ZW5lcl06IFRoZSBldmVudCAke2V2ZW50fSBhbHJlYWR5IGhhcyB0aGUgbWF4IGFtb3VudCBvZiBsaXN0ZW5lcnMuYCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGV2ZW50IGV4aXN0cy5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgZXhpc3RzIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9leGlzdHMoZXZlbnQ6IHN0cmluZykge1xyXG4gICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSJdfQ==