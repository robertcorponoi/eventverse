'use strict';
/**
 * Compare two functions by turning them into strings and
 * removing whitespace/line-breaks and then checking equality.
 * 
 * @since 0.1.0
 * 
 * @param {Function} fn1 The first function.
 * @param {Function} fn2 The second function.
 * 
 * @returns {boolean} Returns true if the functions are equal and false otherwise.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareFunctions = compareFunctions;

function compareFunctions(fn1, fn2) {
  var f1 = fn1.toString().replace(/\n/g, '').replace(/\s{2}/g, ' ');
  var f2 = fn2.toString().replace(/\n/g, '').replace(/\s{2}/g, ' ');
  if (f1 === f2) return true;
  return false;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6WyJjb21wYXJlRnVuY3Rpb25zIiwiZm4xIiwiZm4yIiwiZjEiLCJ0b1N0cmluZyIsInJlcGxhY2UiLCJmMiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXTyxTQUFTQSxnQkFBVCxDQUEwQkMsR0FBMUIsRUFBb0NDLEdBQXBDLEVBQXVEO0FBRTdELE1BQU1DLEVBQVUsR0FBR0YsR0FBRyxDQUFDRyxRQUFKLEdBQWVDLE9BQWYsQ0FBdUIsS0FBdkIsRUFBOEIsRUFBOUIsRUFBa0NBLE9BQWxDLENBQTBDLFFBQTFDLEVBQW9ELEdBQXBELENBQW5CO0FBQ0EsTUFBTUMsRUFBVSxHQUFHSixHQUFHLENBQUNFLFFBQUosR0FBZUMsT0FBZixDQUF1QixLQUF2QixFQUE4QixFQUE5QixFQUFrQ0EsT0FBbEMsQ0FBMEMsUUFBMUMsRUFBb0QsR0FBcEQsQ0FBbkI7QUFFQSxNQUFJRixFQUFFLEtBQUtHLEVBQVgsRUFBZSxPQUFPLElBQVA7QUFFZixTQUFPLEtBQVA7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIENvbXBhcmUgdHdvIGZ1bmN0aW9ucyBieSB0dXJuaW5nIHRoZW0gaW50byBzdHJpbmdzIGFuZFxyXG4gKiByZW1vdmluZyB3aGl0ZXNwYWNlL2xpbmUtYnJlYWtzIGFuZCB0aGVuIGNoZWNraW5nIGVxdWFsaXR5LlxyXG4gKiBcclxuICogQHNpbmNlIDAuMS4wXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbjEgVGhlIGZpcnN0IGZ1bmN0aW9uLlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbjIgVGhlIHNlY29uZCBmdW5jdGlvbi5cclxuICogXHJcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGZ1bmN0aW9ucyBhcmUgZXF1YWwgYW5kIGZhbHNlIG90aGVyd2lzZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlRnVuY3Rpb25zKGZuMTogYW55LCBmbjI6IGFueSk6IGJvb2xlYW4ge1xyXG5cclxuXHRjb25zdCBmMTogc3RyaW5nID0gZm4xLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxuL2csICcnKS5yZXBsYWNlKC9cXHN7Mn0vZywgJyAnKTtcclxuXHRjb25zdCBmMjogc3RyaW5nID0gZm4yLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxuL2csICcnKS5yZXBsYWNlKC9cXHN7Mn0vZywgJyAnKTtcclxuXHJcblx0aWYgKGYxID09PSBmMikgcmV0dXJuIHRydWU7XHJcblxyXG5cdHJldHVybiBmYWxzZTtcclxuXHJcbn0iXX0=