/**
 * External Dependencies
 */
import { isArray } from 'lodash';

/**
 * Internal Dependencies
 */
import {
	READER_SITE_REQUEST,
	READER_SITE_REQUEST_SUCCESS,
	READER_SITE_REQUEST_FAILURE,
	READER_SITE_UPDATE,
} from 'wp-calypso-client/state/reader/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/read/sites';

import 'wp-calypso-client/state/reader/init';

export function requestSite( blogId ) {
	return {
		type: READER_SITE_REQUEST,
		payload: {
			ID: blogId,
		},
	};
}

export function receiveReaderSiteRequestSuccess( data ) {
	return {
		type: READER_SITE_REQUEST_SUCCESS,
		payload: data,
	};
}

export function receiveReaderSiteRequestFailure( action, error ) {
	return {
		type: READER_SITE_REQUEST_FAILURE,
		payload: action.payload,
		error,
	};
}

export function updateSites( sites ) {
	if ( ! isArray( sites ) ) {
		sites = [ sites ];
	}
	return {
		type: READER_SITE_UPDATE,
		payload: sites,
	};
}
