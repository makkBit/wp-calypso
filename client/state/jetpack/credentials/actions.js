/**
 * Internal dependencies
 */
import {
	JETPACK_CREDENTIALS_AUTOCONFIGURE,
	JETPACK_CREDENTIALS_DELETE,
	JETPACK_CREDENTIALS_UPDATE,
} from 'wp-calypso-client/state/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/activity-log/delete-credentials';
import 'wp-calypso-client/state/data-layer/wpcom/activity-log/rewind/activate';
import 'wp-calypso-client/state/data-layer/wpcom/activity-log/update-credentials';
import 'wp-calypso-client/state/jetpack/init';

export const updateCredentials = ( siteId, credentials ) => ( {
	type: JETPACK_CREDENTIALS_UPDATE,
	siteId,
	credentials,
} );

export const autoConfigCredentials = ( siteId ) => ( {
	type: JETPACK_CREDENTIALS_AUTOCONFIGURE,
	siteId,
} );

export const deleteCredentials = ( siteId, role ) => ( {
	type: JETPACK_CREDENTIALS_DELETE,
	siteId,
	role,
} );
