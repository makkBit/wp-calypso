/**
 * Internal dependencies
 */

import {
	GRAVATAR_RECEIVE_IMAGE_FAILURE,
	GRAVATAR_UPLOAD_REQUEST,
} from 'wp-calypso-client/state/action-types';
import {
	bumpStat,
	composeAnalytics,
	recordTracksEvent,
	withAnalytics,
} from 'wp-calypso-client/state/analytics/actions';

import 'wp-calypso-client/state/data-layer/wpcom/gravatar-upload';

export function uploadGravatar( file, email ) {
	return withAnalytics( recordTracksEvent( 'calypso_edit_gravatar_upload_start' ), {
		type: GRAVATAR_UPLOAD_REQUEST,
		file,
		email,
	} );
}

export const receiveGravatarImageFailed = ( { errorMessage, statName } ) =>
	withAnalytics(
		composeAnalytics(
			recordTracksEvent( 'calypso_edit_gravatar_file_receive_failure' ),
			bumpStat( 'calypso_gravatar_update_error', statName )
		),
		{
			type: GRAVATAR_RECEIVE_IMAGE_FAILURE,
			errorMessage,
		}
	);
