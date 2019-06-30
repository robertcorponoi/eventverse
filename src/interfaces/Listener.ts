'use strict'

/**
 * Defines the properties of an event's listener.
 * 
 * @since 1.0.0
 */
export default interface Listener {

  // The method function that will be called when this listener is emitted.
  fn: Function;

  // The context to use when calling this listener.
  ctx?: any;

  // Indicates whether this listener will automatically be destroyed after being called once or not.
  once: boolean;

}