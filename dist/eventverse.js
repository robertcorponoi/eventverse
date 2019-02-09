function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Compare two functions by turning them into strings and
 * removing whitespace/line-breaks and then checking equality.
 * 
 * @since 0.1.0
 * 
 * @param {Function} fn1 The first function.
 * @param {Function} fn2 The second function.
 * 
 * @returns {boolean} Returns true if the functions are equal and false otherwise.
 */

function compareFunctions(fn1, fn2) {
  var f1 = fn1.toString().replace(/\n/g, '').replace(/\s{2}/g, ' ');
  var f2 = fn2.toString().replace(/\n/g, '').replace(/\s{2}/g, ' ');
  if (f1 === f2) return true;
  return false;
}

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
      var listener = new Listener(fn, context, once);

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

          if (compareFunctions(eventListener._fn, listener)) {
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

export default Eventverse;
