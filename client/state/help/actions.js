/**
 * Internal dependencies
 */
import {
	HELP_CONTACT_FORM_SITE_SELECT,
	HELP_LINKS_RECEIVE,
	HELP_LINKS_REQUEST,
	SUPPORT_HISTORY_REQUEST,
	SUPPORT_HISTORY_SET,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/help/search';
import 'wp-calypso-client/state/data-layer/wpcom/help/support-history';
import 'wp-calypso-client/state/help/init';

export const selectSiteId = ( siteId ) => ( {
	type: HELP_CONTACT_FORM_SITE_SELECT,
	siteId,
} );

export const requestHelpLinks = ( query ) => ( {
	type: HELP_LINKS_REQUEST,
	query,
} );

export const receiveHelpLinks = ( helpLinks ) => ( {
	type: HELP_LINKS_RECEIVE,
	helpLinks,
} );

export const requestSupportHistory = ( email ) => ( {
	type: SUPPORT_HISTORY_REQUEST,
	email,
} );

export const setSupportHistory = ( items ) => ( {
	type: SUPPORT_HISTORY_SET,
	items,
} );
