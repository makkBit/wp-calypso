/**
 * Internal dependencies
 */
import { REWIND_STATE_UPDATE } from 'wp-calypso-client/state/action-types';

export default ( state = null, { type, data } ) => ( type === REWIND_STATE_UPDATE ? data : state );
