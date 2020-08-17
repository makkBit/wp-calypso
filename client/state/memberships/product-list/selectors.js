/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import 'wp-calypso-client/state/memberships/init';

export function getProductsForSiteId( state, siteId ) {
	return get( state, [ 'memberships', 'productList', 'items', siteId ] );
}
