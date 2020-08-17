/**
 * External dependencies
 */
import { compact } from 'lodash';

/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import createSelector from 'wp-calypso-client/lib/create-selector';
import { decodeEntities } from 'wp-calypso-client/lib/formatting';
import { getSelectedSiteId, isSiteSection } from 'wp-calypso-client/state/ui/selectors';
import getSiteTitle from 'wp-calypso-client/state/sites/selectors/get-site-title';
import { getDocumentHeadTitle } from 'wp-calypso-client/state/document-head/selectors/get-document-head-title';
import { getDocumentHeadCappedUnreadCount } from 'wp-calypso-client/state/document-head/selectors/get-document-head-capped-unread-count';

/**
 * Returns the formatted document title, based on the currently set title,
 * capped unreadCount, and selected site.
 *
 * @param  {object}  state  Global state tree
 * @returns {string}         Formatted title
 */
export const getDocumentHeadFormattedTitle = createSelector(
	( state ) => {
		let title = '';

		const unreadCount = getDocumentHeadCappedUnreadCount( state );
		if ( unreadCount ) {
			title += `(${ unreadCount }) `;
		}

		title += compact( [
			getDocumentHeadTitle( state ),
			isSiteSection( state ) && getSiteTitle( state, getSelectedSiteId( state ) ),
		] ).join( ' ‹ ' );

		if ( title ) {
			title = decodeEntities( title ) + ' — ';
		}

		return title + config( 'site_name' );
	},
	( state ) => [ state.documentHead, state.ui.section, state.ui.selectedSiteId ]
);
