'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var utils = _interopRequireWildcard(require("./utils"));

var _Listener = _interopRequireDefault(require("./Listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Eventverse is a higly performant and easy to use event emitter for Nodejs and the browser.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 */
var Eventverse =
/*#__PURE__*/
function () {
  /**
   * The maximum amount of listeners each event can have at one time.
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

    _defineProperty(this, "maxListenerCount", void 0);

    _defineProperty(this, "events", Object.create(null));

    this.maxListenerCount = maxListenerCount;
  }
  /**
   * Returns the number of listeners for a given event.
   * 
   * @param {string} event The name of the event.
   * 
   * @returns {number}
   */


  _createClass(Eventverse, [{
    key: "listenerCount",
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
      if (!this.exists(event)) return;
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
     * @returns {Eventverse}
     */

  }, {
    key: "addListener",
    value: function addListener(event, fn) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
      var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var listener = new _Listener["default"](fn, context, once);

      if (!this.exists(event)) {
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
     * @returns {Eventverse}
     */

  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      var _this = this;

      if (!this.exists(event)) {
        console.warn('[Eventverse][removeListener]: Unable to remove listener for an event that doesnt exist.');
        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function _loop() {
          var eventListener = _step2.value;

          if (utils.compareFunctions(eventListener.fn, listener)) {
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
     * @returns {Eventverse}
     */

  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(event) {
      if (!this.exists(event)) {
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
     * @returns {Eventverse}
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
     * @returns {Eventverse}
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
    key: "exists",
    value: function exists(event) {
      if (this.events[event]) return true;
      return false;
    }
  }]);

  return Eventverse;
}();

exports["default"] = Eventverse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsImV2ZW50IiwiZXZlbnRzIiwibGVuZ3RoIiwidGltZXNDYWxsZWQiLCJleGlzdHMiLCJsaXN0ZW5lcnMiLCJhcmdzIiwibGlzdGVuZXIiLCJmbiIsImNhbGwiLCJjdHgiLCJvbmNlIiwicmVtb3ZlTGlzdGVuZXIiLCJjb250ZXh0IiwiTGlzdGVuZXIiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJldmVudExpc3RlbmVyIiwidXRpbHMiLCJjb21wYXJlRnVuY3Rpb25zIiwiZmlsdGVyIiwiZXZMaXN0ZW5lciIsImFkZExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0lBS3FCQSxVOzs7QUFFcEI7Ozs7Ozs7O0FBU0E7Ozs7OztBQU9BOzs7QUFHQyx3QkFBMkM7QUFBQSxRQUEvQkMsZ0JBQStCLHVFQUFKLEVBQUk7O0FBQUE7O0FBQUE7O0FBQUEsb0NBTDdCQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBSzZCOztBQUV6QyxTQUFLRixnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBRUQ7QUFFRjs7Ozs7Ozs7Ozs7a0NBT2VHLEssRUFBdUI7QUFFbkMsYUFBTyxLQUFLQyxNQUFMLENBQVlELEtBQVosRUFBbUJFLE1BQTFCO0FBRUQ7QUFFRDs7Ozs7Ozs7OztnQ0FPWUYsSyxFQUF1QjtBQUVqQyxhQUFPLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixFQUFtQixDQUFuQixFQUFzQkcsV0FBN0I7QUFFRDtBQUVGOzs7Ozs7Ozs7eUJBTU1ILEssRUFBdUM7QUFFMUMsVUFBSSxDQUFDLEtBQUtJLE1BQUwsQ0FBWUosS0FBWixDQUFMLEVBQXlCO0FBRXpCLFVBQU1LLFNBQTBCLEdBQUcsS0FBS0osTUFBTCxDQUFZRCxLQUFaLENBQW5DOztBQUowQyx3Q0FBckJN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O0FBRUQ7QUFFRjs7Ozs7Ozs7Ozs7O3VCQVNJYixLLEVBQWVRLEUsRUFBMEM7QUFBQSxVQUFqQ0ssT0FBaUMsdUVBQWxCLElBQWtCO0FBRTFELFdBQUtVLFdBQUwsQ0FBaUJ2QixLQUFqQixFQUF3QlEsRUFBeEIsRUFBNEJLLE9BQTVCO0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRjs7Ozs7Ozs7Ozs7OzJCQVNnQmIsSyxFQUFlO0FBRTVCLFVBQUksS0FBS0MsTUFBTCxDQUFZRCxLQUFaLENBQUosRUFBd0IsT0FBTyxJQUFQO0FBRXhCLGFBQU8sS0FBUDtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xyXG5cclxuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vTGlzdGVuZXInO1xyXG5cclxuLyoqXHJcbiAqIEV2ZW50dmVyc2UgaXMgYSBoaWdseSBwZXJmb3JtYW50IGFuZCBlYXN5IHRvIHVzZSBldmVudCBlbWl0dGVyIGZvciBOb2RlanMgYW5kIHRoZSBicm93c2VyLlxyXG4gKiBcclxuICogQGF1dGhvciBSb2JlcnQgQ29ycG9ub2kgPHJvYmVydGNvcnBvbm9pQGdtYWlsLmNvbT5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50dmVyc2Uge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlzdGVuZXJzIGVhY2ggZXZlbnQgY2FuIGhhdmUgYXQgb25lIHRpbWUuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMTBcclxuXHQgKi9cclxuICBtYXhMaXN0ZW5lckNvdW50OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIGxpc3RlbmVycyBjcmVhdGVkIGZvciB0aGlzIGluc3RhbmNlIG9mIEV2ZW50dmVyc2UuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPYmplY3R9XHJcblx0ICovXHJcbiAgZXZlbnRzOiBhbnkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW21heExpc3RlbmVyQ291bnQ9MTBdIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaXN0ZW5lcnMgZWFjaCBldmVudCBjYW4gaGF2ZSBhdCBvbmUgdGltZS4gXHJcblx0ICovXHJcbiAgY29uc3RydWN0b3IobWF4TGlzdGVuZXJDb3VudDogbnVtYmVyID0gMTApIHtcclxuXHJcbiAgICB0aGlzLm1heExpc3RlbmVyQ291bnQgPSBtYXhMaXN0ZW5lckNvdW50O1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgZm9yIGEgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG4gIGxpc3RlbmVyQ291bnQoZXZlbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGg7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHRpbWVzIGEgbGlzdGVuZXIgd2FzIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGdldCB0aGUgdGltZXMgY2FsbGVkIGZvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGV2ZW50IHdhcyBjYWxsZWQuXHJcbiAgICovXHJcbiAgdGltZXNDYWxsZWQoZXZlbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50XVswXS50aW1lc0NhbGxlZDtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSdW5zIGFsbCBvZiB0aGUgbGlzdGVuZXJzIGF0dGFjaGVkIHRvIHRoaXMgRXZlbnR2ZXJzZSB3aXRoIHRoZSBldmVudCBuYW1lIGFuZCB3aXRoIHRoZSBzdXBwbGllZCBhcmd1bWVudHMuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBlbWl0LlxyXG5cdCAqIEBwYXJhbSB7Li4uKn0gYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGxpc3RlbmVycy5cclxuXHQgKi9cclxuICBlbWl0KGV2ZW50OiBzdHJpbmcsIC4uLmFyZ3M6IEFycmF5PHN0cmluZz4pIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuZXhpc3RzKGV2ZW50KSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGxpc3RlbmVyczogQXJyYXk8TGlzdGVuZXI+ID0gdGhpcy5ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XHJcblxyXG4gICAgICBsaXN0ZW5lci5mbi5jYWxsKGxpc3RlbmVyLmN0eCwgLi4uYXJncyk7XHJcblxyXG4gICAgICBsaXN0ZW5lci50aW1lc0NhbGxlZCsrO1xyXG5cclxuICAgICAgaWYgKGxpc3RlbmVyLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLmZuKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhZGQgYSBsaXN0ZW5lciBmb3IuXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb25jZSBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGxpc3RlbmVyIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG4gIGFkZExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQgPSB0aGlzLCBvbmNlID0gZmFsc2UpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGNvbnN0IGxpc3RlbmVyID0gbmV3IExpc3RlbmVyKGZuLCBjb250ZXh0LCBvbmNlKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuZXhpc3RzKGV2ZW50KSkge1xyXG5cclxuICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5ldmVudHNbZXZlbnRdLmxlbmd0aCA9PT0gdGhpcy5tYXhMaXN0ZW5lckNvdW50KSB7XHJcblxyXG4gICAgICBjb25zb2xlLndhcm4oYFtFdmVudHZlcnNlXVthZGRMaXN0ZW5lcl06IFRoZSBldmVudCAke2V2ZW50fSBhbHJlYWR5IGhhcyB0aGUgbWF4IGFtb3VudCBvZiBsaXN0ZW5lcnMuYCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgb24uXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX1cclxuXHQgKi9cclxuICByZW1vdmVMaXN0ZW5lcihldmVudDogc3RyaW5nLCBsaXN0ZW5lcjogYW55KTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuZXhpc3RzKGV2ZW50KSkge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKCdbRXZlbnR2ZXJzZV1bcmVtb3ZlTGlzdGVuZXJdOiBVbmFibGUgdG8gcmVtb3ZlIGxpc3RlbmVyIGZvciBhbiBldmVudCB0aGF0IGRvZXNudCBleGlzdC4nKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChjb25zdCBldmVudExpc3RlbmVyIG9mIHRoaXMuZXZlbnRzW2V2ZW50XSkge1xyXG5cclxuICAgICAgaWYgKHV0aWxzLmNvbXBhcmVGdW5jdGlvbnMoZXZlbnRMaXN0ZW5lci5mbiwgbGlzdGVuZXIpKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IHRoaXMuZXZlbnRzW2V2ZW50XS5maWx0ZXIoKGV2TGlzdGVuZXI6IGFueSkgPT4gZXZMaXN0ZW5lciAhPSBldmVudExpc3RlbmVyKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmcm9tLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG4gIHJlbW92ZUFsbExpc3RlbmVycyhldmVudDogc3RyaW5nKTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICBpZiAoIXRoaXMuZXhpc3RzKGV2ZW50KSkge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKCdbRXZlbnR2ZXJzZV1bcmVtb3ZlQWxsTGlzdGVuZXJzXTogVW5hYmxlIHRvIHJlbW92ZSBsaXN0ZW5lciBmb3IgYW4gZXZlbnQgdGhhdCBkb2VzbnQgZXhpc3QuJyk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IHJ1biBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gdXNlIHdoZW4gY2FsbGluZyB0aGUgbGlzdGVuZXIuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9XHJcblx0ICovXHJcbiAgb25jZShldmVudDogc3RyaW5nLCBmbjogYW55LCBjb250ZXh0OiBhbnkgPSB0aGlzKTogRXZlbnR2ZXJzZSB7XHJcblxyXG4gICAgdGhpcy5hZGRMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gdXNlIHdoZW4gY2FsbGluZyB0aGUgbGlzdGVuZXIuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9XHJcblx0ICovXHJcbiAgb24oZXZlbnQ6IHN0cmluZywgZm46IGFueSwgY29udGV4dDogYW55ID0gdGhpcyk6IEV2ZW50dmVyc2Uge1xyXG5cclxuICAgIHRoaXMuYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gZXZlbnQgZXhpc3RzLlxyXG4gICAqIFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBldmVudCBleGlzdHMgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgZXhpc3RzKGV2ZW50OiBzdHJpbmcpIHtcclxuXHJcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=