/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/reader-ui/init';

export default function getCurrentStream( state ) {
	return state.readerUi.currentStream;
}
