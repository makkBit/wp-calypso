/**
 * Internal dependencies
 */
import { getQueryManager } from 'wp-calypso-client/state/posts/selectors/get-query-manager';

import 'wp-calypso-client/state/posts/init';

/**
 * Returns the last queryable page of posts for the given query, or null if the
 * total number of queryable posts if unknown.
 *
 * @param   {object}  state  Global state tree
 * @param   {?number} siteId Site ID, or `null` for all-sites queries
 * @param   {object}  query  Post query object
 * @returns {?number}        Last posts page
 */
export function getPostsLastPageForQuery( state, siteId, query ) {
	const manager = getQueryManager( state, siteId );
	if ( ! manager ) {
		return null;
	}

	const pages = manager.getNumberOfPages( query );
	if ( null === pages ) {
		return null;
	}

	return Math.max( pages, 1 );
}
