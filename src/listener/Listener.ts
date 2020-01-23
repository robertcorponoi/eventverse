'use strict'

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
	timesCalled: number = 0;
	
	/**
	 * The number of times this listener function should be used before being destroyed automatically.
	 * 
	 * @property {number}
	 */
	uses: number = Infinity;

	/**
	 * @param {Function} fn The function to run when this listener is called.
	 * @param {boolean} [once=false] Indicates whether this listener should only be called once or not.
	 * @param {number} [users=Infinity] Indicates how many times this listener can be called before being destoryed automatically.
	 */
	constructor(fn: Function, once: boolean = false, uses: number = Infinity) {
		this.fn = fn;

		this.once = once;

		this.uses = uses;
  }
}