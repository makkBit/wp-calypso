/**
 * Internal dependencies
 */
import { THEME_PREVIEW_OPTIONS } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

export function setThemePreviewOptions( primary, secondary ) {
	return {
		type: THEME_PREVIEW_OPTIONS,
		primary,
		secondary,
	};
}
