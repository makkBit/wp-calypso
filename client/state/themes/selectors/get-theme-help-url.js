/**
 * Internal dependencies
 */
import config from 'wp-calypso-client/config';
import { getSiteSlug } from 'wp-calypso-client/state/sites/selectors';
import { oldShowcaseUrl } from 'wp-calypso-client/state/themes/utils';

import 'wp-calypso-client/state/themes/init';

/**
 * Returns the URL for a given theme's support page.
 *
 * @param  {object}  state   Global state tree
 * @param  {string}  themeId Theme ID
 * @param  {?number} siteId  Site ID to optionally use as context
 * @returns {?string}         Theme support page URL
 */
export function getThemeHelpUrl( state, themeId, siteId ) {
	if ( ! themeId ) {
		return null;
	}

	let baseUrl = oldShowcaseUrl + themeId;
	if ( config.isEnabled( 'manage/themes/details' ) ) {
		baseUrl = `/theme/${ themeId }/support`;
	}

	return baseUrl + ( siteId ? `/${ getSiteSlug( state, siteId ) }` : '' );
}
