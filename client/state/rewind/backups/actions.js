/**
 * Internal dependencies
 */
import { REWIND_BACKUPS_REQUEST, REWIND_BACKUPS_SET } from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/sites/rewind/backups';

export const requestRewindBackups = ( siteId ) => ( {
	type: REWIND_BACKUPS_REQUEST,
	siteId,
} );

export const setRewindBackups = ( siteId, backups ) => ( {
	type: REWIND_BACKUPS_SET,
	siteId,
	backups,
} );
