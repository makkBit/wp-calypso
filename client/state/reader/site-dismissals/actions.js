/**
 * Internal dependencies
 */
import {
	READER_DISMISS_POST,
	READER_DISMISS_SITE,
} from 'wp-calypso-client/state/reader/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/me/dismiss/sites/new';

import 'wp-calypso-client/state/reader/init';

export const dismissPost = ( { streamKey, postKey } ) => {
	return {
		type: READER_DISMISS_POST,
		payload: { streamKey, postKey, siteId: postKey.blogId },
	};
};

export const dismissSite = ( siteId ) => {
	return {
		type: READER_DISMISS_SITE,
		payload: { siteId },
	};
};
