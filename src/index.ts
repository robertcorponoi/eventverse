'use strict'

import Listener from './listener/Listener';
import compareFunctions from './utils/compare-functions'

/**
 * Eventverse is a higly performant and easy to use event emitter for Nodejs and the browser.
 */
export default class Eventverse {
	/**
	 * The maximum amount of listeners each event can have at one time.
   * 
   * @private
	 * 
	 * @property {number}
	 * 
	 * @default 10
	 */
  private _maxListenerCount: number;

	/**
	 * A collection of all of the listeners created for this instance of Eventverse.
	 * 
	 * @property {Object}
	 */
  events: any = Object.create(null);

	/**
	 * @param {number} [maxListenerCount=10] The maximum amount of listeners each event can have at one time. 
	 */
  constructor(maxListenerCount: number = 10) {
    this._maxListenerCount = maxListenerCount;
  }

  /**
   * Returns the number of max listeners each event can have at one time.
   * 
   * @returns {number}
   */
  get maxListenerCount(): number { return this._maxListenerCount; }

	/**
	 * Returns the number of listeners for a given event.
	 * 
	 * @param {string} event The name of the event.
	 * 
	 * @returns {number}
	 */
  listenerCount(event: string): number {
    return this.events[event].length;
  }

  /**
   * Returns the number of times a listener was called.
   * 
   * @param {string} event The name of the event to get the times called for.
   * 
   * @returns {number} Returns the number of times the event was called.
   */
  timesCalled(event: string): number {
    return this.events[event][0].timesCalled;
  }

	/**
	 * Runs all of the listeners attached to this Eventverse with the event name and with the supplied arguments.
	 * 
	 * @param {string} event The name of the event to emit.
	 * @param {...*} args The arguments to pass to the listeners.
	 */
  emit(event: string, ...args: Array<string>) {
    if (!this._exists(event)) return;

    const listeners: Array<Listener> = this.events[event];

    for (const listener of listeners) {
      listener.fn.call(this, ...args);

      listener.timesCalled++;

      if (listener.once || listener.timesCalled === listener.uses) this.removeListener(event, listener.fn);
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
  removeListener(event: string, listener: any): (Eventverse | undefined) {
    if (!this._exists(event)) {
      console.warn('[Eventverse][removeListener]: Unable to remove listener for an event that doesnt exist.');

      return;
    }

    for (const eventListener of this.events[event]) {
      if (compareFunctions(eventListener.fn, listener)) {
        this.events[event] = this.events[event].filter((evListener: any) => evListener != eventListener);

        break;
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
  removeAllListeners(event: string): (Eventverse | undefined) {
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
  once(event: string, fn: any): Eventverse {
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
  on(event: string, fn: any, uses?: number): Eventverse {
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
  private _addListener(event: string, fn: any, once: boolean = false, uses?: number): (Eventverse | undefined) {
    const listener = new Listener(fn, once, uses);

    if (!this._exists(event)) {
      this.events[event] = [];
    }
    else if (this.events[event].length === this.maxListenerCount) {
      console.warn(`[Eventverse][addListener]: The event ${event} already has the max amount of listeners.`);

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
  private _exists(event: string) {
    if (this.events[event]) return true;

    return false;
  }
}