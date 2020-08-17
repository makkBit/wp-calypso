/**
 * Internal dependencies
 */
import { THEME_ACCEPT_AUTO_LOADING_HOMEPAGE_WARNING } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

export function acceptAutoLoadingHomepageWarning( themeId ) {
	return {
		type: THEME_ACCEPT_AUTO_LOADING_HOMEPAGE_WARNING,
		themeId,
	};
}
