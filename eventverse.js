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

/**
 * Compare two functions by turning them into strings and removing whitespace/line-breaks and then checking equality.
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

          if (compareFunctions(eventListener.fn, listener)) {
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
      var listener = new Listener(fn, once, uses);

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

export default Eventverse;
