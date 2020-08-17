/**
 * Internal dependencies
 */
import { THEME_PREVIEW_STATE } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

export function showThemePreview( themeId ) {
	return {
		type: THEME_PREVIEW_STATE,
		themeId,
	};
}
