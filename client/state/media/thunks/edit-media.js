/**
 * External dependencies
 */
import { assign } from 'lodash';

/**
 * Internal dependencies
 */
import { createTransientMedia } from 'wp-calypso-client/lib/media/utils';
import { dispatchFluxUpdateMediaItem } from 'wp-calypso-client/state/media/utils/flux-adapter';
import { editMediaItem } from 'wp-calypso-client/state/media/actions';
import getMediaItem from 'wp-calypso-client/state/selectors/get-media-item';

/**
 * Redux thunk to edit a media item.
 *
 * Note: Temporarily this action will dispatch to the flux store, until
 * the flux store is removed.
 *
 * @param {number} siteId site identifier
 * @param {object} item edited media item
 */
export const editMedia = ( siteId, item ) => ( dispatch, getState ) => {
	const transientMediaItem = createTransientMedia( item.media || item.media_url );

	if ( ! transientMediaItem ) {
		return;
	}

	const mediaId = item.ID;
	const originalMediaItem = getMediaItem( getState(), siteId, mediaId );
	const editedMediaItem = assign( {}, originalMediaItem, transientMediaItem, {
		ID: mediaId,
		isDirty: true,
	} );

	dispatchFluxUpdateMediaItem( siteId, editedMediaItem );

	dispatch( editMediaItem( siteId, editedMediaItem, item ) );
};
