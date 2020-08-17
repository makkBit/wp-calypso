/**
 * External dependencies
 */
import page from 'page';

/**
 * Internal dependencies
 */
import { isExternal } from 'wp-calypso-client/lib/url';
import { getThemeCustomizeUrl } from 'wp-calypso-client/state/themes/selectors';

import 'wp-calypso-client/state/themes/init';

/**
 * Triggers a switch to the try&customize page of theme.
 * When theme is not available dispatches FAILURE action
 * that trigers displaying error notice by notices middlewaere
 *
 * @param  {string}   themeId      WP.com Theme ID
 * @param  {string}   siteId       Jetpack Site ID
 * @returns {Function}              Action thunk
 */
export function tryAndCustomizeTheme( themeId, siteId ) {
	return ( dispatch, getState ) => {
		const url = getThemeCustomizeUrl( getState(), themeId, siteId );
		if ( isExternal( url ) ) {
			window.location.href = url;
			return;
		}
		page( getThemeCustomizeUrl( getState(), themeId, siteId ) );
	};
}
