/**
 * Internal dependencies
 */
import {
	MAILCHIMP_LISTS_LIST,
	MAILCHIMP_LISTS_RECEIVE,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/mailchimp';
import 'wp-calypso-client/state/mailchimp/init';

export const requestList = ( siteId ) => ( {
	siteId,
	type: MAILCHIMP_LISTS_LIST,
} );

export function receiveLists( siteId, lists ) {
	return {
		siteId,
		type: MAILCHIMP_LISTS_RECEIVE,
		lists,
	};
}
