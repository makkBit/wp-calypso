/**
 * External Dependencies
 *
 */

/**
 * Internal Dependencies
 */
import { STATS_RECENT_POST_VIEWS_REQUEST } from 'wp-calypso-client/state/action-types';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { receiveRecentPostViews } from 'wp-calypso-client/state/stats/recent-post-views/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';

export const fetch = ( action ) => {
	const { siteId, postIds, num, date, offset } = action;

	return http(
		{
			method: 'GET',
			path: `/sites/${ siteId }/stats/views/posts`,
			apiVersion: '1.1',
			query: {
				post_ids: postIds.join( ',' ),
				num,
				date,
				offset,
			},
		},
		action
	);
};

export const onSuccess = ( { siteId }, data ) => receiveRecentPostViews( siteId, data );

registerHandlers( 'state/data-layer/wpcom/sites/stats/views/posts/index.js', {
	[ STATS_RECENT_POST_VIEWS_REQUEST ]: [
		dispatchRequest( {
			fetch,
			onSuccess,
			onError: () => {},
		} ),
	],
} );
