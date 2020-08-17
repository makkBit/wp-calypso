/**
 * Internal dependencies
 */
import { isHttps } from 'wp-calypso-client/lib/url';
import getRawSite from 'wp-calypso-client/state/selectors/get-raw-site';
import getSiteOption from './get-site-option';
import { isSectionNameEnabled } from 'wp-calypso-client/sections-filter';

/**
 * Returns true if the site can be previewed, false if the site cannot be
 * previewed, or null if preview ability cannot be determined. This indicates
 * whether it is safe to embed iframe previews for the site.
 *
 * @param  {object}   state  Global state tree
 * @param  {number}   siteId Site ID
 * @returns {?boolean}        Whether site is previewable
 */
export default function isSitePreviewable( state, siteId ) {
	const site = getRawSite( state, siteId );
	if ( ! site ) {
		return null;
	}

	if ( site.is_vip ) {
		return false;
	}

	if ( ! isSectionNameEnabled( 'preview' ) ) {
		return false;
	}

	const isWPForTeamsSite = getSiteOption( state, siteId, 'is_wpforteams_site' );
	if ( isWPForTeamsSite ) {
		return false;
	}

	const unmappedUrl = getSiteOption( state, siteId, 'unmapped_url' );
	return !! unmappedUrl && isHttps( unmappedUrl );
}
