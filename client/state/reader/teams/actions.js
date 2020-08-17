/**
 * Internal dependencies
 */
import { READER_TEAMS_REQUEST } from 'wp-calypso-client/state/reader/action-types';

import 'wp-calypso-client/state/data-layer/wpcom/read/teams';

import 'wp-calypso-client/state/reader/init';

export function requestTeams() {
	return {
		type: READER_TEAMS_REQUEST,
	};
}
