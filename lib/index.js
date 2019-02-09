'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var utils = _interopRequireWildcard(require("./utils"));

var _Listener = _interopRequireDefault(require("./Listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Eventverse is a highly performant and easy to understand event emitter 
 * for the JavaScript Universe which includes Node and the browser.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.2.0
 */
var Eventverse =
/*#__PURE__*/
function () {
  /**
   * The maximum amount of listeners each event can have at
   * one time.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   * @readonly
   * 
   * @default 10
   */

  /**
   * A collection of all of the listeners created for this instance
   * of Eventverse.
   * 
   * @since 0.1.0
   * 
   * @property {Object}
   * @readonly
   */

  /**
   * @param {number} [maxListenerCount=10] The maximum amount of listeners each event can have at one time. 
   */
  function Eventverse() {
    var maxListenerCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, Eventverse);

    _defineProperty(this, "_maxListenerCount", void 0);

    _defineProperty(this, "_events", Object.create(null));

    this._maxListenerCount = maxListenerCount;
  }
  /**
   * Return the max amount of listeners allowed for each event.
   * 
   * @since 0.1.0
   * 
   * @returns {number}
   */


  _createClass(Eventverse, [{
    key: "listenerCount",

    /**
     * Returns the number of listeners for a given event.
     * 
     * @since 0.1.0
     * 
     * @param {string} event The name of the event.
     * 
     * @returns {number}
     */
    value: function listenerCount(event) {
      if (!this.exists(event)) {
        console.warn('[Eventverse][ListenerCount]: Unable to retrieve listener count for the given event because the given event does not exist');
        return;
      }

      return this._events[event].length;
    }
    /**
     * Runs all of the listeners attached to this Eventverse with the event name
     * and with the supplied arguments.
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
      var listeners = this._events[event];

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _listener$_fn;

          var listener = _step.value;

          (_listener$_fn = listener._fn).call.apply(_listener$_fn, [listener._ctx].concat(args));

          if (listener._once) {
            this.removeListener(event, listener._fn);
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
      var listener = new _Listener.default(fn, context, once);

      if (!this.exists(event)) {
        this._events[event] = [];
      } else if (this._events[event].length === this._maxListenerCount) {
        console.warn("[Eventverse][addListener]: The event ".concat(event, " already has the max amount of listeners."));
        return;
      }

      this._events[event].push(listener);

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

          if (utils.compareFunctions(eventListener._fn, listener)) {
            _this._events[event] = _this._events[event].filter(function (evListener) {
              return evListener != eventListener;
            });
            return "break";
          }
        };

        for (var _iterator2 = this._events[event][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

      this._events[event] = [];
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
      if (this._events[event]) return true;
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

exports.default = Eventverse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJFdmVudHZlcnNlIiwibWF4TGlzdGVuZXJDb3VudCIsIk9iamVjdCIsImNyZWF0ZSIsIl9tYXhMaXN0ZW5lckNvdW50IiwiZXZlbnQiLCJleGlzdHMiLCJjb25zb2xlIiwid2FybiIsIl9ldmVudHMiLCJsZW5ndGgiLCJsaXN0ZW5lcnMiLCJhcmdzIiwibGlzdGVuZXIiLCJfZm4iLCJjYWxsIiwiX2N0eCIsIl9vbmNlIiwicmVtb3ZlTGlzdGVuZXIiLCJmbiIsImNvbnRleHQiLCJvbmNlIiwiTGlzdGVuZXIiLCJwdXNoIiwiZXZlbnRMaXN0ZW5lciIsInV0aWxzIiwiY29tcGFyZUZ1bmN0aW9ucyIsImZpbHRlciIsImV2TGlzdGVuZXIiLCJhZGRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7SUFRcUJBLFU7OztBQUVwQjs7Ozs7Ozs7Ozs7O0FBYUE7Ozs7Ozs7Ozs7QUFXQTs7O0FBR0Esd0JBQW1DO0FBQUEsUUFBdkJDLGdCQUF1Qix1RUFBSixFQUFJOztBQUFBOztBQUFBOztBQUFBLHFDQUxwQkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsSUFBZCxDQUtvQjs7QUFFbEMsU0FBS0MsaUJBQUwsR0FBeUJILGdCQUF6QjtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7OztBQWFBOzs7Ozs7Ozs7a0NBU2NJLEssRUFBcUM7QUFFbEQsVUFBSSxDQUFDLEtBQUtDLE1BQUwsQ0FBWUQsS0FBWixDQUFMLEVBQXlCO0FBRXhCRSxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSwySEFBYjtBQUVBO0FBRUE7O0FBRUQsYUFBTyxLQUFLQyxPQUFMLENBQWFKLEtBQWIsRUFBb0JLLE1BQTNCO0FBRUE7QUFFRDs7Ozs7Ozs7Ozs7O3lCQVNLTCxLLEVBQXVDO0FBRTNDLFVBQUksQ0FBQyxLQUFLQyxNQUFMLENBQVlELEtBQVosQ0FBTCxFQUF5QjtBQUV6QixVQUFN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LEVBQXhCLEVBQTRCQyxPQUE1QixFQUFxQyxJQUFyQztBQUVBLGFBQU8sSUFBUDtBQUVBO0FBRUQ7Ozs7Ozs7Ozs7Ozs7O3VCQVdHZixLLEVBQWVjLEUsRUFBMEM7QUFBQSxVQUFqQ0MsT0FBaUMsdUVBQWxCLElBQWtCO0FBRTNELFdBQUtTLFdBQUwsQ0FBaUJ4QixLQUFqQixFQUF3QmMsRUFBeEIsRUFBNEJDLE9BQTVCO0FBRUEsYUFBTyxJQUFQO0FBRUE7QUFHRDs7Ozs7Ozs7Ozs7OzsyQkFVZWYsSyxFQUFlO0FBRTdCLFVBQUksS0FBS0ksT0FBTCxDQUFhSixLQUFiLENBQUosRUFBeUIsT0FBTyxJQUFQO0FBRXpCLGFBQU8sS0FBUDtBQUVBOzs7d0JBbE44QjtBQUU5QixhQUFPLEtBQUtELGlCQUFaO0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL0xpc3RlbmVyJztcclxuXHJcbi8qKlxyXG4gKiBFdmVudHZlcnNlIGlzIGEgaGlnaGx5IHBlcmZvcm1hbnQgYW5kIGVhc3kgdG8gdW5kZXJzdGFuZCBldmVudCBlbWl0dGVyIFxyXG4gKiBmb3IgdGhlIEphdmFTY3JpcHQgVW5pdmVyc2Ugd2hpY2ggaW5jbHVkZXMgTm9kZSBhbmQgdGhlIGJyb3dzZXIuXHJcbiAqIFxyXG4gKiBAYXV0aG9yIFJvYmVydCBDb3Jwb25vaSA8cm9iZXJ0Y29ycG9ub2lAZ21haWwuY29tPlxyXG4gKiBcclxuICogQHZlcnNpb24gMC4yLjBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50dmVyc2Uge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgbWF4aW11bSBhbW91bnQgb2YgbGlzdGVuZXJzIGVhY2ggZXZlbnQgY2FuIGhhdmUgYXRcclxuXHQgKiBvbmUgdGltZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge251bWJlcn1cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKiBcclxuXHQgKiBAZGVmYXVsdCAxMFxyXG5cdCAqL1xyXG5cdF9tYXhMaXN0ZW5lckNvdW50OiBudW1iZXI7XHJcblxyXG5cdC8qKlxyXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIGxpc3RlbmVycyBjcmVhdGVkIGZvciB0aGlzIGluc3RhbmNlXHJcblx0ICogb2YgRXZlbnR2ZXJzZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcHJvcGVydHkge09iamVjdH1cclxuXHQgKiBAcmVhZG9ubHlcclxuXHQgKi9cclxuXHRfZXZlbnRzOiBhbnkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge251bWJlcn0gW21heExpc3RlbmVyQ291bnQ9MTBdIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBsaXN0ZW5lcnMgZWFjaCBldmVudCBjYW4gaGF2ZSBhdCBvbmUgdGltZS4gXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IobWF4TGlzdGVuZXJDb3VudCA9IDEwKSB7XHJcblxyXG5cdFx0dGhpcy5fbWF4TGlzdGVuZXJDb3VudCA9IG1heExpc3RlbmVyQ291bnQ7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJuIHRoZSBtYXggYW1vdW50IG9mIGxpc3RlbmVycyBhbGxvd2VkIGZvciBlYWNoIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XHJcblx0ICovXHJcblx0Z2V0IG1heExpc3RlbmVyQ291bnQoKTogbnVtYmVyIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fbWF4TGlzdGVuZXJDb3VudDtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2YgbGlzdGVuZXJzIGZvciBhIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHJldHVybnMge251bWJlcn1cclxuXHQgKi9cclxuXHRsaXN0ZW5lckNvdW50KGV2ZW50OiBzdHJpbmcpOiAoc3RyaW5nIHwgdW5kZWZpbmVkKSB7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHtcclxuXHJcblx0XHRcdGNvbnNvbGUud2FybignW0V2ZW50dmVyc2VdW0xpc3RlbmVyQ291bnRdOiBVbmFibGUgdG8gcmV0cmlldmUgbGlzdGVuZXIgY291bnQgZm9yIHRoZSBnaXZlbiBldmVudCBiZWNhdXNlIHRoZSBnaXZlbiBldmVudCBkb2VzIG5vdCBleGlzdCcpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGg7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUnVucyBhbGwgb2YgdGhlIGxpc3RlbmVycyBhdHRhY2hlZCB0byB0aGlzIEV2ZW50dmVyc2Ugd2l0aCB0aGUgZXZlbnQgbmFtZVxyXG5cdCAqIGFuZCB3aXRoIHRoZSBzdXBwbGllZCBhcmd1bWVudHMuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBlbWl0LlxyXG5cdCAqIEBwYXJhbSB7Li4uKn0gYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGxpc3RlbmVycy5cclxuXHQgKi9cclxuXHRlbWl0KGV2ZW50OiBzdHJpbmcsIC4uLmFyZ3M6IEFycmF5PHN0cmluZz4pIHtcclxuXHJcblx0XHRpZiAoIXRoaXMuZXhpc3RzKGV2ZW50KSkgcmV0dXJuO1xyXG5cclxuXHRcdGNvbnN0IGxpc3RlbmVyczogQXJyYXk8TGlzdGVuZXI+ID0gdGhpcy5fZXZlbnRzW2V2ZW50XTtcclxuXHJcblx0XHRmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xyXG5cclxuXHRcdFx0bGlzdGVuZXIuX2ZuLmNhbGwobGlzdGVuZXIuX2N0eCwgLi4uYXJncyk7XHJcblxyXG5cdFx0XHRpZiAobGlzdGVuZXIuX29uY2UpIHtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIuX2ZuKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byBhZGQgYSBsaXN0ZW5lciBmb3IuXHJcblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJ1biB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb25jZSBJbmRpY2F0ZXMgd2hldGhlciB0aGlzIGxpc3RlbmVyIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG5cdGFkZExpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQgPSB0aGlzLCBvbmNlID0gZmFsc2UpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdGNvbnN0IGxpc3RlbmVyOiBMaXN0ZW5lciA9IG5ldyBMaXN0ZW5lcihmbiwgY29udGV4dCwgb25jZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLmV4aXN0cyhldmVudCkpIHtcclxuXHJcblx0XHRcdHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXTtcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlIGlmICh0aGlzLl9ldmVudHNbZXZlbnRdLmxlbmd0aCA9PT0gdGhpcy5fbWF4TGlzdGVuZXJDb3VudCkge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKGBbRXZlbnR2ZXJzZV1bYWRkTGlzdGVuZXJdOiBUaGUgZXZlbnQgJHtldmVudH0gYWxyZWFkeSBoYXMgdGhlIG1heCBhbW91bnQgb2YgbGlzdGVuZXJzLmApO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEBzaW5jZSAwLjEuMFxyXG5cdCAqIFxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBvbi5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG5cdHJlbW92ZUxpc3RlbmVyKGV2ZW50OiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpOiAoRXZlbnR2ZXJzZSB8IHVuZGVmaW5lZCkge1xyXG5cclxuXHRcdGlmICghdGhpcy5leGlzdHMoZXZlbnQpKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oJ1tFdmVudHZlcnNlXVtyZW1vdmVMaXN0ZW5lcl06IFVuYWJsZSB0byByZW1vdmUgbGlzdGVuZXIgZm9yIGFuIGV2ZW50IHRoYXQgZG9lc250IGV4aXN0LicpO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGNvbnN0IGV2ZW50TGlzdGVuZXIgb2YgdGhpcy5fZXZlbnRzW2V2ZW50XSkge1xyXG5cclxuXHRcdFx0aWYgKHV0aWxzLmNvbXBhcmVGdW5jdGlvbnMoZXZlbnRMaXN0ZW5lci5fZm4sIGxpc3RlbmVyKSkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9ldmVudHNbZXZlbnRdID0gdGhpcy5fZXZlbnRzW2V2ZW50XS5maWx0ZXIoKGV2TGlzdGVuZXI6IGFueSkgPT4gZXZMaXN0ZW5lciAhPSBldmVudExpc3RlbmVyKTtcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgZ2l2ZW4gZXZlbnQuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogXHJcblx0ICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmcm9tLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG5cdHJlbW92ZUFsbExpc3RlbmVycyhldmVudDogc3RyaW5nKTogKEV2ZW50dmVyc2UgfCB1bmRlZmluZWQpIHtcclxuXHJcblx0XHRpZiAoIXRoaXMuZXhpc3RzKGV2ZW50KSkge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCdbRXZlbnR2ZXJzZV1bcmVtb3ZlQWxsTGlzdGVuZXJzXTogVW5hYmxlIHRvIHJlbW92ZSBsaXN0ZW5lciBmb3IgYW4gZXZlbnQgdGhhdCBkb2VzbnQgZXhpc3QuJyk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBydW4gb25jZS5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG5cdG9uY2UoZXZlbnQ6IHN0cmluZywgZm46IGFueSwgY29udGV4dDogYW55ID0gdGhpcyk6IEV2ZW50dmVyc2Uge1xyXG5cclxuXHRcdHRoaXMuYWRkTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBldmVudC5cclxuXHQgKiBcclxuXHQgKiBAc2luY2UgMC4xLjBcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRvIGFkZCBhIGxpc3RlbmVyIGZvci5cclxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gcnVuIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIHVzZSB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyLlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtFdmVudHZlcnNlfVxyXG5cdCAqL1xyXG5cdG9uKGV2ZW50OiBzdHJpbmcsIGZuOiBhbnksIGNvbnRleHQ6IGFueSA9IHRoaXMpOiBFdmVudHZlcnNlIHtcclxuXHJcblx0XHR0aGlzLmFkZExpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiBhbiBldmVudCBleGlzdHMuXHJcblx0ICogXHJcblx0ICogQHNpbmNlIDAuMS4wXHJcblx0ICogQHByaXZhdGVcclxuXHQgKiBcclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxyXG5cdCAqIFxyXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGV2ZW50IGV4aXN0cyBvciBmYWxzZSBvdGhlcndpc2UuXHJcblx0ICovXHJcblx0cHJpdmF0ZSBleGlzdHMoZXZlbnQ6IHN0cmluZykge1xyXG5cclxuXHRcdGlmICh0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdH1cclxuXHJcbn0iXX0=