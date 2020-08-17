/**
 * External dependencies
 */
import { values, sortBy } from 'lodash';

/**
 * Internal dependencies
 */
import createSelector from 'wp-calypso-client/lib/create-selector';
import 'wp-calypso-client/state/reader/init';
import { sorter } from 'wp-calypso-client/state/reader/follows/selectors/get-reader-followed-sites';

/**
 * Get sites by organization id
 */
const getOrganizationSites = createSelector(
	( state, organizationId ) => {
		// remove subs where the sub has an error
		return sortBy(
			values( state.reader.follows.items ).filter(
				( blog ) => blog.organization_id === organizationId
			),
			sorter
		);
	},
	( state ) => [ state.reader.follows.items, state.currentUser.capabilities ]
);

export default getOrganizationSites;
