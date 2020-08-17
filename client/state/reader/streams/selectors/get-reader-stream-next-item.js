/**
 * Internal dependencies
 */
import getReaderStreamOffsetItem from 'wp-calypso-client/state/reader/streams/selectors/get-reader-stream-offset-item';

import 'wp-calypso-client/state/reader/init';

function getNextItem( state, currentItem ) {
	return getReaderStreamOffsetItem( state, currentItem, 1 );
}

export default getNextItem;
