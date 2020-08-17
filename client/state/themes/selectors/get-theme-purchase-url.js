/**
 * Internal dependencies
 */
import { getSiteSlug, isJetpackSite } from 'wp-calypso-client/state/sites/selectors';
import { isThemePremium } from 'wp-calypso-client/state/themes/selectors/is-theme-premium';

import 'wp-calypso-client/state/themes/init';

/**
 * Returns the URL for purchasing the given theme for the given site.
 *
 * @param  {object}  state   Global state tree
 * @param  {string}  themeId Theme ID
 * @param  {number}  siteId  Site ID for which to buy the theme
 * @returns {?string}         Theme purchase URL
 */
export function getThemePurchaseUrl( state, themeId, siteId ) {
	if ( isJetpackSite( state, siteId ) || ! isThemePremium( state, themeId ) ) {
		return null;
	}
	return `/checkout/${ getSiteSlug( state, siteId ) }/theme:${ themeId }`;
}
