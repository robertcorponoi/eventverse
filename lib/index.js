'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Eventverse is a higly performant and easy to use event emitter for Nodejs and the browser.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.0
 */
var Eventverse =
/*#__PURE__*/
function () {
  /**
   * The maximum amount of listeners each event can have at one time.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * 
   * @default 10
   */

  /**
   * A collection of all of the listeners created for this instance of Eventverse.
   * 
   * @since 0.1.0
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
   * @since 0.1.0
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
     * Runs all of the listeners attached to this Eventverse with the event name and with the supplied arguments.
     * 
     * @since 0.1.0
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

          if (listener.once) {
            this.removeListener(event, listener.fn);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
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
     * @since 0.1.0
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
      var listener = {
        fn: fn,
        ctx: context,
        once: once
      };

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
     * @since 0.1.0
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
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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

exports.default = Eventverse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsImV2ZW50IiwiZXZlbnRzIiwibGVuZ3RoIiwiZXhpc3RzIiwibGlzdGVuZXJzIiwiYXJncyIsImxpc3RlbmVyIiwiZm4iLCJjYWxsIiwiY3R4Iiwib25jZSIsInJlbW92ZUxpc3RlbmVyIiwiY29udGV4dCIsImNvbnNvbGUiLCJ3YXJuIiwicHVzaCIsImV2ZW50TGlzdGVuZXIiLCJ1dGlscyIsImNvbXBhcmVGdW5jdGlvbnMiLCJmaWx0ZXIiLCJldkxpc3RlbmVyIiwiYWRkTGlzdGVuZXIiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUlBOzs7Ozs7O0lBT3FCQSxVOzs7QUFFcEI7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7QUFTQTs7O0FBR0Msd0JBQTJDO0FBQUEsUUFBL0JDLGdCQUErQix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLG9DQUw3QkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUs2Qjs7QUFFekMsU0FBS0YsZ0JBQUwsR0FBd0JBLGdCQUF4QjtBQUVEO0FBRUY7Ozs7Ozs7Ozs7Ozs7a0NBU2VHLEssRUFBdUI7QUFFbkMsYUFBTyxLQUFLQyxNQUFMLENBQVlELEtBQVosRUFBbUJFLE1BQTFCO0FBRUQ7QUFFRjs7Ozs7Ozs7Ozs7eUJBUU1GLEssRUFBdUM7QUFFMUMsVUFBSSxDQUFDLEtBQUtHLE1BQUwsQ0FBWUgsS0FBWixDQUFMLEVBQXlCO0FBRXpCLFVBQU1JLFNBQTBCLEdBQUcsS0FBS0gsTUFBTCxDQUFZRCxLQUFaLENBQW5DOztBQUowQyx3Q0FBckJLLElBQXFCO0FBQXJCQSxRQUFBQSxJQUFxQjtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQU0xQyw2QkFBdUJELFNBQXZCLDhIQUFrQztBQUFBOztBQUFBLGNBQXZCRSxRQUF1Qjs7QUFFaEMsMEJBQUFB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V0FBTCxDQUFpQnJCLEtBQWpCLEVBQXdCTyxFQUF4QixFQUE0QkssT0FBNUI7QUFFQSxhQUFPLElBQVA7QUFFRDtBQUdGOzs7Ozs7Ozs7Ozs7OzJCQVVnQlosSyxFQUFlO0FBRTVCLFVBQUksS0FBS0MsTUFBTCxDQUFZRCxLQUFaLENBQUosRUFBd0IsT0FBTyxJQUFQO0FBRXhCLGFBQU8sS0FBUDtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tICcuL3V0aWxzJ1xyXG5cclxuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vaW50ZXJmYWNlcy9MaXN0ZW5lcic7XHJcblxyXG4vKipcclxuICogRXZlbnR2ZXJzZSBpcyBhIGhpZ2x5IHBlcmZvcm1hbnQgYW5kIGVhc3kgdG8gdXNlIGV2ZW50IGVtaXR0ZXIgZm9yIE5vZGVqcyBhbmQgdGhlIGJyb3dzZXIuXHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydCBDb3Jwb25vaSA8cm9iZXJ0Y29ycG9ub2lAZ21haWwuY29tPlxyXG4gKiBcclxuICogQHZlcnNpb24gMS4wLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50dmVyc2Uge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlzdGVuZXJzIGVhY2ggZXZlbnQgY2FuIGhhdmUgYXQgb25lIHRpbWUuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtudW1iZXJ9XHJcblx0ICogXHJcblx0ICogQGRlZmF1bHQgMTBcclxuXHQgKi9cclxuICBtYXhMaXN0ZW5lckNvdW50OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIGxpc3RlbmVycyBjcmVhdGVkIGZvciB0aGlzIGluc3RhbmNlIG9mIEV2ZW50dmVyc2UuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHByb3BlcnR5IHtPYmplY3R9XHJcblx0ICovXHJcbiAgZXZlbnRzOiBhbnkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW21heExpc3RlbmVyQ291bnQ9MTBdIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaXN0ZW5lcnMgZWFjaCBldmVudCBjYW4gaGF2ZSBhdCBvbmUgdGltZS4gXHJcblx0ICovXHJcbiAgY29uc3RydWN0b3IobWF4TGlzdGVuZXJDb3VudDogbnVtYmVyID0gMTApIHtcclxuXHJcbiAgICB0aGlzLm1heExpc3RlbmVyQ291bnQgPSBtYXhMaXN0ZW5lckNvdW50O1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgZm9yIGEgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG5cdCAqL1xyXG4gIGxpc3RlbmVyQ291bnQoZXZlbnQ6IHN0cmluZyk6IG51bWJlciB7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50XS5sZW5ndGg7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUnVucyBhbGwgb2YgdGhlIGxpc3RlbmVycyBhdHRhY2hlZCB0byB0aGlzIEV2ZW50dmVyc2Ugd2l0aCB0aGUgZXZlbnQgbmFtZSBhbmQgd2l0aCB0aGUgc3VwcGxpZWQgYXJndW1lbnRzLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdC5cclxuXHQgKiBAcGFyYW0gey4uLip9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBsaXN0ZW5lcnMuXHJcblx0ICovXHJcbiAgZW1pdChldmVudDogc3RyaW5nLCAuLi5hcmdzOiBBcnJheTxzdHJpbmc+KSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBsaXN0ZW5lcnM6IEFycmF5PExpc3RlbmVyPiA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG5cclxuICAgICAgbGlzdGVuZXIuZm4uY2FsbChsaXN0ZW5lci5jdHgsIC4uLmFyZ3MpO1xyXG5cclxuICAgICAgaWYgKGxpc3RlbmVyLm9uY2UpIHtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIuZm4pO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gdXNlIHdoZW4gY2FsbGluZyB0aGUgbGlzdGVuZXIuXHJcblx0ICogQHBhcmFtIHtib29sZWFufSBvbmNlIEluZGljYXRlcyB3aGV0aGVyIHRoaXMgbGlzdGVuZXIgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uY2UuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9XHJcblx0ICovXHJcbiAgYWRkTGlzdGVuZXIoZXZlbnQ6IHN0cmluZywgZm46IGFueSwgY29udGV4dCA9IHRoaXMsIG9uY2UgPSBmYWxzZSk6IChFdmVudHZlcnNlIHwgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgY29uc3QgbGlzdGVuZXI6IExpc3RlbmVyID0geyBmbjogZm4sIGN0eDogY29udGV4dCwgb25jZTogb25jZSB9O1xyXG5cclxuICAgIGlmICghdGhpcy5leGlzdHMoZXZlbnQpKSB7XHJcblxyXG4gICAgICB0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLmV2ZW50c1tldmVudF0ubGVuZ3RoID09PSB0aGlzLm1heExpc3RlbmVyQ291bnQpIHtcclxuXHJcbiAgICAgIGNvbnNvbGUud2FybihgW0V2ZW50dmVyc2VdW2FkZExpc3RlbmVyXTogVGhlIGV2ZW50ICR7ZXZlbnR9IGFscmVhZHkgaGFzIHRoZSBtYXggYW1vdW50IG9mIGxpc3RlbmVycy5gKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBvbi5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG4gIHJlbW92ZUxpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGlmICghdGhpcy5leGlzdHMoZXZlbnQpKSB7XHJcblxyXG4gICAgICBjb25zb2xlLndhcm4oJ1tFdmVudHZlcnNlXVtyZW1vdmVMaXN0ZW5lcl06IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGNvbnN0IGV2ZW50TGlzdGVuZXIgb2YgdGhpcy5ldmVudHNbZXZlbnRdKSB7XHJcblxyXG4gICAgICBpZiAodXRpbHMuY29tcGFyZUZ1bmN0aW9ucyhldmVudExpc3RlbmVyLmZuLCBsaXN0ZW5lcikpIHtcclxuXHJcbiAgICAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gdGhpcy5ldmVudHNbZXZlbnRdLmZpbHRlcigoZXZMaXN0ZW5lcjogYW55KSA9PiBldkxpc3RlbmVyICE9IGV2ZW50TGlzdGVuZXIpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZyb20uXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge0V2ZW50dmVyc2V9XHJcblx0ICovXHJcbiAgcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50OiBzdHJpbmcpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIGlmICghdGhpcy5leGlzdHMoZXZlbnQpKSB7XHJcblxyXG4gICAgICBjb25zb2xlLndhcm4oJ1tFdmVudHZlcnNlXVtyZW1vdmVBbGxMaXN0ZW5lcnNdOiBVbmFibGUgdG8gcmVtb3ZlIGxpc3RlbmVyIGZvciBhbiBldmVudCB0aGF0IGRvZXNudCBleGlzdC4nKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgcnVuIG9uY2UuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhZGQgYSBsaXN0ZW5lciBmb3IuXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byB1c2Ugd2hlbiBjYWxsaW5nIHRoZSBsaXN0ZW5lci5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX1cclxuXHQgKi9cclxuICBvbmNlKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQ6IGFueSA9IHRoaXMpOiBFdmVudHZlcnNlIHtcclxuXHJcbiAgICB0aGlzLmFkZExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgdHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhZGQgYSBsaXN0ZW5lciBmb3IuXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byB1c2Ugd2hlbiBjYWxsaW5nIHRoZSBsaXN0ZW5lci5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7RXZlbnR2ZXJzZX1cclxuXHQgKi9cclxuICBvbihldmVudDogc3RyaW5nLCBmbjogYW55LCBjb250ZXh0OiBhbnkgPSB0aGlzKTogRXZlbnR2ZXJzZSB7XHJcblxyXG4gICAgdGhpcy5hZGRMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgYW4gZXZlbnQgZXhpc3RzLlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIEBwcml2YXRlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBldmVudCBleGlzdHMgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG5cdCAqL1xyXG4gIHByaXZhdGUgZXhpc3RzKGV2ZW50OiBzdHJpbmcpIHtcclxuXHJcbiAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gIH1cclxuXHJcbn0iXX0=