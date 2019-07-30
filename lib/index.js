'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var utils = _interopRequireWildcard(require("./utils"));

var _Listener = _interopRequireDefault(require("./Listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsImV2ZW50IiwiZXZlbnRzIiwibGVuZ3RoIiwidGltZXNDYWxsZWQiLCJleGlzdHMiLCJsaXN0ZW5lcnMiLCJhcmdzIiwibGlzdGVuZXIiLCJmbiIsImNhbGwiLCJjdHgiLCJvbmNlIiwicmVtb3ZlTGlzdGVuZXIiLCJjb250ZXh0IiwiTGlzdGVuZXIiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJldmVudExpc3RlbmVyIiwidXRpbHMiLCJjb21wYXJlRnVuY3Rpb25zIiwiZmlsdGVyIiwiZXZMaXN0ZW5lciIsImFkZExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7OztJQUtxQkEsVTs7O0FBRXBCOzs7Ozs7OztBQVNBOzs7Ozs7QUFPQTs7O0FBR0Msd0JBQTJDO0FBQUEsUUFBL0JDLGdCQUErQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLG9DQUw3QkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUs2Qjs7QUFFekMsU0FBS0YsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUVEO0FBRUY7Ozs7Ozs7Ozs7O2tDQU9lRyxLLEVBQXVCO0FBRW5DLGFBQU8sS0FBS0MsTUFBTCxDQUFZRCxLQUFaLEVBQW1CRSxNQUExQjtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Z0NBT1lGLEssRUFBdUI7QUFFakMsYUFBTyxLQUFLQyxNQUFMLENBQVlELEtBQVosRUFBbUIsQ0FBbkIsRUFBc0JHLFdBQTdCO0FBRUQ7QUFFRjs7Ozs7Ozs7O3lCQU1NSCxLLEVBQXVDO0FBRTFDLFVBQUksQ0FBQyxLQUFLSSxNQUFMLENBQVlKLEtBQVosQ0FBTCxFQUF5QjtBQUV6QixVQUFNSyxTQUEwQixHQUFHLEtBQUtKLE1BQUwsQ0FBWUQsS0FBWixDQUFuQzs7QUFKMEMsd0NBQXJCTSxJ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QUVEO0FBRUY7Ozs7Ozs7Ozs7Ozt1QkFTSWIsSyxFQUFlUSxFLEVBQTBDO0FBQUEsVUFBakNLLE9BQWlDLHVFQUFsQixJQUFrQjtBQUUxRCxXQUFLVSxXQUFMLENBQWlCdkIsS0FBakIsRUFBd0JRLEVBQXhCLEVBQTRCSyxPQUE1QjtBQUVBLGFBQU8sSUFBUDtBQUVEO0FBRUY7Ozs7Ozs7Ozs7OzsyQkFTZ0JiLEssRUFBZTtBQUU1QixVQUFJLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixDQUFKLEVBQXdCLE9BQU8sSUFBUDtBQUV4QixhQUFPLEtBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi91dGlscydcclxuXHJcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL0xpc3RlbmVyJztcclxuXHJcbi8qKlxyXG4gKiBFdmVudHZlcnNlIGlzIGEgaGlnbHkgcGVyZm9ybWFudCBhbmQgZWFzeSB0byB1c2UgZXZlbnQgZW1pdHRlciBmb3IgTm9kZWpzIGFuZCB0aGUgYnJvd3Nlci5cclxuICogXHJcbiAqIEBhdXRob3IgUm9iZXJ0IENvcnBvbm9pIDxyb2JlcnRjb3Jwb25vaUBnbWFpbC5jb20+XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHZlcnNlIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIG1heGltdW0gYW1vdW50IG9mIGxpc3RlbmVycyBlYWNoIGV2ZW50IGNhbiBoYXZlIGF0IG9uZSB0aW1lLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG5cdCAqIFxyXG5cdCAqIEBkZWZhdWx0IDEwXHJcblx0ICovXHJcbiAgbWF4TGlzdGVuZXJDb3VudDogbnVtYmVyO1xyXG5cclxuXHQvKipcclxuXHQgKiBBIGNvbGxlY3Rpb24gb2YgYWxsIG9mIHRoZSBsaXN0ZW5lcnMgY3JlYXRlZCBmb3IgdGhpcyBpbnN0YW5jZSBvZiBFdmVudHZlcnNlLlxyXG5cdCAqIFxyXG5cdCAqIEBwcm9wZXJ0eSB7T2JqZWN0fVxyXG5cdCAqL1xyXG4gIGV2ZW50czogYW55ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtudW1iZXJ9IFttYXhMaXN0ZW5lckNvdW50PTEwXSBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlzdGVuZXJzIGVhY2ggZXZlbnQgY2FuIGhhdmUgYXQgb25lIHRpbWUuIFxyXG5cdCAqL1xyXG4gIGNvbnN0cnVjdG9yKG1heExpc3RlbmVyQ291bnQ6IG51bWJlciA9IDEwKSB7XHJcblxyXG4gICAgdGhpcy5tYXhMaXN0ZW5lckNvdW50ID0gbWF4TGlzdGVuZXJDb3VudDtcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGZvciBhIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuICBsaXN0ZW5lckNvdW50KGV2ZW50OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cclxuICAgIHJldHVybiB0aGlzLmV2ZW50c1tldmVudF0ubGVuZ3RoO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG51bWJlciBvZiB0aW1lcyBhIGxpc3RlbmVyIHdhcyBjYWxsZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBnZXQgdGhlIHRpbWVzIGNhbGxlZCBmb3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyIG9mIHRpbWVzIHRoZSBldmVudCB3YXMgY2FsbGVkLlxyXG4gICAqL1xyXG4gIHRpbWVzQ2FsbGVkKGV2ZW50OiBzdHJpbmcpOiBudW1iZXIge1xyXG5cclxuICAgIHJldHVybiB0aGlzLmV2ZW50c1tldmVudF1bMF0udGltZXNDYWxsZWQ7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUnVucyBhbGwgb2YgdGhlIGxpc3RlbmVycyBhdHRhY2hlZCB0byB0aGlzIEV2ZW50dmVyc2Ugd2l0aCB0aGUgZXZlbnQgbmFtZSBhbmQgd2l0aCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzLlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdC5cclxuXHQgKiBAcGFyYW0gey4uLip9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBsaXN0ZW5lcnMuXHJcblx0ICovXHJcbiAgZW1pdChldmVudDogc3RyaW5nLCAuLi5hcmdzOiBBcnJheTxzdHJpbmc+KSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lcnM6IEFycmF5PExpc3RlbmVyPiA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG5cclxuICAgICAgbGlzdGVuZXIuZm4uY2FsbChsaXN0ZW5lci5jdHgsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgbGlzdGVuZXIudGltZXNDYWxsZWQrKztcclxuXHJcbiAgICAgIGlmIChsaXN0ZW5lci5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lci5mbik7XHJcblxyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gYWRkIGEgbGlzdGVuZXIgZm9yLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBydW4gd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC5cclxuXHQgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dCBUaGUgY29udGV4dCB0byB1c2Ugd2hlbiBjYWxsaW5nIHRoZSBsaXN0ZW5lci5cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9uY2UgSW5kaWNhdGVzIHdoZXRoZXIgdGhpcyBsaXN0ZW5lciBzaG91bGQgb25seSBiZSBjYWxsZWQgb25jZS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX1cclxuXHQgKi9cclxuICBhZGRMaXN0ZW5lcihldmVudDogc3RyaW5nLCBmbjogYW55LCBjb250ZXh0ID0gdGhpcywgb25jZSA9IGZhbHNlKTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBMaXN0ZW5lcihmbiwgY29udGV4dCwgb25jZSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHtcclxuXHJcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xyXG5cclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGggPT09IHRoaXMubWF4TGlzdGVuZXJDb3VudCkge1xyXG5cclxuICAgICAgY29uc29sZS53YXJuKGBbRXZlbnR2ZXJzZV1bYWRkTGlzdGVuZXJdOiBUaGUgZXZlbnQgJHtldmVudH0gYWxyZWFkeSBoYXMgdGhlIG1heCBhbW91bnQgb2YgbGlzdGVuZXJzLmApO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIG9uLlxyXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIFRoZSBsaXN0ZW5lciB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9XHJcblx0ICovXHJcbiAgcmVtb3ZlTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgbGlzdGVuZXI6IGFueSk6IChFdmVudHZlcnNlIHwgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUud2FybignW0V2ZW50dmVyc2VdW3JlbW92ZUxpc3RlbmVyXTogVW5hYmxlIHRvIHJlbW92ZSBsaXN0ZW5lciBmb3IgYW4gZXZlbnQgdGhhdCBkb2VzbnQgZXhpc3QuJyk7XHJcblxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoY29uc3QgZXZlbnRMaXN0ZW5lciBvZiB0aGlzLmV2ZW50c1tldmVudF0pIHtcclxuXHJcbiAgICAgIGlmICh1dGlscy5jb21wYXJlRnVuY3Rpb25zKGV2ZW50TGlzdGVuZXIuZm4sIGxpc3RlbmVyKSkge1xyXG5cclxuICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSB0aGlzLmV2ZW50c1tldmVudF0uZmlsdGVyKChldkxpc3RlbmVyOiBhbnkpID0+IGV2TGlzdGVuZXIgIT0gZXZlbnRMaXN0ZW5lcik7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSBhIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZnJvbS5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX1cclxuXHQgKi9cclxuICByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQ6IHN0cmluZyk6IChFdmVudHZlcnNlIHwgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUud2FybignW0V2ZW50dmVyc2VdW3JlbW92ZUFsbExpc3RlbmVyc106IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBydW4gb25jZS5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG4gIG9uY2UoZXZlbnQ6IHN0cmluZywgZm46IGFueSwgY29udGV4dDogYW55ID0gdGhpcyk6IEV2ZW50dmVyc2Uge1xyXG5cclxuICAgIHRoaXMuYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG4gIG9uKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQ6IGFueSA9IHRoaXMpOiBFdmVudHZlcnNlIHtcclxuXHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIGFuIGV2ZW50IGV4aXN0cy5cclxuICAgKiBcclxuXHQgKiBAcHJpdmF0ZVxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZXZlbnQgZXhpc3RzIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuXHQgKi9cclxuICBwcml2YXRlIGV4aXN0cyhldmVudDogc3RyaW5nKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG59Il19