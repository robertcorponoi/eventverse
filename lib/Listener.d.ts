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
     * The context to use when calling this listener.
     *
     * @property {*}
     */
    ctx: any;
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
    constructor(fn: any, ctx: any, once: boolean);
}
