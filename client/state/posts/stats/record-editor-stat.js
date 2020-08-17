/**
 * Internal dependencies
 */
import { bumpStat } from 'wp-calypso-client/state/analytics/actions';

export function recordEditorStat( action ) {
	return bumpStat( 'editor_actions', action );
}
