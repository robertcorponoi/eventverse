/**
 * A listener represents a single event listener.
 */
export default class Listener {
    /**
     * The function that will be called when the listener is processed.
     *
     * @property {Function}
     */
    fn: any;
    /**
     * Whether or not this listener will be automatically destroyed after being run once.
     *
     * @property {boolean}
     */
    once: boolean;
    /**
     * Keeps track of the number of times that this listener has been called.
     *
     * @property {number}
     */
    timesCalled: number;
    constructor(fn: any, once: boolean);
}
