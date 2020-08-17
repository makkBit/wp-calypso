/**
 * Tells whether the Directly RTM widget is ready to be used
 *
 *
 *
 * @see lib/directly for more about Directly
 * @param {object}  state  Global state tree
 * @returns {boolean}        Whether the widget is ready
 */

/**
 * Internal dependencies
 */
import { STATUS_READY } from 'wp-calypso-client/state/help/directly/constants';

import 'wp-calypso-client/state/help/init';

export default function getDirectlyStatus( state ) {
	return state.help?.directly.status === STATUS_READY;
}
