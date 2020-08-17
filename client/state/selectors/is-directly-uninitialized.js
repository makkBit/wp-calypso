/**
 * Tells whether the Directly RTM widget has started initialization
 *
 *
 *
 * @see lib/directly for more about Directly
 * @param {object}  state  Global state tree
 * @returns {boolean}        Whether the widget is waiting to be initialized
 */

/**
 * Internal dependencies
 */
import { STATUS_UNINITIALIZED } from 'wp-calypso-client/state/help/directly/constants';

import 'wp-calypso-client/state/help/init';

export default function isDirectlyUninitialized( state ) {
	return state.help?.directly.status === STATUS_UNINITIALIZED;
}
