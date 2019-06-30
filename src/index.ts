'use strict'

import * as utils from './utils'

import Listener from './interfaces/Listener';

/**
 * Eventverse is a higly performant and easy to use event emitter for Nodejs and the browser.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.0
 */
export default class Eventverse {

	/**
	 * The maximum amount of listeners each event can have at one time.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {number}
	 * 
	 * @default 10
	 */
  maxListenerCount: number;

	/**
	 * A collection of all of the listeners created for this instance of Eventverse.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {Object}
	 */
  events: any = Object.create(null);

	/**
	 * @param {number} [maxListenerCount=10] The maximum amount of listeners each event can have at one time. 
	 */
  constructor(maxListenerCount: number = 10) {

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
  listenerCount(event: string): number {

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
  emit(event: string, ...args: Array<string>) {

    if (!this.exists(event)) return;

    const listeners: Array<Listener> = this.events[event];

    for (const listener of listeners) {

      listener.fn.call(listener.ctx, ...args);

      if (listener.once) {

        this.removeListener(event, listener.fn);

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
  addListener(event: string, fn: any, context = this, once = false): (Eventverse | undefined) {

    const listener: Listener = { fn: fn, ctx: context, once: once };

    if (!this.exists(event)) {

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
	 * Removes a listener function for the given event.
	 * 
	 * @since 0.1.0
	 * 
	 * @param {string} event The name of the event to remove the listener on.
	 * @param {Function} listener The listener to remove from the event.
	 * 
	 * @returns {Eventverse}
	 */
  removeListener(event: string, listener: any): (Eventverse | undefined) {

    if (!this.exists(event)) {

      console.warn('[Eventverse][removeListener]: Unable to remove listener for an event that doesnt exist.');

      return;

    }

    for (const eventListener of this.events[event]) {

      if (utils.compareFunctions(eventListener.fn, listener)) {

        this.events[event] = this.events[event].filter((evListener: any) => evListener != eventListener);

        break;

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
  removeAllListeners(event: string): (Eventverse | undefined) {

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
  once(event: string, fn: any, context: any = this): Eventverse {

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
  on(event: string, fn: any, context: any = this): Eventverse {

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
  private exists(event: string) {

    if (this.events[event]) return true;

    return false;

  }

}