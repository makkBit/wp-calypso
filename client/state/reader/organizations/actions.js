/**
 * Internal dependencies
 */
import { READER_ORGANIZATIONS_REQUEST } from 'wp-calypso-client/state/reader/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/read/organizations';
import 'wp-calypso-client/state/reader/init';

export function requestOrganizations() {
	return {
		type: READER_ORGANIZATIONS_REQUEST,
	};
}
