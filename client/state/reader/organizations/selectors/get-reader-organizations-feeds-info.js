/**
 * External dependencies
 */
import { forEach } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import 'wp-calypso-client/state/reader/init';
import getOrganizationSites from 'wp-calypso-client/state/reader/follows/selectors/get-reader-follows-organization';

/**
 * Get sites by organization id
 */
const getOrganizationFeedsInfo = createSelector(
	( state, organizationId ) => {
		const sites = getOrganizationSites( state, organizationId );

		const info = {
			unseenCount: 0,
			feedIds: [],
			feedUrls: [],
		};
		// remove subs where the sub has an error
		forEach( sites, ( item ) => {
			info.unseenCount += item.unseen_count;
			info.feedIds.push( item.feed_ID );
			info.feedUrls.push( item.feed_URL );
		} );

		return info;
	},
	( state ) => [ state.reader.follows.items, state.currentUser.capabilities ]
);

export default getOrganizationFeedsInfo;
