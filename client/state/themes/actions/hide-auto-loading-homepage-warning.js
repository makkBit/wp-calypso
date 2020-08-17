/**
 * Internal dependencies
 */
import { THEME_HIDE_AUTO_LOADING_HOMEPAGE_WARNING } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

export function hideAutoLoadingHomepageWarning() {
	return {
		type: THEME_HIDE_AUTO_LOADING_HOMEPAGE_WARNING,
	};
}
