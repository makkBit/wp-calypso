/**
 * Internal dependencies
 */
import { THEME_FILTERS_REQUEST } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/theme-filters';
import 'wp-calypso-client/state/themes/init';

/**
 * Triggers a network request to fetch all available theme filters.
 *
 * @returns {object} A nested list of theme filters, keyed by filter slug
 */
export function requestThemeFilters() {
	return {
		type: THEME_FILTERS_REQUEST,
	};
}
