/**
 * External dependencies
 */
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import { getThemeTaxonomySlugs } from 'wp-calypso-client/state/themes/utils';
import { getTheme } from 'wp-calypso-client/state/themes/selectors/get-theme';

import 'wp-calypso-client/state/themes/init';

/**
 * Checks if a theme has auto loading homepage feature.
 *
 * @param {object} state   Global state tree
 * @param {string} themeId An identifier for the theme
 * @returns {boolean} True if the theme has auto loading homepage. Otherwise, False.
 */
export function themeHasAutoLoadingHomepage( state, themeId ) {
	return includes(
		getThemeTaxonomySlugs( getTheme( state, 'wpcom', themeId ), 'theme_feature' ),
		'auto-loading-homepage'
	);
}
