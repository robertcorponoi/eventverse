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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsIl9tYXhMaXN0ZW5lckNvdW50IiwiZXZlbnQiLCJldmVudHMiLCJsZW5ndGgiLCJ0aW1lc0NhbGxlZCIsIl9leGlzdHMiLCJsaXN0ZW5lcnMiLCJhcmdzIiwibGlzdGVuZXIiLCJmbiIsImNhbGwiLCJjdHgiLCJvbmNlIiwicmVtb3ZlTGlzdGVuZXIiLCJjb250ZXh0IiwiTGlzdGVuZXIiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJldmVudExpc3RlbmVyIiwiZmlsdGVyIiwiZXZMaXN0ZW5lciIsImFkZExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFLcUJBLFU7OztBQUVwQjs7Ozs7Ozs7OztBQVdBOzs7Ozs7QUFPQTs7O0FBR0Msd0JBQTJDO0FBQUEsUUFBL0JDLGdCQUErQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLG9DQUw3QkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUs2Qjs7QUFFekMsU0FBS0MsaUJBQUwsR0FBeUJILGdCQUF6QjtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7QUFPRDs7Ozs7OztrQ0FPZUksSyxFQUF1QjtBQUVuQyxhQUFPLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixFQUFtQkUsTUFBMUI7QUFFRDtBQUVEOzs7Ozs7Ozs7O2dDQU9ZRixLLEVBQXVCO0FBRWpDLGFBQU8sS0FBS0MsTUFBTCxDQUFZRCxLQUFaLEVBQW1CLENBQW5CLEVBQXNCRyxXQUE3QjtBQUVEO0FBRUY7Ozs7Ozs7Ozt5QkFNTUgsSyxFQUF1QztBQUUxQyxVQUFJLENBQUMsS0FBS0ksT0FBTCxDQUFhSixLQUFiLENBQUwsRUFBMEI7QUFFMUIsVUFBTUssU0FBMEIsR0FBRyxLQUFLSixNQUFMLENBQVlELEtBQVosQ0FBbkM7O0FBSjBDLHdDQUFyQk0sSUFBcUI7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QVNJYixLLEVBQWVRLEUsRUFBMEM7QUFBQSxVQUFqQ0ssT0FBaUMsdUVBQWxCLElBQWtCO0FBRTFELFdBQUtRLFdBQUwsQ0FBaUJyQixLQUFqQixFQUF3QlEsRUFBeEIsRUFBNEJLLE9BQTVCO0FBRUEsYUFBTyxJQUFQO0FBRUQ7QUFFRjs7Ozs7Ozs7Ozs7OzRCQVNpQmIsSyxFQUFlO0FBRTdCLFVBQUksS0FBS0MsTUFBTCxDQUFZRCxLQUFaLENBQUosRUFBd0IsT0FBTyxJQUFQO0FBRXhCLGFBQU8sS0FBUDtBQUVEOzs7d0JBaE04QjtBQUFFLGFBQU8sS0FBS0QsaUJBQVo7QUFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL0xpc3RlbmVyJztcclxuaW1wb3J0IHsgY29tcGFyZUZ1bmN0aW9ucyB9IGZyb20gJy4vdXRpbHMnXHJcblxyXG4vKipcclxuICogRXZlbnR2ZXJzZSBpcyBhIGhpZ2x5IHBlcmZvcm1hbnQgYW5kIGVhc3kgdG8gdXNlIGV2ZW50IGVtaXR0ZXIgZm9yIE5vZGVqcyBhbmQgdGhlIGJyb3dzZXIuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHZlcnNlIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGxpc3RlbmVycyBlYWNoIGV2ZW50IGNhbiBoYXZlIGF0IG9uZSB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMTBcclxuXHQgKi9cclxuICBwcml2YXRlIF9tYXhMaXN0ZW5lckNvdW50OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIGxpc3RlbmVycyBjcmVhdGVkIGZvciB0aGlzIGluc3RhbmNlIG9mIEV2ZW50dmVyc2UuXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPYmplY3R9XHJcblx0ICovXHJcbiAgZXZlbnRzOiBhbnkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW21heExpc3RlbmVyQ291bnQ9MTBdIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaXN0ZW5lcnMgZWFjaCBldmVudCBjYW4gaGF2ZSBhdCBvbmUgdGltZS4gXHJcblx0ICovXHJcbiAgY29uc3RydWN0b3IobWF4TGlzdGVuZXJDb3VudDogbnVtYmVyID0gMTApIHtcclxuXHJcbiAgICB0aGlzLl9tYXhMaXN0ZW5lckNvdW50ID0gbWF4TGlzdGVuZXJDb3VudDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbWF4IGxpc3RlbmVycyBlYWNoIGV2ZW50IGNhbiBoYXZlIGF0IG9uZSB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IG1heExpc3RlbmVyQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heExpc3RlbmVyQ291bnQ7IH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBmb3IgYSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcbiAgbGlzdGVuZXJDb3VudChldmVudDogc3RyaW5nKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdLmxlbmd0aDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgdGltZXMgYSBsaXN0ZW5lciB3YXMgY2FsbGVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZ2V0IHRoZSB0aW1lcyBjYWxsZWQgZm9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGUgZXZlbnQgd2FzIGNhbGxlZC5cclxuICAgKi9cclxuICB0aW1lc0NhbGxlZChldmVudDogc3RyaW5nKTogbnVtYmVyIHtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnRdWzBdLnRpbWVzQ2FsbGVkO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJ1bnMgYWxsIG9mIHRoZSBsaXN0ZW5lcnMgYXR0YWNoZWQgdG8gdGhpcyBFdmVudHZlcnNlIHdpdGggdGhlIGV2ZW50IG5hbWUgYW5kIHdpdGggdGhlIHN1cHBsaWVkIGFyZ3VtZW50cy5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQuXHJcblx0ICogQHBhcmFtIHsuLi4qfSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgbGlzdGVuZXJzLlxyXG5cdCAqL1xyXG4gIGVtaXQoZXZlbnQ6IHN0cmluZywgLi4uYXJnczogQXJyYXk8c3RyaW5nPikge1xyXG5cclxuICAgIGlmICghdGhpcy5fZXhpc3RzKGV2ZW50KSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGxpc3RlbmVyczogQXJyYXk8TGlzdGVuZXI+ID0gdGhpcy5ldmVudHNbZXZlbnRdO1xyXG5cclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XHJcblxyXG4gICAgICBsaXN0ZW5lci5mbi5jYWxsKGxpc3RlbmVyLmN0eCwgLi4uYXJncyk7XHJcblxyXG4gICAgICBsaXN0ZW5lci50aW1lc0NhbGxlZCsrO1xyXG5cclxuICAgICAgaWYgKGxpc3RlbmVyLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyLmZuKTtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhZGQgYSBsaXN0ZW5lciBmb3IuXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb25jZSBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGxpc3RlbmVyIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG5cdCAqL1xyXG4gIGFkZExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQgPSB0aGlzLCBvbmNlID0gZmFsc2UpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGNvbnN0IGxpc3RlbmVyID0gbmV3IExpc3RlbmVyKGZuLCBjb250ZXh0LCBvbmNlKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2V4aXN0cyhldmVudCkpIHtcclxuXHJcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGggPT09IHRoaXMubWF4TGlzdGVuZXJDb3VudCkge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKGBbRXZlbnR2ZXJzZV1bYWRkTGlzdGVuZXJdOiBUaGUgZXZlbnQgJHtldmVudH0gYWxyZWFkeSBoYXMgdGhlIG1heCBhbW91bnQgb2YgbGlzdGVuZXJzLmApO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIG9uLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IGFueSk6IChFdmVudHZlcnNlIHwgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9leGlzdHMoZXZlbnQpKSB7XHJcblxyXG4gICAgICBjb25zb2xlLndhcm4oJ1tFdmVudHZlcnNlXVtyZW1vdmVMaXN0ZW5lcl06IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGV2ZW50TGlzdGVuZXIgb2YgdGhpcy5ldmVudHNbZXZlbnRdKSB7XHJcblxyXG4gICAgICBpZiAoY29tcGFyZUZ1bmN0aW9ucyhldmVudExpc3RlbmVyLmZuLCBsaXN0ZW5lcikpIHtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gdGhpcy5ldmVudHNbZXZlbnRdLmZpbHRlcigoZXZMaXN0ZW5lcjogYW55KSA9PiBldkxpc3RlbmVyICE9IGV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20uXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50OiBzdHJpbmcpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGlmICghdGhpcy5fZXhpc3RzKGV2ZW50KSkge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKCdbRXZlbnR2ZXJzZV1bcmVtb3ZlQWxsTGlzdGVuZXJzXTogVW5hYmxlIHRvIHJlbW92ZSBsaXN0ZW5lciBmb3IgYW4gZXZlbnQgdGhhdCBkb2VzbnQgZXhpc3QuJyk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IHJ1biBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gdXNlIHdoZW4gY2FsbGluZyB0aGUgbGlzdGVuZXIuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcbiAgb25jZShldmVudDogc3RyaW5nLCBmbjogYW55LCBjb250ZXh0OiBhbnkgPSB0aGlzKTogRXZlbnR2ZXJzZSB7XHJcblxyXG4gICAgdGhpcy5hZGRMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gdXNlIHdoZW4gY2FsbGluZyB0aGUgbGlzdGVuZXIuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcblx0ICovXHJcbiAgb24oZXZlbnQ6IHN0cmluZywgZm46IGFueSwgY29udGV4dDogYW55ID0gdGhpcyk6IEV2ZW50dmVyc2Uge1xyXG5cclxuICAgIHRoaXMuYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gZXZlbnQgZXhpc3RzLlxyXG4gICAqIFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBldmVudCBleGlzdHMgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgX2V4aXN0cyhldmVudDogc3RyaW5nKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG59Il19