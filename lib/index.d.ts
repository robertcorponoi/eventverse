/**
 * Eventverse is a highly performant and easy to understand event emitter
 * for the JavaScript Universe which includes Node and the browser.
 *
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 *
 * @version 0.2.0
 */
export default class Eventverse {
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
    _maxListenerCount: number;
    /**
     * A collection of all of the listeners created for this instance
     * of Eventverse.
     *
     * @since 0.1.0
     *
     * @property {Object}
     * @readonly
     */
    _events: any;
    /**
     * @param {number} [maxListenerCount=10] The maximum amount of listeners each event can have at one time.
     */
    constructor(maxListenerCount?: number);
    /**
     * Return the max amount of listeners allowed for each event.
     *
     * @since 0.1.0
     *
     * @returns {number}
     */
    readonly maxListenerCount: number;
    /**
     * Returns the number of listeners for a given event.
     *
     * @since 0.1.0
     *
     * @param {string} event The name of the event.
     *
     * @returns {number}
     */
    listenerCount(event: string): (string | undefined);
    /**
     * Runs all of the listeners attached to this Eventverse with the event name
     * and with the supplied arguments.
     *
     * @since 0.1.0
     *
     * @param {string} event The name of the event to emit.
     * @param {...*} args The arguments to pass to the listeners.
     */
    emit(event: string, ...args: Array<string>): void;
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
    addListener(event: string, fn: any, context?: this, once?: boolean): (Eventverse | undefined);
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
    removeListener(event: string, listener: any): (Eventverse | undefined);
    /**
     * Removes all listeners from a given event.
     *
     * @since 0.1.0
     *
     * @param {string} event The name of the event to remove all listeners from.
     *
     * @returns {Eventverse}
     */
    removeAllListeners(event: string): (Eventverse | undefined);
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
    once(event: string, fn: any, context?: any): Eventverse;
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
    on(event: string, fn: any, context?: any): Eventverse;
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
    private exists;
}
