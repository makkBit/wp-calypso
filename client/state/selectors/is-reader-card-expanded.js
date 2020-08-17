/**
 * Internal dependencies
 */
import { keyToString } from 'wp-calypso-client/reader/post-key';

import 'wp-calypso-client/state/reader-ui/init';

export default function isReaderCardExpanded( state, postKey ) {
	const key = keyToString( postKey );
	return !! ( key && state.readerUi.cardExpansions[ key ] );
}
