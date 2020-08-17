/**
 * Internal dependencies
 */
import { http } from 'wp-calypso-client/state/data-layer/wpcom-http/actions';
import { dispatchRequest } from 'wp-calypso-client/state/data-layer/wpcom-http/utils';
import { VIDEO_EDITOR_UPDATE_POSTER } from 'wp-calypso-client/state/action-types';
import {
	setPosterUrl,
	showError,
	showUploadProgress,
} from 'wp-calypso-client/state/editor/video-editor/actions';

import { registerHandlers } from 'wp-calypso-client/state/data-layer/handler-registry';
import { getSelectedSiteId } from 'wp-calypso-client/state/ui/selectors';
import getMediaItem from 'wp-calypso-client/state/selectors/get-media-item';
import { dispatchFluxUpdateMediaItem } from 'wp-calypso-client/state/media/utils/flux-adapter';
import { assign } from 'lodash';

const fetch = ( action ) => {
	if ( ! ( 'file' in action.params || 'atTime' in action.params ) ) {
		return;
	}

	const { atTime, file } = action.params;
	const params = Object.assign(
		{
			apiVersion: '1.1',
			method: 'POST',
			path: `/videos/${ action.videoId }/poster`,
		},
		file && { formData: [ [ 'poster', file ] ] },
		atTime !== undefined && { body: { at_time: atTime } }
	);

	return http( params, action );
};

const onSuccess = ( action, { poster: posterUrl } ) => ( dispatch, getState ) => {
	dispatch( setPosterUrl( posterUrl ) );

	const currentState = getState();

	const siteId = getSelectedSiteId( currentState );
	const mediaItem = getMediaItem( currentState, siteId, action.meta.mediaId );

	// Photon does not support URLs with a querystring component.
	const urlBeforeQuery = ( posterUrl || '' ).split( '?' )[ 0 ];

	const updatedMediaItem = assign( {}, mediaItem, {
		thumbnails: {
			fmt_hd: urlBeforeQuery,
			fmt_dvd: urlBeforeQuery,
			fmt_std: urlBeforeQuery,
		},
	} );

	dispatchFluxUpdateMediaItem( siteId, updatedMediaItem );
};

const onError = () => showError();

const onProgress = ( action, progress ) => {
	const hasProgressData = 'loaded' in progress && 'total' in progress;
	const percentage = hasProgressData
		? Math.min( Math.round( ( progress.loaded / ( Number.EPSILON + progress.total ) ) * 100 ), 100 )
		: 0;

	return showUploadProgress( percentage );
};

const dispatchUpdatePosterRequest = dispatchRequest( { fetch, onSuccess, onError, onProgress } );

registerHandlers( 'state/data-layer/wpcom/videos/poster/index.js', {
	[ VIDEO_EDITOR_UPDATE_POSTER ]: [ dispatchUpdatePosterRequest ],
} );
