'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Listener = _interopRequireDefault(require("./Listener"));

var _utils = require("./utils");

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

          (_listener$fn = listener.fn).call.apply(_listener$fn, [listener.ctx].concat(args));

          listener.timesCalled++;
          if (listener.once) this.removeListener(event, listener.fn);
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
     * Adds a listener function for the given event.
     * 
     * 
     * @param {string} event The name of the event to add a listener for.
     * @param {Function} fn The function to run when the event is emitted.
     * @param {Object} context The context to use when calling the listener.
     * @param {boolean} once Indicates whether this listener should only be called once.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "addListener",
    value: function addListener(event, fn) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var listener = new _Listener["default"](fn, context, once);

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

          if ((0, _utils.compareFunctions)(eventListener.fn, listener)) {
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
     * @param {Object} [context=this] The context to use when calling the listener.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "once",
    value: function once(event, fn) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      this.addListener(event, fn, context, true);
      return this;
    }
    /**
     * Adds a listener function for the given event.
     * 
     * @param {string} event The name of the event to add a listener for.
     * @param {Function} fn The function to run when the event is emitted.
     * @param {Object} [context=this] The context to use when calling the listener.
     * 
     * @returns {Eventverse} Returns this for chaining.
     */

  }, {
    key: "on",
    value: function on(event, fn) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      this.addListener(event, fn, context);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsIl9tYXhMaXN0ZW5lckNvdW50IiwiZXZlbnQiLCJldmVudHMiLCJsZW5ndGgiLCJ0aW1lc0NhbGxlZCIsIl9leGlzdHMiLCJsaXN0ZW5lcnMiLCJhcmdzIiwibGlzdGVuZXIiLCJmbiIsImNhbGwiLCJjdHgiLCJvbmNlIiwicmVtb3ZlTGlzdGVuZXIiLCJjb250ZXh0IiwiTGlzdGVuZXIiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJldmVudExpc3RlbmVyIiwiZmlsdGVyIiwiZXZMaXN0ZW5lciIsImFkZExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7O0lBR3FCQSxVOzs7QUFFcEI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7O0FBT0E7OztBQUdDLHdCQUEyQztBQUFBLFFBQS9CQyxnQkFBK0IsdUVBQUosRUFBSTs7QUFBQTs7QUFBQTs7QUFBQSxvQ0FMN0JDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsQ0FLNkI7O0FBRXpDLFNBQUtDLGlCQUFMLEdBQXlCSCxnQkFBekI7QUFFRDtBQUVEOzs7Ozs7Ozs7O0FBT0Q7Ozs7Ozs7a0NBT2VJLEssRUFBdUI7QUFFbkMsYUFBTyxLQUFLQyxNQUFMLENBQVlELEtBQVosRUFBbUJFLE1BQTFCO0FBRUQ7QUFFRDs7Ozs7Ozs7OztnQ0FPWUYsSyxFQUF1QjtBQUVqQyxhQUFPLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixFQUFtQixDQUFuQixFQUFzQkcsV0FBN0I7QUFFRDtBQUVGOzs7Ozs7Ozs7eUJBTU1ILEssRUFBdUM7QUFFMUMsVUFBSSxDQUFDLEtBQUtJLE9BQUwsQ0FBYUosS0FBYixDQUFMLEVBQTBCO0FBRTFCLFVBQU1LLFNBQTBCLEdBQUcsS0FBS0osTUFBTCxDQUFZRCxLQUFaLENBQW5DOztBQUowQyx3Q0FBckJN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Ozs7Ozt1QkFTSWIsSyxFQUFlUSxFLEVBQTBDO0FBQUEsVUFBakNLLE9BQWlDLHVFQUFsQixJQUFrQjtBQUUxRCxXQUFLUSxXQUFMLENBQWlCckIsS0FBakIsRUFBd0JRLEVBQXhCLEVBQTRCSyxPQUE1QjtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUY7Ozs7Ozs7Ozs7Ozs0QkFTaUJiLEssRUFBZTtBQUU3QixVQUFJLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixDQUFKLEVBQXdCLE9BQU8sSUFBUDtBQUV4QixhQUFPLEtBQVA7QUFFRDs7O3dCQWhNOEI7QUFBRSxhQUFPLEtBQUtELGlCQUFaO0FBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9MaXN0ZW5lcic7XHJcbmltcG9ydCB7IGNvbXBhcmVGdW5jdGlvbnMgfSBmcm9tICcuL3V0aWxzJ1xyXG5cclxuLyoqXHJcbiAqIEV2ZW50dmVyc2UgaXMgYSBoaWdseSBwZXJmb3JtYW50IGFuZCBlYXN5IHRvIHVzZSBldmVudCBlbWl0dGVyIGZvciBOb2RlanMgYW5kIHRoZSBicm93c2VyLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnR2ZXJzZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaXN0ZW5lcnMgZWFjaCBldmVudCBjYW4gaGF2ZSBhdCBvbmUgdGltZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IDEwXHJcblx0ICovXHJcbiAgcHJpdmF0ZSBfbWF4TGlzdGVuZXJDb3VudDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGNvbGxlY3Rpb24gb2YgYWxsIG9mIHRoZSBsaXN0ZW5lcnMgY3JlYXRlZCBmb3IgdGhpcyBpbnN0YW5jZSBvZiBFdmVudHZlcnNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG5cdCAqL1xyXG4gIGV2ZW50czogYW55ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IFttYXhMaXN0ZW5lckNvdW50PTEwXSBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlzdGVuZXJzIGVhY2ggZXZlbnQgY2FuIGhhdmUgYXQgb25lIHRpbWUuIFxyXG5cdCAqL1xyXG4gIGNvbnN0cnVjdG9yKG1heExpc3RlbmVyQ291bnQ6IG51bWJlciA9IDEwKSB7XHJcblxyXG4gICAgdGhpcy5fbWF4TGlzdGVuZXJDb3VudCA9IG1heExpc3RlbmVyQ291bnQ7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIG1heCBsaXN0ZW5lcnMgZWFjaCBldmVudCBjYW4gaGF2ZSBhdCBvbmUgdGltZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBtYXhMaXN0ZW5lckNvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXhMaXN0ZW5lckNvdW50OyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgZm9yIGEgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG4gIGxpc3RlbmVyQ291bnQoZXZlbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGg7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHRpbWVzIGEgbGlzdGVuZXIgd2FzIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGdldCB0aGUgdGltZXMgY2FsbGVkIGZvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGV2ZW50IHdhcyBjYWxsZWQuXHJcbiAgICovXHJcbiAgdGltZXNDYWxsZWQoZXZlbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50XVswXS50aW1lc0NhbGxlZDtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSdW5zIGFsbCBvZiB0aGUgbGlzdGVuZXJzIGF0dGFjaGVkIHRvIHRoaXMgRXZlbnR2ZXJzZSB3aXRoIHRoZSBldmVudCBuYW1lIGFuZCB3aXRoIHRoZSBzdXBwbGllZCBhcmd1bWVudHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBlbWl0LlxyXG5cdCAqIEBwYXJhbSB7Li4uKn0gYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGxpc3RlbmVycy5cclxuXHQgKi9cclxuICBlbWl0KGV2ZW50OiBzdHJpbmcsIC4uLmFyZ3M6IEFycmF5PHN0cmluZz4pIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2V4aXN0cyhldmVudCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lcnM6IEFycmF5PExpc3RlbmVyPiA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG5cclxuICAgICAgbGlzdGVuZXIuZm4uY2FsbChsaXN0ZW5lci5jdHgsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgbGlzdGVuZXIudGltZXNDYWxsZWQrKztcclxuXHJcbiAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lci5mbik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCBUaGUgY29udGV4dCB0byB1c2Ugd2hlbiBjYWxsaW5nIHRoZSBsaXN0ZW5lci5cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9uY2UgSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBsaXN0ZW5lciBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuXHQgKi9cclxuICBhZGRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBmbjogYW55LCBjb250ZXh0ID0gdGhpcywgb25jZSA9IGZhbHNlKTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBMaXN0ZW5lcihmbiwgY29udGV4dCwgb25jZSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9leGlzdHMoZXZlbnQpKSB7XHJcblxyXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmV2ZW50c1tldmVudF0ubGVuZ3RoID09PSB0aGlzLm1heExpc3RlbmVyQ291bnQpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUud2FybihgW0V2ZW50dmVyc2VdW2FkZExpc3RlbmVyXTogVGhlIGV2ZW50ICR7ZXZlbnR9IGFscmVhZHkgaGFzIHRoZSBtYXggYW1vdW50IG9mIGxpc3RlbmVycy5gKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBvbi5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG4gIHJlbW92ZUxpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGlmICghdGhpcy5fZXhpc3RzKGV2ZW50KSkge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKCdbRXZlbnR2ZXJzZV1bcmVtb3ZlTGlzdGVuZXJdOiBVbmFibGUgdG8gcmVtb3ZlIGxpc3RlbmVyIGZvciBhbiBldmVudCB0aGF0IGRvZXNudCBleGlzdC4nKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBldmVudExpc3RlbmVyIG9mIHRoaXMuZXZlbnRzW2V2ZW50XSkge1xyXG5cclxuICAgICAgaWYgKGNvbXBhcmVGdW5jdGlvbnMoZXZlbnRMaXN0ZW5lci5mbiwgbGlzdGVuZXIpKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IHRoaXMuZXZlbnRzW2V2ZW50XS5maWx0ZXIoKGV2TGlzdGVuZXI6IGFueSkgPT4gZXZMaXN0ZW5lciAhPSBldmVudExpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmcm9tLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudDogc3RyaW5nKTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2V4aXN0cyhldmVudCkpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUud2FybignW0V2ZW50dmVyc2VdW3JlbW92ZUFsbExpc3RlbmVyc106IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBydW4gb25jZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG4gIG9uY2UoZXZlbnQ6IHN0cmluZywgZm46IGFueSwgY29udGV4dDogYW55ID0gdGhpcyk6IEV2ZW50dmVyc2Uge1xyXG5cclxuICAgIHRoaXMuYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG4gIG9uKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQ6IGFueSA9IHRoaXMpOiBFdmVudHZlcnNlIHtcclxuXHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGV2ZW50IGV4aXN0cy5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgZXhpc3RzIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuXHQgKi9cclxuICBwcml2YXRlIF9leGlzdHMoZXZlbnQ6IHN0cmluZykge1xyXG5cclxuICAgIGlmICh0aGlzLmV2ZW50c1tldmVudF0pIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==