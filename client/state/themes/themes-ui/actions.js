/**
 * Internal dependencies
 */
import {
	THEMES_BANNER_HIDE,
	THEMES_SHOWCASE_OPEN,
	THEMES_BOOKMARK_SET,
} from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

// Hides the theme showcase banner.
export function hideThemesBanner() {
	return {
		type: THEMES_BANNER_HIDE,
	};
}

// Open "More Themes" search area.
export function openThemesShowcase() {
	return {
		type: THEMES_SHOWCASE_OPEN,
	};
}

export function setThemesBookmark( state ) {
	return {
		type: THEMES_BOOKMARK_SET,
		payload: state,
	};
}
