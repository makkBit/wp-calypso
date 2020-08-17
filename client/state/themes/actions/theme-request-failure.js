/**
 * Internal dependencies
 */
import { THEME_REQUEST_FAILURE } from 'wp-calypso-client/state/themes/action-types';

import 'wp-calypso-client/state/themes/init';

export function themeRequestFailure( siteId, themeId, error ) {
	return {
		type: THEME_REQUEST_FAILURE,
		siteId,
		themeId,
		error,
	};
}
