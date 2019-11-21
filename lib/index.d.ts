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
    private _maxListenerCount;
    /**
     * A collection of all of the listeners created for this instance of Eventverse.
     *
     * @property {Object}
     */
    events: any;
    /**
     * @param {number} [maxListenerCount=10] The maximum amount of listeners each event can have at one time.
     */
    constructor(maxListenerCount?: number);
    /**
     * Returns the number of max listeners each event can have at one time.
     *
     * @returns {number}
     */
    get maxListenerCount(): number;
    /**
     * Returns the number of listeners for a given event.
     *
     * @param {string} event The name of the event.
     *
     * @returns {number}
     */
    listenerCount(event: string): number;
    /**
     * Returns the number of times a listener was called.
     *
     * @param {string} event The name of the event to get the times called for.
     *
     * @returns {number} Returns the number of times the event was called.
     */
    timesCalled(event: string): number;
    /**
     * Runs all of the listeners attached to this Eventverse with the event name and with the supplied arguments.
     *
     * @param {string} event The name of the event to emit.
     * @param {...*} args The arguments to pass to the listeners.
     */
    emit(event: string, ...args: Array<string>): void;
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
    addListener(event: string, fn: any, context?: this, once?: boolean): (Eventverse | undefined);
    /**
     * Removes a listener function for the given event.
     *
     * @param {string} event The name of the event to remove the listener on.
     * @param {Function} listener The listener to remove from the event.
     *
     * @returns {Eventverse} Returns this for chaining.
     */
    removeListener(event: string, listener: any): (Eventverse | undefined);
    /**
     * Removes all listeners from a given event.
     *
     * @param {string} event The name of the event to remove all listeners from.
     *
     * @returns {Eventverse} Returns this for chaining.
     */
    removeAllListeners(event: string): (Eventverse | undefined);
    /**
     * Add a listener function that will only run once.
     *
     * @param {string} event The name of the event to add a listener for.
     * @param {Function} fn The function to run when the event is emitted.
     * @param {Object} [context=this] The context to use when calling the listener.
     *
     * @returns {Eventverse} Returns this for chaining.
     */
    once(event: string, fn: any, context?: any): Eventverse;
    /**
     * Adds a listener function for the given event.
     *
     * @param {string} event The name of the event to add a listener for.
     * @param {Function} fn The function to run when the event is emitted.
     * @param {Object} [context=this] The context to use when calling the listener.
     *
     * @returns {Eventverse} Returns this for chaining.
     */
    on(event: string, fn: any, context?: any): Eventverse;
    /**
     * Checks if an event exists.
   *
     * @private
     *
     * @param {string} event The name of the event.
     *
     * @returns {boolean} Returns true if the event exists or false otherwise.
     */
    private _exists;
}
