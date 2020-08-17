/**
 * Internal dependencies
 */
import { recordGoogleEvent } from 'wp-calypso-client/state/analytics/actions';

export function recordEditorEvent( action, label, value ) {
	return recordGoogleEvent( 'Editor', action, label, value );
}
