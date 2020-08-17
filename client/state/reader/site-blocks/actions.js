/**
 * Internal dependencies
 */
import {
	READER_SITE_BLOCK,
	READER_SITE_BLOCKS_REQUEST,
	READER_SITE_UNBLOCK,
} from 'wp-calypso-client/state/reader/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/me/block/sites/delete';
import 'wp-calypso-client/state/data-layer/wpcom/me/block/sites/new';
import 'wp-calypso-client/state/data-layer/wpcom/me/blocks/sites';

import 'wp-calypso-client/state/reader/init';

export function blockSite( siteId ) {
	return {
		type: READER_SITE_BLOCK,
		payload: {
			siteId,
		},
	};
}

export function unblockSite( siteId ) {
	return {
		type: READER_SITE_UNBLOCK,
		payload: {
			siteId,
		},
	};
}

export function requestSiteBlocks( { page } = {} ) {
	return {
		type: READER_SITE_BLOCKS_REQUEST,
		payload: {
			page,
		},
	};
}
