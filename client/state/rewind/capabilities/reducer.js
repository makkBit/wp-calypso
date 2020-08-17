/**
 * Internal dependencies
 */
import { REWIND_CAPABILITIES_UPDATE } from 'wp-calypso-client/state/action-types';

export default ( state = {}, { type, data } ) =>
	type === REWIND_CAPABILITIES_UPDATE ? data : state;
