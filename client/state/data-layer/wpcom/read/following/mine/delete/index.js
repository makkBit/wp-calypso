/**
 * External Dependencies
 */
import { translate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import config from 'wp-calypso-client/config';
import { READER_UNFOLLOW } from 'wp-calypso-client/state/reader/action-types';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { errorNotice } from 'wp-calypso-client/state/notices/actions';
import { follow } from 'wp-calypso-client/state/reader/follows/actions';
import { getFeedByFeedUrl } from 'wp-calypso-client/state/reader/feeds/selectors';
import { getSiteByFeedUrl } from 'wp-calypso-client/state/reader/sites/selectors';
import { getSiteName } from 'wp-calypso-client/reader/get-helpers';
import { bypassDataLayer } from 'wp-calypso-client/state/data-layer/utils';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

export const requestUnfollow = ( action ) =>
	http( {
		method: 'POST',
		path: '/read/following/mine/delete',
		apiVersion: '1.1',
		body: {
			url: action.payload.feedUrl,
			source: config( 'readerFollowingSource' ),
		},
		onSuccess: action,
		onFailure: action,
	} );

export const fromApi = ( data ) => {
	if ( ! data ) {
		throw new Error( 'Invalid API response: missing data' );
	}

	if ( data.subscribed ) {
		throw new Error( 'Did not unfollow' );
	}

	return data.subscribed;
};

export const receiveUnfollow = ( action ) => bypassDataLayer( action );

export const unfollowError = ( action ) => ( dispatch, getState ) => {
	const feedUrl = action.payload.feedUrl;
	const site = getSiteByFeedUrl( getState(), feedUrl );
	const feed = getFeedByFeedUrl( getState(), feedUrl );
	const siteTitle = getSiteName( { feed, site } ) || feedUrl;

	dispatch(
		errorNotice(
			translate( 'Sorry, there was a problem unfollowing %(siteTitle)s. Please try again.', {
				args: {
					siteTitle,
				},
			} ),
			{ duration: 5000 }
		)
	);

	dispatch( bypassDataLayer( follow( action.payload.feedUrl ) ) );
};

registerHandlers( 'state/data-layer/wpcom/read/following/mine/delete/index.js', {
	[ READER_UNFOLLOW ]: [
		dispatchRequest( {
			fetch: requestUnfollow,
			onSuccess: receiveUnfollow,
			onError: unfollowError,
			fromApi,
		} ),
	],
} );
