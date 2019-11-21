'use strict'

/**
 * Compare two functions by turning them into strings and removing whitespace/line-breaks and then checking equality.
 * 
 * @param {Function} fn1 The first function.
 * @param {Function} fn2 The second function.
 * 
 * @returns {boolean} Returns true if the functions are equal and false otherwise.
 */
export function compareFunctions(fn1: any, fn2: any): boolean {

	const f1: string = fn1.toString().replace(/\n/g, '').replace(/\s{2}/g, ' ');
	const f2: string = fn2.toString().replace(/\n/g, '').replace(/\s{2}/g, ' ');

	if (f1 === f2) return true;

	return false;

}