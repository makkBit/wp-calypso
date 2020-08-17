/**
 * Internal dependencies
 */
import { THEME_SHOW_AUTO_LOADING_HOMEPAGE_WARNING } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

export function showAutoLoadingHomepageWarning( themeId ) {
	return {
		type: THEME_SHOW_AUTO_LOADING_HOMEPAGE_WARNING,
		themeId,
	};
}
