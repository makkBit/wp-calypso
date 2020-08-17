/**
 * Internal dependencies
 */

import {
	domainManagementEdit,
	domainManagementList,
} from 'wp-calypso-client/my-sites/domains/paths';

export function getDomainManagementUrl( { slug }, domain ) {
	return domain ? domainManagementEdit( slug, domain ) : domainManagementList( slug );
}
