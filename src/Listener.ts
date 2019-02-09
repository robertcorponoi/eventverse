'use strict'

/**
 * A listener represents a single event listener.
 * 
 * @since 0.1.0
 */
export default class Listener {

	/**
	 * The function that will be called when the listener is processed.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {Function}
	 * @readonly
	 */
	_fn: any;

	/**
	 * The context to use when calling this listener.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {*}
	 * @readonly
	 */
	_ctx: any;

	/**
	 * Whether or not this listener will be automatically destroyed after being run once.
	 * 
	 * @since 0.1.0
	 * 
	 * @property {boolean}
	 * @readonly
	 */
	_once: boolean;

	constructor(fn: any, ctx: any, once: boolean) {

		this._fn = fn;

		this._ctx = ctx;

		this._once = once;

	}

}