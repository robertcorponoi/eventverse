/**
 * Defines the properties of an event's listener.
 *
 * @since 1.0.0
 */
export default interface Listener {
    fn: Function;
    ctx?: any;
    once: boolean;
}
